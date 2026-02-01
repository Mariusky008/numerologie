import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface EmailMiroirIntegralProps {
  firstName: string;
  reportLink: string;
  coachLink: string;
}

export const EmailMiroirIntegral = ({
  firstName,
  reportLink,
  coachLink,
}: EmailMiroirIntegralProps) => (
  <Html>
    <Head />
    <Preview>Votre Miroir Intégral est prêt ✨</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Votre Révélation est là ✨</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          L'analyse de votre fonctionnement est terminée. Voici votre accès complet au Miroir Intégral.
        </Text>
        
        <Section style={highlightBox}>
          <Heading as="h3" style={h3}>1. Votre Dossier PDF (~40 pages)</Heading>
          <Text style={text}>
            Numérologie, astrologie et analyse comportementale fusionnées dans une lecture structurée.
          </Text>
          <Button style={button} href={reportLink}>
            📄 Accéder à mon Rapport
          </Button>
        </Section>

        <Section style={box}>
          <Heading as="h3" style={h3}>2. Votre Oracle Vocal</Heading>
          <Text style={text}>
            Posez toutes vos questions à l'Oracle pour explorer vos blocages et vos potentiels.
          </Text>
          <Button style={secondaryButton} href={coachLink}>
            🎙️ Parler à l'Oracle
          </Button>
        </Section>

        <Section style={box}>
          <Heading as="h3" style={h3}>🧭 Plan d’Action “Réalignement”</Heading>
          <Text style={text}>
            Retrouvez votre protocole de 7 jours à la fin de votre dossier PDF pour commencer à réduire l'écart entre votre potentiel et votre fonctionnement actuel.
          </Text>
        </Section>

        <Text style={footer}>
          L'équipe Votre Légende.<br/>
          Pensez à vérifier vos spams pour nos futurs messages.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailConfirmationProps {
  firstName: string;
}

export const EmailConfirmation = ({ firstName }: EmailConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Votre commande est bien reçue !</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Préparation en cours...</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Nous avons bien reçu votre commande pour le Pack Révélation.
        </Text>
        <Section style={box}>
          <Heading as="h3" style={h3}>⏳ Prochaine étape</Heading>
          <Text style={text}>
            Votre guide numérologue enregistre actuellement votre vidéo personnalisée. 
            Cela demande un peu de concentration et de temps.
          </Text>
          <Text style={text}>
            Vous recevrez un email complet d'ici quelques heures (maximum 24h) contenant :
            <ul>
              <li>Votre Vidéo Avatar</li>
              <li>Votre Dossier PDF</li>
              <li>Votre accès au Coach Vocal</li>
            </ul>
          </Text>
        </Section>
        <Text style={footer}>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailDeliverablesProps {
  firstName: string;
  videoLink: string;
  reportLink: string;
  coachLink: string;
  bookLink?: string; // New optional prop for the Book PDF
}

export const EmailDeliverables = ({
  firstName,
  videoLink,
  reportLink,
  coachLink,
  bookLink,
}: EmailDeliverablesProps) => (
  <Html>
    <Head />
    <Preview>Votre Pack Révélation est prêt !</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Votre Révélation est là ✨</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Votre guide a terminé son analyse. Voici votre accès complet à votre destinée.
        </Text>
        
        {/* 1. VIDEO (Highlight) */}
        <Section style={highlightBox}>
          <Heading as="h3" style={h3}>1. Votre Vidéo Personnelle</Heading>
          <Text style={text}>
            Regardez d'abord ceci. Votre avatar vous explique tout.
          </Text>
          <Button style={button} href={videoLink}>
            ▶️ Regarder ma Vidéo (5 min)
          </Button>
        </Section>

        {/* 2. REPORT */}
        <Section style={box}>
          <Heading as="h3" style={h3}>2. Votre Dossier PDF</Heading>
          <Text style={text}>
            Tous les détails techniques et votre météo astrale.
          </Text>
          <Button style={secondaryButton} href={reportLink}>
            📄 Télécharger mon Dossier
          </Button>
        </Section>

        {/* 3. COACH */}
        <Section style={box}>
          <Heading as="h3" style={h3}>3. Votre Oracle Vocal</Heading>
          <Text style={text}>
            Une question après la vidéo ? Posez-la à l'Oracle.
          </Text>
          <Button style={secondaryButton} href={coachLink}>
            🎙️ Parler à l'Oracle
          </Button>
        </Section>

        {/* 4. BOOK (Optional) */}
        {bookLink && (
          <Section style={highlightBox}>
            <Heading as="h3" style={h3}>4. Votre Roman de Vie</Heading>
            <Text style={text}>
              Vous avez choisi l'option Roman. Voici votre biographie romancée unique.
            </Text>
            <Button style={button} href={bookLink}>
              📖 Lire mon Roman (PDF)
            </Button>
          </Section>
        )}

        {/* P.S. UPSELL EXPERT */}
        <Section style={{ marginTop: '30px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
          <Text style={{ ...text, fontSize: '14px', fontStyle: 'italic', color: '#6b7280' }}>
            P.S. Si vous traversez une période particulièrement complexe et que vous souhaitez en parler de vive voix, Marie, notre experte astrologue, a ouvert quelques créneaux cette semaine.
          </Text>
          <Link href="https://votrelegende.fr/expert-booking" style={{ color: '#C9A24D', fontSize: '14px', fontWeight: 'bold', textDecoration: 'underline' }}>
            👉 Réserver ma consultation privée avec Marie
          </Link>
        </Section>

        <Text style={footer}>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailUpsellBookProps {
  firstName: string;
  upgradeLink: string; // Ce lien contiendra l'ID de la commande: https://votrelegende.fr/upgrade-book?orderId=...
}

export const EmailUpsellBook = ({
  firstName,
  upgradeLink,
}: EmailUpsellBookProps) => (
  <Html>
    <Head />
    <Preview>Une dernière chose pour compléter votre légende...</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Merci pour votre confiance 🙏</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          J'espère que vous avez apprécié la découverte de votre vidéo et de votre rapport numérologique.
        </Text>
        <Text style={text}>
          Beaucoup de nos membres nous demandent s'il est possible d'aller plus loin et de transformer ces données brutes en une véritable histoire.
        </Text>
        
        <Section style={box}>
          <Heading as="h3" style={h3}>📖 Et si votre vie était un roman ?</Heading>
          <Text style={text}>
            Nous pouvons générer pour vous "Le Roman de Votre Vie".
          </Text>
          <Text style={text}>
            Une biographie romancée de 100 pages, entièrement basée sur votre numérologie, où vous êtes le héros.
          </Text>
          <ul style={{ paddingLeft: '20px', margin: '10px 0', color: '#57534e' }}>
            <li>Un récit initiatique captivant</li>
            <li>Vos défis transformés en quêtes épiques</li>
            <li>Une lecture thérapeutique et inspirante</li>
          </ul>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button style={button} href={upgradeLink}>
              Découvrir le Roman de Vie
            </Button>
          </div>
        </Section>

        <Text style={footer}>
          Cette offre est réservée aux membres ayant déjà réalisé leur thème.<br/>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailReportProps {
  firstName: string;
  downloadLink: string;
  isPaper: boolean;
}

export const EmailReport = ({
  firstName,
  downloadLink,
  isPaper,
}: EmailReportProps) => (
  <Html>
    <Head />
    <Preview>Votre Dossier Numérologique est prêt !</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Votre Destinée Révélée</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Merci pour votre confiance. Votre analyse numérologique complète est prête.
          Vous y découvrirez les clés de votre chemin de vie, vos défis karmiques et vos opportunités futures.
        </Text>
        
        <Section style={btnContainer}>
          <Button style={button} href={downloadLink}>
            Télécharger mon Rapport PDF
          </Button>
        </Section>

        {isPaper && (
          <Section style={paperBox}>
            <Text style={paperTitle}>📦 Version Papier</Text>
            <Text style={paperText}>
              Nous préparons également votre version imprimée de luxe. 
              Elle sera expédiée à votre adresse postale dans les 48h.
            </Text>
          </Section>
        )}

        <Hr style={hr} />
        
        <Text style={footer}>
          Si vous avez la moindre question, n'hésitez pas à répondre à cet email.<br/>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailBundleProps {
  firstName: string;
  writeLink: string;
  downloadLink: string;
  isPaper: boolean;
}

export const EmailBundle = ({
  firstName,
  writeLink,
  downloadLink,
  isPaper,
}: EmailBundleProps) => (
  <Html>
    <Head />
    <Preview>Votre légende est en cours d'écriture...</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>L'aventure commence !</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Félicitations pour votre commande. Votre Dossier Numérologique Complet est disponible dès maintenant.
        </Text>

        <Section style={box}>
          <Heading as="h3" style={h3}>1. Votre Dossier Technique</Heading>
          <Text style={text}>
            Téléchargez votre analyse détaillée pour commencer à explorer vos nombres.
          </Text>
          <Button style={secondaryButton} href={downloadLink}>
            Télécharger le Dossier PDF
          </Button>
        </Section>

        <Section style={highlightBox}>
          <Heading as="h3" style={h3}>2. Votre Roman de Vie</Heading>
          <Text style={text}>
            Merci d'avoir complété vos informations. Notre Intelligence Artificielle a commencé la rédaction de votre ouvrage unique.
          </Text>
          <Text style={text}>
            <strong>📅 Délais de réception :</strong>
            <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
              <li><strong>Version PDF :</strong> Sous 3 jours maximum par email.</li>
              {isPaper && (
                <li><strong>Version Papier :</strong> Sous 10 à 15 jours ouvrés à votre domicile.</li>
              )}
            </ul>
          </Text>
        </Section>

        {isPaper && (
          <Section style={paperBox}>
            <Text style={paperTitle}>📦 Livraison Suivie</Text>
            <Text style={paperText}>
              Nous vous enverrons un nouvel email avec le numéro de suivi dès que votre livre quittera notre atelier d'impression.
            </Text>
          </Section>
        )}

        <Hr style={hr} />
        
        <Text style={footer}>
          L'équipe Votre Légende reste à votre disposition.<br/>
          Merci pour votre confiance.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailVideoProps {
  firstName: string;
  downloadLink: string;
  coachLink: string;
}

export const EmailVideo = ({
  firstName,
  downloadLink,
  coachLink,
}: EmailVideoProps) => (
  <Html>
    <Head />
    <Preview>Votre vidéo personnalisée est arrivée !</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Un message pour vous</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Votre guide personnel a enregistré un message vidéo spécialement pour vous, basé sur votre thème numérologique.
        </Text>
        
        <Section style={highlightBox}>
          <Heading as="h3" style={h3}>🎥 Votre Vidéo Personnelle</Heading>
          <Text style={text}>
            Cliquez ci-dessous pour visionner votre analyse vidéo de 5 minutes.
          </Text>
          <Button style={button} href={downloadLink}>
            Regarder ma Vidéo
          </Button>
        </Section>

        <Section style={box}>
          <Heading as="h3" style={h3}>💬 Votre Coach Interactif (Offert)</Heading>
          <Text style={text}>
            Vous avez une question sur votre thème ? Discutez directement avec votre guide numérologue via notre interface de chat sécurisée.
          </Text>
          <Button style={secondaryButton} href={coachLink}>
            Accéder à mon Coach (30 min)
          </Button>
        </Section>

        <Text style={footer}>
          Lien valable 7 jours. Pensez à télécharger la vidéo si vous souhaitez la conserver.<br/>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailExpertFollowUpProps {
  firstName: string;
  bookingLink: string;
}

export const EmailExpertFollowUp = ({
  firstName,
  bookingLink,
}: EmailExpertFollowUpProps) => (
  <Html>
    <Head />
    <Preview>Besoin d'éclaircir un point précis ?</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Parlez à un Expert 🔮</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Cela fait maintenant quelques jours que vous avez reçu votre analyse numérologique. J'espère que ces révélations vous aident à y voir plus clair.
        </Text>
        <Text style={text}>
          Cependant, nous savons que certaines situations (amoureuses, professionnelles ou familiales) sont parfois trop complexes pour être résolues par un simple rapport écrit.
        </Text>
        
        <Section style={highlightBox}>
          <Heading as="h3" style={h3}>📞 Une voix pour vous guider</Heading>
          <Text style={text}>
            Parfois, on a juste besoin de parler à quelqu'un qui "voit" ce que les autres ne voient pas.
          </Text>
          <Text style={text}>
            Nous avons sélectionné pour vous des experts certifiés (Numérologues, Tarologues, Voyants) disponibles immédiatement pour une consultation privée.
          </Text>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button style={button} href={bookingLink}>
              Voir les experts disponibles
            </Button>
          </div>
        </Section>

        <Section style={box}>
          <Heading as="h3" style={h3}>Pourquoi consulter ?</Heading>
          <ul style={{ paddingLeft: '20px', margin: '10px 0', color: '#57534e' }}>
            <li>Obtenir une réponse immédiate (Oui/Non)</li>
            <li>Débloquer une situation amoureuse stagnante</li>
            <li>Valider un choix professionnel important</li>
          </ul>
        </Section>

        <Text style={footer}>
          Service partenaire certifié. Satisfait ou remboursé.<br/>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailRomanOfferProps {
  firstName: string;
  romanLink: string;
}

export const EmailRomanOffer = ({
  firstName,
  romanLink,
}: EmailRomanOfferProps) => (
  <Html>
    <Head />
    <Preview>Et si votre vie était un roman ? 📖</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Le Roman de Votre Vie 📖</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Il y a quelques jours, le <strong>Miroir Intégral</strong> vous a permis de mieux comprendre votre fonctionnement, vos tensions, et les grandes lignes de votre trajectoire.
        </Text>
        <Text style={text}>
          Mais une chose reste souvent difficile après une analyse : <strong>donner du sens à ce que l’on a vécu.</strong>
        </Text>
        <Text style={text}>
          Comprendre, c’est une étape. Intégrer son parcours en est une autre.
        </Text>
        
        <Section style={box}>
          <Heading as="h3" style={h3}>C’est pour cela que nous avons créé Le Roman de Votre Vie.</Heading>
          <Text style={text}>
            Un récit personnalisé, écrit à partir de vos données numérologiques et de vos grandes expériences de vie, dans lequel <strong>vous êtes le personnage principal</strong>.
          </Text>
          <Text style={text}>
            Un livre d’environ 100 pages qui :
          </Text>
          <ul style={{ paddingLeft: '20px', margin: '10px 0', color: '#57534e' }}>
            <li>Transforme vos défis en étapes de compréhension.</li>
            <li>Relie vos choix passés à une trajectoire plus lisible.</li>
            <li>Vous permet de porter un regard apaisé et cohérent sur votre parcours.</li>
          </ul>
          <Text style={text}>
            Ce n’est pas une prédiction. C’est une <strong>mise en récit</strong> de ce que vous avez traversé, pour mieux comprendre qui vous êtes devenu.
          </Text>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button style={button} href={romanLink}>
              Découvrir mon Roman de Vie
            </Button>
          </div>
        </Section>

        <Text style={text}>
          Prenez le temps de voir si cette expérience résonne pour vous.
        </Text>

        <Text style={footer}>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailParcoursOfferProps {
  firstName: string;
}

export const EmailParcoursOffer = ({
  firstName,
}: EmailParcoursOfferProps) => (
  <Html>
    <Head />
    <Preview>Prêt pour la prochaine étape de votre voyage ? 🧭</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Votre Trajectoire sur 12 Mois 🧭</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Il y a quelques jours, le <strong>Miroir Intégral</strong> vous a permis de mettre des mots clairs sur votre fonctionnement, vos tensions, et l’écart entre votre potentiel et la façon dont vous avancez aujourd’hui.
        </Text>
        <Text style={text}>
          Cette prise de conscience est une étape importante. Mais une question revient souvent après coup :
        </Text>
        
        <Section style={box}>
          <Heading as="h3" style={h3}>Comment éviter de retomber dans les anciens automatismes ?</Heading>
          <Text style={text}>
            Car sans cadre dans la durée, l’alignement que l’on ressent après une analyse a tendance à s’estomper peu à peu.
          </Text>
          <Text style={text}>
            C’est précisément pour cela que nous avons conçu le <strong>Parcours des 12 Mois</strong>.
          </Text>
          <Text style={text}>
            Un accompagnement structuré, mois après mois, pour continuer à avancer en cohérence avec votre trajectoire, en tenant compte de vos cycles personnels et de votre rythme réel.
          </Text>
          <Text style={text}>
            Il ne s’agit pas de “faire plus”, mais d’<strong>éviter de s’éparpiller</strong> et de garder une boussole claire dans vos décisions.
          </Text>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button style={button} href="https://www.votrelegende.fr/parcours-12-mois">
              Découvrir le Parcours 12 Mois
            </Button>
          </div>
        </Section>

        <Text style={text}>
          Prenez le temps de regarder si cette suite logique fait sens pour vous.
        </Text>

        <Text style={footer}>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface EmailEngagementQuestionProps {
  firstName: string;
}

export const EmailEngagementQuestion = ({
  firstName,
}: EmailEngagementQuestionProps) => (
  <Html>
    <Head />
    <Preview>Une petite question pour vous, {firstName}... 🤔</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Prendre du recul ✨</Heading>
        <Text style={text}>Bonjour {firstName},</Text>
        <Text style={text}>
          Cela fait maintenant trois semaines que vous avez exploré votre <strong>Miroir Intégral</strong>.
        </Text>
        <Text style={text}>
          Je vous envoie ce message simplement pour prendre de vos nouvelles, sans rien avoir à vous vendre.
        </Text>
        
        <Section style={box}>
          <Text style={{ ...text, fontSize: '18px', fontWeight: 'bold', color: '#1A1C2E', textAlign: 'center', margin: '30px 0' }}>
            "Avec le recul, qu’est-ce qui a le plus changé dans ta façon de te voir depuis le Miroir ?"
          </Text>
        </Section>

        <Text style={text}>
          Si le cœur vous en dit, n'hésitez pas à répondre à cet email. Je lis chaque message avec attention.
        </Text>

        <Text style={text}>
          L'idée n'est pas de "faire" quelque chose, mais simplement d'observer l'évolution de votre regard sur vous-même.
        </Text>

        <Text style={footer}>
          L'équipe Votre Légende.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#FAF9F7',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: '#2C2F4A',
  padding: '40px 0', // Marge externe globale pour centrer verticalement
};

const container = {
  margin: '0 auto',
  padding: '40px', // Espace interne du conteneur blanc
  width: '600px',
  maxWidth: '100%',
  backgroundColor: '#ffffff', // Fond blanc pour le conteneur principal
  borderRadius: '12px', // Arrondi global
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Ombre portée pour détacher le mail
};

const h1 = {
  color: '#2C2F4A',
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 30px',
  fontFamily: 'Georgia, serif',
  lineHeight: '1.2',
};

const h3 = {
  color: 'inherit',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const text = {
  color: 'inherit',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#C9A24D',
  borderRadius: '50px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 30px',
};

const secondaryButton = {
  backgroundColor: '#5B4B8A',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 20px',
  marginTop: '10px',
};

const box = {
  padding: '24px',
  backgroundColor: '#FAF9F7', // Fond gris clair pour distinguer du conteneur blanc
  borderRadius: '12px',
  marginBottom: '24px',
  border: '1px solid #EFEDE9',
};

const highlightBox = {
  padding: '24px',
  backgroundColor: '#2C2F4A',
  borderRadius: '12px',
  color: '#ffffff',
  marginBottom: '24px',
};

const paperBox = {
  padding: '20px',
  backgroundColor: '#FFFBF2',
  borderRadius: '8px',
  border: '1px dashed #D4C5A5',
  marginTop: '30px',
};

const paperTitle = {
  color: '#C9A24D',
  fontWeight: 'bold',
  fontSize: '16px',
  margin: '0 0 5px',
};

const paperText = {
  color: '#5c5c5c',
  fontSize: '14px',
  margin: '0',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
};