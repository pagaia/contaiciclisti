import React, { Fragment } from 'react';
import ViewMap from 'components/map/ViewMap';
import DailyAverage from 'components/charts/DailyAverage';
import DevicesCompare from './singlePages/DevicesCompare';
import HourlyComparePage from './singlePages/HourlyComparePage';
import WeekCompare from './singlePages/WeekCompare';
import LastCount from 'components/charts/LastCount';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Accordion from 'components/Accordion';
import { selectSecret } from 'store/generalSlide';
import Loading from 'components/Loading';
import { FormattedMessage } from 'react-intl';
import DailyAveragePage from './singlePages/DailyAveragePage';

const MainPage = () => {
    const { devices } = useSelector((state) => state.devices);
    const showPulse = !useSelector(selectSecret);

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-4 mb-5">
                    <ViewMap devices={devices} />
                </div>

                <div className="col-lg-8">
                    <Accordion title="Open/Close">
                        <div className="row">
                            <div className="col-sm-12">
                                {devices.map((device) => {
                                    return (
                                        <Fragment
                                            key={device.properties.channelId}
                                        >
                                            <h2>
                                                <Link
                                                    to={`/devices/${device.properties.channelId}`}
                                                    className="text-warning"
                                                >
                                                    {device.properties.name}
                                                </Link>
                                            </h2>
                                            <LastCount device={device} />
                                            <hr className="mb-5 bg-warning" />
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </Accordion>

                    <div className="row">
                        <div className="col-sm-12">
                            <h2>
                                <FormattedMessage id="title.daily-average" />
                            </h2>
                            <DailyAveragePage />
                        </div>
                        <div className="col-sm-12">
                            <DevicesCompare />
                        </div>
                        <div className="col-sm-12">
                            <WeekCompare />
                        </div>
                        <div className="col-sm-12">
                            <HourlyComparePage />
                        </div>
                       
                        {/* <div className="col-sm-12">
              <About />
            </div> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MainPage;
