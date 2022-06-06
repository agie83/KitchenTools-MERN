import { BsCart3, BsInfoLg } from 'react-icons/bs';
import IncentiveMarketing from '../components/IncentiveMarketing/IncentiveMarketing';
import Test from '../components/Test';
import LayoutPage from '../pages/LayoutPage';

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
      mainContent: [IncentiveMarketing, Test],
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
    routeElement: 'Shop',
    navLink: '/shop',
    icon: '',
    submenu: [],
    contentComponents: {
      mainContent: [Test],
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
        routeElement: 'ProfilePage',
        navLink: '/profile',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: ['Profile', 'Cart'],
          asideContent: ['MyOrders'],
        },
        protected: true,
        visible: 'loggedIn',
        type: 'primary',
      },
      {
        _id: '62895ab91d916f2cc7b2a715',
        title: 'Rendeléseim',
        routePath: '/myOrders',
        routeElement: 'MyOrdersPage',
        navLink: '/myorders',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: ['MyOrders'],
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
        routeElement: 'LoginPage',
        navLink: '/login',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: ['LoginForm'],
          asideContent: [],
        },
        protected: false,
        visible: 'notLoggedIn',
        type: 'primary',
      },
      {
        _id: '62895ab91d916f2cc7b2a718',
        title: 'Regisztráció',
        routePath: '/registration',
        routeElement: 'RegistrationPage',
        navLink: '/registration',
        icon: '',
        submenu: [],
        contentComponents: {
          mainContent: ['Registration'],
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
    _id: '62895ab91d916f2cc7b2a719',
    title: 'Kosár',
    routePath: '/cart',
    routeElement: LayoutPage,
    navLink: '/cart',
    icon: BsCart3,
    submenu: [],
    contentComponents: {
      mainContent: [Test],
      asideContent: [],
    },
    protected: false,
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
      mainContent: [Test],
      asideContent: [],
    },
    protected: false,
    visible: 'always',
    type: 'secondary',
  },
];
const adminMenu = [];

export { menu, adminMenu };
