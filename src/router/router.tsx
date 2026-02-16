import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@layout';
import { Error, Main } from '@pages';

export const routerData = [
  { id: 1, label: 'Discover', path: '/discover', element: <Error /> },
  { id: 2, label: 'Creators', path: '/creators', element: <Error /> },
  { id: 3, label: 'Sell', path: '/sell', element: <Error /> },
  { id: 4, label: 'Stats', path: '/stats', element: <Error /> },
  { id: 5, label: 'Main', path: '/', element: <Main /> },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: routerData.map((item) => {
      return { path: item.path, element: item.element };
    }),
  },
  {
    path: '*',
    element: <Error />,
  },
]);
