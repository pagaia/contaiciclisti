import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { SingleContext } from 'utility/contexts/MyContext';
import Languages from 'utility/Languages';
import "./Header.css";

const { Link } = require('react-router-dom');
const { default: ThemeSwitcher } = require('./ThemeSwitcher');

function Header({ setLang, lang }) {
    const singleChart = useContext(SingleContext);

    if (singleChart) {
        return null;
    }
    return (
        <header className="container-fluid">
            <h1 id="title">
                <Link to="/">
                    <FormattedMessage id="home.portal-title" />
                </Link>
            </h1>
            <div className="header-tool">
                <Languages setLang={setLang} lang={lang} />
                <ThemeSwitcher />
            </div>
        </header>
    );
}

export default Header;
