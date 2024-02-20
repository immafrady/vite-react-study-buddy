import { createHashRouter } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/pages/home';

const router = createHashRouter([{
    element: <Layout />,
    children: [{
        path: '/',
        element: <Home />
    }]
}])
export default router;
