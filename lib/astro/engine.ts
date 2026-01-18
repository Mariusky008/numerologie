import * as Astronomy from 'astronomy-engine';

export interface AstroData {
  [key: string]: {
    signe: string;
    retrograde?: boolean;
    position_degres?: number;
    maison?: number;
  }
}

function degresVersSigne(degres: number): string {
  const signes = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"];
  let d = degres % 360;
  if (d < 0) d += 360;
  return signes[Math.floor(d / 30)];
}

function calculerMaison(posPlanete: number, ascendant: number): number {
  let diff = posPlanete - ascendant;
  if (diff < 0) diff += 360;
  return Math.floor(diff / 30) + 1;
}

export function calculerThemeAstral(dateInput: string, timeInput: string | undefined, lat: number, lng: number): AstroData {
  const time = timeInput || '12:00';
  const dateTimeStr = `${dateInput}T${time}:00`;
  const date = new Date(dateTimeStr);
  
  const resultats: AstroData = {};

  // 1. CALCUL ASCENDANT (AC) & MILIEU DU CIEL (MC)
  const astroTime = Astronomy.MakeTime(date);
  const gst = Astronomy.SiderealTime(astroTime);
  let lst = (gst + (lng / 15)) % 24; 
  if (lst < 0) lst += 24;

  const ramc = lst * 15;
  let ascendantDeg = (ramc + 90 + (lat < 0 ? 180 : 0)) % 360;
  
  resultats['Ascendant'] = { 
    signe: degresVersSigne(ascendantDeg),
    position_degres: ascendantDeg,
    maison: 1
  };
  resultats['MC'] = { 
    signe: degresVersSigne(ramc),
    position_degres: ramc,
    maison: 10
  };

  // 2. PLANÈTES
  const corpsCelestes = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  
  // Note: Astronomy.Observer n'est pas utilisé directement ici car GeoVector calcule en coordonnées géocentriques
  // Pour plus de précision (Topocentrique), on pourrait utiliser l'observateur, mais la différence est minime sauf pour la Lune.
  // Restons sur le standard GeoVector qui est robuste.

  corpsCelestes.forEach(corpsName => {
    const corps = corpsName as Astronomy.Body;

    // Vecteur Géocentrique
    const vector = Astronomy.GeoVector(corps, date, true);
    
    // Coordonnées écliptiques
    const ecliptic = Astronomy.Ecliptic(vector);
    
    const signe = degresVersSigne(ecliptic.elon);
    
    // Rétrograde
    const dateMoins1h = new Date(date.getTime() - 3600000);
    const vectorMoins1h = Astronomy.GeoVector(corps, dateMoins1h, true);
    const eclipticMoins1h = Astronomy.Ecliptic(vectorMoins1h);
    
    let diff = ecliptic.elon - eclipticMoins1h.elon;
    if (diff < -300) diff += 360;
    if (diff > 300) diff -= 360;
    
    const estRetrograde = diff < 0;

    // Calcul Maison
    const maison = calculerMaison(ecliptic.elon, ascendantDeg);

    resultats[corpsName] = {
      signe,
      retrograde: estRetrograde,
      position_degres: ecliptic.elon,
      maison
    };
  });

  return resultats;
}

export function calculerTransits(dateActuelle: Date): AstroData {
  const resultats: AstroData = {};
  const corpsCelestes = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  
  corpsCelestes.forEach(corpsName => {
    const corps = corpsName as Astronomy.Body;
    
    // Vecteur Géocentrique (Suffisant pour les signes planétaires mondiaux)
    const vector = Astronomy.GeoVector(corps, dateActuelle, true);
    const ecliptic = Astronomy.Ecliptic(vector);
    const signe = degresVersSigne(ecliptic.elon);
    
    // Rétrograde
    const dateMoins1h = new Date(dateActuelle.getTime() - 3600000);
    const vectorMoins1h = Astronomy.GeoVector(corps, dateMoins1h, true);
    const eclipticMoins1h = Astronomy.Ecliptic(vectorMoins1h);
    
    let diff = ecliptic.elon - eclipticMoins1h.elon;
    if (diff < -300) diff += 360;
    if (diff > 300) diff -= 360;
    
    resultats[corpsName] = {
      signe,
      retrograde: diff < 0,
      position_degres: ecliptic.elon
    };
  });
  
  return resultats;
}
