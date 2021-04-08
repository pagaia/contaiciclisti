import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Footer from 'components/Footer';
import { LANGUAGES, REGEX_SINGLE } from 'utility/constants';
import { SingleContext } from 'utility/contexts/MyContext';
import ThemeContext, { THEMES } from 'utility/contexts/ThemeContext';
import 'images/imageLibrary';
import { useQuery } from 'utility/utilityFunctions';
import routes from 'config/routing/routes';
import { fetchDevices, fetchSecretDevices } from 'store/devicesSlide';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import LogError from 'utility/logError';
import { setSecret } from 'store/generalSlide';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl';

import messages from 'i18n/messages.json';

function App() {
    let location = useLocation();
    let query = useQuery();
    const secret = query.get('secret');

    const [theme, setTheme] = useState(THEMES.DARK);
    const themeValue = { theme, setTheme };

    const { devices } = useSelector((state) => state.devices);

    const nvlang = navigator.language?.substring(0, 2);
    const [lang, setLang] = useState(
        LANGUAGES.find((l) => l.code === nvlang) ? nvlang : 'it'
    );

    const changeLanguage = (lang) => {
        document.documentElement.lang = lang;
        setLang(lang);
    };

    const dispatch = useDispatch();

    const hideLoader = () => {
        var element = document.getElementById('first-loading');
        if (element) {
            element.style.className = 'dissolve';
            setTimeout(() => {
                element.style.visibility = 'hidden';
            }, 2000);
        }
    };

    useEffect(() => {
        const queryTheme = query.get('theme');
        hideLoader();
        if (
            queryTheme &&
            queryTheme !== theme &&
            Object.values(THEMES).includes(queryTheme)
        ) {
            setTheme(queryTheme);
        }

        // load device if not yet loaded
        if (!devices.length) {
            if (secret) {
                dispatch(fetchSecretDevices());
                dispatch(setSecret(secret));
            } else {
                dispatch(fetchDevices());
            }
        }
    }, []);

    // update the context
    const singleChart = REGEX_SINGLE.test(location.pathname);

    return (
        <SingleContext.Provider value={singleChart}>
            <ThemeContext.Provider value={themeValue}>
                <IntlProvider
                    messages={messages[lang]}
                    locale={lang}
                    defaultLocale="en"
                >
                    <div
                        className={`App ${
                            singleChart ? 'single' : ''
                        } ${theme}`}
                    >
                        {/* remove title if single chart */}
                        <Header setLang={changeLanguage} lang={lang} />
                        <LogError />
                        {/* <SiteMap /> */}
                        <main className={singleChart ? '' : 'container-fluid'}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    {routes.map((route, idx) => (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            exact
                                            component={lazy(() =>
                                                import(`${route.component}`)
                                            )}
                                        />
                                    ))}
                                </Switch>
                            </Suspense>
                        </main>
                        <Footer />
                    </div>
                </IntlProvider>
            </ThemeContext.Provider>
        </SingleContext.Provider>
    );
}

export default App;
