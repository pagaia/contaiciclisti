import { Icon } from 'leaflet';
import orangeIcon from 'images/orange-marker.png';
import grayIcon from 'images/gray-marker.png';

const createIcon = (url) => {
    return new Icon({
        iconUrl: url,
        shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
};

export const OrangeIcon = createIcon(orangeIcon);

export const GrayIcon = createIcon(grayIcon);
