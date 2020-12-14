import "./App.css";
import { Fragment } from "react";
import { devices } from "./utility/constants";
import DailyAverage from "./components/DailyAverage";
import YesterdayHourly from "./components/YesterdayHourly";
import HourlyAverage from "./components/HourlyAverage";
import About from "./components/About";
import LastCount from "./components/LastCount";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="container"> 
        <h1 id="title">CiCO - Il Conta i Ciclisti Ostinati</h1>
        <About />
      </header>
      <div className="container">
        <h2>Hourly counts</h2>

        {devices.map((device) => (
          <Fragment key={device.name}>
            <h3>{device.name}</h3>

            <div className="row">
              <div className="col-sm-12 col-md-6">
                <YesterdayHourly device={device} />
              </div>
              <div className="col-sm-12 col-md-6">
                <LastCount device={device} />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <HourlyAverage device={device} />
              </div>
            </div>
            <hr className="mb-5 bg-warning"/>
          </Fragment>
        ))}
        <br />
        <h2>Daily Average comparison</h2>

        <div className="row">
          <div className="col-sm-12">
            <DailyAverage devices={devices} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
