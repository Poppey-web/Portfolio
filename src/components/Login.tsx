import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Tentative avec Firebase si configuré
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/admin');
        return;
      } catch (firebaseErr) {
        console.warn("Firebase login failed or not configured, checking hardcoded credentials.");
      }

      // Fallback sur les identifiants demandés par l'utilisateur
      if (email === 'nilscattiauxtruelle@gmail.com' && password === 'Coline33470@') {
        // Simuler une session réussie
        localStorage.setItem('nct_admin_session', 'true');
        navigate('/admin');
      } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch (err: any) {
      setError("Une erreur est survenue lors de la connexion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-900 rounded-sm"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex p-3 bg-zinc-900 border border-zinc-800 rounded-full mb-4">
            <Lock size={24} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase text-white">Accès Administrateur</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2">Nils Cattiaux-Truelle // Portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                placeholder="admin@nct.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-[10px] uppercase font-bold text-center">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Connexion..." : "Se connecter"} <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-zinc-600 text-[9px] uppercase tracking-widest hover:text-white transition-colors">
            Retour au site
          </button>
        </div>
      </motion.div>
    </div>
  );
}
