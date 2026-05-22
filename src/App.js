import React, { useState } from 'react';
import { Globe, Mail, ExternalLink } from 'lucide-react';

const App = () => {
  const [language, setLanguage] = useState('nl');

  const content = {
    nl: {
      mainTitle: "Privacybeleid van de Café Theater Festival apps",
      subHeader: "Privacybeleid voor de Café Theater Festival app",
      lastUpdated: "Laatst bijgewerkt: 4 maart 2026",
      intro: "Welkom bij de Café Theater Festival app. Deze app is ontworpen om u te helpen de timetable van het festival te bekijken, voorstellingen als favoriet te markeren, herinneringen in te stellen en evenementen aan uw agenda toe te voegen.",
      privacyIntro: "Uw privacy is belangrijk voor ons. Dit privacybeleid beschrijft hoe wij informatie verzamelen, gebruiken en beschermen wanneer u onze app gebruikt.",
      sections: [
        {
          title: "1. Welke informatie verzamelen wij?",
          content: [
            { label: "Favoriete voorstellingen", text: "Wanneer u een voorstelling als favoriet markeert, wordt deze informatie uitsluitend lokaal opgeslagen op uw apparaat in de lokale opslag van de app (localStorage). Deze gegevens worden niet naar externe servers verzonden." },
            { label: "Notificatietoestemming", text: "De app kan u om toestemming vragen om notificaties te tonen voor herinneringen aan voorstellingen. Uw keuze wordt lokaal door uw app beheerd." },
          ]
        },
        {
          title: "2. Hoe gebruiken wij uw informatie?",
          text: "De lokaal opgeslagen informatie wordt alleen gebruikt om u een gepersonaliseerde ervaring binnen de app te bieden."
        },
        {
          title: "3. Delen van uw informatie",
          text: "Wij delen uw lokaal opgeslagen informatie (zoals favorieten) met niemand."
        },
        {
          title: "4. Externe links",
          text: "Deze app bevat links naar externe websites (bijv. Google Calendar). Wanneer u op deze links klikt, verlaat u onze app. Wij zijn niet verantwoordelijk voor het privacybeleid van andere websites."
        },
        {
          title: "5. Beveiliging",
          text: "Aangezien alle persoonlijke gegevens lokaal op uw apparaat worden opgeslagen, zijn de beveiligingsrisico's minimaal."
        },
        {
          title: "6. Wijzigingen in dit privacybeleid",
          text: "We kunnen dit privacybeleid van tijd tot tijd bijwerken. Wijzigingen zijn onmiddellijk van kracht nadat ze in de app zijn geplaatst."
        },
        {
          title: "7. Contact met ons opnemen",
          text: "Als u vragen heeft over dit privacybeleid, kunt u contact met ons opnemen via:"
        }
      ]
    },
    en: {
      mainTitle: "Privacy policy of the Café Theater Festival apps",
      subHeader: "Privacy policy for the Café Theater Festival app",
      lastUpdated: "Last updated: March 7th, 2026",
      intro: "Welcome to the Café Theater Festival app. This app is designed to help you view the festival timetable, mark performances as favorites, set reminders, and add events to your calendar.",
      privacyIntro: "Your privacy is important to us. This privacy policy describes how we collect, use, and protect information when you use our app.",
      sections: [
        {
          title: "1. What information do we collect?",
          content: [
            { label: "Favorite performances", text: "When you mark a performance as a favorite, this information is stored exclusively on your device in the app's local storage (localStorage). This data is not sent to external servers." },
            { label: "Notification permission", text: "The app may ask for permission to show notifications for performance reminders. Your choice is managed locally by your app." },
          ]
        },
        {
          title: "2. How do we use your information?",
          text: "The locally stored information is only used to provide you with a personalized experience within the app."
        },
        {
          title: "3. Sharing your information",
          text: "We do not share your locally stored information (such as favorites) with anyone."
        },
        {
          title: "4. External links",
          text: "This app contains links to external websites (e.g., Google Calendar). When you click on these links, you leave our app. We are not responsible for the privacy policies of other websites."
        },
        {
          title: "5. Security",
          text: "Since all personal data is stored locally on your device, the security risks are minimal."
        },
        {
          title: "6. Changes to this privacy policy",
          text: "We may update this privacy policy from time to time. Changes are effective immediately after being posted in the app."
        },
        {
          title: "7. Contact us",
          text: "If you have any questions about this privacy policy, you can contact us at:"
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500" style={{ backgroundColor: '#20747F' }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/20"
          >
            <Globe size={18} />
            <span className="font-medium uppercase">{language === 'nl' ? 'English' : 'Nederlands'}</span>
          </button>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
          {t.mainTitle}
        </h1>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#20747F] mb-2">{t.subHeader}</h2>
            <p className="text-sm text-slate-500 mb-8 italic">{t.lastUpdated}</p>
            
            <div className="space-y-6 leading-relaxed">
              <p>{t.intro}</p>
              <p>{t.privacyIntro}</p>

              {t.sections.map((section, idx) => (
                <div key={idx} className="pt-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                    {section.title}
                  </h3>
                  
                  {section.text && <p className="mb-4">{section.text}</p>}
                  
                  {section.content && (
                    <div className="space-y-4">
                      {section.content.map((item, i) => (
                        <p key={i}>
                          <span className="font-bold text-[#20747F]">{item.label}:</span> {item.text}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.list && (
                    <ul className="list-disc pl-5 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i}>
                          <span className="font-bold">{item.label}:</span> {item.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Special case for Google Privacy Policy Link */}
                  {idx === 2 && (
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#20747F] hover:underline font-semibold mt-2"
                    >
                      Google Privacy Policy <ExternalLink size={14} />
                    </a>
                  )}

                  {/* Special case for Contact Email */}
                  {idx === 7 && (
                    <a 
                      href="mailto:Info@cafetheaterfestival.nl" 
                      className="inline-flex items-center gap-2 bg-[#20747F] text-white px-5 py-2 rounded-lg hover:bg-[#1a5f68] transition-colors mt-4"
                    >
                      <Mail size={18} />
                      Info@cafetheaterfestival.nl
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 px-8 py-4 text-center text-slate-500 text-sm border-t border-slate-100">
            © {new Date().getFullYear()} Café Theater Festival
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;