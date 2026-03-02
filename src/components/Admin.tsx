import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  Briefcase, 
  User, 
  Settings,
  ArrowLeft,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { portfolioData as initialData } from '../data';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const mockSession = localStorage.getItem('nct_admin_session');
      
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        if (u || mockSession === 'true') {
          setUser(u || { email: 'nilscattiauxtruelle@gmail.com', displayName: 'Nils' });
          // Charger les données depuis localStorage si elles existent
          const savedData = localStorage.getItem('nct_portfolio_data');
          if (savedData) {
            const parsed = JSON.parse(savedData);
            // Fusionner avec initialData pour s'assurer que les nouvelles propriétés (comme ui) existent
            setData({
              ...initialData,
              ...parsed,
              profile: {
                ...initialData.profile,
                ...(parsed.profile || {}),
                ui: {
                  ...initialData.profile.ui,
                  ...(parsed.profile?.ui || {})
                }
              }
            });
          }
          setLoading(false);
        } else {
          navigate('/login');
          setLoading(false);
        }
      });
      return unsubscribe;
    };

    const unsubscribe = checkAuth();
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('nct_admin_session');
    navigate('/login');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulation de sauvegarde (localStorage pour la démo, API pour la prod)
    localStorage.setItem('nct_portfolio_data', JSON.stringify(data));
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const updateProfile = (field: string, value: any) => {
    setData({
      ...data,
      profile: { ...data.profile, [field]: value }
    });
  };

  const updateUI = (section: string, field: string, value: string) => {
    setData({
      ...data,
      profile: {
        ...data.profile,
        ui: {
          ...data.profile.ui,
          [section]: {
            ...data.profile.ui[section],
            [field]: value
          }
        }
      }
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    setData({
      ...data,
      projects: data.projects.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const updateProjectKPI = (projectId: string, kpi: string, value: string) => {
    setData({
      ...data,
      projects: data.projects.map((p: any) => 
        p.id === projectId 
          ? { ...p, kpis: { ...p.kpis, [kpi]: value } } 
          : p
      )
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'Nouveau Projet',
      category: 'Catégorie',
      image: '',
      description: 'Description du projet...',
      role: 'Votre rôle',
      link: '#',
      kpis: { jauge: '-', budget: '-', staff: '-' },
      year: new Date().getFullYear().toString(),
      location: 'Lieu'
    };
    setData({
      ...data,
      projects: [newProject, ...data.projects]
    });
  };

  const deleteProject = (id: string) => {
    if (window.confirm('Supprimer ce projet ?')) {
      setData({
        ...data,
        projects: data.projects.filter((p: any) => p.id !== id)
      });
    }
  };

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Chargement...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-black text-xs">NCT</div>
            <div className="text-xs font-bold uppercase tracking-widest">Admin Panel</div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'profile' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-white'}`}
            >
              <User size={14} /> Profil & Bio
            </button>
            <button 
              onClick={() => setActiveTab('expertise')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'expertise' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-white'}`}
            >
              <Zap size={14} /> Expertise & Skills
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'projects' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-white'}`}
            >
              <Briefcase size={14} /> Projets
            </button>
            <button 
              onClick={() => setActiveTab('ui')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'ui' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-white'}`}
            >
              <LayoutDashboard size={14} /> Libellés UI
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'settings' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-white'}`}
            >
              <Settings size={14} /> Contact & CV
            </button>
          </nav>
        </div>

        <div className="mt-10 space-y-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> Voir le site
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen no-scrollbar">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">Modification du Portfolio</h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Connecté en tant que {user?.email}</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saveStatus !== 'idle'}
            className={`flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${
              saveStatus === 'saved' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saveStatus === 'saving' ? "Sauvegarde..." : saveStatus === 'saved' ? <><CheckCircle2 size={14} /> Sauvegardé</> : <><Save size={14} /> Enregistrer</>}
          </button>
        </header>

        <div className="max-w-4xl">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <section className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 border-b border-zinc-900 pb-2">Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Nom complet</label>
                    <input 
                      type="text" 
                      value={data.profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Rôle / Titre</label>
                    <input 
                      type="text" 
                      value={data.profile.role}
                      onChange={(e) => updateProfile('role', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Titre Hero</label>
                    <input 
                      type="text" 
                      value={data.profile.heroTitle}
                      onChange={(e) => updateProfile('heroTitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Sous-titre Hero</label>
                    <input 
                      type="text" 
                      value={data.profile.heroSubtitle}
                      onChange={(e) => updateProfile('heroSubtitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 border-b border-zinc-900 pb-2">Bio & Mentors</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Titre Bio</label>
                    <input 
                      type="text" 
                      value={data.profile.bioTitle}
                      onChange={(e) => updateProfile('bioTitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Bio (Paragraphes - Séparés par double saut de ligne)</label>
                    <textarea 
                      rows={6}
                      value={data.profile.bioText.join('\n\n')}
                      onChange={(e) => updateProfile('bioText', e.target.value.split('\n\n'))}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">Mentors</label>
                  <div className="space-y-4">
                    {data.profile.mentors.map((mentor: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <input 
                          type="text" 
                          value={mentor.name}
                          onChange={(e) => {
                            const newMentors = [...data.profile.mentors];
                            newMentors[idx] = { ...newMentors[idx], name: e.target.value };
                            updateProfile('mentors', newMentors);
                          }}
                          placeholder="Nom du mentor"
                          className="flex-1 bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                        />
                        <button 
                          onClick={() => {
                            const newMentors = data.profile.mentors.filter((_: any, i: number) => i !== idx);
                            updateProfile('mentors', newMentors);
                          }}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => updateProfile('mentors', [...data.profile.mentors, { name: '' }])}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-[8px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
                    >
                      <Plus size={12} /> Ajouter un mentor
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'expertise' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <section className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 border-b border-zinc-900 pb-2">Expertise Section</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Titre Expertise</label>
                    <input 
                      type="text" 
                      value={data.profile.expertise.title}
                      onChange={(e) => setData({...data, profile: {...data.profile, expertise: {...data.profile.expertise, title: e.target.value}}})}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Description Expertise</label>
                    <textarea 
                      rows={4}
                      value={data.profile.expertise.description}
                      onChange={(e) => setData({...data, profile: {...data.profile, expertise: {...data.profile.expertise, description: e.target.value}}})}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 border-b border-zinc-900 pb-2">Skills & Badges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">Expertise Skills (avec icône éclair)</label>
                    <div className="space-y-3">
                      {data.profile.expertise.skills.map((skill: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input 
                            type="text" 
                            value={skill.label}
                            onChange={(e) => {
                              const newSkills = [...data.profile.expertise.skills];
                              newSkills[idx] = { ...newSkills[idx], label: e.target.value };
                              setData({...data, profile: {...data.profile, expertise: {...data.profile.expertise, skills: newSkills}}});
                            }}
                            className="flex-1 bg-zinc-950 border border-zinc-900 rounded-sm p-2 text-xs focus:border-blue-500 outline-none"
                          />
                          <button onClick={() => {
                            const newSkills = data.profile.expertise.skills.filter((_: any, i: number) => i !== idx);
                            setData({...data, profile: {...data.profile, expertise: {...data.profile.expertise, skills: newSkills}}});
                          }} className="p-2 text-red-500"><Trash2 size={12} /></button>
                        </div>
                      ))}
                      <button onClick={() => setData({...data, profile: {...data.profile, expertise: {...data.profile.expertise, skills: [...data.profile.expertise.skills, { label: '' }]}}})} className="text-[8px] uppercase font-bold tracking-widest text-zinc-500 hover:text-white">+ Ajouter</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">Technical Skills (Badges Hero)</label>
                    <div className="space-y-3">
                      {data.profile.technicalSkills.map((skill: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input 
                            type="text" 
                            value={skill.label}
                            onChange={(e) => {
                              const newSkills = [...data.profile.technicalSkills];
                              newSkills[idx] = { ...newSkills[idx], label: e.target.value };
                              updateProfile('technicalSkills', newSkills);
                            }}
                            className="flex-1 bg-zinc-950 border border-zinc-900 rounded-sm p-2 text-xs focus:border-blue-500 outline-none"
                          />
                          <button onClick={() => {
                            const newSkills = data.profile.technicalSkills.filter((_: any, i: number) => i !== idx);
                            updateProfile('technicalSkills', newSkills);
                          }} className="p-2 text-red-500"><Trash2 size={12} /></button>
                        </div>
                      ))}
                      <button onClick={() => updateProfile('technicalSkills', [...data.profile.technicalSkills, { label: '' }])} className="text-[8px] uppercase font-bold tracking-widest text-zinc-500 hover:text-white">+ Ajouter</button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <section className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 border-b border-zinc-900 pb-2">Section Titres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Titre Section Projets</label>
                    <input 
                      type="text" 
                      value={data.profile.projectsTitle}
                      onChange={(e) => updateProfile('projectsTitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Sous-titre Section Projets</label>
                    <input 
                      type="text" 
                      value={data.profile.projectsSubtitle}
                      onChange={(e) => updateProfile('projectsSubtitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Liste des projets</h3>
                  <button 
                    onClick={addProject}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
                  >
                    <Plus size={14} /> Ajouter un projet
                  </button>
                </div>
                
                <div className="space-y-4">
                {data.projects.map((project: any) => (
                  <div key={project.id} className="bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden">
                    <div className="p-6 flex justify-between items-center group hover:bg-zinc-900/50 transition-all">
                      <div onClick={() => setEditingProjectId(editingProjectId === project.id ? null : project.id)} className="cursor-pointer flex-1">
                        <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">{project.category} // {project.year}</div>
                        <div className="text-lg font-bold uppercase tracking-tighter">{project.title}</div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setEditingProjectId(editingProjectId === project.id ? null : project.id)}
                          className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                          <Settings size={16} />
                        </button>
                        <button 
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {editingProjectId === project.id && (
                      <div className="p-6 border-t border-zinc-900 bg-black space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Titre</label>
                            <input 
                              type="text" 
                              value={project.title}
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Catégorie</label>
                            <input 
                              type="text" 
                              value={project.category}
                              onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Image URL</label>
                            <input 
                              type="text" 
                              value={project.image}
                              onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Lien (URL)</label>
                            <input 
                              type="text" 
                              value={project.link || ''}
                              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Année</label>
                            <input 
                              type="text" 
                              value={project.year}
                              onChange={(e) => updateProject(project.id, 'year', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Rôle</label>
                            <input 
                              type="text" 
                              value={project.role}
                              onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Description</label>
                          <textarea 
                            rows={4}
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div className="pt-4 border-t border-zinc-900">
                          <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-4">Indicateurs (KPIs)</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[7px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Jauge</label>
                              <input 
                                type="text" 
                                value={project.kpis?.jauge || ''}
                                onChange={(e) => updateProjectKPI(project.id, 'jauge', e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[7px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Budget</label>
                              <input 
                                type="text" 
                                value={project.kpis?.budget || ''}
                                onChange={(e) => updateProjectKPI(project.id, 'budget', e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[7px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Staff</label>
                              <input 
                                type="text" 
                                value={project.kpis?.staff || ''}
                                onChange={(e) => updateProjectKPI(project.id, 'staff', e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

          {activeTab === 'ui' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 border-b border-zinc-900 pb-2">Navigation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(data.profile.ui.nav).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{key}</label>
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => updateUI('nav', key, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 border-b border-zinc-900 pb-2">Projets (Labels)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(data.profile.ui.projects).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{key}</label>
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => updateUI('projects', key, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 border-b border-zinc-900 pb-2">Bio & Mentors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(data.profile.ui.about).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{key}</label>
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => updateUI('about', key, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 border-b border-zinc-900 pb-2">Hero & Commun</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">CTA Hero</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.hero.cta}
                      onChange={(e) => updateUI('hero', 'cta', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Image non disponible</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.imageNotAvailable}
                      onChange={(e) => updateUI('common', 'imageNotAvailable', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Titre Login</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginTitle}
                      onChange={(e) => updateUI('common', 'loginTitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Sous-titre Login</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginSubtitle}
                      onChange={(e) => updateUI('common', 'loginSubtitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Label Email Login</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginEmailLabel}
                      onChange={(e) => updateUI('common', 'loginEmailLabel', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Label Password Login</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginPasswordLabel}
                      onChange={(e) => updateUI('common', 'loginPasswordLabel', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Bouton Login</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginButton}
                      onChange={(e) => updateUI('common', 'loginButton', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Erreur Login</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginError}
                      onChange={(e) => updateUI('common', 'loginError', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Retour au site</label>
                    <input 
                      type="text" 
                      value={data.profile.ui.common.loginBack}
                      onChange={(e) => updateUI('common', 'loginBack', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 border-b border-zinc-900 pb-2">Footer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(data.profile.ui.footer).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{key}</label>
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => updateUI('footer', key, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 border-b border-zinc-900 pb-2">Mots-clés en gras</h3>
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Liste (séparés par des virgules)</label>
                  <input 
                    type="text" 
                    value={data.profile.highlightTerms.join(', ')}
                    onChange={(e) => updateProfile('highlightTerms', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                  />
                  <p className="text-[8px] text-zinc-600 mt-2 uppercase tracking-widest">Ces mots seront automatiquement mis en gras dans les descriptions de projets.</p>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Email de contact</label>
                  <input 
                    type="email" 
                    value={data.profile.contact.email}
                    onChange={(e) => setData({...data, profile: {...data.profile, contact: {...data.profile.contact, email: e.target.value}}})}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Lien CV (URL)</label>
                  <input 
                    type="text" 
                    value={data.profile.contact.cvUrl}
                    onChange={(e) => setData({...data, profile: {...data.profile, contact: {...data.profile.contact, cvUrl: e.target.value}}})}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">LinkedIn URL</label>
                  <input 
                    type="text" 
                    value={data.profile.contact.linkedin}
                    onChange={(e) => setData({...data, profile: {...data.profile, contact: {...data.profile.contact, linkedin: e.target.value}}})}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Téléphone</label>
                  <input 
                    type="text" 
                    value={data.profile.contact.phone}
                    onChange={(e) => setData({...data, profile: {...data.profile, contact: {...data.profile.contact, phone: e.target.value}}})}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Titre Contact Section</label>
                  <input 
                    type="text" 
                    value={data.profile.contact.title}
                    onChange={(e) => setData({...data, profile: {...data.profile, contact: {...data.profile.contact, title: e.target.value}}})}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-900">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6">Engagement Professionnel (Stats Hero)</h3>
                <div className="space-y-4">
                  {data.profile.professionalEngagement.map((item: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-4 items-center">
                      <input 
                        type="text" 
                        value={item.label}
                        onChange={(e) => {
                          const newEng = [...data.profile.professionalEngagement];
                          newEng[idx] = { ...newEng[idx], label: e.target.value };
                          updateProfile('professionalEngagement', newEng);
                        }}
                        placeholder="Label"
                        className="bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={item.value}
                          onChange={(e) => {
                            const newEng = [...data.profile.professionalEngagement];
                            newEng[idx] = { ...newEng[idx], value: e.target.value };
                            updateProfile('professionalEngagement', newEng);
                          }}
                          placeholder="Valeur"
                          className="flex-1 bg-zinc-950 border border-zinc-900 rounded-sm p-3 text-xs focus:border-blue-500 outline-none"
                        />
                        <button onClick={() => {
                          const newEng = data.profile.professionalEngagement.filter((_: any, i: number) => i !== idx);
                          updateProfile('professionalEngagement', newEng);
                        }} className="p-2 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => updateProfile('professionalEngagement', [...data.profile.professionalEngagement, { label: '', value: '' }])} className="text-[8px] uppercase font-bold tracking-widest text-zinc-500 hover:text-white">+ Ajouter un engagement</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
