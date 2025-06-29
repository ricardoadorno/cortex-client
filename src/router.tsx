import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from '@/components/common/layout';

// Lazy load pages
const HomePage = lazy(() => import('./pages/home-page'));
const TasksPage = lazy(() => import('./pages/tasks-page'));
const NotFoundPage = lazy(() => import('./pages/not-found-page'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'tasks',
                element: <TasksPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);