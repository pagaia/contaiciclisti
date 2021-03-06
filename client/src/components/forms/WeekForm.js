import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import {
    convertArrayToObject,
    getWeeks,
    formatDateAndHours,
    formatDate,
} from 'utility/utilityFunctions';
import './CompareForm.css';
import Fade from '../Fade';

const WeekForm = ({ updateSearch }) => {
    const [viewForm, toggleForm] = useState(true);
    const { devices: devicesStore } = useSelector((state) => state.devices);

    const weeks = getWeeks(new Date('2020-11-01'));

    const [form, setForm] = useState({
        week: 1,
        startDate: weeks[1]?.monday,
        endDate: weeks[1]?.sunday,
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

    const handleChangeWeek = (event) => {
        const { value: number } = event.target;
        const startDate = weeks[number]?.monday;
        let endDate = weeks[number]?.sunday;
        const week = number;

        setForm({
            ...form,
            startDate,
            endDate,
            week,
        });

        // update search on changing week
        endDate.setHours(23, 59);
        endDate = formatDateAndHours(endDate);
        updateSearch({
            ...form,
            startDate: formatDate(startDate),
            endDate,
            week,
        });
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
                <h3>
                    <FormattedMessage id="title.min-2-devices-and-week" />
                </h3>
                <div className="row">
                    <div className="col-md-3">
                        {devicesStore.map((device, idx) => {
                            const id = `${device.properties.name.replace(
                                ' ',
                                '-'
                            )}-WeekForm`;
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
                    <div className="col-sm-6">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label
                                        className="input-group-text"
                                        htmlFor="week"
                                    >
                                        <FormattedMessage id="form.week" />
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
                                                {formatDate(week.monday)} -{' '}
                                                {formatDate(week.sunday)}
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
                            <FormattedMessage id="button.search" />
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

export default WeekForm;
