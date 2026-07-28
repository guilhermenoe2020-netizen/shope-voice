import AppShell from "./components/AppShell.jsx";
import { useHashRoute } from "./hooks/useHashRoute.js";
import Dashboard from "./pages/Dashboard.jsx";
import Narration from "./pages/Narration.jsx";
import Hashtags from "./pages/Hashtags.jsx";
import Captions from "./pages/Captions.jsx";

const PAGES = {
  dashboard: Dashboard,
  narracao: Narration,
  hashtags: Hashtags,
  legendas: Captions,
};

export default function App() {
  const { route, navigate } = useHashRoute();
  const Page = PAGES[route] || Dashboard;

  return (
    <AppShell route={route} navigate={navigate}>
      <Page navigate={navigate} />
    </AppShell>
  );
}
