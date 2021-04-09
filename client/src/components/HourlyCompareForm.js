import React, { Fragment, useEffect, useState } from 'react';
import DatePicker from 'components/DatePicker';
import { convertArrayToObject } from 'utility/utilityFunctions';
import './CompareForm.css';
import Fade from './Fade';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const HourlyCompareForm = ({ updateSearch }) => {
    const [viewForm, toggleForm] = useState(true);
    const { devices: devicesStore } = useSelector((state) => state.devices);

    const [form, setForm] = useState({
        day: new Date(), // set today starting from 0 0 0
        devices: convertArrayToObject(devicesStore, 'properties.channelId'),
    });

    useEffect(() => {
        // hit search on mounting
        if (devicesStore?.length > 0) {
            handleSearch();
        }
    }, []);

    const handleChange = (e) => {
        const channelId = e.target.value;
        const { checked } = e.target;
        let devices;

        if (checked) {
            // add the device to the form
            const found = devicesStore.find(
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

    const handleChangeDay = (day) => {
        setForm({ ...form, day });
    };

    const handleSearch = () => {
        toggle();
        updateSearch(form);
    };

    const toggle = () => {
        toggleForm(!viewForm);
    };

    const renderForm = () => {
        return (
            <div className="compare">
                <h3>Please select minimun 2 devices</h3>
                <div className="row">
                    <div className="col-md-3">
                        {devicesStore.map((device, idx) => (
                            <Fragment key={idx}>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`${device.properties.name}-HourlyCompareForm`}
                                        name={`${device.properties.name}-HourlyCompareForm`}
                                        onChange={handleChange}
                                        value={device.properties.channelId}
                                        checked={
                                            !!form.devices[
                                                device.properties.channelId
                                            ]
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`${device.properties.name}-HourlyCompareForm`}
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
                            <label htmlFor="day">Day</label>
                            <DatePicker
                                selected={form.day}
                                onChange={handleChangeDay}
                            />
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
                       <FormattedMessage id="button.update-search"/>
                    </button>
                }
            >
                {renderForm()}
            </Fade>
        </Fragment>
    );
};

export default HourlyCompareForm;
