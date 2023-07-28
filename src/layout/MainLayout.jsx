import { Suspense, lazy } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';

/**
 * Arquivos importadas utilizando a técnica de lazy/Suspense do React.
 * Docs: https://pt-br.react.dev/reference/react/Suspense
 *
 * Isso permite que os arquivos sejam carregados apenas quando as páginas foram acessadas
 * pelo usuário.
 */
const PrivateRoute = lazy(() => import('../components/PrivateRoute'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SubscriptionPage = lazy(() => import('../pages/SubscriptionPage'));
const StudentsCreatePage = lazy(() => import('../pages/StudentsCreatePage'));
const StudentsListPage = lazy(() => import('../pages/StudentsListPage'));
const AppLayout = lazy(() => import('./AppLayout'));

function MainLayout() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route
          path="/students/"
          element={(
            <PrivateRoute>
              <AppLayout>
                <StudentsListPage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route
          path="/students/new"
          element={(
            <PrivateRoute>
              <AppLayout>
                <StudentsCreatePage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route path="/students/:studentId" element={(
          <PrivateRoute>
            <AppLayout>
              <StudentsCreatePage />
            </AppLayout>
          </PrivateRoute>
        )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Routes>
    </Suspense>
  );
}

export default MainLayout;
