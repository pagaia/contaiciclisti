import React, { Fragment, useContext, useEffect, useState } from 'react';
import DailyCompare from 'components/charts/DailyCompare';
import './DevicesCompare.css';
import { SingleContext } from 'utility/contexts/MyContext';
import WeekForm from 'components/forms/WeekForm';
import { useSelector } from 'react-redux';
import { selectDevices } from 'store/devicesSlide';

const WeekCompare = (props) => {
    const [search, setSearch] = useState(null);
    const singleChart = useContext(SingleContext);
    const devices = useSelector(selectDevices);

    useEffect(() => {
        if (singleChart) {
            document.title = `Portale Sperimentale - Compare devices by week`;
        }
    }, []);

    if (!devices?.length) {
        return null;
    }

    return (
        <Fragment>
            {!singleChart && <h2>Week comparison</h2>}
            <WeekForm updateSearch={setSearch} />
            {search && <DailyCompare search={search} name="week-compare" />}
            {!singleChart && <hr className="mb-5 bg-warning" />}
        </Fragment>
    );
};

export default WeekCompare;
