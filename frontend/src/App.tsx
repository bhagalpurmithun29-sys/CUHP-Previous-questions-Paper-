import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers';
import { router } from './routes';
import { CookieBanner } from './features/legal/components/CookieBanner';
import { InstallPrompt } from './components/pwa/InstallPrompt';
import { OfflineWarning } from './components/pwa/OfflineWarning';

function App() {
  return (
    <AppProviders>
      <OfflineWarning />
      <CookieBanner />
      <InstallPrompt />
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
