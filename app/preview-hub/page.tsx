import React from 'react';
import { LayoutDashboard, Mail, FileText, Calendar, Zap, BookOpen, ExternalLink, Shield } from 'lucide-react';

export default function PreviewHub() {
  const demoParams = "fn=Jean-Philippe&ln=Test&bd=1990-05-15&bp=Paris";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Centre de Contrôle & Prévisualisation</h1>
          <p className="text-slate-500 text-lg">Accès rapide à toutes les fonctionnalités et pages de "Votre Légende"</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SECTION 1: PARCOURS UTILISATEUR */}
          <div className="col-span-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Parcours Client
            </h2>
          </div>

          <Card 
            title="1. Page de Révélation (Demo)"
            description="La nouvelle page de résultat gamifiée (Teasing + Cartes + Diagnostic)."
            href="/demo-reveal"
            icon={<LayoutDashboard className="w-6 h-6 text-purple-600" />}
            color="purple"
          />

          <Card 
            title="2. Page de Vente Livre (Upsell)"
            description="La page qui vend le livre physique/numérique après la révélation."
            href="/upgrade-book?demo=true"
            icon={<BookOpen className="w-6 h-6 text-amber-600" />}
            color="amber"
          />

          <Card 
            title="3. Booking Expert (High Ticket)"
            description="La page de prise de rendez-vous pour le coaching humain."
            href="/expert-booking"
            icon={<Calendar className="w-6 h-6 text-emerald-600" />}
            color="emerald"
          />

          <Card 
            title="4. Coach Chat (Oracle)"
            description="L'interface de chat avec l'IA (nécessite des params de démo)."
            href="/coach?id=demo&name=Jean-Philippe"
            icon={<Zap className="w-6 h-6 text-cyan-500" />}
            color="blue"
          />

          {/* SECTION 2: LIVRABLES & CONTENU */}
          <div className="col-span-full mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Livrables & Emails
            </h2>
          </div>

          <Card 
            title="Prévisualisation PDF (Complet)"
            description="Le rapport complet généré avec des données de test. Inclus le nouveau lien Expert."
            href={`/pdf-report-v2?${demoParams}`}
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            color="blue"
            isExternal
          />

          <Card 
            title="Simulateur d'Emails"
            description="Voir les templates d'emails (Confirmation, Livraison, Upsell) en conditions réelles."
            href="/email-preview"
            icon={<Mail className="w-6 h-6 text-rose-600" />}
            color="rose"
          />

          {/* SECTION 3: ADMIN */}
          <div className="col-span-full mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Administration
            </h2>
          </div>

          <Card 
            title="Dashboard Admin"
            description="Gérer les commandes, générer les livres et scripts vidéos."
            href="/admin"
            icon={<Shield className="w-6 h-6 text-slate-700" />}
            color="slate"
          />

        </div>

        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>Votre Légende - Outils de Développement Interne</p>
        </footer>
      </div>
    </div>
  );
}

function Card({ title, description, href, icon, color, isExternal = false }: any) {
  const colorClasses: any = {
    purple: "hover:border-purple-300 hover:shadow-purple-100",
    amber: "hover:border-amber-300 hover:shadow-amber-100",
    emerald: "hover:border-emerald-300 hover:shadow-emerald-100",
    blue: "hover:border-blue-300 hover:shadow-blue-100",
    rose: "hover:border-rose-300 hover:shadow-rose-100",
    slate: "hover:border-slate-300 hover:shadow-slate-100",
  };

  return (
    <a 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      className={`block p-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200 ${colorClasses[color]} group`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-${color}-50 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            {title}
            {isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </a>
  );
}
