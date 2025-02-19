import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import { routes } from './router';

function App() {
    return (
        <div className="p-4 flex flex-col items-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Verney React Design Playground</h1>

            <nav className="mb-6">
                <ul className="flex space-x-4">
                    {routes.map((route) => (
                        <li key={route.path}>
                            <NavLink
                                to={route.path}
                                end={route.index}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md transition-colors ${
                                        isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {route.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default App;
