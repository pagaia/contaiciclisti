import MonthsCompareChart from 'components/charts/MonthsCompareChart';
import { OpenNewWindow } from 'components/OpenNewWindow';
import { ROUTES } from 'config/routing/routes';
import NotFound from 'pages/NotFound';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { SingleContext } from 'utility/contexts/MyContext';
import { getPreviousMonths } from 'utility/utilityFunctions';
import './DevicesCompare.css';

const CompareMonths = ({ device }) => {
    const singleChart = useContext(SingleContext);
    const NUMBER_OF_MONTHS = 12;
    const { start, end } = getPreviousMonths(undefined, NUMBER_OF_MONTHS);

    useEffect(() => {
        if (singleChart) {
            document.title = `Portale Sperimentale - Compare different months`;
        }
    }, []);

    const [search, updateSearch] = useState({
        endDate: end,
        startDate: start,
        device,
    });

    if (!device) {
        return <NotFound />;
    }

    return (
        <Fragment>
            {!singleChart && (
                <h3>
                    <FormattedMessage id="title.compare-months-device" />
                </h3>
            )}
            {search && <MonthsCompareChart search={search} name="device-compare-months" />}
            <OpenNewWindow
                singleChart={singleChart}
                url={ROUTES.DEVICE_LAST_TWELVE_MONTHS}
                id={device?.properties?.channelId}
            />
        </Fragment>
    );
};

export default CompareMonths;
