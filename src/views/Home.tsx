import { useEffect, useState } from 'react';
import { Trees, MapPin, Users, TrendingUp, Leaf, Target, Heart, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Stats {
  totalProjects: number;
  activeProjects: number;
  totalMembers: number;
  totalArea: number;
}

export function Home({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    activeProjects: 0,
    totalMembers: 0,
    totalArea: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: projects } = await supabase
        .from('restoration_projects')
        .select('status, area_hectares');

      const { data: members } = await supabase
        .from('project_members')
        .select('user_id');

      const totalProjects = projects?.length || 0;
      const activeProjects = projects?.filter(p => p.status === 'active').length || 0;
      const totalArea = projects?.reduce((sum, p) => sum + (p.area_hectares || 0), 0) || 0;
      const uniqueMembers = new Set(members?.map(m => m.user_id)).size;

      setStats({
        totalProjects,
        activeProjects,
        totalMembers: uniqueMembers,
        totalArea,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: MapPin,
      color: 'bg-blue-500',
      description: 'Restoration initiatives',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      description: 'Currently in progress',
    },
    {
      title: 'Community Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'bg-purple-500',
      description: 'Dedicated volunteers',
    },
    {
      title: 'Hectares Restored',
      value: stats.totalArea.toFixed(1),
      icon: Trees,
      color: 'bg-green-500',
      description: 'Total area covered',
    },
  ];

  const features = [
    {
      title: 'Track Projects',
      description: 'Monitor land restoration projects with interactive maps and real-time progress updates.',
      icon: MapPin,
      color: 'text-blue-600',
    },
    {
      title: 'Learn & Grow',
      description: 'Access educational resources on sustainable practices, soil health, and biodiversity.',
      icon: Leaf,
      color: 'text-green-600',
    },
    {
      title: 'Join Community',
      description: 'Connect with experts, share experiences, and collaborate on restoration efforts.',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'AI Assistance',
      description: 'Get personalized guidance on land restoration techniques and best practices.',
      icon: Target,
      color: 'text-emerald-600',
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          <Globe className="w-4 h-4" />
          SDG 15: Life on Land
        </div>
        <h1 className="text-5xl font-bold text-gray-900">
          Restore Our Planet, <br />
          <span className="text-emerald-600">One Hectare at a Time</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join a global community dedicated to protecting, restoring, and promoting sustainable use
          of terrestrial ecosystems. Together, we can combat desertification, halt biodiversity loss,
          and reverse land degradation.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <button
            onClick={() => onNavigate('projects')}
            className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Explore Projects
          </button>
          <button
            onClick={() => onNavigate('resources')}
            className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-all font-medium"
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '...' : stat.value}
                </p>
                <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Why Land Restoration Matters
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Land degradation affects 3.2 billion people worldwide. Together, we can make a difference.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className={`${feature.color} mx-auto w-16 h-16 rounded-full bg-opacity-10 flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center">
        <Heart className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="text-emerald-50 mb-8 max-w-2xl mx-auto text-lg">
          Every action counts. Start a project, volunteer with existing initiatives, or share your
          knowledge with the community. Together, we can restore life on land.
        </p>
        <button
          onClick={() => onNavigate('community')}
          className="px-8 py-4 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all font-medium shadow-lg"
        >
          Join the Community
        </button>
      </section>
    </div>
  );
}
