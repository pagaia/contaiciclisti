import React, { Fragment, useEffect, useState } from "react";
import { DEVICES } from "utility/constants";
import {
  convertArrayToObject,
  getWeeks,
  formatDateAndHours,
  formatDate,
} from "utility/utilityFunctions";
import "./CompareForm.css";
import Fade from "./Fade";


const WeekForm = ({ updateSearch }) => {
  const [viewForm, toggleForm] = useState(true);

  const weeks = getWeeks(new Date(), 5).reverse();

  const [form, setForm] = useState({
    week: 0,
    startDate: weeks[0]?.monday,
    endDate: weeks[0]?.sunday,
    devices: convertArrayToObject(DEVICES, "properties.channelId"),
  });

  useEffect(() => {
    // hit search on mounting
    handleSearch();
  }, []);

  const handleChange = (e) => {
    const channelId = e.target.value;
    const { checked } = e.target;
    let devices;

    if (checked) {
      // add the device to the form
      const found = DEVICES.find(
        (device) => device.properties.channelId == channelId
      );
      devices = {
        ...form.devices,
        [channelId]: found,
      };
    }
    // else remove the device from the form
    else {
      devices = Object.keys(form.devices).reduce((object, key) => {
        if (key !== channelId) {
          object[key] = form.devices[key];
        }
        return object;
      }, {});
    }

    setForm({
      ...form,
      devices,
    });
  };

  const handleChangeWeek = (event) => {
    const { value: number } = event.target;
    setForm({
      ...form,
      startDate: weeks[number]?.monday,
      endDate: weeks[number]?.sunday,
      week: number,
    });
  };

  const validateForm = (form) => {
    const error = [];
    const period = (form.endDate - form.startDate) / (1000 * 60 * 60 * 24);
    if (period > 32 || period < 1) {
      error.push("-max window: 1 month");
    }
    if (Object.entries(form.devices).length === 0) {
      error.push("-select at least 2 devices");
    }
    return error;
  };

  const handleSearch = () => {
    const error = validateForm(form);
    if (error.length > 0) {
      const text = "Please check data: \n" + error.join("\n");
      alert(text);
      return;
    }
    toggle();

    let endDate = form.endDate;
    endDate.setHours(23, 59);
    endDate = formatDateAndHours(endDate);
    updateSearch({
      ...form,
      endDate,
      startDate: formatDate(form.startDate),
    });
  };

  const toggle = () => {
    toggleForm(!viewForm);
  };

  const renderForm = () => {
    return (
      <div className="compare">
        <h3>Please select minimun 2 devices and a week</h3>
        <div className="row">
          <div className="col-md-3">
            {DEVICES.map((device, idx) => (
              <Fragment key={idx}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`${device.properties.name}-WeekForm`}
                    name={`${device.properties.name}-WeekForm`}
                    onChange={handleChange}
                    value={device.properties.channelId}
                    checked={!!form.devices[device.properties.channelId]}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${device.properties.name}-CompareForm`}
                  >
                    {device.properties.name}
                  </label>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="week">
                    Week
                  </label>
                </div>
                <select
                  className="custom-select"
                  id="week"
                  value={form.week}
                  onChange={handleChangeWeek}
                >
                  <option>Choose...</option>
                  {weeks.map((week, idx) => {
                    return (
                      <option key={idx} value={idx}>
                        {formatDate(week.monday)} - {formatDate(week.sunday)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Fade
        showMessage={viewForm}
        setShowMessage={toggleForm}
        button={
          <button onClick={toggle} className="btn btn-secondary">
            Update Search
          </button>
        }
      >
        {renderForm()}
      </Fade>
    </Fragment>
  );
};

export default WeekForm;
