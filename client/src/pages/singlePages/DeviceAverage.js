import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HourlyAverage from 'components/charts/HourlyAverage';
import NotFound from '../NotFound';
import { SingleContext } from 'utility/contexts/MyContext';
import { useSelector } from 'react-redux';
import { selectDevices } from 'store/devicesSlide';
import Loading from 'components/Loading';

const DeviceAverage = (props) => {
    let { id } = useParams();
    const singleChart = useContext(SingleContext);
    const devices = useSelector(selectDevices);

    // search for my device
    const device = devices.find((el) => el.properties.channelId == id);

    useEffect(() => {
        if (device && singleChart) {
            const { name } = device.properties;
            document.title = `Portale Sperimentale - ${name} Average counts`;
        }
    }, []);

    if (!devices.length) {
        return <Loading />;
    }

    if (!device) {
        return <NotFound />;
    }

    return (
        <Fragment>
            {!singleChart && <h2>{device.properties.name}</h2>}
            <div className="row">
                <div className="col-md-12">
                    <HourlyAverage device={device} singleChart />
                </div>
            </div>
            {!singleChart && <hr className="mb-5 bg-warning" />}
        </Fragment>
    );
};

export default DeviceAverage;
