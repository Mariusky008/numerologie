'use client';

import { useState, useEffect } from 'react';
import { render } from '@react-email/render';
import { EmailReport, EmailDeliverables, EmailConfirmation, EmailUpsellBook, EmailExpertFollowUp, EmailMiroirIntegral, EmailRomanOffer, EmailParcoursOffer, EmailEngagementQuestion } from '@/components/emails/Templates';

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState<'miroir_integral' | 'roman_offer' | 'parcours_offer' | 'engagement_question' | 'confirmation' | 'deliverables' | 'upsell' | 'expert_followup'>('miroir_integral');
  const [isPaper, setIsPaper] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    let component;
    
    switch (activeTab) {
      case 'miroir_integral':
        component = (
          <EmailMiroirIntegral 
            firstName="Jean-Philippe"
            reportLink="https://www.votrelegende.fr/pdf-report-v2?order_id=DEMO"
            coachLink="https://www.votrelegende.fr/coach?id=DEMO&name=Jean-Philippe"
          />
        );
        break;
      case 'roman_offer':
        component = (
          <EmailRomanOffer 
            firstName="Jean-Philippe"
            romanLink="https://www.votrelegende.fr/miroir/checkout"
          />
        );
        break;
      case 'parcours_offer':
        component = (
          <EmailParcoursOffer 
            firstName="Jean-Philippe"
          />
        );
        break;
      case 'engagement_question':
        component = (
          <EmailEngagementQuestion 
            firstName="Jean-Philippe"
          />
        );
        break;
      case 'confirmation':
        component = (
          <EmailConfirmation 
            firstName="Jean-Philippe"
          />
        );
        break;
      case 'deliverables':
        component = (
          <EmailDeliverables 
            firstName="Jean-Philippe"
            videoLink="https://votrelegende.fr/video/demo"
            reportLink="https://votrelegende.fr/download/demo"
            coachLink="https://votrelegende.fr/coach/demo"
          />
        );
        break;
      case 'upsell':
        component = (
          <EmailUpsellBook 
            firstName="Jean-Philippe"
            upgradeLink="https://votrelegende.fr/upgrade-book"
          />
        );
        break;
      case 'expert_followup':
        component = (
          <EmailExpertFollowUp 
            firstName="Jean-Philippe"
            bookingLink="https://votrelegende.fr/expert-booking"
          />
        );
        break;
    }

    // On rend le composant en HTML string pour l'injecter dans l'iframe
    // Cela simule parfaitement le rendu final d'un email
    render(component).then((html) => {
      setHtmlContent(html);
    });
  }, [activeTab, isPaper]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
          Contrôle des Emails
          <span className="text-sm font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Version 3.1 — Flux Automatisé</span>
        </h1>
        
        {/* Contrôles */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 space-y-6 border border-gray-200">
          
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Nouveau Flux Miroir Intégral (V3.1)</h2>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg flex-wrap">
              <button 
                onClick={() => setActiveTab('miroir_integral')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'miroir_integral' ? 'bg-[#1A1C2E] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                J+0 : Livraison Miroir
              </button>
              <button 
                onClick={() => setActiveTab('parcours_offer')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'parcours_offer' ? 'bg-[#5B4B8A] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                J+3 : Offre Parcours 12 mois
              </button>
              <button 
                onClick={() => setActiveTab('roman_offer')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'roman_offer' ? 'bg-[#C9A24D] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                J+7 : Offre Roman
              </button>
              <button 
                onClick={() => setActiveTab('engagement_question')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'engagement_question' ? 'bg-teal-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                J+21 : Engagement (Relance)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Archives & Autres Templates</h2>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg flex-wrap">
              <button 
                onClick={() => setActiveTab('confirmation')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'confirmation' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Confirmation (Ancien)
              </button>
              <button 
                onClick={() => setActiveTab('deliverables')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'deliverables' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Livraison Vidéo (Ancien)
              </button>
              <button 
                onClick={() => setActiveTab('upsell')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'upsell' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Upsell Livre (Ancien)
              </button>
              <button 
                onClick={() => setActiveTab('expert_followup')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'expert_followup' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Relance Expert (J+5)
              </button>
            </div>
          </div>
        </div>

        {/* Prévisualisation Iframe */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-widest font-bold flex justify-between">
            <span>Rendu exact (Gmail / Outlook / Apple Mail)</span>
            <span>Isolation via Iframe</span>
          </div>
          
          <div className="flex-1 bg-gray-200/50 p-4 overflow-hidden relative">
             <iframe 
               srcDoc={htmlContent}
               className="w-full h-full bg-white rounded shadow-sm mx-auto border-0"
               style={{ maxWidth: '800px' }} // Largeur typique d'un client mail desktop
               title="Email Preview"
             />
          </div>
        </div>
      </div>
    </div>
  );
}