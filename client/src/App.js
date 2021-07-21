import Footer from 'components/Footer';
import Header from 'components/Header';
import routes from 'config/routing/routes';
import { ProvideAuth } from 'hooks/useAuth';
import { useLanguage } from 'hooks/useLanguage';
import messages from 'i18n/messages.json';
import 'images/imageLibrary';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { fetchDevices, fetchSecretDevices } from 'store/devicesSlide';
import { setSecret } from 'store/generalSlide';
import { REGEX_SINGLE } from 'utility/constants';
import { SingleContext } from 'utility/contexts/MyContext';
import ThemeContext, { THEMES } from 'utility/contexts/ThemeContext';
import LogError from 'utility/logError';
import { useQuery } from 'utility/utilityFunctions';
import './App.css';

function App() {
    let location = useLocation();
    let query = useQuery();
    const secret = query.get('secret');

    const [theme, setTheme] = useState(localStorage.getItem('theme') || THEMES.DARK);
    const themeValue = { theme, setTheme };

    const { devices } = useSelector((state) => state.devices);

    const [lang, setLang] = useLanguage();

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
        if (queryTheme && queryTheme !== theme && Object.values(THEMES).includes(queryTheme)) {
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
        // <ProvideAuth>
        //     <SingleContext.Provider value={singleChart}>
        //         <ThemeContext.Provider value={themeValue}>
        //             <IntlProvider
        //                 messages={messages[lang]}
        //                 locale={lang}
        //                 defaultLocale="en"
        //             >
        //                 <div
        //                     className={`App ${
        //                         singleChart ? 'single' : ''
        //                     } ${theme}`}
        //                 >
        //                     {/* remove title if single chart */}
        //                     <Header setLang={setLang} lang={lang} />
        //                     <LogError />
        //                     {/* <SiteMap /> */}
        //                     <main
        //                         className={singleChart ? '' : 'container-fluid'}
        //                     >
        //                         <Suspense fallback={<div>Loading...</div>}>
        //                             <Switch>
        //                                 {routes.map((route, idx) => (
        //                                     <Route
        //                                         key={route.path}
        //                                         path={route.path}
        //                                         exact
        //                                         component={lazy(() =>
        //                                             import(`${route.component}`)
        //                                         )}
        //                                     />
        //                                 ))}
        //                             </Switch>
        //                         </Suspense>
        //                     </main>
        //                     <Footer />
        //                 </div>
        //             </IntlProvider>
        //         </ThemeContext.Provider>
        //     </SingleContext.Provider>
        // </ProvideAuth>
        <ProvideAuth>
            <SingleContext.Provider value={singleChart}>
                <ThemeContext.Provider value={themeValue}>
                    <IntlProvider messages={messages[lang]} locale={lang} defaultLocale="en">
                        <div className={`App ${singleChart ? 'single' : ''} ${theme}`}>
                            {/* remove title if single chart */}
                            <Header setLang={setLang} lang={lang} />
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
                                                component={lazy(() => import(`${route.component}`))}
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
        </ProvideAuth>
    );
}

export default App;
