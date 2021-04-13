import ExternalLink from 'components/ExternalLink';
import { Fragment, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectDevices } from 'store/devicesSlide';
import { DEVICE_MAIN_URL } from 'utility/constants';

const Credits = () => {
    const devices = useSelector(selectDevices);
    useEffect(() => {
        document.title = `Portale Sperimentale -  Credits`;
    }, []);

    return (
        <Fragment>
            <h2>
                <FormattedMessage id="credits" />
            </h2>
            <div className="row">
                <div className="col-sm-12 col-md-10">
                    <p>
                        <FormattedMessage id="credits.data.description" />
                        <ul className="devices-list">
                            {devices?.map((device) => {
                                return (
                                    <li key={device.properties.channelId}>
                                        <ExternalLink
                                            url={
                                                DEVICE_MAIN_URL +
                                                device.properties.channelId
                                            }
                                        >
                                            {device.properties.name}
                                        </ExternalLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </p>
                    <p>
                        <FormattedMessage
                            id="credits.tevere"
                            values={{
                                website: (
                                    <ExternalLink url="https://dati.lazio.it/web/open-ambiente">
                                        Dati Lazio
                                    </ExternalLink>
                                ),
                            }}
                        />
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default Credits;
