export const ROUTES = {
    MAIN_PAGE: '/',
    ADMIN: '/admin',
    DEVICE_VIEW: '/devices/:id', // device page with multi charts
    DEVICE_YESTERDAY: '/single/devices/:id/yesterday',
    DEVICE_TODAY: '/single/devices/:id/today',
    DEVICE_LAST_MONTH_AVERAGE: '/single/devices/:id/lastMonth/average',
    DEVICE_LAST_MONTH_DAY_TOTAL: '/single/devices/:id/lastMonth/dayTotal',
    DEVICE_LAST_MONTH_PEAK_TIME: '/single/devices/:id/lastMonth/peakTime',
    DEVICE_LAST_TWELVE_MONTHS: '/single/devices/:id/twelveMonths',
    DEVICES_COMPARE: '/single/devices/compare',
    DEVICES_AVERAGE: '/single/devices/average',
    DEVICES_HOURLY_COMPARE: '/single/devices/compare/hourly',
    DEVICES_MAP: '/single/devices/map',
    CREDITS: '/credits',
    ALL_PAGES: '*',
};

const routes = [
    {
        component: './admin/AdminPage',
        path: ROUTES.ADMIN,
    },
    {
        component: './pages/MainPage',
        path: ROUTES.MAIN_PAGE,
    },
    {
        component: './pages/Credits',
        path: ROUTES.CREDITS,
    },
    {
        component: './pages/Device',
        path: ROUTES.DEVICE_VIEW,
    },
    {
        component: './pages/singlePages/DevicesCompare',
        path: ROUTES.DEVICES_COMPARE,
    },
    {
        component: './pages/singlePages/DeviceYesterday',
        path: ROUTES.DEVICE_YESTERDAY,
    },
    {
        component: './pages/singlePages/DeviceToday',
        path: ROUTES.DEVICE_TODAY,
    },
    {
        component: './pages/singlePages/DeviceAverage',
        path: ROUTES.DEVICE_LAST_MONTH_AVERAGE,
    },
    {
        component: './pages/singlePages/DeviceTotalDay',
        path: ROUTES.DEVICE_LAST_MONTH_DAY_TOTAL,
    },
    {
        component: './pages/singlePages/CompareMonths',
        path: ROUTES.DEVICE_LAST_TWELVE_MONTHS,
    },
    {
        component: './pages/singlePages/PeakTimeSinglePage',
        path: ROUTES.DEVICE_LAST_MONTH_PEAK_TIME,
    },
    {
        component: './pages/singlePages/OnlyMap',
        path: ROUTES.DEVICES_MAP,
    },
    {
        component: './pages/singlePages/DailyAveragePage',
        path: ROUTES.DEVICES_AVERAGE,
    },
    {
        component: './pages/singlePages/HourlyComparePage',
        path: ROUTES.DEVICES_HOURLY_COMPARE,
    },
    {
        component: './pages/NotFound',
        path: ROUTES.ALL_PAGES,
    },
];

export const buildUrl = (url, id) => {
    
    const newUrl = url.replace(/:id/, id);
    console.log({ url, id });
    console.log({ newUrl });

    return url.replace(/:id/, id);
};

export default routes;
