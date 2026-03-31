import React, { useState, useEffect } from 'react'

const Place_info = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: { title: "O'zbekiston haqida (To'liq ma'lumot)" },
    ru: { title: "Об Узбекистане (Подробная информация)" },
    en: { title: "About Uzbekistan (Full information)" }
  };

  const t = translations[lang] || translations.uz;

  return (
    <div className="min-h-screen pt-40 px-5 md:px-[60px] flex justify-center text-3xl font-bold font-inter text-gray-800">
      {t.title}
    </div>
  )
}

export default Place_info