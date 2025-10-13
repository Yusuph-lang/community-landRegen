import { useEffect, useState } from 'react';
import { BookOpen, Video, FileText, Search, Eye, Plus, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ResourceForm } from '../components/ResourceForm';

interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  resource_type: string;
  image_url: string | null;
  external_url: string | null;
  views: number;
  created_at: string;
}

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchQuery, selectedCategory, selectedType]);

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('educational_resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = [...resources];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r => r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.resource_type === selectedType);
    }

    setFilteredResources(filtered);
  };

  const incrementViews = async (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;

    await supabase
      .from('educational_resources')
      .update({ views: resource.views + 1 })
      .eq('id', resourceId);

    setResources(prev =>
      prev.map(r => (r.id === resourceId ? { ...r, views: r.views + 1 } : r))
    );
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    incrementViews(resource.id);
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      article: BookOpen,
      video: Video,
      guide: FileText,
      case_study: FileText,
      research: FileText,
      tool: FileText,
    };
    return icons[type] || BookOpen;
  };

  const formatCategory = (category: string) => {
    return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Educational Resources</h1>
          <p className="text-gray-600 mt-2">Learn about land restoration and sustainable practices</p>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Resource
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="soil_health">Soil Health</option>
              <option value="reforestation">Reforestation</option>
              <option value="biodiversity">Biodiversity</option>
              <option value="sustainable_agriculture">Sustainable Agriculture</option>
              <option value="climate_action">Climate Action</option>
              <option value="water_conservation">Water Conservation</option>
              <option value="general">General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="guide">Guide</option>
              <option value="case_study">Case Study</option>
              <option value="research">Research</option>
              <option value="tool">Tool</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading resources...</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No resources found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const Icon = getTypeIcon(resource.resource_type);
            return (
              <div
                key={resource.id}
                onClick={() => handleResourceClick(resource)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                {resource.image_url ? (
                  <img
                    src={resource.image_url}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      {formatCategory(resource.category)}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{resource.views}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{resource.resource_type.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedResource && (
        <ResourceViewer
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      {showForm && (
        <ResourceForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadResources();
          }}
        />
      )}
    </div>
  );
}

function ResourceViewer({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const Icon = resource.resource_type === 'video' ? Video : BookOpen;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        <div className="relative">
          {resource.image_url ? (
            <img
              src={resource.image_url}
              alt={resource.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center rounded-t-2xl">
              <Icon className="w-24 h-24 text-white opacity-50" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {resource.category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">{resource.title}</h2>
            <p className="text-gray-600 mt-2">{resource.description}</p>
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 whitespace-pre-wrap">{resource.content}</div>
          </div>

          {resource.external_url && (
            <a
              href={resource.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              View External Resource
            </a>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="capitalize">{resource.resource_type.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{resource.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
