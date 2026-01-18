import * as Astronomy from 'astronomy-engine';

export interface AstroData {
  [key: string]: {
    signe: string;
    retrograde?: boolean;
    position_degres?: number;
  }
}

function degresVersSigne(degres: number): string {
  const signes = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"];
  let d = degres % 360;
  if (d < 0) d += 360;
  return signes[Math.floor(d / 30)];
}

export function calculerThemeAstral(dateInput: string, timeInput: string | undefined, lat: number, lng: number): AstroData {
  const time = timeInput || '12:00';
  const dateTimeStr = `${dateInput}T${time}:00`;
  const date = new Date(dateTimeStr);
  
  const resultats: AstroData = {};
  
  const corpsCelestes = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  
  corpsCelestes.forEach(corpsName => {
    const corps = corpsName as Astronomy.Body;

    // 1. Vecteur Géocentrique
    const vector = Astronomy.GeoVector(corps, date, true);
    
    // 2. Coordonnées écliptiques
    const ecliptic = Astronomy.Ecliptic(vector);
    
    const signe = degresVersSigne(ecliptic.elon);
    
    // 3. Rétrograde
    const dateMoins1h = new Date(date.getTime() - 3600000);
    const vectorMoins1h = Astronomy.GeoVector(corps, dateMoins1h, true);
    const eclipticMoins1h = Astronomy.Ecliptic(vectorMoins1h);
    
    let diff = ecliptic.elon - eclipticMoins1h.elon;
    if (diff < -300) diff += 360;
    if (diff > 300) diff -= 360;
    
    const estRetrograde = diff < 0;

    resultats[corpsName] = {
      signe,
      retrograde: estRetrograde,
      position_degres: ecliptic.elon
    };
  });
  
  // 3. CALCUL ASCENDANT (AC) & MILIEU DU CIEL (MC)
  const astroTime = Astronomy.MakeTime(date);
  const gst = Astronomy.SiderealTime(astroTime);
  let lst = (gst + (lng / 15)) % 24; 
  if (lst < 0) lst += 24;

  const ramc = lst * 15;
  let ascendantDeg = (ramc + 90 + (lat < 0 ? 180 : 0)) % 360;
  
  resultats['Ascendant'] = { signe: degresVersSigne(ascendantDeg) };
  resultats['MC'] = { signe: degresVersSigne(ramc) };

  return resultats;
}
