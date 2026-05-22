import React, { useEffect, useState } from 'react';
import { Globe, Mail } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend.cafetheaterfestival.nl';
const SLUG = process.env.REACT_APP_PRIVACY_SLUG || 'app';

export default function App() {
  const [language, setLanguage] = useState('nl');
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/public/privacy-policies?per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        const records = json.data || json;
        const match = records.find(p => p.slug === SLUG) || records[0] || null;
        setPolicy(match);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const content = language === 'nl' ? policy?.inhoud_nl : (policy?.inhoud_en || policy?.inhoud_nl);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#20747F' }}>
        <p className="text-white text-lg">Laden…</p>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#20747F' }}>
        <p className="text-white text-lg">Privacybeleid kon niet worden geladen.</p>
      </div>
    );
  }

  const hasEnglish = !!policy.inhoud_en;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" style={{ backgroundColor: '#20747F' }}>
      <div className="max-w-4xl mx-auto">

        {/* Language Switcher */}
        {hasEnglish && (
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/20"
            >
              <Globe size={18} />
              <span className="font-medium uppercase">{language === 'nl' ? 'English' : 'Nederlands'}</span>
            </button>
          </div>
        )}

        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
          {policy.naam
            ? (language === 'nl'
                ? `Privacybeleid — ${policy.naam}`
                : `Privacy policy — ${policy.naam}`)
            : (language === 'nl' ? 'Privacybeleid' : 'Privacy policy')}
        </h1>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800">
          <div className="p-8 md:p-12">
            <div
              className="prose max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content || '' }}
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
