import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { Home } from './views/Home';
import { Projects } from './views/Projects';
import { Resources } from './views/Resources';
import { Community } from './views/Community';
import { AIAssistant } from './views/AIAssistant';
import { Profile } from './views/Profile';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showAuth, setShowAuth] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'projects':
        return <Projects />;
      case 'resources':
        return <Resources />;
      case 'community':
        return <Community />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <AuthProvider>
      <Layout
        currentView={currentView}
        onNavigate={setCurrentView}
        onAuthClick={() => setShowAuth(true)}
      >
        {renderView()}
      </Layout>
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </AuthProvider>
  );
}

export default App;
