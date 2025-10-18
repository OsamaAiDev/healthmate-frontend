import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UploadReport from './pages/UploadReport.jsx';
import AddVitals from './pages/AddVitals.jsx';
import ViewReport from './pages/ViewReport.jsx';
import Timeline from './pages/Timeline.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', element: <Dashboard /> },
          { path: '/upload', element: <UploadReport /> },
          { path: '/vitals', element: <AddVitals /> },
          { path: '/report/:id', element: <ViewReport /> },
          { path: '/timeline', element: <Timeline /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
