import { useContext } from 'react';
import { SingleContext } from 'utility/contexts/MyContext';

const { Link } = require('react-router-dom');
const { default: ThemeSwitcher } = require('./ThemeSwitcher');

function Header() {
    const singleChart = useContext(SingleContext);

    if (singleChart) {
        return null;
    }
    return (
        <header className="container-fluid">
            <h1 id="title">
                <Link to="/">Portale Sperimentale</Link>
            </h1>
            <ThemeSwitcher />
        </header>
    );
}

export default Header;
