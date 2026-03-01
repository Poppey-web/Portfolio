/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  ChevronRight, 
  Zap,
  MapPin,
  Download,
  Upload,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Settings,
  Image as ImageIcon,
  LogIn,
  Pencil,
  LogOut,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Types ---

type Category = string;

interface Project {
  id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  role: string;
  kpis: { jauge: string; staff: string; budget: string };
  year: string;
  location: string;
}

interface PortfolioData {
  profile: {
    name: string;
    role: string;
    heroTitle: string;
    heroSubtitle: string;
    bioTitle: string;
    bioText: string[];
    professionalEngagement: { label: string; value: string }[];
    expertise: {
      title: string;
      description: string;
      skills: { label: string }[];
      statValue: string;
      statLabel: string;
    };
    technicalSkills: { label: string }[];
    projectsSubtitle: string;
    contact: {
      email: string;
      linkedin: string;
      cvUrl: string;
    };
  };
  projects: Project[];
}

// --- Initial Data ---

const INITIAL_DATA: PortfolioData = {
  profile: {
    name: "PRODUCTION SHOWCASE",
    role: "Expert Production Manager",
    heroTitle: "PILOTAGE DE PRODUCTION ÉVÉNEMENTIELLE.",
    heroSubtitle: "Expertise technique et rigueur opérationnelle pour projets complexes. Orienté résultats, je transforme les contraintes logistiques en succès d'exécution.",
    bioTitle: "FIABILITÉ & VISION LONG TERME.",
    bioText: [
      "Expert en production événementielle formé par Ambroise Soulé et Maxime Hernandez. Ma rigueur opérationnelle et ma gestion du risque sont forgées par le terrain et une discipline financière stricte (Bourse/Immobilier). Je transforme la complexité logistique en succès d'exécution."
    ],
    professionalEngagement: [
      { label: "Disponibilité", value: "Europe / International" },
      { label: "Formation", value: "Mentorat Soulé & Hernandez" },
      { label: "Terrain", value: "Melbourne Convention Center" }
    ],
    expertise: {
      title: "RIGUEUR TECHNIQUE.",
      description: "Une approche pragmatique de la production, centrée sur l'optimisation des ressources et la sécurité des flux. Pas de place pour l'improvisation.",
      skills: [
        { label: "Crisis Management" },
        { label: "Budget Oversight" },
        { label: "Technical Rigor" },
        { label: "Risk Mitigation" },
        { label: "Stakeholder Management" },
        { label: "Operational Excellence" }
      ],
      statValue: "10k m²",
      statLabel: "Surface max pilotée"
    },
    technicalSkills: [
      { label: "AutoCAD" },
      { label: "Suite Adobe" },
      { label: "White Card (AU)" },
      { label: "RSA (AU)" }
    ],
    projectsSubtitle: "Sélection de réalisations // 2023-2026",
    contact: {
      email: "nilscattiauxtruelle@gmail.com",
      linkedin: "https://www.linkedin.com/in/nils-cattiaux-truelle-b37964187/",
      cvUrl: "#"
    }
  },
  projects: [
    {
      id: '1',
      title: 'Planit Installation',
      category: 'Exposition',
      image: 'https://picsum.photos/seed/planit/1200/800',
      description: "• Montage de structures 10 000m²+\n• Lecture de plans CAO\n• Sécurité OH&S",
      role: 'Responsable Logistique & Montage',
      kpis: { jauge: '7000+ Visiteurs', budget: 'Optimisé -10%', staff: '25 Techniciens' },
      year: '2025',
      location: 'Melbourne, Australie'
    },
    {
      id: '2',
      title: 'Némésis',
      category: 'Grand Public',
      image: 'https://picsum.photos/seed/nemesis/1200/800',
      description: 'Régie générale et ingénierie des flux pour un événement à forte affluence. Mise en place d\'un plan de sécurité civile et coordination des secours.',
      role: 'Régisseur Général',
      kpis: { jauge: '7000+ Personnes', budget: 'Budget Oversight', staff: '40 Staff' },
      year: '2024',
      location: 'France'
    }
  ]
};

// --- Constants ---

const STORAGE_KEY = 'portfolio_cms_v6';
const ADMIN_PASSWORD = 'Coline33470@';

// --- Shared Styles ---

const UI_STYLES = {
  buttonPrimary: "px-10 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-sm",
  buttonSecondary: "px-10 py-5 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all rounded-sm",
  adminPill: "flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
  inputField: "w-full bg-zinc-900 border border-zinc-800 p-3 rounded outline-none focus:border-blue-500 text-sm text-white transition-colors",
  label: "text-[10px] uppercase font-bold text-zinc-500 block mb-2"
};

// --- Components ---

const SafeImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-zinc-900 flex flex-col items-center justify-center gap-2 text-zinc-700 ${className}`}>
        <ImageIcon size={32} strokeWidth={1} />
        <span className="text-[8px] uppercase font-bold tracking-widest">Image non disponible</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-md border ${
        type === 'success' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-red-500/20 border-red-500/50 text-red-400'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span className="text-xs font-bold uppercase tracking-widest">{message}</span>
    </motion.div>
  );
};

const InlineEdit = ({ 
  value, 
  originalValue,
  onChange, 
  isEditMode, 
  label,
  className = "", 
  multiline = false 
}: { 
  value: string; 
  originalValue?: string;
  onChange: (val: string) => void; 
  isEditMode: boolean; 
  label?: string;
  className?: string;
  multiline?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isModified = originalValue !== undefined && value !== originalValue;

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  if (!isEditMode) return <span className={className}>{value}</span>;
  
  return (
    <div className="relative group/edit inline-block w-full">
      <div className="absolute -top-7 left-0 opacity-0 group-hover/edit:opacity-100 transition-all duration-200 pointer-events-none z-20 translate-y-1 group-hover/edit:translate-y-0">
        <div className="bg-blue-600 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-xl whitespace-nowrap flex items-center gap-1">
          <Pencil size={8} /> {label || "Modifier"}
        </div>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          let newVal = e.currentTarget.innerText; // Keep original formatting
          if (newVal.trim() === "") {
            newVal = value || "Cliquez ici pour ajouter du contenu";
            e.currentTarget.innerText = newVal;
          }
          onChange(newVal);
        }}
        className={`outline-none transition-all min-w-[20px] inline-block w-full break-words cursor-text ${
          multiline ? 'whitespace-pre-wrap leading-relaxed' : ''
        } ${
          isFocused 
            ? 'border-blue-500 ring-4 ring-blue-500/20 bg-blue-500/5 border-solid' 
            : isModified
              ? 'border-orange-500/50 border-dashed hover:border-orange-500 bg-orange-500/5'
              : 'border-blue-500/30 border-dashed hover:border-blue-500/60'
        } border rounded-sm px-2 py-1 ${className}`}
      />
      
      {!isFocused && (
        <div className={`absolute -top-2 -right-2 p-1 rounded-full opacity-0 group-hover/edit:opacity-100 transition-opacity shadow-lg pointer-events-none z-10 ${isModified ? 'bg-orange-500' : 'bg-blue-600'} text-white`}>
          <Pencil size={8} />
        </div>
      )}
    </div>
  );
};

const ProjectModal = ({ 
  project, 
  originalProject,
  onClose, 
  isEditMode, 
  onUpdate 
}: { 
  project: Project; 
  originalProject?: Project;
  onClose: () => void; 
  isEditMode: boolean;
  onUpdate: (updates: Partial<Project>) => void;
}) => {
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-black border border-zinc-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-sm relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white hover:text-black transition-all rounded-full border border-zinc-800">
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-video md:aspect-auto bg-zinc-900 overflow-hidden relative group">
            <SafeImage src={project.image} alt={project.title} className="w-full h-full object-cover" />
            {isEditMode && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-4">
                {!showImageUrlInput ? (
                  <button 
                    onClick={() => setShowImageUrlInput(true)}
                    className="px-6 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <ImageIcon size={14} /> Remplacer l'image
                  </button>
                ) : (
                  <div className="w-full max-w-xs space-y-2 text-center bg-black/80 p-4 rounded-lg border border-blue-500/30">
                    <label className="text-[10px] uppercase font-bold text-blue-400 block">URL de l'image</label>
                    <input 
                      value={project.image} 
                      onChange={(e) => onUpdate({ image: e.target.value })}
                      className="w-full bg-zinc-900 border border-blue-500/50 p-2 text-xs rounded text-white outline-none focus:border-blue-500"
                      placeholder="https://..."
                      autoFocus
                      onBlur={() => setShowImageUrlInput(false)}
                    />
                    <button 
                      onClick={() => setShowImageUrlInput(false)}
                      className="text-[9px] uppercase font-bold text-zinc-500 hover:text-white"
                    >
                      Valider
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-6 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                <InlineEdit 
                  value={project.category} 
                  originalValue={originalProject?.category}
                  onChange={(v) => onUpdate({ category: v as Category })} 
                  isEditMode={isEditMode} 
                  label="Catégorie"
                />
                <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                <InlineEdit 
                  value={project.year} 
                  originalValue={originalProject?.year}
                  onChange={(v) => onUpdate({ year: v })} 
                  isEditMode={isEditMode} 
                  label="Année"
                />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-none text-white">
                <InlineEdit 
                  value={project.title} 
                  originalValue={originalProject?.title}
                  onChange={(v) => onUpdate({ title: v })} 
                  isEditMode={isEditMode} 
                  label="Titre du projet"
                />
              </h2>
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-4 font-bold">
                Rôle: <InlineEdit 
                  value={project.role} 
                  originalValue={originalProject?.role}
                  onChange={(v) => onUpdate({ role: v })} 
                  isEditMode={isEditMode} 
                  label="Votre rôle"
                />
              </div>
              <div className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                <InlineEdit 
                  value={project.description} 
                  originalValue={originalProject?.description}
                  onChange={(v) => onUpdate({ description: v })} 
                  isEditMode={isEditMode} 
                  multiline 
                  label="Description"
                />
              </div>
              
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <div className="text-zinc-400 text-[10px] uppercase tracking-widest mb-6 font-bold">En chiffres</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">Jauge</div>
                    <div className="text-lg font-bold text-white">
                      <InlineEdit 
                        value={project.kpis.jauge} 
                        originalValue={originalProject?.kpis.jauge}
                        onChange={(v) => onUpdate({ kpis: { ...project.kpis, jauge: v } })} 
                        isEditMode={isEditMode} 
                        label="KPI Jauge"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">Budget</div>
                    <div className="text-lg font-bold text-white">
                      <InlineEdit 
                        value={project.kpis.budget} 
                        originalValue={originalProject?.kpis.budget}
                        onChange={(v) => onUpdate({ kpis: { ...project.kpis, budget: v } })} 
                        isEditMode={isEditMode} 
                        label="KPI Budget"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">Staff</div>
                    <div className="text-lg font-bold text-white">
                      <InlineEdit 
                        value={project.kpis.staff} 
                        originalValue={originalProject?.kpis.staff}
                        onChange={(v) => onUpdate({ kpis: { ...project.kpis, staff: v } })} 
                        isEditMode={isEditMode} 
                        label="KPI Staff"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <MapPin size={14} className="text-zinc-600" />
                <InlineEdit 
                  value={project.location} 
                  originalValue={originalProject?.location}
                  onChange={(v) => onUpdate({ location: v })} 
                  isEditMode={isEditMode} 
                  label="Localisation"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [lastSavedData, setLastSavedData] = useState<PortfolioData>(INITIAL_DATA);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filter, setFilter] = useState<Category>('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState<Partial<Project>>({
    title: "",
    category: "Corporate",
    image: "https://picsum.photos/seed/new/1200/800",
    description: "",
    role: "",
    kpis: { jauge: "0", staff: "0", budget: "0" },
    year: new Date().getFullYear().toString(),
    location: ""
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(data) !== JSON.stringify(lastSavedData);
  }, [data, lastSavedData]);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setLastSavedData(parsed);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastSavedData(JSON.parse(JSON.stringify(data)));
    setToast({ message: "Modification enregistrée localement", type: 'success' });
  };

  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') return data.projects;
    return data.projects.filter(p => p.category === filter);
  }, [filter, data.projects]);

  const categories = useMemo(() => {
    const base = ['Tous'];
    const projectCats = Array.from(new Set(data.projects.map(p => p.category)));
    // Sort project categories alphabetically, but keep 'Tous' first
    const sortedCats = projectCats.filter(c => c !== 'Tous').sort();
    return [...base, ...sortedCats];
  }, [data.projects]);

  // Actions
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setToast({ message: "Mode édition activé", type: 'success' });
    } else {
      setToast({ message: "Mot de passe incorrect", type: 'error' });
    }
  };

  const handleExitEditMode = () => {
    if (hasUnsavedChanges) {
      if (confirm("Vous avez des modifications non sauvegardées. Quitter quand même ?")) {
        setData(JSON.parse(JSON.stringify(lastSavedData)));
        setIsEditMode(false);
      }
    } else {
      setIsEditMode(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now().toString(),
      title: newProjectData.title || "Nouveau Projet",
      category: newProjectData.category as Category || "Corporate",
      image: newProjectData.image || "https://picsum.photos/seed/new/1200/800",
      description: newProjectData.description || "",
      role: newProjectData.role || "",
      kpis: newProjectData.kpis || { jauge: "0", staff: "0", budget: "0" },
      year: newProjectData.year || new Date().getFullYear().toString(),
      location: newProjectData.location || ""
    };
    setData({ ...data, projects: [project, ...data.projects] });
    setShowAddProjectModal(false);
    setNewProjectData({
      title: "",
      category: "Corporate",
      image: "https://picsum.photos/seed/new/1200/800",
      description: "",
      role: "",
      kpis: { jauge: "0", staff: "0", budget: "0" },
      year: new Date().getFullYear().toString(),
      location: ""
    });
    setToast({ message: "Projet ajouté - N'oubliez pas de sauvegarder", type: 'success' });
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Supprimer ce projet ?")) {
      setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
      setToast({ message: "Projet supprimé", type: 'success' });
    }
  };

  const moveProject = (id: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const index = data.projects.findIndex(p => p.id === id);
    if (index === -1) return;
    
    const newProjects = [...data.projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newProjects.length) {
      [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
      setData({ ...data, projects: newProjects });
    }
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const updateProfile = (path: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    const keys = path.split('.');
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio_backup.json';
    a.click();
    setToast({ message: "Données exportées", type: 'success' });
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setData(imported);
        setToast({ message: "Données importées avec succès", type: 'success' });
      } catch (err) {
        setToast({ message: "Erreur lors de l'importation", type: 'error' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden font-sans ${isEditMode ? 'pt-16' : ''}`}>
      {/* Admin Toolbar */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-[150] bg-blue-600 text-white py-3 px-6 shadow-2xl flex justify-between items-center"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]">
                <Settings size={16} />
                Admin Panel
              </div>
              <div className="h-4 w-[1px] bg-white/20" />
              <button 
                onClick={() => setShowAddProjectModal(true)}
                className={UI_STYLES.adminPill}
              >
                <Plus size={14} /> Ajouter un Événement
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className={UI_STYLES.adminPill}
              >
                <FileText size={14} /> Gérer le CV
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              {hasUnsavedChanges && (
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-100 flex items-center gap-2">
                  <AlertCircle size={10} /> Modifications en attente
                </span>
              )}
              <button 
                onClick={saveToLocalStorage}
                className="flex items-center gap-2 px-6 py-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
              >
                <Save size={14} /> Sauvegarder
              </button>
              <button 
                onClick={handleExitEditMode}
                className="flex items-center gap-2 px-4 py-1.5 bg-black/20 hover:bg-black/40 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                <LogOut size={14} /> Quitter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 py-4 transition-all ${isEditMode ? 'top-16' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold tracking-tighter text-white">
            <InlineEdit 
              value={data.profile.name} 
              originalValue={lastSavedData.profile.name}
              onChange={(v) => updateProfile('profile.name', v)} 
              isEditMode={isEditMode} 
              label="Nom du Portfolio"
            />
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <a href="#projects" className="hover:text-white transition-colors">Projets</a>
              <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
              <a href="#about" className="hover:text-white transition-colors">Bio</a>
            </div>
            <a 
              href={data.profile.contact.cvUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-all"
            >
              <Download size={14} />
              CV
            </a>
          </div>
        </div>
      </nav>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-sm w-full max-w-sm">
              <h3 className="text-xl font-bold mb-6 text-center uppercase tracking-tighter">Connexion CMS</h3>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input 
                  type="password" 
                  placeholder="Mot de passe" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className={UI_STYLES.inputField}
                  autoFocus
                />
                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowAdminLogin(false)} className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:bg-zinc-900 transition-colors">Annuler</button>
                  <button type="submit" className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-colors">Entrer</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal (CV Management) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-sm w-full max-w-md">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold uppercase tracking-tighter">Gestion du CV & Médias</h3>
                <button onClick={() => setShowSettings(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={UI_STYLES.label}>Lien du CV (Google Drive / Cloud)</label>
                  <input 
                    value={data.profile.contact.cvUrl} 
                    onChange={(e) => updateProfile('profile.contact.cvUrl', e.target.value)}
                    className={UI_STYLES.inputField}
                    placeholder="https://..."
                  />
                  <div className="mt-2 text-[9px] text-zinc-500 italic">
                    Fichier actuel : {data.profile.contact.cvUrl.split('/').pop() || 'Aucun lien'}
                  </div>
                </div>
                <div>
                  <label className={UI_STYLES.label}>Email de contact</label>
                  <input 
                    value={data.profile.contact.email} 
                    onChange={(e) => updateProfile('profile.contact.email', e.target.value)}
                    className={UI_STYLES.inputField}
                  />
                </div>
                <div className="pt-6 border-t border-zinc-900 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <button onClick={exportData} className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:bg-zinc-900 transition-colors">
                      <Download size={14} /> Export JSON
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:bg-zinc-900 transition-colors">
                      <Upload size={14} /> Import JSON
                    </button>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={importData} className="hidden" accept=".json" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-[0.4em] mb-6 font-bold">
            <InlineEdit 
              value={data.profile.role} 
              originalValue={lastSavedData.profile.role}
              onChange={(v) => updateProfile('profile.role', v)} 
              isEditMode={isEditMode} 
              label="Titre de poste"
            />
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 text-white uppercase">
            <InlineEdit 
              value={data.profile.heroTitle} 
              originalValue={lastSavedData.profile.heroTitle}
              onChange={(v) => updateProfile('profile.heroTitle', v)} 
              isEditMode={isEditMode} 
              label="Accroche principale"
            />
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
            <InlineEdit 
              value={data.profile.heroSubtitle} 
              originalValue={lastSavedData.profile.heroSubtitle}
              onChange={(v) => updateProfile('profile.heroSubtitle', v)} 
              isEditMode={isEditMode} 
              multiline 
              label="Sous-titre hero"
            />
          </div>
          <a href="#projects" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-white pb-2 hover:text-zinc-400 hover:border-zinc-400 transition-all text-white">
            Voir les projets <ArrowRight size={14} />
          </a>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4 text-white uppercase">PROJETS</h2>
            <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-bold">
              <InlineEdit 
                value={data.profile.projectsSubtitle} 
                originalValue={lastSavedData.profile.projectsSubtitle}
                onChange={(v) => updateProfile('profile.projectsSubtitle', v)} 
                isEditMode={isEditMode} 
                label="Sous-titre section projets"
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-[9px] font-bold uppercase tracking-widest rounded-full border transition-all whitespace-nowrap ${
                  filter === cat ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-zinc-950 border border-zinc-900 overflow-hidden cursor-pointer rounded-sm hover:border-zinc-700 transition-all duration-500"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <SafeImage 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-zinc-800 text-[8px] font-bold uppercase tracking-[0.2em] text-white">
                      {project.category}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold tracking-tighter text-white uppercase group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <span className="text-[10px] font-mono text-zinc-600">{project.year}</span>
                  </div>
                  
                  <p className="text-zinc-500 text-sm mb-6 font-medium leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">Jauge</div>
                      <div className="text-[10px] text-zinc-300 font-bold">{project.kpis.jauge}</div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">Staff</div>
                      <div className="text-[10px] text-zinc-300 font-bold">{project.kpis.staff}</div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">Localisation</div>
                      <div className="text-[10px] text-zinc-300 font-bold truncate">{project.location}</div>
                    </div>
                  </div>
                </div>
                
                {isEditMode && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                      onClick={(e) => deleteProject(project.id, e)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-xl"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => moveProject(project.id, 'up', e)}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-xl"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      onClick={(e) => moveProject(project.id, 'down', e)}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-xl"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 sm:py-32 px-4 sm:px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-8 text-white uppercase">
              <InlineEdit 
                value={data.profile.expertise.title} 
                originalValue={lastSavedData.profile.expertise.title}
                onChange={(v) => updateProfile('profile.expertise.title', v)} 
                isEditMode={isEditMode} 
                label="Titre expertise"
              />
            </h2>
            <div className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-12">
              <InlineEdit 
                value={data.profile.expertise.description} 
                originalValue={lastSavedData.profile.expertise.description}
                onChange={(v) => updateProfile('profile.expertise.description', v)} 
                isEditMode={isEditMode} 
                multiline 
                label="Description expertise"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {data.profile.expertise.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white group">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-sm group-hover:border-zinc-600 transition-colors">
                    <Zap size={16} className="text-zinc-400" />
                  </div>
                  <InlineEdit 
                    value={skill.label} 
                    originalValue={lastSavedData.profile.expertise.skills[idx]?.label}
                    onChange={(v) => {
                      const newSkills = [...data.profile.expertise.skills];
                      newSkills[idx].label = v;
                      updateProfile('profile.expertise.skills', newSkills);
                    }} 
                    isEditMode={isEditMode} 
                    className="font-bold uppercase tracking-widest text-[10px] text-zinc-300"
                    label="Compétence"
                  />
                </div>
              ))}
            </div>

            {/* Technical Skills Sub-section */}
            <div className="mt-16 pt-16 border-t border-zinc-900">
              <div className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] mb-8 font-bold">Compétences Techniques</div>
              <div className="flex flex-wrap gap-4">
                {data.profile.technicalSkills.map((skill, idx) => (
                  <div key={idx} className="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center gap-3 group hover:border-blue-500/50 transition-all">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:animate-pulse" />
                    <InlineEdit 
                      value={skill.label} 
                      originalValue={lastSavedData.profile.technicalSkills[idx]?.label}
                      onChange={(v) => {
                        const newSkills = [...data.profile.technicalSkills];
                        newSkills[idx].label = v;
                        updateProfile('profile.technicalSkills', newSkills);
                      }} 
                      isEditMode={isEditMode} 
                      className="text-[10px] font-bold uppercase tracking-widest text-white"
                      label="Skill Technique"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[300px] sm:max-w-md border border-zinc-900 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 border border-zinc-900 rounded-full animate-[spin_30s_linear_infinite] opacity-30" />
              <div className="text-center">
                <div className="text-5xl sm:text-7xl font-bold tracking-tighter mb-2 text-white uppercase">
                  <InlineEdit 
                    value={data.profile.expertise.statValue} 
                    originalValue={lastSavedData.profile.expertise.statValue}
                    onChange={(v) => updateProfile('profile.expertise.statValue', v)} 
                    isEditMode={isEditMode} 
                    label="Valeur stat"
                  />
                </div>
                <div className="text-zinc-500 text-[9px] uppercase tracking-widest font-bold">
                  <InlineEdit 
                    value={data.profile.expertise.statLabel} 
                    originalValue={lastSavedData.profile.expertise.statLabel}
                    onChange={(v) => updateProfile('profile.expertise.statLabel', v)} 
                    isEditMode={isEditMode} 
                    label="Label stat"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-8 text-white uppercase">
              <InlineEdit 
                value={data.profile.bioTitle} 
                originalValue={lastSavedData.profile.bioTitle}
                onChange={(v) => updateProfile('profile.bioTitle', v)} 
                isEditMode={isEditMode} 
                label="Titre bio"
              />
            </h2>
            <div className="space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
              {data.profile.bioText.map((text, idx) => (
                <div key={idx}>
                  <InlineEdit 
                    value={text} 
                    originalValue={lastSavedData.profile.bioText[idx]}
                    onChange={(v) => {
                      const newBio = [...data.profile.bioText];
                      newBio[idx] = v;
                      updateProfile('profile.bioText', newBio);
                    }} 
                    isEditMode={isEditMode} 
                    multiline 
                    label={`Paragraphe bio ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 border border-zinc-900 bg-zinc-950 rounded-sm">
              <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-8 font-bold">Engagement Professionnel</div>
              <ul className="space-y-4">
                {data.profile.professionalEngagement.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center py-3 border-b border-zinc-900 last:border-0">
                    <InlineEdit 
                      value={item.label} 
                      originalValue={lastSavedData.profile.professionalEngagement[idx]?.label}
                      onChange={(v) => {
                        const newEng = [...data.profile.professionalEngagement];
                        newEng[idx].label = v;
                        updateProfile('profile.professionalEngagement', newEng);
                      }} 
                      isEditMode={isEditMode} 
                      className="text-xs text-zinc-400 uppercase tracking-wider"
                      label="Label engagement"
                    />
                    <InlineEdit 
                      value={item.value} 
                      originalValue={lastSavedData.profile.professionalEngagement[idx]?.value}
                      onChange={(v) => {
                        const newEng = [...data.profile.professionalEngagement];
                        newEng[idx].value = v;
                        updateProfile('profile.professionalEngagement', newEng);
                      }} 
                      isEditMode={isEditMode} 
                      className="text-[10px] font-mono text-white font-bold text-right"
                      label="Valeur engagement"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 sm:py-48 px-4 sm:px-6 text-center border-t border-zinc-900">
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter mb-12 text-white">DISCUTONS.</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
          <a 
            href={`mailto:${data.profile.contact.email}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={UI_STYLES.buttonPrimary}
          >
            Envoyer un Email
          </a>
          <a 
            href={data.profile.contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={UI_STYLES.buttonSecondary}
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-zinc-900 text-center space-y-8">
        <div className="text-zinc-600 text-[9px] font-mono uppercase tracking-[0.5em] font-bold">
          © 2026 {data.profile.name} // TOUS DROITS RÉSERVÉS
        </div>
        
        {!isEditMode && (
          <div className="flex justify-center">
            <button 
              onClick={() => setShowAdminLogin(true)}
              className="text-[10px] uppercase tracking-widest text-zinc-800 hover:text-zinc-500 transition-colors flex items-center gap-2"
            >
              <LogIn size={12} /> Connexion
            </button>
          </div>
        )}
      </footer>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {showAddProjectModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold tracking-tighter uppercase">Nouvel Événement</h3>
                <button onClick={() => setShowAddProjectModal(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className={UI_STYLES.label}>Titre du projet</label>
                    <input 
                      required
                      value={newProjectData.title}
                      onChange={(e) => setNewProjectData({ ...newProjectData, title: e.target.value })}
                      className={UI_STYLES.inputField}
                      placeholder="Ex: Festival Horizon"
                    />
                  </div>
                  <div>
                    <label className={UI_STYLES.label}>Catégorie (Existant ou Nouveau)</label>
                    <div className="relative">
                      <input 
                        list="categories-list"
                        required
                        value={newProjectData.category}
                        onChange={(e) => setNewProjectData({ ...newProjectData, category: e.target.value })}
                        className={UI_STYLES.inputField}
                        placeholder="Tapez ou sélectionnez..."
                      />
                      <datalist id="categories-list">
                        {categories.filter(c => c !== 'Tous').map(cat => (
                          <option key={cat} value={cat} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div>
                    <label className={UI_STYLES.label}>URL de l'image</label>
                    <input 
                      value={newProjectData.image}
                      onChange={(e) => setNewProjectData({ ...newProjectData, image: e.target.value })}
                      className={UI_STYLES.inputField}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className={UI_STYLES.label}>Lieu</label>
                    <input 
                      value={newProjectData.location}
                      onChange={(e) => setNewProjectData({ ...newProjectData, location: e.target.value })}
                      className={UI_STYLES.inputField}
                      placeholder="Ex: Paris, France"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className={UI_STYLES.label}>Année</label>
                    <input 
                      value={newProjectData.year}
                      onChange={(e) => setNewProjectData({ ...newProjectData, year: e.target.value })}
                      className={UI_STYLES.inputField}
                    />
                  </div>
                  <div>
                    <label className={UI_STYLES.label}>Rôle</label>
                    <input 
                      value={newProjectData.role}
                      onChange={(e) => setNewProjectData({ ...newProjectData, role: e.target.value })}
                      className={UI_STYLES.inputField}
                      placeholder="Ex: Régisseur Général"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">Jauge</label>
                      <input 
                        value={newProjectData.kpis?.jauge}
                        onChange={(e) => setNewProjectData({ ...newProjectData, kpis: { ...newProjectData.kpis!, jauge: e.target.value } })}
                        className={UI_STYLES.inputField}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">Staff</label>
                      <input 
                        value={newProjectData.kpis?.staff}
                        onChange={(e) => setNewProjectData({ ...newProjectData, kpis: { ...newProjectData.kpis!, staff: e.target.value } })}
                        className={UI_STYLES.inputField}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">Budget</label>
                      <input 
                        value={newProjectData.kpis?.budget}
                        onChange={(e) => setNewProjectData({ ...newProjectData, kpis: { ...newProjectData.kpis!, budget: e.target.value } })}
                        className={UI_STYLES.inputField}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={UI_STYLES.label}>Description</label>
                    <textarea 
                      value={newProjectData.description}
                      onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                      className={`${UI_STYLES.inputField} h-24 resize-none`}
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all rounded-sm shadow-lg">
                    Créer l'événement
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            originalProject={lastSavedData.projects.find(p => p.id === selectedProject.id)}
            onClose={() => setSelectedProject(null)} 
            isEditMode={isEditMode}
            onUpdate={(updates) => updateProject(selectedProject.id, updates)}
          />
        )}
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
