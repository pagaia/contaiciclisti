import React from 'react';
import './Languages.css';
import ItFlag from 'images/it-flag.gif';
import UkFlag from 'images/uk-flag.gif';

const Languages = ({ setLang }) => {
    const handleChange = (lang) => (e) => {
        e.preventDefault();
        console.log(lang);
        setLang(lang);
    };

    return (
        <div className="lang">
            <a
                href="#set-en-lang"
                title="Set English language"
                onClick={handleChange('en')}
            >
                <img alt="Flag of the United Kingdom" src={UkFlag}></img>
            </a>
            <a
                title="Set Italian language"
                href="#set-en-lang"
                onClick={handleChange('it')}
            >
                <img alt="Flag of Italy" src={ItFlag}></img>
            </a>
        </div>
    );
};

export default Languages;
