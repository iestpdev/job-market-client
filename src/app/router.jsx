import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "../modules/shared/utils/authUtils";
import LoginPage from "../modules/auth/pages/Login";
import Layout from "../modules/shared/components/layout/Layout";
import { HomePage } from "../modules/home/pages/home";
import OffersCreatePage from "../modules/offers/pages/OfferCreate/OffersCreate";
import CandidaciesPage from "../modules/candidacies/pages/Candidacies";
import StudentDetailsPage from "../modules/students/pages/Student";

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
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/createOffer",
    element: (
      <ProtectedRoute>
        <Layout>
          <OffersCreatePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/candidacies",
    element: (
      <ProtectedRoute>
        <Layout>
          <CandidaciesPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/candidacies/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <StudentDetailsPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFoundPage /> }
]);

export default router;
