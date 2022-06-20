import { BsCart3, BsInfoLg } from 'react-icons/bs';
import Login from '../components/account/Login';
import Register from '../components/account/Register';
import IncentiveMarketing from '../components/IncentiveMarketing/IncentiveMarketing';
import LayoutPage from '../pages/LayoutPage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import Cart from '../components/Shop/Cart/Cart';
import Informations from '../components/Informations/Informations';
import Shop from '../components/Shop/Shop';
import MyOrders from '../components/account/MyOrders';
import Profile from '../components/account/Profile/Profile';
import Categories from '../components/Shop/Categories/Categories';
import Contact from '../components/Contact/Contact';

const menu = [
  {
    _id: '62895ab91d916f2cc7b2a711',
    title: 'Kezdőlap',
    routePath: '/',
    routeElement: LayoutPage,
    navLink: '/',
    icon: '',
    submenu: [],
    contentComponents: {
      mainContent: [IncentiveMarketing, Categories],
      asideContent: [],
    },
    protected: false,
    visible: 'always',
    type: 'primary',
  },
  {
    _id: '62895ab91d916f2cc7b2a712',
    title: 'Webshop',
    routePath: '/shop',
    routePathChildren: ['/shop/:slug', '/shop/:slug/:productSlug'],
    routeElement: LayoutPage,
    navLink: '/shop',
    icon: '',
    submenu: [],
    contentComponents: {
      mainContent: [Shop],
      asideContent: [],
    },
    protected: false,
    visible: 'always',
    type: 'primary',
  },
  {
    _id: '62895ab91d916f2cc7b2a713',
    title: 'Fiókom',
    routePath: '/',
    routeElement: 'AccountPage',
    navLink: '/',
    icon: '',
    submenu: [
      {
        _id: '62895ab91d916f2cc7b2a714',
        title: 'Adatok',
        routePath: '/profile',
        routeElement: LayoutPage,
        navLink: '/profile',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: [Profile],
          asideContent: [],
        },
        protected: true,
        visible: 'loggedIn',
        type: 'primary',
      },
      {
        _id: '62895ab91d916f2cc7b2a715',
        title: 'Rendeléseim',
        routePath: '/myOrders',
        routeElement: LayoutPage,
        navLink: '/myorders',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: [MyOrders],
          asideContent: [],
        },
        protected: true,
        visible: 'loggedIn',
        type: 'primary',
      },
      {
        _id: '62895ab91d916f2cc7b2a716',
        title: 'Kilépés',
        routePath: '/',
        routeElement: '',
        navLink: '/',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: [],
          asideContent: [],
        },
        protected: true,
        visible: 'loggedIn',
        type: 'primary',
      },
      {
        _id: '62895ab91d916f2cc7b2a717',
        title: 'Belépés',
        routePath: '/login',
        routeElement: LayoutPage,
        navLink: '/login',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: [Login],
          asideContent: [],
        },
        protected: false,
        visible: 'notLoggedIn',
        type: 'primary',
      },
      {
        _id: '62895ab91d916f2cc7b2a718',
        title: 'Regisztráció',
        routePath: '/register',
        routeElement: LayoutPage,
        navLink: '/register',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: [Register],
          asideContent: [],
        },
        protected: false,
        visible: 'notLoggedIn',
        type: 'primary',
      },
    ],
    contentComponents: {
      mainContent: ['ProductsList'],
      asideContent: ['Categories', 'Footer'],
    },
    protected: false,
    visible: 'always',
    type: 'primary',
  },
  {
    _id: '62895ab91d916f2cc7b2a771',
    title: 'Elérhetőségek',
    routePath: '/contact',
    routeElement: LayoutPage,
    navLink: '/contact',
    icon: '',
    submenu: [],
    contentComponents: {
      mainContent: [Contact],
      asideContent: [],
    },
    protected: false,
    visible: 'always',
    type: 'primary',
  },
  {
    _id: '62895ab91d916f2cc7b2a719',
    title: 'Kosár',
    routePath: '/cart',
    routeElement: LayoutPage,
    navLink: '/cart',
    icon: BsCart3,
    submenu: [],
    contentComponents: {
      mainContent: [Cart],
      asideContent: [],
    },
    protected: true,
    visible: 'always',
    type: 'secondary',
  },
  {
    _id: '62895ab91d916f2cc7b2a720',
    title: 'Fizetési-és átvételi lehetőségek',
    routePath: '/info',
    routeElement: LayoutPage,
    navLink: '/info',
    icon: BsInfoLg,
    submenu: [],
    contentComponents: {
      mainContent: [Informations],
      asideContent: [],
    },
    protected: false,
    visible: 'always',
    type: 'secondary',
  },
  {
    _id: '62895ab91d916f2cc7b2a721',
    title: '404',
    routePath: '*',
    routeElement: LayoutPage,
    navLink: '',
    icon: '',
    submenu: [],
    contentComponents: {
      mainContent: [NotFoundPage],
      asideContent: [],
    },
    protected: false,
    visible: 'never',
    type: 'other',
  },
];
const adminMenu = [];

export { menu, adminMenu };
