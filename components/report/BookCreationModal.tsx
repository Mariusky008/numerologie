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
    bookTheme: '',
    worstOrdeal: '',
    bonusAnecdote: '',
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
          <div className="p-6 bg-[#2C2F4A] text-[#FAF9F7] flex justify-between items-center shrink-0 border-b border-[#C9A24D]/20">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#C9A24D]" />
              <h2 className="text-xl font-serif font-bold text-[#FAF9F7]">Votre Roman de Vie</h2>
            </div>
            <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors text-[#FAF9F7]/80 hover:text-[#FAF9F7]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 bg-[#FAF9F7]">
            {isSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-[#2C2F4A] text-[#C9A24D] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#C9A24D]">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif text-[#2C2F4A]">Demande Reçue !</h3>
                <p className="text-[#2C2F4A]/70 max-w-md mx-auto">
                  Nous avons bien reçu vos informations. Nous allons maintenant analyser votre profil numérologique et vos souvenirs pour tisser la trame de votre roman unique.
                </p>
                <p className="text-sm text-[#8FA6A0]">
                  Vous recevrez bientôt une notification pour découvrir le premier chapitre.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#2C2F4A] text-[#FAF9F7] rounded-full hover:bg-[#5B4B8A] transition-colors"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-[#2C2F4A]/5 p-6 rounded-xl border border-[#2C2F4A]/10 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A24D]"></div>
                  <p className="text-sm text-[#2C2F4A]/80 italic font-medium leading-relaxed">
                    "Aidez-nous à capturer l'essence de votre parcours. Soyez aussi sincère et détaillé que possible, ce sont les petites anecdotes qui font les grandes histoires."
                  </p>
                </div>

                <div className="space-y-6">
                  {/* NEW FIELDS START */}
                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-4 text-lg">
                      <BookOpen className="w-5 h-5 text-[#C9A24D]" />
                      Quel est le thème principal du livre ?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['Entrepreneuriat / Business', 'Voyage / Aventure', 'Développement personnel / Changement de vie', 'Biographie familiale', 'Science fiction', 'Roman d\'amour'].map((theme) => (
                        <label key={theme} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.bookTheme === theme ? 'bg-[#2C2F4A] text-[#FAF9F7] border-[#2C2F4A] shadow-md' : 'bg-[#FAF9F7] border-[#EFEDE9] hover:border-[#C9A24D]/50 hover:bg-white text-[#2C2F4A]/80'}`}>
                          <input
                            type="radio"
                            name="bookTheme"
                            value={theme}
                            checked={formData.bookTheme === theme}
                            onChange={(e) => setFormData({ ...formData, bookTheme: e.target.value })}
                            className={`w-4 h-4 accent-[#C9A24D] ${formData.bookTheme === theme ? 'brightness-150' : ''}`}
                          />
                          <span className="text-sm font-medium">{theme}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Users className="w-5 h-5 text-[#C9A24D]" />
                      Quelle a été la pire galère ? <span className="text-xs font-sans font-normal text-[#2C2F4A]/60 ml-2">(Soyez honnête, cela rend le héros humain)</span>
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Un échec cuisant, un moment de solitude intense, une erreur de parcours..."
                      value={formData.worstOrdeal}
                      onChange={(e) => setFormData({ ...formData, worstOrdeal: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Star className="w-5 h-5 text-[#C9A24D]" />
                      Avez-vous une anecdote "bonus" ou un détail bizarre ?
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Un talent inutile, une phobie étrange, une coïncidence incroyable..."
                      value={formData.bonusAnecdote}
                      onChange={(e) => setFormData({ ...formData, bonusAnecdote: e.target.value })}
                    />
                  </div>
                  {/* NEW FIELDS END */}

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <MapPin className="w-5 h-5 text-[#C9A24D]" />
                      Lieux de vie marquants
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Paris, Rome, la maison de votre enfance en Bretagne..."
                      value={formData.placesLived}
                      onChange={(e) => setFormData({ ...formData, placesLived: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Home className="w-5 h-5 text-[#C9A24D]" />
                      Déménagements ou changements de cap
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Un départ précipité à 18 ans ? Une mutation professionnelle ?"
                      value={formData.moves}
                      onChange={(e) => setFormData({ ...formData, moves: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Heart className="w-5 h-5 text-[#C9A24D]" />
                      Vie sentimentale (Ruptures & Coups de cœur)
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Le premier amour, une séparation douloureuse, une rencontre inattendue..."
                      value={formData.relationships}
                      onChange={(e) => setFormData({ ...formData, relationships: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Briefcase className="w-5 h-5 text-[#C9A24D]" />
                      Événements majeurs ou traumatismes surmontés
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Un accident, une réussite fulgurante, une perte..."
                      value={formData.majorEvents}
                      onChange={(e) => setFormData({ ...formData, majorEvents: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Star className="w-5 h-5 text-[#C9A24D]" />
                      Souvenirs d'enfance marquants
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="L'odeur des gâteaux de grand-mère, une cachette secrète..."
                      value={formData.childhoodMemories}
                      onChange={(e) => setFormData({ ...formData, childhoodMemories: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Music className="w-5 h-5 text-[#C9A24D]" />
                      Passions & Talents cachés
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Peinture, chant, mécanique, écriture..."
                      value={formData.passions}
                      onChange={(e) => setFormData({ ...formData, passions: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Compass className="w-5 h-5 text-[#C9A24D]" />
                      Plus grand rêve ou regret
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Faire le tour du monde, ne pas avoir dit je t'aime..."
                      value={formData.dreams}
                      onChange={(e) => setFormData({ ...formData, dreams: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Users className="w-5 h-5 text-[#C9A24D]" />
                      Mentors ou Figures inspirantes
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Un professeur, un parent, un auteur..."
                      value={formData.mentors}
                      onChange={(e) => setFormData({ ...formData, mentors: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <Coffee className="w-5 h-5 text-[#C9A24D]" />
                      Petits rituels du quotidien
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[100px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Le café du matin, la marche en forêt, l'écriture..."
                      value={formData.dailyRituals}
                      onChange={(e) => setFormData({ ...formData, dailyRituals: e.target.value })}
                    />
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#EFEDE9] shadow-sm">
                    <label className="flex items-center gap-2 text-[#2C2F4A] font-serif font-bold mb-3 text-lg">
                      <MessageSquare className="w-5 h-5 text-[#C9A24D]" />
                      Autres précisions / Notes personnelles
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none bg-[#FAF9F7] min-h-[150px] text-[#2C2F4A] placeholder-[#2C2F4A]/30 transition-all"
                      placeholder="Imaginez un livre dont vous êtes le héros, mais où chaque épreuve, chaque victoire et chaque rencontre est dictée par les nombres qui régissent votre existence. Pour que la magie opère, confiez-nous quelques clés de votre parcours."
                      value={formData.otherNotes}
                      onChange={(e) => setFormData({ ...formData, otherNotes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-4 border-t border-[#2C2F4A]/10 bg-[#FAF9F7] sticky bottom-0 z-10 pb-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-[#2C2F4A] hover:bg-[#2C2F4A]/5 rounded-lg transition-colors font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#2C2F4A] text-[#FAF9F7] rounded-lg hover:bg-[#5B4B8A] transition-colors shadow-lg shadow-[#2C2F4A]/20 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#FAF9F7]/30 border-t-[#FAF9F7] rounded-full animate-spin" />
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
