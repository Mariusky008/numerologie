'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Heart, MapPin, Home, Briefcase, Users, Star, Compass, Music, Coffee, MessageSquare } from 'lucide-react';
import { UserData, NumerologyResult } from '@/lib/types';

interface BookCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  reportResults: NumerologyResult;
}

export default function BookCreationModal({ isOpen, onClose, userData, reportResults }: BookCreationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    placesLived: '',
    moves: '',
    relationships: '',
    majorEvents: '',
    childhoodMemories: '',
    passions: '',
    dreams: '',
    mentors: '',
    dailyRituals: '',
    otherNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          reportResults,
          lifeDetails: formData,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Une erreur est survenue lors de l'envoi de votre demande.");
      }
    } catch (error) {
      console.error('Error submitting book request:', error);
      alert("Une erreur est survenue lors de l'envoi de votre demande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#fffbf0] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#78350f] text-[#fffbf0] flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-serif font-bold">Votre Roman de Vie</h2>
            </div>
            <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {isSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif text-[#78350f]">Demande Reçue !</h3>
                <p className="text-[#57534e] max-w-md mx-auto">
                  Nous avons bien reçu vos informations. Nous allons maintenant analyser votre profil numérologique et vos souvenirs pour tisser la trame de votre roman unique.
                </p>
                <p className="text-sm text-[#a8a29e]">
                  Vous recevrez bientôt une notification pour découvrir le premier chapitre.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#78350f] text-white rounded-full hover:bg-[#573c28] transition-colors"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
                  <p className="text-sm text-[#78350f] italic">
                    "Imaginez un livre dont vous êtes le héros, mais où chaque épreuve, chaque victoire et chaque rencontre est dictée par les nombres qui régissent votre existence. Pour que la magie opère, confiez-nous quelques clés de votre parcours."
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <MapPin className="w-4 h-4" />
                      Lieux de vie marquants
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Paris, Rome, la maison de votre enfance en Bretagne..."
                      value={formData.placesLived}
                      onChange={(e) => setFormData({ ...formData, placesLived: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Home className="w-4 h-4" />
                      Déménagements ou changements de cap
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Un départ précipité à 18 ans ? Une mutation professionnelle ?"
                      value={formData.moves}
                      onChange={(e) => setFormData({ ...formData, moves: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Heart className="w-4 h-4" />
                      Vie sentimentale (Ruptures & Coups de cœur)
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Le premier amour, une séparation douloureuse, une rencontre inattendue..."
                      value={formData.relationships}
                      onChange={(e) => setFormData({ ...formData, relationships: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Briefcase className="w-4 h-4" />
                      Événements majeurs ou traumatismes surmontés
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Un accident, une réussite fulgurante, une perte..."
                      value={formData.majorEvents}
                      onChange={(e) => setFormData({ ...formData, majorEvents: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Star className="w-4 h-4" />
                      Souvenirs d'enfance marquants
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="L'odeur des gâteaux de grand-mère, une cachette secrète..."
                      value={formData.childhoodMemories}
                      onChange={(e) => setFormData({ ...formData, childhoodMemories: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Music className="w-4 h-4" />
                      Passions & Talents cachés
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Peinture, chant, mécanique, écriture..."
                      value={formData.passions}
                      onChange={(e) => setFormData({ ...formData, passions: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Compass className="w-4 h-4" />
                      Plus grand rêve ou regret
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Faire le tour du monde, ne pas avoir dit je t'aime..."
                      value={formData.dreams}
                      onChange={(e) => setFormData({ ...formData, dreams: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Users className="w-4 h-4" />
                      Mentors ou Figures inspirantes
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Un professeur, un parent, un auteur..."
                      value={formData.mentors}
                      onChange={(e) => setFormData({ ...formData, mentors: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <Coffee className="w-4 h-4" />
                      Petits rituels du quotidien
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[80px]"
                      placeholder="Le café du matin, la marche en forêt, l'écriture..."
                      value={formData.dailyRituals}
                      onChange={(e) => setFormData({ ...formData, dailyRituals: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#78350f] font-bold mb-2">
                      <MessageSquare className="w-4 h-4" />
                      Autres précisions / Notes personnelles
                    </label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-[#d97706]/20 focus:ring-2 focus:ring-[#d97706]/50 outline-none bg-white min-h-[120px]"
                      placeholder="Imaginez un livre dont vous êtes le héros, mais où chaque épreuve, chaque victoire et chaque rencontre est dictée par les nombres qui régissent votre existence. Pour que la magie opère, confiez-nous quelques clés de votre parcours."
                      value={formData.otherNotes}
                      onChange={(e) => setFormData({ ...formData, otherNotes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-4 border-t border-[#d97706]/10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 text-[#78350f] hover:bg-[#78350f]/5 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#d97706] text-white rounded-lg hover:bg-[#b45309] transition-colors shadow-lg shadow-[#d97706]/20 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-4 h-4" />
                        Lancer l'écriture de mon Roman
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 5H5" />
      <path d="M19 15v4" />
      <path d="M15 17h4" />
    </svg>
  );
}
