
import { NumerologyResult } from '@/lib/types';
import { INCLUSION_INTERPRETATIONS } from './interpretations-inclusion';
import { 
  LIFE_PATH_DEFINITIONS, 
  EXPRESSION_DEFINITIONS, 
  SOUL_URGE_DEFINITIONS, 
  PERSONALITY_DEFINITIONS 
} from './planDefinitions';

interface NumberArchetype {
  title: string;
  keywords: string[];
  desc: string; // Short summary
  challenge: string;
  extendedDesc: string; // Deep analysis (multiple paragraphs)
  love: string; // Relationship analysis
  work: string; // Professional analysis
  spiritual: string; // Spiritual mission
  keyAdvice: string[]; // Practical advice points
}

const archetypes: Record<number, NumberArchetype> = {
  1: {
    title: "L'Initiateur Audacieux",
    keywords: ["Indépendance", "Leadership", "Innovation", "Courage", "Action"],
    desc: "Le 1 est l'énergie brute du commencement, une force verticale et active. Vous êtes né pour ouvrir la voie, diriger et affirmer votre singularité.",
    challenge: "Apprendre à diriger sans dominer et à accepter que les autres aient leur propre rythme.",
    extendedDesc: "Porteur de la vibration originelle, vous êtes un pionnier dans l'âme. Votre énergie est électrique, directe et sans compromis. Vous avez horreur de la médiocrité et de la lenteur. Votre esprit est constamment tourné vers l'avenir, cherchant la prochaine montagne à gravir. Vous êtes capable de trancher là où les autres hésitent, de décider quand les autres doutent.\n\nCette puissance est votre plus grand atout. Vous ne supportez pas d'être un numéro parmi d'autres ; vous devez être le 'Numéro Un'. Cette soif de distinction n'est pas nécessairement de l'orgueil, mais un besoin viscéral d'exister par vous-même. Vous êtes un créateur de réalité, capable de matérialiser une idée par la seule force de votre volonté.\n\nCependant, ce chemin solitaire peut mener à l'isolement. Votre rapidité d'esprit peut vous rendre impatient face à ceux qui sont plus lents ou plus prudents. Votre leçon majeure est de comprendre que le vrai leader est celui qui élève les autres, pas celui qui les laisse derrière.",
    love: "En amour, vous êtes passionné, conquérant et protecteur. Vous aimez prendre l'initiative et la chasse vous stimule autant que la conquête. Vous avez besoin d'un partenaire qui a du caractère mais qui accepte de vous laisser les rênes, ou du moins qui ne vous fait pas d'ombre.\n\nLa routine tue votre désir. Vous avez besoin d'admirer l'autre et de sentir que votre couple est une alliance de forces. Attention cependant à ne pas devenir tyrannique ou égoïste. Apprenez à écouter les besoins de l'autre sans les voir comme des freins à votre liberté.",
    work: "Professionnellement, vous êtes fait pour l'entrepreneuriat, les postes de direction ou les professions libérales. Vous avez besoin d'autonomie totale. Être un simple exécutant vous éteint à petit feu. Vous excellez dans les lancements de projets, les situations de crise qui demandent des décisions rapides et l'innovation.\n\nVotre style de travail est intense et focalisé. Vous préférez travailler seul ou à la tête d'une équipe que vous avez choisie. L'échec ne vous arrête pas, il vous stimule.",
    spiritual: "Votre mission spirituelle est de découvrir votre propre identité divine et d'oser l'exprimer sans peur. Vous êtes ici pour apprendre l'autonomie de l'âme.",
    keyAdvice: [
      "Osez prendre des risques calculés, c'est votre carburant.",
      "Pratiquez l'écoute active pour adoucir votre autorité.",
      "Cultivez la patience, tout ne peut pas aller à votre vitesse.",
      "Acceptez la vulnérabilité comme une forme de courage."
    ]
  },
  2: {
    title: "Le Diplomate Sensible",
    keywords: ["Harmonie", "Intuition", "Collaboration", "Patience", "Empathie"],
    desc: "Le 2 est la vibration de la dualité réconciliée, une force d'accueil et de reliance. Vous êtes le ciment qui unit les êtres et le baume qui apaise les cœurs.",
    challenge: "Oser dire non, poser ses limites et ne pas s'oublier dans la fusion avec l'autre.",
    extendedDesc: "Vous êtes l'âme pacificatrice du zodiaque numérologique. Votre sensibilité est une antenne ultra-performante qui capte les moindres variations émotionnelles de votre environnement. Vous détestez le conflit et ferez tout pour maintenir l'équilibre. Vous êtes le médiateur né, celui qui comprend les deux côtés d'une histoire.\n\nVotre force ne réside pas dans la domination, mais dans la persuasion douce et la diplomatie. Vous savez intuitivement ce dont les autres ont besoin pour se sentir bien. Vous fonctionnez mieux en binôme qu'en solo ; vous avez besoin de l'autre pour vous refléter et vous compléter.\n\nLe revers de cette médaille est une tendance à la dépendance affective ou à la soumission. À force de vouloir plaire ou ne pas déranger, vous risquez de devenir transparent. Votre défi est de trouver votre propre voix et de comprendre que votre bien-être est aussi important que celui des autres.",
    love: "La relation est votre oxygène. Vous ne concevez pas la vie sans partage, sans tendresse, sans cette connexion intime qui donne du sens à tout. Vous êtes un partenaire attentionné, romantique et dévoué, prêt à beaucoup de sacrifices pour l'harmonie du couple.\n\nVous avez besoin de preuves d'amour, de sécurité et de douceur. Les personnalités trop brusques ou froides vous blessent profondément. Votre apprentissage amoureux est de ne pas fusionner totalement, de garder votre jardin secret et votre autonomie émotionnelle.",
    work: "Vous brillez dans le travail d'équipe, les ressources humaines, la diplomatie, la psychologie, le secrétariat ou les soins. Vous êtes le 'bras droit' idéal, celui qui sublime le travail du leader par son sens du détail et de l'humain.\n\nVous n'aimez pas la compétition féroce ni la pression excessive. Vous avez besoin d'une ambiance de travail sereine et bienveillante pour donner le meilleur de vous-même. Votre écoute est votre meilleur outil professionnel.",
    spiritual: "Votre mission spirituelle est d'apprendre la coopération et l'équilibre entre donner et recevoir. Vous êtes ici pour enseigner la paix.",
    keyAdvice: [
      "Apprenez à dire NON sans culpabilité.",
      "Protégez votre espace vital et votre énergie.",
      "Faites confiance à votre intuition, elle est votre boussole.",
      "Ne attendez pas que les autres devinent vos besoins, exprimez-les."
    ]
  },
  3: {
    title: "L'Expressif Créatif",
    keywords: ["Communication", "Joie", "Imagination", "Sociabilité", "Optimisme"],
    desc: "Le 3 est l'enfant intérieur de la numérologie, une énergie pétillante et sociale. Vous êtes né pour communiquer, créer et répandre la joie de vivre.",
    challenge: "Éviter la dispersion, la superficialité et apprendre à gérer ses émotions profondes.",
    extendedDesc: "Vif, charmant et doté d'un humour naturel, vous êtes un communicant né. Les mots sont vos jouets, les idées vos munitions. Vous avez besoin de public, d'interaction et de beauté. La routine et le silence vous angoissent, vous avez besoin que la vie pétille.\n\nVotre créativité est foisonnante. Vous avez mille idées à la minute, mais votre défi est la discipline : vous avez tendance à commencer mille projets sans en finir un seul. Vous êtes un catalyseur social, celui qui met l'ambiance et qui relie les gens entre eux par le rire et la légèreté.\n\nCependant, cette légèreté peut devenir un masque. Vous pouvez avoir tendance à fuir les problèmes ou les émotions lourdes en faisant des pirouettes intellectuelles. Votre profondeur existe, mais vous devez oser l'explorer sans peur de perdre votre sourire.",
    love: "Vous séduisez par votre esprit, votre brillance et votre légèreté. L'amour doit être un jeu, une fête, une aventure joyeuse. Vous fuyez les drames, la jalousie et la lourdeur émotionnelle. Votre partenaire doit être votre meilleur public et votre complice de rire.\n\nVous avez besoin d'être admiré et stimulé intellectuellement. La routine tue votre libido. Vous pouvez être un peu volage ou flirt, car vous aimez plaire, mais une fois engagé avec quelqu'un qui respecte votre liberté, vous êtes un compagnon délicieux.",
    work: "Les métiers de la parole, de l'écriture, de la scène, de la vente, du marketing ou de la publicité sont faits pour vous. Partout où il faut convaincre, divertir, embellir ou animer, vous êtes roi.\n\nVous avez besoin de variété et de contacts humains. Un travail de bureau isolé et répétitif vous rendra malheureux. Vous êtes fait pour l'expression, sous toutes ses formes.",
    spiritual: "Votre mission est d'apporter la lumière et la joie dans le monde. Vous êtes ici pour montrer que la vie peut être célébrée, même dans l'épreuve.",
    keyAdvice: [
      "Terminez ce que vous commencez, la discipline est votre alliée.",
      "Osez exprimer vos vraies émotions, pas juste les positives.",
      "Utilisez votre parole pour guérir et élever, pas juste pour distraire.",
      "Recherchez la profondeur derrière les apparences."
    ]
  },
  4: {
    title: "Le Bâtisseur Méthodique",
    keywords: ["Structure", "Stabilité", "Travail", "Rigueur", "Loyauté"],
    desc: "Le 4 est le carré, la base solide, une énergie de terre concrète. Vous êtes celui qui construit pour durer, pierre après pierre, avec une patience inébranlable.",
    challenge: "Accepter le changement, l'imprévu et sortir de sa zone de confort rigide.",
    extendedDesc: "Vous êtes l'architecte de votre vie et souvent le pilier de celle des autres. Pour vous, rien ne s'obtient sans effort, sans méthode et sans temps. Vous avez le sens du devoir, de l'ordre et de la justice chevillé au corps. Vous n'aimez pas les surprises, les risques inutiles ni l'improvisation.\n\nVotre approche est pragmatique : si ça ne fonctionne pas concrètement, ça ne vous intéresse pas. Cette solidité rassure votre entourage, qui sait qu'il peut compter sur vous en cas de tempête. Vous êtes la force tranquille, le roc.\n\nMais cette quête de sécurité peut virer à la rigidité. Vous pouvez avoir du mal à vous adapter aux changements rapides ou aux idées trop novatrices. Votre défi est d'apprendre à mettre de la souplesse dans vos plans et à comprendre que parfois, le chemin le plus court n'est pas la ligne droite mais la courbe.",
    love: "En amour, vous êtes sérieux, fidèle, loyal et protecteur. Vous ne badinez pas avec les sentiments. Vous cherchez une relation durable pour construire un foyer solide, une famille, un patrimoine. Vous exprimez votre amour par des actes concrets (réparer, construire, pourvoir) plutôt que par des grandes déclarations romantiques.\n\nVous avez besoin de temps pour faire confiance. Mais une fois votre cœur donné, c'est pour la vie. Attention à ne pas étouffer votre partenaire sous des règles ou une routine trop stricte.",
    work: "L'organisation, l'administration, l'ingénierie, le bâtiment, la comptabilité, l'armée, l'agriculture. Vous excellez là où il faut de la précision, de la logique, de la persévérance et de la rigueur.\n\nVous êtes un travailleur acharné, capable de supporter une charge de travail qui en écraserait d'autres. Vous aimez voir le résultat concret de vos efforts.",
    spiritual: "Votre mission est de donner une forme à l'esprit, de structurer la matière. Vous êtes ici pour créer des fondations solides sur lesquelles les autres peuvent s'appuyer.",
    keyAdvice: [
      "Lâchez prise sur les détails, voyez la vue d'ensemble.",
      "Osez la spontanéité, cela ne mettra pas votre vie en péril.",
      "Soyez doux avec vous-même, vous n'êtes pas une machine.",
      "Ouvrez-vous aux idées nouvelles, la tradition a du bon mais l'innovation aussi."
    ]
  },
  5: {
    title: "L'Explorateur Libre",
    keywords: ["Liberté", "Mouvement", "Adaptabilité", "Sensualité", "Curiosité"],
    desc: "Le 5 est le souffle du vent, une énergie de changement et d'expérience. Vous êtes un aventurier de la vie, avide de tout découvrir et de tout goûter.",
    challenge: "Trouver la discipline dans la liberté et ne pas fuir l'engagement par peur de l'enfermement.",
    extendedDesc: "Vous êtes un citoyen du monde. Votre esprit est vif, curieux de tout, incapable de rester en place physiquement ou mentalement. Vous voulez tout voir, tout comprendre, tout expérimenter. Vous êtes l'archétype de l'adaptabilité : jetez-vous n'importe où, vous retomberez sur vos pattes et vous vous ferez des amis en cinq minutes.\n\nLa routine est votre pire ennemie ; elle vous éteint. Vous avez besoin d'adrénaline, de nouveauté, de défis. Vous êtes un excellent promoteur, capable de vendre n'importe quoi à n'importe qui grâce à votre magnétisme et votre enthousiasme.\n\nMais cette soif de liberté cache parfois une instabilité chronique. Vous pouvez papillonner d'une expérience à l'autre sans jamais rien approfondir. Votre défi est de comprendre que la vraie liberté n'est pas la fuite, mais la capacité de choisir ses chaînes.",
    love: "Vous êtes un amant passionné, sensuel et magnétique. Vous aimez le jeu de la séduction. Mais vous avez besoin d'air. Une relation étouffante, jalouse ou routinière vous fera fuir instantanément. Votre partenaire doit être indépendant, surprenant et prêt à vous suivre dans vos aventures.\n\nVous pouvez avoir du mal à vous engager sur le long terme, sauf si vous trouvez quelqu'un qui comprend que votre besoin de liberté n'est pas un manque d'amour.",
    work: "Les métiers du voyage, du commerce international, du journalisme, de la communication, de la vente, ou tout poste nécessitant mobilité et adaptabilité. Les horaires de bureau fixes sont votre cauchemar.\n\nVous avez besoin de projets courts, intenses et variés. Vous êtes doué pour les langues, la négociation et l'adaptation rapide.",
    spiritual: "Votre mission est d'apprendre la liberté intérieure à travers l'expérience de la matière. Vous êtes ici pour montrer que le changement est la seule constante de l'univers.",
    keyAdvice: [
      "Canalisez votre énergie, ne partez pas dans tous les sens.",
      "La liberté demande de la discipline pour ne pas devenir du chaos.",
      "Engagez-vous, c'est là que se trouve la profondeur.",
      "Prenez soin de votre corps, il est votre véhicule d'exploration."
    ]
  },
  6: {
    title: "Le Gardien de l'Harmonie",
    keywords: ["Amour", "Responsabilité", "Famille", "Beauté", "Service"],
    desc: "Le 6 est le foyer chaleureux, une énergie de soin et d'esthétique. Vous portez le monde sur vos épaules et cherchez à créer un cocon parfait pour ceux que vous aimez.",
    challenge: "Ne pas étouffer les autres par trop de soin, accepter l'imperfection et ne pas se sacrifier.",
    extendedDesc: "Vous êtes né sous le signe de l'amour, de la famille et du service. Votre maison est votre temple. Vous avez un sens inné de l'harmonie, des couleurs, des formes. Vous ne supportez pas la discorde, la laideur ni l'injustice. On vient naturellement vers vous pour être consolé, conseillé, nourri.\n\nVous êtes extrêmement responsable, parfois trop. Vous vous sentez obligé de régler les problèmes de tout le monde. Vous êtes la 'mère poule' ou le 'père protecteur' du groupe. Votre générosité est immense, mais elle attend souvent une reconnaissance en retour.\n\nVotre piège est le perfectionnisme et l'ingérence. À vouloir le bien des autres, vous pouvez devenir envahissant ou jugeant. Vous devez apprendre que chacun a le droit de faire ses propres erreurs et que vous n'êtes pas responsable du bonheur de l'humanité.",
    love: "L'amour est le centre absolu de votre vie. Vous cherchez l'âme sœur, le mariage, la famille idéale. Vous donnez énormément, vous êtes tendre, attentionné, 'câlin'. Vous avez besoin d'un foyer harmonieux et beau.\n\nVous pouvez être exigeant en amour, car vous avez une image très haute du couple idéal. La déception peut être grande si la réalité ne correspond pas à votre tableau idyllique.",
    work: "Les métiers du soin (médecin, infirmier, thérapeute), de l'enseignement, du conseil, de la décoration, de l'art, de l'hôtellerie ou du service social. Vous devez vous sentir utile à la communauté et en contact avec l'humain.\n\nVous avez besoin d'un environnement de travail harmonieux et esthétique. Les conflits entre collègues vous rendent malade.",
    spiritual: "Votre mission est d'apporter l'harmonie et la beauté sur Terre. Vous êtes ici pour enseigner l'amour responsable et le service.",
    keyAdvice: [
      "Lâchez prise sur la perfection, elle n'existe pas.",
      "Aidez les autres seulement s'ils vous le demandent.",
      "Pensez à vous avant de penser aux autres, ce n'est pas de l'égoïsme.",
      "Acceptez que le monde soit imparfait."
    ]
  },
  7: {
    title: "Le Sage Introspectif",
    keywords: ["Spiritualité", "Analyse", "Solitude", "Connaissance", "Perfectionnisme"],
    desc: "Le 7 est le penseur solitaire, une énergie mentale et spirituelle. Vous cherchez le 'pourquoi' de l'existence, perçant les apparences pour trouver la vérité.",
    challenge: "S'ouvrir aux autres émotionnellement et ne pas s'isoler dans sa tour d'ivoire intellectuelle.",
    extendedDesc: "Vous êtes un aristocrate de l'esprit. Le bruit du monde, la foule et la superficialité vous fatiguent ; vous préférez de loin le silence de votre bibliothèque intérieure ou la contemplation de la nature. Vous avez une intelligence analytique redoutable couplée à une intuition mystique puissante.\n\nVous êtes un chercheur de vérité. Vous ne croyez pas ce qu'on vous dit, vous devez vérifier, analyser, disséquer par vous-même. Vous êtes perfectionniste et exigeant, avec vous-même et avec les autres. Cette exigence peut vous rendre distant, froid ou un peu hautain aux yeux de ceux qui ne vous comprennent pas.\n\nVotre vie intérieure est d'une richesse inouïe, mais vous avez du mal à l'exprimer. Vous gardez vos émotions sous contrôle. Votre défi est d'apprendre à descendre de votre tête vers votre cœur et à partager votre sagesse sans arrogance.",
    love: "C'est le domaine le plus complexe pour vous. Vous avez besoin de connexion intellectuelle et spirituelle avant tout. Un partenaire qui n'a pas de conversation ou de profondeur ne vous intéressera pas deux minutes. Vous avez besoin de beaucoup de solitude et d'indépendance, même en couple.\n\nVous pouvez sembler détaché ou froid, alors que vous ressentez profondément. Il vous faut quelqu'un de patient, qui respecte votre besoin de silence et qui saura décoder vos silences.",
    work: "Chercheur, scientifique, philosophe, analyste, écrivain, psychologue, ou les métiers liés à l'informatique et aux technologies de pointe. Vous avez besoin de travailler seul, de résoudre des énigmes complexes et d'avoir une autonomie intellectuelle.\n\nVous n'êtes pas fait pour le travail physique dur ni pour l'ambiance bruyante du commerce.",
    spiritual: "Votre mission est de faire le lien entre la science et la conscience. Vous êtes ici pour acquérir la sagesse et la transmettre à ceux qui cherchent.",
    keyAdvice: [
      "Ouvrez votre cœur, pas seulement votre esprit.",
      "La solitude est votre force, l'isolement est votre piège.",
      "Acceptez que les autres soient moins rapides ou profonds que vous.",
      "Connectez-vous à la nature pour apaiser votre mental."
    ]
  },
  8: {
    title: "Le Stratège Puissant",
    keywords: ["Pouvoir", "Abondance", "Réalisation", "Justice", "Ambition"],
    desc: "Le 8 est l'énergie de la manifestation matérielle et de la justice. Vous avez la capacité et l'ambition de transformer vos visions en réalités tangibles et prospères.",
    challenge: "Équilibrer le matériel et le spirituel, et gérer son autorité avec sagesse et équité.",
    extendedDesc: "Vous êtes un bâtisseur d'empires. Vous avez l'énergie, l'ambition et la résilience pour atteindre les sommets. L'argent, le succès et le pouvoir ne sont pas des tabous pour vous, ce sont des outils de mesure de votre efficacité et des moyens d'action sur le monde.\n\nVous êtes direct, franc, courageux, parfois brutal. Vous aimez les défis impossibles ; la difficulté vous stimule. Vous avez une vision large et stratégique. Vous ne vous perdez pas dans les détails, vous visez le résultat. Votre sens de la justice est aiguisé, et vous ne supportez pas la déloyauté.\n\nVotre leçon majeure concerne le rapport au pouvoir. Vous pouvez être un leader inspirant ou un tyran écrasant. Vous devez apprendre que la vraie puissance est intérieure (maîtrise de soi) et non extérieure (contrôle des autres). L'équilibre entre vos ambitions matérielles et vos valeurs humaines est la clé de votre réussite.",
    love: "Vous aimez avec intensité, passion et possessivité. Vous cherchez un partenaire fort, qui a du répondant, qui vous admire mais qui vous tient tête. La relation peut être un rapport de force stimulant. Vous êtes protecteur et généreux avec votre clan.\n\nVous pouvez avoir tendance à vouloir tout contrôler, même en amour. Apprenez à lâcher prise et à montrer votre vulnérabilité, c'est là que réside votre vraie force de séduction.",
    work: "Finance, politique, haute administration, entrepreneuriat, sport de haut niveau, chirurgie, immobilier, droit. Partout où il y a du risque, de la responsabilité, de la compétition et de gros enjeux.\n\nVous êtes fait pour commander, organiser, rentabiliser. Vous avez le 'flair' pour les affaires.",
    spiritual: "Votre mission est de maîtriser l'énergie de la matière pour servir l'esprit. Vous êtes ici pour montrer que la spiritualité peut et doit s'incarner dans la réussite concrète.",
    keyAdvice: [
      "Le vrai pouvoir est le service, pas la domination.",
      "L'argent est une énergie, faites-la circuler.",
      "Soyez juste et intègre, le karma du 8 est immédiat.",
      "Accordez-vous du repos, vous n'êtes pas invincible."
    ]
  },
  9: {
    title: "L'Humaniste Universel",
    keywords: ["Compassion", "Altruisme", "Aboutissement", "Voyage", "Sagesse"],
    desc: "Le 9 est le cycle complet, une énergie de fin et de sagesse globale. Vous êtes une vieille âme venue pour donner, guider, guérir et lâcher prise.",
    challenge: "Ne pas se sacrifier, gérer son émotivité et accepter les fins de cycle sans nostalgie.",
    extendedDesc: "Vous avez une vision panoramique de la vie. Les frontières, les préjugés, les limites mesquines vous sont étrangers. Vous portez en vous une part de tous les autres nombres, ce qui vous donne une capacité d'empathie universelle. Vous êtes idéaliste, romantique, généreux jusqu'à l'excès.\n\nVous voulez sauver le monde, guérir la planète, défendre les opprimés. Votre sensibilité est immense, vous absorbez les émotions collectives comme une éponge. Vous êtes souvent attiré par l'étranger, les cultures lointaines, le voyage, car vous vous sentez 'citoyen du monde'.\n\nVotre défi est le détachement. Vous devez apprendre à donner sans attendre de retour, à aimer sans retenir. Vous avez souvent l'impression de donner plus que vous ne recevez, et c'est souvent vrai, car votre mission est celle du don. Attention à ne pas fuir la réalité quotidienne dans des rêves utopiques.",
    love: "Vous aimez l'Amour avec un grand A. Vous pouvez être amoureux de l'humanité entière et oublier la personne en face de vous. Vous cherchez une communion d'âmes, un idéal romanesque élevé. Vous êtes capable de grands sacrifices par amour.\n\nVous avez besoin d'un partenaire qui partage vos idéaux, votre ouverture d'esprit et qui ne vous enfermera pas dans une vie petite-bourgeoise étriquée.",
    work: "Humanitaire, relations internationales, art, enseignement supérieur, écologie, philosophie, droit international. Vous avez besoin d'une vocation, pas d'un métier alimentaire.\n\nL'argent ne doit être qu'un moyen de servir votre cause. Vous réussissez souvent quand vous ne cherchez pas le profit personnel mais le bien collectif.",
    spiritual: "Votre mission est l'amour inconditionnel et le lâcher-prise. Vous êtes ici pour clore un cycle karmique majeur et montrer la voie de la compassion.",
    keyAdvice: [
      "Donnez sans attendre de retour, c'est la clé de votre abondance.",
      "Ancrez vos idéaux dans des actions concrètes.",
      "Protégez-vous des émotions négatives des autres.",
      "Acceptez que tout a une fin, c'est le prélude au renouveau."
    ]
  },
  11: {
    title: "Le Visionnaire Inspiré",
    keywords: ["Inspiration", "Intuition", "Tension", "Idéalisme", "Guide"],
    desc: "Le 11 est un maître nombre, une antenne vers le ciel. Vous captez des idées novatrices et avez une mission d'éveilleur de conscience et de guide.",
    challenge: "Gérer sa haute tension nerveuse et ancrer ses visions grandioses dans la réalité matérielle.",
    extendedDesc: "Vous vibrez sur une fréquence supérieure. Vous captez des informations, des ambiances et des idées que les autres ne voient pas. Vous êtes un canal, un pont entre le visible et l'invisible. Cette haute tension électrique vous rend nerveux, impatient, parfois survolté. Vous avez un rôle de guide spirituel, d'inspirateur ou de révélateur.\n\nVous ne pouvez pas vous contenter d'une vie banale ; vous devez transmettre un message, une vision. Vous avez une autorité naturelle qui ne vient pas de la force mais de votre charisme et de votre intelligence supérieure. Cependant, cette énergie est difficile à maîtriser. Si vous ne la canalisez pas dans une œuvre concrète, elle peut se retourner contre vous sous forme d'anxiété ou de troubles nerveux.\n\nVous alternez souvent entre des moments d'illumination géniale et des moments de doute profond. Votre force réside dans votre foi en vos intuitions.",
    love: "Votre vie sentimentale est souvent complexe car vous cherchez une fusion spirituelle totale. Vous idéalisez l'autre, ce qui mène inévitablement à des déceptions. Vous avez besoin d'un partenaire qui vous comprend, qui vous apaise, qui vous ancre sans couper vos ailes.\n\nLa relation doit avoir un sens élevé, une mission commune. La banalité du quotidien peut tuer votre couple si vous n'y mettez pas de magie.",
    work: "Coach, thérapeute, artiste avant-gardiste, inventeur, médium, leader spirituel, politique visionnaire. Tout ce qui permet d'élever la conscience collective ou d'innover.\n\nVous n'êtes pas fait pour les tâches répétitives. Vous devez être à l'avant-garde, là où on défriche les nouveaux territoires de la pensée.",
    spiritual: "Votre mission est d'éclairer les autres. Vous êtes un phare. Votre simple présence doit inspirer et élever ceux qui vous entourent.",
    keyAdvice: [
      "Pratiquez la méditation pour calmer votre mental surchauffé.",
      "Faites confiance à votre première intuition, elle est toujours juste.",
      "Ancrez-vous : sport, nature, travaux manuels sont indispensables.",
      "Ne vous isolez pas, votre lumière doit être vue."
    ]
  },
  22: {
    title: "Le Grand Bâtisseur",
    keywords: ["Génie", "Construction", "Impact", "Pragmatisme", "Puissance"],
    desc: "Le 22 est le 'Maître d'Œuvre', le 4 spiritualisé. Vous avez la vision du 11 et la méthode du 4, capable de réaliser des projets d'envergure qui changent le monde.",
    challenge: "Ne pas être écrasé par l'ampleur de sa propre ambition et mettre son ego au service du bien commun.",
    extendedDesc: "C'est le nombre le plus puissant de la numérologie dans la matière. Vous avez le potentiel de laisser une trace indélébile dans l'histoire. Vous voyez grand, très grand, et contrairement au 11 qui reste parfois dans l'idée, vous avez les pieds sur terre pour réaliser vos visions. Vous êtes un visionnaire pragmatique.\n\nVous êtes capable de gérer des projets complexes, internationaux, qui impliquent beaucoup de gens et d'argent. Mais cette puissance est lourde à porter. Vous pouvez ressentir une pression énorme, comme si vous aviez une dette envers l'humanité. Si vous ne canalisez pas cette énergie au service d'une cause collective, elle peut se transformer en mégalomanie ou en destruction.\n\nVous êtes fait pour construire des structures qui vous survivront : hôpitaux, mouvements internationaux, grandes entreprises, œuvres architecturales.",
    love: "Vous cherchez un partenaire solide, capable de supporter votre intensité et votre emploi du temps de ministre. Vous avez besoin de construire un empire ensemble. Votre partenaire doit être votre allié, votre roc, celui ou celle qui gère l'intendance pendant que vous changez le monde.\n\nVous pouvez être difficile à vivre car vous êtes obsédé par votre mission. N'oubliez pas que l'amour est aussi une construction qui demande du temps.",
    work: "Architecte de grands projets, chef d'État, industriel, fondateur d'organisations mondiales, urbaniste. Vous êtes fait pour gérer la complexité à grande échelle et sur le long terme.\n\nLes petits projets ne vous intéressent pas. Vous avez besoin de sentir que votre action a un impact réel sur la société.",
    spiritual: "Votre mission est de matérialiser le divin. Vous êtes ici pour construire le 'Nouveau Monde' de manière concrète.",
    keyAdvice: [
      "Voyez grand, ne vous limitez jamais.",
      "Restez humble face à votre propre puissance.",
      "Déléguez, vous ne pouvez pas tout faire seul.",
      "Assurez-vous que vos actions servent le collectif."
    ]
  },
  33: {
    title: "Le Guide Bienveillant",
    keywords: ["Amour Universel", "Sacrifice", "Guérison", "Compassion", "Guide"],
    desc: "Le 33 est l'octave supérieure du 6, l'énergie christique. Vous êtes un enseignant et un guérisseur d'âmes, totalement dévoué à l'amour inconditionnel.",
    challenge: "Garder les pieds sur terre, ne pas porter toute la misère du monde et éviter le piège du martyr.",
    extendedDesc: "C'est la vibration la plus haute et la plus rare. Elle est souvent vécue comme un 6 (responsabilité familiale) car elle est difficile à assumer pleinement. Vous êtes un phare dans la nuit. Votre seule présence apaise et guérit. Vous êtes totalement dévoué au service des autres, parfois jusqu'au sacrifice de vos propres besoins.\n\nVous avez une sagesse innée, une compréhension immédiate de la souffrance humaine et une capacité d'amour infinie. Vous ne jugez personne. Vous êtes là pour montrer que l'Amour est la seule force qui compte. Mais attention, cette hypersensibilité peut vous détruire si vous ne mettez pas de barrières. Vous n'êtes pas là pour sauver ceux qui ne veulent pas l'être.\n\nVotre parole est d'or, votre écoute est un baume. Vous avez souvent des dons de guérison ou de médiumnité très purs.",
    love: "Vous aimez sans condition, avec une pureté et une intensité rares. Mais attention à ne pas attirer des partenaires blessés, toxiques ou dépendants qui cherchent un sauveur plutôt qu'un amoureux. Vous devez apprendre à recevoir autant que vous donnez.\n\nVotre foyer doit être un havre de paix absolue, ouvert à tous, mais où vous pouvez vous ressourcer.",
    work: "Grand thérapeute, guide spirituel, médecin sans frontières, leader d'opinion éthique, artiste inspiré. Votre travail doit être une mission d'âme. Vous ne travaillez pas pour l'argent mais pour l'idéal.\n\nVous êtes souvent appelé à des responsabilités qui vous dépassent mais que vous assumez par devoir.",
    spiritual: "Votre mission est d'incarner l'Amour Divin sur Terre. Vous êtes un maître enseignant, par l'exemple plus que par les mots.",
    keyAdvice: [
      "Protégez votre cœur, c'est votre trésor.",
      "Ne prenez pas la souffrance des autres sur vous.",
      "Riez, la joie est la plus haute spiritualité.",
      "Acceptez d'être humain, avec vos limites."
    ]
  }
};

export const getNumberArchetype = (num: number): NumberArchetype => {
  return archetypes[num as keyof typeof archetypes] || archetypes[1];
};

export const getLifePathContent = (num: number) => {
  const arch = getNumberArchetype(num);
  const plan = LIFE_PATH_DEFINITIONS[num] || LIFE_PATH_DEFINITIONS[1];
  
  return {
    ...arch,
    desc: plan.desc,
    keywords: plan.keywords,
    // OVERRIDE extendedDesc to avoid duplication
    extendedDesc: `${plan.desc}\n\nEn tant que Chemin de Vie, cette énergie définit votre trajectoire globale. ${arch.extendedDesc.split('\n')[0]}`,
    
    // Unique content for Part4Focus based on Plan Matrix
    love: `Votre Tendance Amoureuse : ${plan.desc} En couple, votre parcours vous demandera d'intégrer l'énergie de ${plan.keywords[0]} et de ${plan.keywords[1]}.`,
    work: `Votre Tendance Professionnelle : ${plan.desc} Votre carrière sera une montée progressive vers ${plan.keywords[2] || plan.keywords[0]} et ${plan.keywords[3] || plan.keywords[1]}.`,
    spiritual: `Votre Tendance Spirituelle : ${plan.desc} Votre âme a choisi cette route pour expérimenter ${plan.keywords[0]} dans la matière.`,
    
    mission: `Votre mission d'incarnation est sous la vibration du ${num}. ${plan.desc}`,
    positive: `En lumière, vous manifestez : ${plan.keywords.join(', ')}.`,
    negative: `En ombre, attention à l'excès inverse. ${arch.challenge}`
  };
};

export const getDayOfBirthContent = (day: number) => {
  let reduced = day;
  while (reduced > 9 && reduced !== 11 && reduced !== 22) {
    reduced = Array.from(String(reduced), Number).reduce((a, b) => a + b, 0);
  }
  const arch = getNumberArchetype(reduced);
  
  return {
    ...arch,
    title: `Né(e) le ${day}`,
    desc: `Le jour de naissance est un indicateur de talent inné. Le ${day} s'exprime directement par la vibration du ${reduced}. C'est un outil que vous utilisez instinctivement : ${arch.keywords[0]} et ${arch.keywords[1]}.`,
    // OVERRIDE extendedDesc
    extendedDesc: `Votre jour de naissance (${day}) vous dote d'une capacité naturelle : ${arch.keywords[0]}. C'est un outil que vous n'avez pas besoin d'apprendre, il est inné. ${arch.desc}`
  };
};

export const getExpressionContent = (num: number) => {
  const arch = getNumberArchetype(num);
  const plan = EXPRESSION_DEFINITIONS[num] || EXPRESSION_DEFINITIONS[1];

  return {
    ...arch,
    desc: plan.desc,
    keywords: plan.keywords,
    // OVERRIDE extendedDesc to avoid duplication with Life Path or Soul Urge
    extendedDesc: `${plan.desc}\n\nDans le monde social et professionnel, vous agissez principalement par ${plan.keywords[0]} et ${plan.keywords[1]}. C'est votre "costume" public et votre méthode d'action privilégiée.`,

    // Unique content for Part4Focus based on Plan Matrix
    love: `Votre Mode d'Action en Amour : ${plan.desc} Vous séduisez et interagissez par ${plan.keywords[0]} et ${plan.keywords[1]}.`,
    work: `Votre Mode d'Action au Travail : ${plan.desc} Socialement, vous vous positionnez par ${plan.keywords[0]} et ${plan.keywords[2] || plan.keywords[1]}.`,
    spiritual: `Votre Mode d'Expression Spirituelle : ${plan.desc} Vous témoignez de vos valeurs par ${plan.keywords[0]}.`,

    title: `Expression ${num} : ${arch.title}`,
  };
};

export const getSoulUrgeContent = (num: number) => {
  const arch = getNumberArchetype(num);
  const plan = SOUL_URGE_DEFINITIONS[num] || SOUL_URGE_DEFINITIONS[1];

  return {
    ...arch,
    desc: plan.desc,
    keywords: plan.keywords,
    // OVERRIDE extendedDesc to avoid duplication
    extendedDesc: `[Désir d'Absolu] Au plus profond de vous, c'est ce qui vous motive réellement. Même si vous ne le montrez pas toujours, votre cœur a besoin de ${plan.keywords[0]} pour se sentir vivant.`,

    // Unique content for Part4Focus based on Plan Matrix
    love: `[Attentes Relationnelles] Vos Motivations Profondes en Amour : Votre cœur ne vibrera que s'il ressent ${plan.keywords[0]} et ${plan.keywords[1]}.`,
    work: `[Sens de l'Utilité] Vos Motivations Profondes au Travail : Pour vous épanouir, vous avez besoin de sentir ${plan.keywords[0]} et ${plan.keywords[2] || plan.keywords[1]}.`,
    spiritual: `[Quête de Sens] Vos Aspirations d'Âme : Votre quête intérieure est celle de ${plan.keywords[0]}.`,

    title: `Élan Spirituel ${num}`,
  };
};

export const getPersonalityContent = (num: number) => {
  const arch = getNumberArchetype(num);
  const plan = PERSONALITY_DEFINITIONS[num] || PERSONALITY_DEFINITIONS[1];

  return {
    ...arch,
    desc: plan.desc,
    keywords: plan.keywords,
    // OVERRIDE extendedDesc
    extendedDesc: `${plan.desc}\n\nCette image correspond à votre manière spontanée d'entrer en relation avec le monde, avant même toute interaction approfondie.`,

    // Unique content for Part4Focus based on Plan Matrix
    love: `Votre Image en Amour : ${plan.desc} Vous séduisez par une apparence de ${plan.keywords[0]} et ${plan.keywords[1]}.`,
    work: `Votre Image Professionnelle : ${plan.desc} On vous perçoit comme quelqu'un de ${plan.keywords[0]} et ${plan.keywords[2] || plan.keywords[1]}.`,
    spiritual: `Votre Rayonnement : ${plan.desc} Vous émanez ${plan.keywords[0]}.`,

    title: `Image Sociale ${num}`,
  };
};

export interface BridgeContent {
  title: string;
  desc: string;
  symptoms: string;
  action: string;
  mantra: string;
}

export const getBridgeContent = (num: number): BridgeContent => {
  const arch = getNumberArchetype(num);
  return {
    title: `Le Pont ${num}`,
    desc: `Le Pont ${num} est la solution pour aligner votre Chemin de Vie et votre Expression.`,
    symptoms: `Vous avez besoin de ce pont si vous ressentez un décalage entre vos aspirations profondes et votre réalité quotidienne, ou si vous avez l'impression de "tourner en rond" sans avancer.`,
    action: `Pour activer ce pont, incarnez l'énergie du ${num} : ${arch.keywords[0]} et ${arch.keywords[1]}. ${arch.keyAdvice[0]}`,
    mantra: `Mantra : "J'active en moi la force du ${num} pour unir mon être."`
  };
};

export const getCycleContent = (num: number) => {
  const arch = getNumberArchetype(num);
  return {
    title: `Cycle en vibration ${num}`,
    desc: `Ce cycle vous invite à développer l'énergie du ${num}. C'est une période propice pour : ${arch.keywords.join(', ')}.`,
    detailed: `Durant cette phase de votre vie, l'univers vous demande d'incarner les qualités du ${num}. ${arch.extendedDesc.split('\n')[0]}` // First paragraph of extended desc
  };
};

export const getPersonalYearContent = (num: number) => {
  const texts: Record<number, string> = {
    1: "C'est l'année du commencement. Tout est neuf. C'est le moment de planter, d'oser, de démarrer des projets. L'énergie est masculine et rapide.\n\nC'est une période d'indépendance et d'initiative. Ne comptez que sur vous-même. Les décisions prises cette année influenceront les 9 prochaines années. Osez sortir de votre zone de confort. C'est le moment de dire 'J'existe' et de lancer ce projet qui vous tient à cœur.",
    2: "Une année de patience et de collaboration. Les graines plantées en année 1 germent sous terre. Il faut arroser, attendre, et nouer des alliances.\n\nCe n'est pas le moment de forcer les choses, mais de laisser venir. L'intuition est forte. Les relations, le couple et les partenariats sont au premier plan. Soyez diplomate et à l'écoute. Si des retards surviennent, c'est pour vous permettre d'affiner vos plans.",
    3: "L'année de l'éclosion. Les premières pousses sortent. C'est un temps pour socialiser, créer, s'exprimer. L'énergie est légère et joyeuse.\n\nSortez, voyez du monde, amusez-vous ! C'est une année favorable à la communication, aux arts et aux rencontres. L'optimisme est de rigueur. Attention cependant à la dispersion et aux dépenses impulsives. Profitez de la vie, elle vous sourit.",
    4: "L'année du labeur. Il faut tuteurer les plantes, désherber. C'est le moment de travailler dur, de structurer, de consolider ses bases.\n\nCe n'est pas l'année la plus fun, mais c'est la plus constructive. Mettez de l'ordre dans vos papiers, votre maison, votre santé. La rigueur et la discipline paieront. Ne prenez pas de risques inutiles. Construisez du solide pour l'avenir.",
    5: "L'année de la liberté. La plante grandit vite. Changements, voyages, imprévus. C'est le milieu du cycle, on respire un grand coup.\n\nAttendez-vous à l'inattendu ! Déménagement, changement de travail, rupture ou nouvelle rencontre... Tout bouge. Soyez adaptable et curieux. C'est le moment de voyager, de découvrir de nouveaux horizons et de briser la routine. La liberté est le mot clé.",
    6: "L'année de la responsabilité. La plante fait des fleurs. On s'occupe de la famille, de la maison, de l'harmonie. On fait des choix de cœur.\n\nLe foyer, la famille et les responsabilités affectives sont au centre. C'est une année propice au mariage, à l'immobilier, à la décoration ou à l'arrivée d'un enfant. Vous aurez envie de cocooning et d'harmonie. Prenez soin de ceux que vous aimez.",
    7: "L'année de la réflexion. On observe la plante. Pause, introspection, analyse. On se pose les grandes questions. Le calme avant la récolte.\n\nUn temps de solitude nécessaire. Prenez du recul sur votre vie. C'est une année spirituelle et intellectuelle, pas matérielle. Ne forcez pas l'action extérieure. Étudiez, méditez, reposez-vous. C'est le moment de faire le point pour mieux repartir.",
    8: "L'année de la récolte. Les fruits sont mûrs. Succès matériel, pouvoir, argent, mais aussi justice karmique. On récolte ce qu'on a semé.\n\nC'est l'année de la réalisation concrète. Si vous avez bien travaillé, le succès et l'argent seront au rendez-vous. C'est le moment d'être ambitieux et de gérer vos affaires avec autorité. Attention cependant à rester juste et éthique.",
    9: "L'année du bilan. On coupe les branches mortes. C'est la fin du cycle. On nettoie, on pardonne, on se prépare au prochain 1.\n\nIl faut finir ce qui doit l'être. Débarrassez-vous de ce qui vous encombre (objets, relations, vieilles habitudes). C'est une année de nettoyage et de lâcher-prise. Ne commencez rien de nouveau, préparez le terrain pour le futur cycle. Soyez généreux et tourné vers les autres."
  };
  return texts[num] || "Une année de transition importante.";
};

export const getKarmicLessonContent = (num: number) => {
  const data = INCLUSION_INTERPRETATIONS.missing[num as keyof typeof INCLUSION_INTERPRETATIONS.missing];
  if (data) {
    return {
      title: `Leçon Karmique ${num} : ${data.title}`,
      desc: `Le nombre ${num} est absent de votre grille. C'est une énergie que vous êtes venu(e) découvrir.`,
      lesson: data.description,
      advice: data.advice
    };
  }
  
  // Fallback to generic archetype if no specific data
  const arch = getNumberArchetype(num);
  return {
    title: `Dette Karmique ${num}`,
    desc: `Le nombre ${num} est manquant.`,
    lesson: `Vous devez apprendre à maîtriser l'énergie de ${arch.keywords[0]}. ${arch.challenge}`,
    advice: arch.keyAdvice[0]
  };
};

export const getExcessNumberContent = (num: number) => {
  const data = INCLUSION_INTERPRETATIONS.excess[num as keyof typeof INCLUSION_INTERPRETATIONS.excess];
  if (data) {
    const arch = getNumberArchetype(num);
    return {
      title: `Force Innée ${num}`,
      desc: data,
      potential: `C'est un atout majeur. Vous possédez naturellement les qualités de ${arch.keywords[0]} et ${arch.keywords[1]}.`,
      warning: `Attention toutefois à ne pas basculer dans l'excès inverse.`
    };
  }

  // Fallback
  const arch = getNumberArchetype(num);
  return {
    title: `Excès du Nombre ${num}`,
    desc: `Le nombre ${num} est très présent. C'est un super-talent inné.`,
    potential: `Cette énergie est votre moteur. ${arch.desc}`,
    warning: `Attention à l'excès : ${arch.challenge}`
  };
};

export const getBalancedNumberContent = (num: number) => {
  const arch = getNumberArchetype(num);
  return {
    title: `Équilibre du Nombre ${num}`,
    desc: `Vous maîtrisez bien l'énergie du ${num}. Elle circule de manière fluide en vous.`,
    meaning: `Cela signifie que vous savez faire preuve de ${arch.keywords[0].toLowerCase()} et de ${arch.keywords[1].toLowerCase()} au bon moment, sans excès ni manque.`,
    benefit: `C'est une zone de stabilité dans votre vie. Vous pouvez vous appuyer sur cette qualité : "${arch.desc}"`
  };
};
