import React from 'react';

const SetLanguage = () => {
    const lang = navigator.language;
    console.log({ lang });
    return <div style={{ height: 100, weight: 100 }}>LANG: {lang}</div>;
};

export default SetLanguage;
