import { ReactNode, useState } from 'react';
import { Menu, X, Sprout, Home, Map, BookOpen, Users, Bot, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  onAuthClick: () => void;
}

export function Layout({ children, currentView, onNavigate, onAuthClick }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', icon: Home, view: 'home' },
    { name: 'Projects', icon: Map, view: 'projects' },
    { name: 'Resources', icon: BookOpen, view: 'resources' },
    { name: 'Community', icon: Users, view: 'community' },
    { name: 'AI Assistant', icon: Bot, view: 'ai-assistant' },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <Sprout className="w-8 h-8" />
                <span className="text-xl font-bold">Land ReGen</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.view)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      currentView === item.view
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </button>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      currentView === item.view
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="font-medium text-emerald-700 mb-2">SDG 15: Life on Land</p>
            <p className="text-sm">Protect, restore and promote sustainable use of terrestrial ecosystems</p>
            <p className="text-xs mt-4">Land ReGen - Building a Sustainable Future Together</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
