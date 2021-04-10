import { useState } from 'react';
import { LANGUAGES } from 'utility/constants';

export const useLanguage = (props) => {
    // get first the language from the localStorage otherwise use the browser one
    var nvlang =
        localStorage.getItem('language') || navigator.language?.substring(0, 2);

    const [lang, updateLang] = useState(
        LANGUAGES.find((l) => l.code === nvlang) ? nvlang : 'it'
    );

    const setLang = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        updateLang(lang);
    };

    return [lang, setLang];
};
