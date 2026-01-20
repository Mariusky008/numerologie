import fs from 'fs';
import path from 'path';

// Chemins des fichiers
const INPUT_FILE = path.join(process.cwd(), 'lib/data/prenoms.csv');
const OUTPUT_FILE = path.join(process.cwd(), 'lib/numerology/data/prenoms.json');

// Interface pour nos données de sortie
interface NameData {
  names: string[];
  origin: string;
  meaning: string;
  spiritual: string;
}

// Créer le dossier de destination si nécessaire
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  const content = fs.readFileSync(INPUT_FILE, 'utf-8');
  const lines = content.split('\n');
  
  const dataset: Record<string, NameData> = {};
  let currentGroup: Partial<NameData> = {};
  
  // On commence à lire à partir de la ligne 3 (après le header et le "A")
  // Note: Ce parser est spécifique au format "sale" du fichier fourni
  
  let bufferNames: string[] = [];

  for (let i = 3; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.length < 2) continue; // Skip empty lines or single letters

    // Détection d'une ligne "complète" (contient l'origine, la signification, etc.)
    // On assume qu'une ligne complète a des espaces multiples séparant les colonnes
    if (line.includes('   ')) {
        // C'est une ligne qui termine un groupe
        // On doit extraire les noms de cette ligne + ceux du buffer
        
        // Séparation grossière par espaces multiples
        const parts = line.split(/\s{2,}/);
        
        if (parts.length >= 3) {
            const namesPart = parts[0];
            const origin = parts[1];
            const meaning = parts[2];
            const spiritual = parts[3] || "";

            // Nettoyage des noms
            const currentNames = namesPart.split(',').map(n => n.trim()).filter(n => n);
            const allNames = [...bufferNames, ...currentNames];
            
            // Création de l'entrée pour chaque variante du prénom
            allNames.forEach(name => {
                const cleanName = name.toLowerCase();
                dataset[cleanName] = {
                    names: allNames,
                    origin,
                    meaning,
                    spiritual
                };
            });

            // Reset du buffer
            bufferNames = [];
        }
    } else {
        // C'est une ligne de continuation de prénoms (ex: "Aaron, Aaran, Aaren,")
        const names = line.split(',').map(n => n.trim()).filter(n => n);
        bufferNames.push(...names);
    }
  }

  // Écriture du fichier JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(dataset, null, 2));
  console.log(`Conversion terminée ! ${Object.keys(dataset).length} prénoms indexés dans ${OUTPUT_FILE}`);

} catch (error) {
  console.error("Erreur lors de la conversion:", error);
}