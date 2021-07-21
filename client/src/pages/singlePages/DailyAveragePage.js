import React, { useContext, useEffect, useState } from 'react';
import DailyAverage from 'components/charts/DailyAverage';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import CompareForm from 'components/forms/CompareForm';
import { useSelector } from 'react-redux';
import { SingleContext } from 'utility/contexts/MyContext';
import { selectDevices } from 'store/devicesSlide';

const DailyAveragePage = (props) => {
    const [search, setSearch] = useState(null);
    const singleChart = useContext(SingleContext);
    const devices = useSelector(selectDevices);

    // chanche the title page if this is the only component displayed
    useEffect(() => {
        if (singleChart) {
            document.title = `Portale Sperimentale - Daily Average counts`;
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
            <CompareForm updateSearch={setSearch} nameForm="DailyAverage" />
            {search && <DailyAverage search={search} />}
            {!singleChart && <hr className="mb-5 bg-warning" />}
        </Fragment>
    );

};

export default DailyAveragePage;
