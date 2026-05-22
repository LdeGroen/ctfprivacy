import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Globe, Mail, ChevronRight, Shield } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend.cafetheaterfestival.nl';

function getSlugFromPath() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return path || null;
}

export default function App() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/public/privacy-policies?per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        const records = (json.data || json).filter(p => p.actief);
        setPolicies(records);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#20747F' }}>
        <p className="text-white text-lg">Laden…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#20747F' }}>
        <p className="text-white text-lg">Privacybeleid kon niet worden geladen.</p>
      </div>
    );
  }

  const slug = getSlugFromPath();

  if (slug) {
    const policy = policies.find(p => p.slug === slug);
    if (!policy) {
      return <NotFound />;
    }
    return <PolicyPage policy={policy} />;
  }

  return <OverviewPage policies={policies} />;
}

function OverviewPage({ policies }) {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" style={{ backgroundColor: '#20747F' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <Shield size={48} className="text-white opacity-80" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
          Privacybeleid
        </h1>
        <p className="text-white/70 text-center mb-12 text-lg">
          Café Theater Festival
        </p>

        <div className="space-y-3">
          {policies.map(policy => (
            <a
              key={policy.id}
              href={`/${policy.slug}`}
              className="flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-4 transition-all group"
            >
              <span className="text-white font-semibold text-lg">{policy.naam}</span>
              <ChevronRight size={22} className="text-white/60 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>

        {policies.length === 0 && (
          <p className="text-white/60 text-center">Geen privacyverklaringen beschikbaar.</p>
        )}
      </div>
    </div>
  );
}

function PolicyPage({ policy }) {
  const [language, setLanguage] = useState('nl');
  const hasEnglish = !!policy.inhoud_en;
  const content = language === 'nl' ? policy.inhoud_nl : (policy.inhoud_en || policy.inhoud_nl);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" style={{ backgroundColor: '#20747F' }}>
      <div className="max-w-4xl mx-auto">

        {/* Terug + taalwisselaar */}
        <div className="flex justify-between items-center mb-8">
          <a
            href="/"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/20 text-sm font-medium"
          >
            ← Alle verklaringen
          </a>
          {hasEnglish && (
            <button
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/20"
            >
              <Globe size={18} />
              <span className="font-medium uppercase">{language === 'nl' ? 'English' : 'Nederlands'}</span>
            </button>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
          {language === 'nl' ? `Privacybeleid — ${policy.naam}` : `Privacy policy — ${policy.naam}`}
        </h1>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800">
          <div className="p-8 md:p-12">
            <div
              className="prose max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || '') }}
            />
            <a
              href="mailto:Info@cafetheaterfestival.nl"
              className="inline-flex items-center gap-2 bg-[#20747F] text-white px-5 py-2 rounded-lg hover:bg-[#1a5f68] transition-colors mt-8"
            >
              <Mail size={18} />
              Info@cafetheaterfestival.nl
            </a>
          </div>
          <div className="bg-slate-50 px-8 py-4 text-center text-slate-500 text-sm border-t border-slate-100">
            © {new Date().getFullYear()} Café Theater Festival
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#20747F' }}>
      <p className="text-white text-xl font-semibold">Privacyverklaring niet gevonden.</p>
      <a href="/" className="text-white/70 hover:text-white underline text-sm">← Terug naar overzicht</a>
    </div>
  );
}
