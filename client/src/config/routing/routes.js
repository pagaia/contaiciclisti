export const ROUTES = {
  MAIN_PAGE: "/",
  DEVICE_VIEW: "/devices/:id",
  DEVICE_YESTERDAY: "/single/devices/:id/yesterday",
  DEVICE_TODAY: "/single/devices/:id/today",
  DEVICE_LAST_MONTH_AVERAGE: "/single/devices/:id/lastMonth/average",
  DEVICE_LAST_MONTH_DAY_TOTAL: "/single/devices/:id/lastMonth/dayTotal",
  DEVICE_LAST_MONTH_PEAK_TIME: "/single/devices/:id/lastMonth/peakTime",
  DEVICES_COMPARE: "/single/devices/compare",
  DEVICES_AVERAGE: "/single/devices/average",
  DEVICES_HOURLY_COMPARE: "/single/devices/compare/hourly",
  DEVICES_MAP: "/single/devices/map",
  CREDITS: "/credits",
  ALL_PAGES: "*",
};

const routes = [
  {
    component: "./pages/MainPage",
    path: ROUTES.MAIN_PAGE,
  },
  {
    component: "./pages/Credits",
    path: ROUTES.CREDITS,
  },
  {
    component: "./pages/Device",
    path: ROUTES.DEVICE_VIEW,
  },
  {
    component: "./pages/singlePages/DevicesCompare",
    path: ROUTES.DEVICES_COMPARE,
  },
  {
    component: "./pages/singlePages/DeviceYesterday",
    path: ROUTES.DEVICE_YESTERDAY,
  },
  {
    component: "./pages/singlePages/DeviceToday",
    path: ROUTES.DEVICE_TODAY,
  },
  {
    component: "./pages/singlePages/DeviceAverage",
    path: ROUTES.DEVICE_LAST_MONTH_AVERAGE,
  },
  {
    component: "./pages/singlePages/DeviceTotalDay",
    path: ROUTES.DEVICE_LAST_MONTH_DAY_TOTAL,
  },
  {
    component: "./pages/singlePages/PeakTimeSinglePage",
    path: ROUTES.DEVICE_LAST_MONTH_PEAK_TIME,
  },
  {
    component: "./pages/singlePages/OnlyMap",
    path: ROUTES.DEVICES_MAP,
  },
  {
    component: "./pages/singlePages/DailyAveragePage",
    path: ROUTES.DEVICES_AVERAGE,
  },
  {
    component: "./pages/singlePages/HourlyComparePage",
    path: ROUTES.DEVICES_HOURLY_COMPARE,
  },
  {
    component: "./pages/NotFound",
    path: ROUTES.ALL_PAGES,
  },
];

export default routes;
