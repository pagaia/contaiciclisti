export const ROUTES = {
  MAIN_PAGE: "/",
  DEVICE_VIEW: "/devices/:id",
  DEVICE_YESTERDAY: "/single/devices/:id/yesterday",
  DEVICE_TODAY: "/single/devices/:id/today",
  DEVICE_LAST_MONTH_AVERAGE: "/single/devices/:id/lastMonth/average",
  DEVICE_LAST_MONTH_DAY_TOTAL: "/single/devices/:id/lastMonth/dayTotal",
  DEVICES_COMPARE: "/single/devices/compare",
  ALL_PAGES: "*",
};

const routes = [
  {
    component: "./pages/MainPage",
    path: ROUTES.MAIN_PAGE,
  },
  {
    component: "./pages/DevicesCompare",
    path: ROUTES.DEVICES_COMPARE,
  },
  {
    component: "./pages/Device",
    path: ROUTES.DEVICE_VIEW,
  },
  {
    component: "./pages/DeviceYesterday",
    path: ROUTES.DEVICE_YESTERDAY,
  },
  {
    component: "./pages/DeviceToday",
    path: ROUTES.DEVICE_TODAY,
  },
  {
    component: "./pages/DeviceAverage",
    path: ROUTES.DEVICE_LAST_MONTH_AVERAGE,
  },
  {
    component: "./pages/DeviceTotalDay",
    path: ROUTES.DEVICE_LAST_MONTH_DAY_TOTAL,
  },
  {
    component: "./pages/NotFound",
    path: ROUTES.ALL_PAGES,
  },
];

export default routes;
