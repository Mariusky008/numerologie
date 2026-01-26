
export interface KarmicDebtDefinition {
  title: string;
  subtitle: string;
  desc: string;
  challenge: string;
  advice: string;
}

export const KARMIC_DEBT_DEFINITIONS: Record<number, KarmicDebtDefinition> = {
  13: {
    title: "Dette Karmique 13",
    subtitle: "La Transformation par le Travail",
    desc: "Le 13 indique une vie antérieure marquée par la paresse, la négligence ou le refus de l'effort. Dans cette vie, vous pouvez avoir l'impression de travailler plus dur que les autres pour obtenir le même résultat. Les obstacles semblent se multiplier pour tester votre persévérance.",
    challenge: "Apprendre la discipline, l'ordre et le travail rigoureux sans se plaindre ni chercher de raccourcis.",
    advice: "Ne baissez pas les bras face aux difficultés. La clé est la concentration et l'effort soutenu. Transformez le 'poids' du travail en une structure solide pour votre vie."
  },
  14: {
    title: "Dette Karmique 14",
    subtitle: "La Maîtrise de la Liberté",
    desc: "Le 14 signale un abus de liberté ou de plaisirs sensoriels dans une vie passée (excès, instabilité, fuite des responsabilités). Aujourd'hui, vous pouvez être confronté à une instabilité chronique ou à une difficulté à vous fixer.",
    challenge: "Apprendre la modération, la tempérance et l'engagement. Gérer le changement sans tomber dans le chaos.",
    advice: "Évitez les excès (nourriture, alcool, sexe, dépenses). Cherchez la stabilité émotionnelle et tenez vos engagements. La vraie liberté se trouve dans la maîtrise de soi, pas dans la fuite."
  },
  16: {
    title: "Dette Karmique 16",
    subtitle: "L'Éveil par l'Effondrement",
    desc: "Le 16 est souvent lié à des amours illicites ou à de l'orgueil intellectuel/social dans le passé. Il indique une tendance à l'ego qui doit être brisée. Vous pouvez vivre des 'effondrements' soudains (ruptures, pertes) qui visent à détruire ce qui est faux en vous.",
    challenge: "Accepter que l'ego soit blessé pour laisser émerger l'humilité et l'amour authentique.",
    advice: "Ne vous accrochez pas aux apparences ou au statut social. Acceptez les changements brutaux comme des opportunités de reconstruction sur des bases plus saines et spirituelles. Cultivez la fidélité et l'humilité."
  },
  19: {
    title: "Dette Karmique 19",
    subtitle: "L'Apprentissage de l'Autre",
    desc: "Le 19 indique un abus de pouvoir ou un égoïsme forcené dans une vie antérieure. Vous avez peut-être refusé d'aider ou pris sans donner. Aujourd'hui, vous pouvez vous sentir seul face à vos problèmes ou avoir du mal à demander de l'aide.",
    challenge: "Apprendre à s'ouvrir aux autres, à accepter de l'aide et à donner sans attendre de retour.",
    advice: "Sortez de votre tour d'ivoire. Intéressez-vous réellement aux autres. Comprenez que nous sommes tous interdépendants. L'indépendance ne doit pas être de l'isolement."
  }
};
