import React from 'react';
import "./Languages.css";

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
                <img
                    width="32"
                    alt="Flag of the United Kingdom"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/64px-Flag_of_the_United_Kingdom.svg.png"
                ></img>
            </a>
            <a
                title="Set Italian language"
                href="#set-en-lang"
                onClick={handleChange('it')}
            >
                <img
                    width="16"
                    alt="Flag of Italy"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Italy_%281-1%29.png/32px-Flag_of_Italy_%281-1%29.png"
                ></img>
            </a>
        </div>
    );
};

export default Languages;
