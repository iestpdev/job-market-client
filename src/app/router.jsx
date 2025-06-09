import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "../modules/shared/utils/authUtils";
import LoginPage from "../modules/auth/pages/Login/Login";
import Layout from "../modules/shared/layouts/Layout";
import { HomePage } from "../modules/home/pages/home";
import OffersCreatePage from "../modules/offers/pages/OfferCreate/OffersCreate";
import OfferEditPage from "../modules/offers/pages/OfferEdit/OfferEdit";
import YourCandidaciesScreen from "../screens/company/your-candidates/YourCandidaciesScreen";
import CompanyEditPage from "../modules/companies/pages/CompanyEdit/CompanyEdit";
import StudentEditPage from "../modules/students/pages/StudentEdit";
import YourApplicationsScreen from "../screens/student/your-applications/YourApplicationsScreen";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : children;
};

const NotFoundPage = () => <h1>404 - Página no encontrada</h1>;

const router = createBrowserRouter([
  { path: "*", element: <NotFoundPage /> },
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
    path: "/offer/edit/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <OfferEditPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/your-candidates",
    element: (
      <ProtectedRoute>
        <Layout>
          <YourCandidaciesScreen />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/your-applications",
    element: (
      <ProtectedRoute>
        <Layout>
          <YourApplicationsScreen />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/company/edit/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <CompanyEditPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/edit/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <StudentEditPage />
        </Layout>
      </ProtectedRoute>
    ),
  }
]);

export default router;

//TODO: aplicar Toast (modales)
//TODO: aplicar i18next para soporte multilingue