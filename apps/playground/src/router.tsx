import { RouteObject } from 'react-router';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';
import Base from './components/base';
import { HooksTest } from './components/HooksTest';
import Util from './components/util';
import VirtualListDemo from './components/VirtualList';

export const routes = [
    {
        path: '/ui',
        name: 'base',
        index: true,
        element: <Base />,
    },
    {
        path: '/virtual-list',
        name: 'vitual-list',
        element: <VirtualListDemo />,
    },
    {
        path: '/hooks',
        name: 'Hooks',
        element: <HooksTest />,
    },

    {
        path: '/util',
        name: 'utils',
        element: <Util />,
    },
];

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>404</div>,
        children: [
            {
                path: '',
                element: <Navigate to="/ui" replace />,
            },
            ...routes,
        ],
    },
]);
