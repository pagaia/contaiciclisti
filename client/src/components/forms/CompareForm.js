import React, { Fragment, useEffect, useState } from 'react';
import DatePicker from 'components/DatePicker';
import {
    convertArrayToObject,
    formatDate,
    formatDateAndHours,
    getLastMonthStartEndDatePicker,
} from 'utility/utilityFunctions';
import './CompareForm.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Fade from 'components/Fade';

const { start: startDate, end: endDate } = getLastMonthStartEndDatePicker();

const CompareForm = ({ updateSearch, nameForm = 'CompareForm' }) => {
    const [viewForm, toggleForm] = useState(true);

    const { devices: devicesStore } = useSelector((state) => state.devices);

    const [form, setForm] = useState({
        endDate,
        startDate,
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

    const handleStartDate = (startDate) => {
        setForm({ ...form, startDate });
    };

    const handleEndDate = (endDate) => {
        setForm({ ...form, endDate });
    };

    // const validateForm = (form) => {
    //     const error = [];
    //     const period = (form.endDate - form.startDate) / (1000 * 60 * 60 * 24);
    //     if (period > 32 || period < 1) {
    //         error.push('-max window: 1 month');
    //     }
    //     return error;
    // };

    const handleSearch = () => {
        // const error = validateForm(form);
        // if (error.length > 0) {
        //     const text = 'Please check data: \n' + error.join('\n');
        //     alert(text);

        //     return;
        // }
        toggle();
        let endDate = form.endDate;
        endDate.setHours(23, 59);
        endDate = formatDateAndHours(endDate);

        let startDate = formatDate(form.startDate);

        updateSearch({
            ...form,
            endDate,
            startDate,
        });
    };

    const toggle = () => {
        toggleForm(!viewForm);
    };

    const renderForm = () => {
        return (
            <div className="compare">
                <h3>
                    <FormattedMessage id="form.minimum-selection" />
                </h3>
                <div className="row">
                    <div className="col-md-3">
                        {devicesStore.map((device, idx) => {
                            const id = `${device.properties.name.replace(
                                ' ',
                                '-'
                            )}-${nameForm}`;
                            return (
                                <Fragment key={idx}>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={id}
                                            name={id}
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
                                            htmlFor={id}
                                        >
                                            {device.properties.name}
                                        </label>
                                    </div>
                                </Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="startDate">
                                <FormattedMessage id="form.start-date" />
                            </label>
                            <DatePicker
                                selected={form.startDate}
                                onChange={handleStartDate}
                            />

                            <small
                                id="startHelp"
                                className="form-text text-muted"
                            >
                                <FormattedMessage id="form.helper-start-day" />
                            </small>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="endDate">
                                <FormattedMessage id="form.end-date" />
                            </label>

                            <DatePicker
                                selected={form.endDate}
                                onChange={handleEndDate}
                            />
                            <small
                                id="endHelp"
                                className="form-text text-muted"
                            >
                                <FormattedMessage id="form.helper-end-day" />
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
                        <FormattedMessage id="button.update-search" />
                    </button>
                }
            >
                {renderForm()}
            </Fade>
        </Fragment>
    );
};

CompareForm.propTypes = {
    updateSearch: PropTypes.func,
};
export default CompareForm;
