// src/components/board/LearningMaterialsModule.tsx
import React, { useState } from 'react';
import { FolderOpen, FileText, Video, Play, ExternalLink, Download, Monitor, Plus, Eye, X } from 'lucide-react';
import { mockMaterials10A } from '../../services/mockData';
import { LearningMaterial } from '../../types';

export const LearningMaterialsModule: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);

  const getIconForType = (type: LearningMaterial['type']) => {
    switch (type) {
      case 'presentation':
        return FileText;
      case 'video':
        return Video;
      case 'simulation':
        return ExternalLink;
      default:
        return FolderOpen;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Toolbar */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-cyan-400" /> Course Materials & Projections
          </h3>
          <p className="text-xs text-slate-300">Tap any item to project directly onto the classroom board</p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-neon-blue transition hover:brightness-110 touch-target">
          <Plus className="w-4 h-4" /> Upload Material
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMaterials10A.map((mat) => {
          const Icon = getIconForType(mat.type);
          return (
            <div
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className="p-5 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/40 transition cursor-pointer touch-target flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base leading-snug mb-1">{mat.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{mat.size} • {mat.uploadedAt}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mat.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" /> View / Project
              </button>
            </div>
          );
        })}
      </div>

      {/* Material Modal Preview */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-4xl rounded-3xl glass-panel border border-cyan-500/40 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display font-bold text-xl text-white">{selectedMaterial.title}</h3>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-96 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col items-center justify-center text-center p-6 space-y-4">
              {selectedMaterial.type === 'simulation' ? (
                <iframe
                  src={selectedMaterial.url}
                  className="w-full h-full rounded-xl border-none"
                  title={selectedMaterial.title}
                />
              ) : (
                <>
                  <Monitor className="w-16 h-16 text-cyan-400 animate-pulse" />
                  <p className="text-slate-300 text-base font-semibold">
                    Projecting {selectedMaterial.title} to Smart Board
                  </p>
                  <a
                    href={selectedMaterial.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-2xl bg-cyan-500 text-white font-bold text-sm shadow-neon-blue flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Open Fullscreen Window
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
