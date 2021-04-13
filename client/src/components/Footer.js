import { ROUTES } from 'config/routing/routes';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { SingleContext } from 'utility/contexts/MyContext';
import ExternalLink from './ExternalLink';
import './Footer.css';

const Footer = (props) => {
    const singleChart = useContext(SingleContext);
    const license = (
        <ExternalLink url="https://creativecommons.org/licenses/by/4.0/">
            <FormattedMessage id="footer.creative-commons" />
        </ExternalLink>
    );

    return (
        <footer className={`footer ${singleChart ? 'single' : ''}`}>
            <p>
                <FormattedMessage id="footer.license" values={{ license }} />
            </p>
            <div className="d-flex justify-content-between">
                <ExternalLink url="https://twitter.com/pagaia">
                    pagaia
                </ExternalLink>
                &nbsp;
                {/* {singleChart && (
          <a href="https://www.contaiciclisti.tk">www.contaiciclisti.tk</a>
        )} */}
                <Link to={ROUTES.CREDITS}>
                    <FormattedMessage id="credits" />
                </Link>
                <span>{`v${process.env.REACT_APP_VERSION}`}</span>
            </div>
        </footer>
    );
};

export default Footer;
