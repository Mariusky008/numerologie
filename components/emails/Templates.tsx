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

const main = {
  backgroundColor: '#FAF9F7',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: '#2C2F4A',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px', // Plus d'espace vertical global
  width: '600px', // Légèrement plus large pour respirer
  maxWidth: '100%',
};

const h1 = {
  color: '#2C2F4A',
  fontSize: '36px', // Titre plus grand
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '40px 0 20px', // Marge augmentée
  fontFamily: 'Georgia, serif',
};

const h3 = {
  color: 'inherit',
  fontSize: '22px', // Sous-titre plus grand
  fontWeight: 'bold',
  margin: '0 0 15px',
};

const text = {
  color: 'inherit',
  fontSize: '16px',
  lineHeight: '28px', // Interlignage augmenté pour la lisibilité
  margin: '0 0 15px', // Espace entre les paragraphes
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '40px 0', // Plus d'espace autour du bouton
};

const button = {
  backgroundColor: '#C9A24D',
  borderRadius: '50px',
  color: '#fff',
  fontSize: '18px', // Bouton plus visible
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block', // Permet le padding correct
  padding: '18px 40px', // Bouton plus gros
  boxShadow: '0 4px 10px rgba(201, 162, 77, 0.3)', // Ombre douce
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
  padding: '12px 24px',
  marginTop: '10px',
};

const box = {
  padding: '32px', // Padding interne augmenté
  backgroundColor: '#ffffff',
  borderRadius: '16px', // Arrondi plus doux
  border: '1px solid #EFEDE9',
  marginBottom: '30px', // Espace sous la boîte augmenté
  boxShadow: '0 2px 5px rgba(0,0,0,0.02)', // Ombre très légère
};

const highlightBox = {
  padding: '32px', // Padding interne augmenté pour aérer le texte blanc
  backgroundColor: '#2C2F4A',
  borderRadius: '16px',
  color: '#ffffff',
  marginBottom: '30px',
  width: '100%',
  boxSizing: 'border-box' as const,
};

const paperBox = {
  padding: '24px',
  backgroundColor: '#FFFBF2', // Fond un peu plus chaud/clair
  borderRadius: '12px',
  border: '1px dashed #D4C5A5', // Bordure plus subtile
  marginTop: '40px',
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