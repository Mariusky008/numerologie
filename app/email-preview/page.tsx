'use client';

import { useState, useEffect } from 'react';
import { render } from '@react-email/render';
import { EmailReport, EmailBundle, EmailConfirmation } from '@/components/emails/Templates';

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState<'report' | 'bundle' | 'confirmation'>('confirmation');
  const [isPaper, setIsPaper] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    let component;
    
    switch (activeTab) {
      case 'report':
        component = (
          <EmailReport 
            firstName="Jean-Philippe"
            downloadLink="https://votrelegende.fr/download/demo"
            isPaper={isPaper}
          />
        );
        break;
      case 'bundle':
        component = (
          <EmailBundle 
            firstName="Jean-Philippe"
            writeLink="https://votrelegende.fr/book-setup/demo"
            downloadLink="https://votrelegende.fr/download/demo"
            isPaper={isPaper}
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
          Prévisualisation des Emails
          <span className="text-sm font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Mode Simulation Réelle</span>
        </h1>
        
        {/* Contrôles */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex flex-wrap gap-6 items-center border border-gray-200">
          
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button 
              onClick={() => setActiveTab('confirmation')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'confirmation' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              1. Confirmation (Immédiat)
            </button>
            <button 
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'report' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              2. Rapport Seul
            </button>
            <button 
              onClick={() => setActiveTab('bundle')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'bundle' ? 'bg-white shadow text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              3. Pack Complet (Livraison)
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={isPaper}
              onChange={(e) => setIsPaper(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium">Simuler Option Papier (+ Livraison)</span>
          </label>

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