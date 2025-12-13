'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

type Translations = {
    [key in Language]: {
        // Navbar
        nav_home: string;
        nav_about: string;
        nav_impact: string;
        nav_projects: string;
        nav_get_involved: string;
        nav_donate: string;

        // Hero
        hero_title_prefix: string;
        hero_title_highlight: string;
        hero_title_suffix: string;
        hero_subtitle: string;
        hero_cta_plant: string;
        hero_cta_story: string;
        hero_stat_trees: string;
        hero_stat_communities: string;
        hero_stat_countries: string;
        hero_live_counter: string;

        // Payment/Success
        payment_modal_title: string;
        payment_modal_desc: string;
        payment_success_title: string;
        payment_success_msg: string;
        payment_processing: string;
    }
};

const translations: Translations = {
    en: {
        nav_home: 'TreeTap',
        nav_about: 'About',
        nav_impact: 'Impact',
        nav_projects: 'Projects',
        nav_get_involved: 'Get Involved',
        nav_donate: 'Donate',

        hero_title_prefix: 'Grow a ',
        hero_title_highlight: 'Greener Future',
        hero_title_suffix: ' Together',
        hero_subtitle: 'Join our mission to restore forests. $1 plants one real tree and empowers communities.',
        hero_cta_plant: '🌱 Plant a Tree ($1)',
        hero_cta_story: 'Learn Our Story',
        hero_stat_trees: 'Trees Planted',
        hero_stat_communities: 'Communities',
        hero_stat_countries: 'Countries',
        hero_live_counter: 'Live Impact Counter',

        payment_modal_title: 'Plant a Tree',
        payment_modal_desc: 'Your $1 donation will plant one mangrove tree in Madagascar.',
        payment_success_title: 'Tree Planted!',
        payment_success_msg: 'Thank you for making the world greener. 🌳',
        payment_processing: 'Processing...'
    },
    ar: {
        nav_home: 'تري-تاب',
        nav_about: 'عننا',
        nav_impact: 'تأثيرنا',
        nav_projects: 'مشاريعنا',
        nav_get_involved: 'شارك معنا',
        nav_donate: 'تبرع',

        hero_title_prefix: 'ازرع ',
        hero_title_highlight: 'مستقبلاً أخضر',
        hero_title_suffix: ' معاً',
        hero_subtitle: 'انضم لمهمتنا في إعادة تشجير الغابات. 1 دولار يزرع شجرة حقيقية ويمكّن المجتمعات.',
        hero_cta_plant: '🌱 ازرع شجرة (1$)',
        hero_cta_story: 'قصتنا',
        hero_stat_trees: 'شجرة مزروعة',
        hero_stat_communities: 'مجتمع مستفيد',
        hero_stat_countries: 'دول',
        hero_live_counter: 'عداد التأثير المباشر',

        payment_modal_title: 'ازرع شجرة',
        payment_modal_desc: 'تبرعك بـ 1 دولار سيزرع شجرة مانغروف واحدة في مدغشقر.',
        payment_success_title: 'تم زراعة الشجرة!',
        payment_success_msg: 'شكراً لمساهمتك في جعل العالم أكثر اخضراراً. 🌳',
        payment_processing: 'جاري المعالجة...'
    }
};

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: keyof Translations['en']) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const t = (key: keyof Translations['en']) => {
        return translations[language][key];
    };

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
            <div dir={dir} className={language === 'ar' ? 'font-arabic' : ''}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
