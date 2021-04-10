import DailyCompare from 'components/charts/DailyCompare';
import CompareForm from 'components/forms/CompareForm';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectDevices } from 'store/devicesSlide';
import { SingleContext } from 'utility/contexts/MyContext';
import './DevicesCompare.css';

const DevicesCompare = (props) => {
    const [search, setSearch] = useState(null);
    const singleChart = useContext(SingleContext);
    const devices = useSelector(selectDevices);

    useEffect(() => {
        if (singleChart) {
            document.title = `Portale Sperimentale - Compare devices`;
        }
    }, []);

    if (!devices?.length) {
        return null;
    }

    return (
        <Fragment>
            {!singleChart && (
                <h2>
                    <FormattedMessage id="title.compare-devices" />
                </h2>
            )}
            <CompareForm updateSearch={setSearch} />
            {search && <DailyCompare search={search} name="device-compare" />}
            {!singleChart && <hr className="mb-5 bg-warning" />}
        </Fragment>
    );
};

export default DevicesCompare;
