import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "../modules/shared/utils/authUtils";
import LoginPage from "../modules/auth/pages/Login";
import { HomePage } from "../modules/home/pages/home";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : children;
};

const NotFoundPage = () => <h1>404 - Página no encontrada</h1>;

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
/*
    {
    path: "/publicar",
    element: (
      <ProtectedRoute>
        <Layout>
          <h1>Página de Publicar Oferta</h1>
        </Layout>
      </ProtectedRoute>
    ),
  },
*/
  { path: "*", element: <NotFoundPage /> }
]);

export default router;
