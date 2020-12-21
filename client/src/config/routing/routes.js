import Device from "pages/Device";
import DevicesCompare from "pages/DevicesCompare";
import MainPage from "pages/MainPage";
import NotFound from "pages/NotFound";
import DeviceToday from "pages/DeviceToday";
import DeviceAverage from "pages/DeviceAverage";
import DeviceTotalDay from "pages/DeviceTotalDay";
import DeviceYesterday from "pages/DeviceYesterday";

export const ROUTES = {
  MAIN_PAGE: "/",
  DEVICE_VIEW: "/devices/:id",
  DEVICE_YESTERDAY: "/devices/:id/yesterday",
  DEVICE_TODAY: "/devices/:id/today",
  DEVICE_LAST_MONTH_AVERAGE: "/devices/:id/lastMonth/average",
  DEVICE_LAST_MONTH_DAY_TOTAL: "/devices/:id/lastMonth/dayTotal",
  DEVICES_COMPARE: "/devices/compare",
  ALL_PAGES: "*",
};


const routes = [
  {
    component: MainPage,
    path: ROUTES.MAIN_PAGE,
  },
  {
    component: DevicesCompare,
    path: ROUTES.DEVICES_COMPARE,
  },
  {
    component: Device,
    path: ROUTES.DEVICE_VIEW,
  },
  {
    component: DeviceYesterday,
    path: ROUTES.DEVICE_YESTERDAY,
  },
  {
    component: DeviceToday,
    path: ROUTES.DEVICE_TODAY,
  },
  {
    component: DeviceAverage,
    path: ROUTES.DEVICE_LAST_MONTH_AVERAGE,
  },
  {
    component: DeviceTotalDay,
    path: ROUTES.DEVICE_LAST_MONTH_DAY_TOTAL,
  },
  {
    component: NotFound,
    path: ROUTES.ALL_PAGES,
  },
];

export default routes;
