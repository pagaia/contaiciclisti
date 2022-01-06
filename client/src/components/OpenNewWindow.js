import { FormattedMessage } from 'react-intl';
import React from 'react';
import { buildUrl } from 'config/routing/routes';
import ExternalLink from 'components/ExternalLink';

export const OpenNewWindow = ({ singleChart, url, id }) => {
    if (singleChart) {
        return null;
    }
    console.log({ singleChart, url, id })
    return (
        <ExternalLink url={buildUrl(url, id)}>
            <FormattedMessage id="link.open-new-window" />
        </ExternalLink>
    );
};
