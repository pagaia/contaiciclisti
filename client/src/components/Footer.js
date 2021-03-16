import { ROUTES } from 'config/routing/routes';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SingleContext } from 'utility/contexts/MyContext';
import ExternalLink from './ExternalLink';
import './Footer.css';

const Footer = (props) => {
    const singleChart = useContext(SingleContext);

    return (
        <footer className={`footer ${singleChart ? 'single' : ''}`}>
            <p>
                Except where otherwise noted, content on this site is licensed
                under a{' '}
                <ExternalLink url="https://creativecommons.org/licenses/by/4.0/">
                    Creative Commons Attribution 4.0 International License
                </ExternalLink>
            </p>
            <div className="d-flex justify-content-between">
                <ExternalLink url="https://twitter.com/pagaia">
                    pagaia
                </ExternalLink>
                &nbsp;
                {/* {singleChart && (
          <a href="https://www.contaiciclisti.tk">www.contaiciclisti.tk</a>
        )} */}
                <Link to={ROUTES.CREDITS}>Credits</Link>
                <span>{`v${process.env.REACT_APP_VERSION}`}</span>
            </div>
        </footer>
    );
};

export default Footer;
