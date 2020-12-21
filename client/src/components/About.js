import React, { Fragment } from "react";
import "./About.css";

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
            Conta i Ciclisti is a bottom-up project organized by Associazione
            SalvaiCiclisti Roma to count cyclists who cycle through Rome every
            day for any reason: work, leisure or simply go shopping. If you want
            to contribute to fund raising, more info on the project can be found
            on the page:{" "}
            <a href="http://www.salvaiciclistiroma.it/sostieni-il-progetto-contaiciclisti/">
              http://www.salvaiciclistiroma.it
            </a>{" "}
          </p>
          <p className="card-text lead">
            The data is collected and provided by{" "}
            <a href="https://nl.mathworks.com/matlabcentral/profile/authors/17274098">
              Federico Occhionero
            </a>
          </p>
          <a
            href="http://www.salvaiciclistiroma.it/sostieni-il-progetto-contaiciclisti/"
            className="btn btn-primary"
          >
            support the project
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
