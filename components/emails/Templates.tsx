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
  color: '#2C2F4A', // Couleur par défaut pour tout le corps
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const h1 = {
  color: '#2C2F4A',
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  fontFamily: 'Georgia, serif',
};

const h3 = {
  color: 'inherit',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const text = {
  color: 'inherit',
  fontSize: '16px',
  lineHeight: '26px',
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
  display: 'block',
  padding: '16px 30px',
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
};

const box = {
  padding: '24px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #EFEDE9',
  marginBottom: '20px',
};

const highlightBox = {
  padding: '24px',
  backgroundColor: '#2C2F4A',
  borderRadius: '12px',
  color: '#ffffff',
  marginBottom: '20px',
  width: '100%', // Assure que la boîte prend toute la largeur
  boxSizing: 'border-box' as const, // Inclut le padding dans la largeur pour éviter le débordement
};

const paperBox = {
  padding: '20px',
  backgroundColor: '#FDF6E3',
  borderRadius: '8px',
  border: '1px dashed #C9A24D',
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