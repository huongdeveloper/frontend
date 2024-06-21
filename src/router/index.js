// Layouts
import { HeaderOnly } from '~/components/Layout';
import App from '../App';
import User from '../components/User';
import Admin from '../components/Auth/News/News';

// Pages


// Public routes
const publicRoutes = [
    { path: '/', component: App },
    { path: '/user', component: User },
    { path: '/admin', component: Admin },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };