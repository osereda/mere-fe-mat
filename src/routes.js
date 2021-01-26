import Dashboard from "@material-ui/icons/Dashboard";
import Unarchive from "@material-ui/icons/Unarchive";
import TwoWheelerIcon from '@material-ui/icons/TwoWheeler';
import EvStationIcon from '@material-ui/icons/EvStation';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HistoryIcon from '@material-ui/icons/History';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import MessageIcon from '@material-ui/icons/Message';
import EuroIcon from '@material-ui/icons/Euro';

import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import ScootersList from "views/Scooters/ScootersList";
import PowerAndCost from "views/PawerAndCost/PowerAndCost";
import StationRating from "views/StationRating/StationRating";

const Routes = [
  {
    path: "/db",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/st",
    name: "Station",
    icon: EvStationIcon,
    component: TableList,
    //component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/sc",
    name: "Scooter",
    icon: TwoWheelerIcon,
    component: ScootersList,
    layout: "/admin"
  },
  {
    path: "/pac",
    name: "Power and Cost",
    icon: EuroIcon,
    component: PowerAndCost,
    layout: "/admin"
  },
  {
    path: "/sr",
    name: "Station Rating",
    icon: TrendingUpIcon,
    component: StationRating,
    layout: "/admin"
  },
  {
    path: "/bah",
    name: "Billing & History",
    icon: HistoryIcon,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/nm",
    name: "New Massage",
    icon: MarkunreadIcon,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/im",
    name: "Incoming Message",
    icon: MessageIcon,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/om",
    name: "Outgoing Message",
    icon: MessageIcon,
    component: NotificationsPage,
    layout: "/admin"
  }
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default Routes;
