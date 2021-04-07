import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import './About.css';

const About = () => {
    return (
        <Fragment>
            <div className="about card">
                <img
                    className="card-img-top"
                    src="https://www.salvaiciclistiroma.it/wp-content/uploads/2020/12/copertina-fundme-1536x1026.jpg"
                    alt="Immagine di copertina per Conta i Ciclisti"
                />
                <div className="card-body">
                    <p className="card-text lead">
                        <FormattedMessage
                            id="about.description"
                            values={{
                                link: (
                                    <a href="http://www.salvaiciclistiroma.it/sostieni-il-progetto-contaiciclisti/">
                                        http://www.salvaiciclistiroma.it
                                    </a>
                                ),
                            }}
                        />
                    </p>
                    <p className="card-text lead">
                        <FormattedMessage
                            id="about.credits"
                            values={{
                                link: (
                                    <a href="https://nl.mathworks.com/matlabcentral/profile/authors/17274098">
                                        Federico Occhionero
                                    </a>
                                ),
                            }}
                        />
                    </p>
                    <a
                        href="http://www.salvaiciclistiroma.it/sostieni-il-progetto-contaiciclisti/"
                        className="btn btn-primary"
                    >
                        <FormattedMessage id="about.support" />
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default About;
