import styles from "./App.module.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
import AppLayout from "./pages/AppLayout";
import Cities from "./components/Cities";
import Countries from "./components/Countries";
import CityDetails from "./components/CityDetails";
import Form from "./components/Form";
import PageNotFound from "./pages/PageNotFound";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loader from "./components/Loader";
function App() {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <CitiesProvider>
                    <AppLayout />
                  </CitiesProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<Cities />} />
              <Route path="cities/:id" element={<CityDetails />} />
              <Route path="countries" element={<Countries />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
