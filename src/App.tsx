import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Zap,
  MapPin,
  Download,
  Image as ImageIcon,
  X,
  Mail,
  Linkedin,
  Phone
} from 'lucide-react';
import { portfolioData } from './data';

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

const HighlightedText = ({ text, className = "" }: { text?: string; className?: string }) => {
  if (!text) return null;
  const terms = ["AutoCAD", "OH&S", "Melbourne", "White Card", "RSA"];
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => 
        terms.some(term => term.toLowerCase() === part.toLowerCase()) 
          ? <span key={i} className="font-black text-white">{part}</span> 
          : part
      )}
    </span>
  );
};

const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  if (!project) return null;
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
          </div>
          <div className="p-6 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                <span>{project.category}</span>
                <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                <span>{project.year}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-none text-white uppercase">
                {project.title}
              </h2>
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-4 font-bold">
                Rôle: {project.role}
              </div>
              <div className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                <HighlightedText text={project.description} />
              </div>
              
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <div className="text-zinc-400 text-[10px] uppercase tracking-widest mb-6 font-bold">En chiffres</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">Jauge</div>
                    <div className="text-lg font-bold text-white">{project.kpis?.jauge}</div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">Budget</div>
                    <div className="text-lg font-bold text-white">{project.kpis?.budget}</div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">Staff</div>
                    <div className="text-lg font-bold text-white">{project.kpis?.staff}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <MapPin size={14} className="text-zinc-600" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [filter, setFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const profile = portfolioData.profile;
  const projects = portfolioData.projects || [];

  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') return projects;
    return projects.filter(p => p.category === filter);
  }, [filter, projects]);

  const categories = useMemo(() => {
    const base = ['Tous'];
    const projectCats = Array.from(new Set(projects.map(p => p.category)));
    const sortedCats = projectCats.filter(c => c !== 'Tous').sort();
    return [...base, ...sortedCats];
  }, [projects]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold tracking-tighter text-white">
            {profile?.name}
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <a href="#projects" className="hover:text-white transition-colors">Projets</a>
              <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
              <a href="#about" className="hover:text-white transition-colors">Bio</a>
            </div>
            {profile?.contact?.cvUrl && (
              <a 
                href={profile.contact.cvUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <Download size={14} />
                CV
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-500/20">
              Melbourne Expert
            </div>
            <div className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
              AutoCAD (CAO)
            </div>
          </div>
          <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-[0.4em] mb-6 font-bold">
            {profile?.role}
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 text-white uppercase">
            {profile?.heroTitle}
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
            {profile?.heroSubtitle}
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
              {profile?.projectsSubtitle}
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {categories?.map(cat => (
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
            {filteredProjects?.map((project) => (
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
                    <HighlightedText text={project.description} />
                  </p>

                  <div className="grid grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">Jauge</div>
                      <div className="text-[10px] text-zinc-300 font-bold">{project.kpis?.jauge}</div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">Staff</div>
                      <div className="text-[10px] text-zinc-300 font-bold">{project.kpis?.staff}</div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">Localisation</div>
                      <div className="text-[10px] text-zinc-300 font-bold truncate"><HighlightedText text={project.location} /></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 sm:py-32 px-4 sm:px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-8 text-white uppercase">
                {profile?.expertise?.title}
              </h2>
              <div className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-12">
                {profile?.expertise?.description}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {profile?.expertise?.skills?.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-white group">
                    <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-sm group-hover:border-zinc-600 transition-colors">
                      <Zap size={16} className="text-zinc-400" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-[10px] text-zinc-300">
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] mb-8 font-bold">Compétences Techniques</div>
              <div className="flex flex-wrap gap-4">
                {profile?.technicalSkills?.map((skill, idx) => (
                  <div key={idx} className="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center gap-3 group hover:border-blue-500/50 transition-all">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      {skill.label}
                    </span>
                  </div>
                ))}
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
              {profile?.bioTitle}
            </h2>
            <div className="space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
              {profile?.bioText?.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>

            {/* Mentors Section */}
            <div className="mt-16 pt-16 border-t border-zinc-900">
              <div className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] mb-8 font-bold">Formé par</div>
              <div className="flex flex-wrap gap-8">
                {profile?.mentors?.map((mentor, idx) => (
                  <div key={idx} className="group">
                    <div className="text-zinc-500 text-[8px] uppercase tracking-widest mb-1 font-bold">Mentor // 0{idx + 1}</div>
                    <div className="text-xl font-bold text-white tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                      {mentor.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 border border-zinc-900 bg-zinc-950 rounded-sm">
              <div className="text-zinc-500 text-[9px] uppercase tracking-widest mb-8 font-bold">Engagement Professionnel</div>
              <ul className="space-y-4">
                {profile?.professionalEngagement?.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center py-3 border-b border-zinc-900 last:border-0">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider">{item.label}</span>
                    <span className="text-[10px] font-mono text-white font-bold text-right">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-20 sm:py-32 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-8 text-white uppercase">
                {profile?.contact?.title}
              </h2>
              <div className="flex flex-wrap gap-6">
                {profile?.contact?.email && (
                  <a 
                    href={`mailto:${profile.contact.email}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                  >
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full group-hover:border-blue-500 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase font-bold tracking-widest text-zinc-600">Email</span>
                      <span className="text-sm font-mono">{profile.contact.email}</span>
                    </div>
                  </a>
                )}
                {profile?.contact?.linkedin && (
                  <a 
                    href={profile.contact.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                  >
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full group-hover:border-blue-500 transition-colors">
                      <Linkedin size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase font-bold tracking-widest text-zinc-600">LinkedIn</span>
                      <span className="text-sm font-mono">Nils Cattiaux-Truelle</span>
                    </div>
                  </a>
                )}
                {profile?.contact?.phone && (
                  <a 
                    href={`tel:${profile.contact.phone.replace(/\s/g, '')}`} 
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                  >
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full group-hover:border-blue-500 transition-colors">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase font-bold tracking-widest text-zinc-600">Téléphone</span>
                      <span className="text-sm font-mono">{profile.contact.phone}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-mono uppercase tracking-[0.5em] font-bold text-zinc-700 mb-4">
                © 2026 {profile?.name}
              </div>
              <div className="text-[8px] uppercase tracking-widest text-zinc-800">
                PRODUIT PAR L'EXCELLENCE OPÉRATIONNELLE
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
