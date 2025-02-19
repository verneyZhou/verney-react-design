import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '@verney/ui/style.css';
import '@/styles/index.css';
import './styles/index.css';
import { router } from './router';

// import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
