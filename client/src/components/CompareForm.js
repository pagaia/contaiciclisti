import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "components/DatePicker";
import { DEVICES } from "utility/constants";
import {
  convertArrayToObject,
  getLastMonthStartEndDatePicker,
} from "utility/utilityFunctions";
import "./CompareForm.css";
import Fade from "./Fade";

const { start: startDate, end: endDate } = getLastMonthStartEndDatePicker();

const CompareForm = ({ updateSearch }) => {
  const [viewForm, toggleForm] = useState(true);

  const [form, setForm] = useState({
    endDate,
    startDate,
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

  const handleStartDate = (startDate) => {
    setForm({ ...form, startDate });
  };

  const handleEndDate = (endDate) => {
    setForm({ ...form, endDate });
  };

  const validateForm = (form) => {
    const error = [];
    const period = (form.endDate - form.startDate) / (1000 * 60 * 60 * 24);
    if (period > 31 || period < 1) {
      error.push("-reduce the date period to max 1 month");
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
    endDate = endDate.toISOString().split("T")[0];
    updateSearch({
      ...form,
      endDate,
      startDate: form.startDate.toISOString().split("T")[0],
    });
  };

  const toggle = () => {
    toggleForm(!viewForm);
  };

  const renderForm = () => {
    return (
      <div className="compare">
        <h3>Please select minimun 2 devices and a window of max 1 month</h3>
        <div className="row">
          <div className="col-md-3">
            {DEVICES.map((device, idx) => (
              <Fragment key={idx}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`${device.properties.name}-CompareForm`}
                    name={`${device.properties.name}-CompareForm`}
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
              <label htmlFor="startDate">Start date</label>
              <DatePicker
                selected={form.startDate}
                onChange={handleStartDate}
              />

              <small id="startHelp" className="form-text text-muted">
                This is the start day for the comparison
              </small>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group">
              <label htmlFor="endDate">End date</label>

              <DatePicker selected={form.endDate} onChange={handleEndDate} />
              <small id="endHelp" className="form-text text-muted">
                This is the end day for the comparison
              </small>
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

export default CompareForm;
