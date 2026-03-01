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
  CheckCircle2
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
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        // Charger les données depuis localStorage si elles existent
        const savedData = localStorage.getItem('nct_portfolio_data');
        if (savedData) setData(JSON.parse(savedData));
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
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
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'projects' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-white'}`}
            >
              <Briefcase size={14} /> Projets
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Bio (Paragraphes)</label>
                <textarea 
                  rows={6}
                  value={data.profile.bioText.join('\n\n')}
                  onChange={(e) => updateProfile('bioText', e.target.value.split('\n\n'))}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-sm p-4 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tighter">Liste des projets</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                  <Plus size={14} /> Ajouter un projet
                </button>
              </div>
              
              <div className="space-y-4">
                {data.projects.map((project: any, idx: number) => (
                  <div key={project.id} className="p-6 bg-zinc-950 border border-zinc-900 rounded-sm flex justify-between items-center group hover:border-zinc-700 transition-all">
                    <div>
                      <div className="text-[8px] uppercase text-zinc-600 font-bold mb-1">{project.category} // {project.year}</div>
                      <div className="text-lg font-bold uppercase tracking-tighter">{project.title}</div>
                    </div>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-zinc-500 hover:text-white transition-colors"><LayoutDashboard size={16} /></button>
                      <button className="p-2 text-red-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
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
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
