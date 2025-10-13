import { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, Plus, Calendar, User as UserIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PostForm } from '../components/PostForm';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id: string | null;
  likes: number;
  created_at: string;
}

interface Profile {
  full_name: string | null;
}

export function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory]);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const postData = data || [];
      setPosts(postData);

      const authorIds = [...new Set(postData.map(p => p.author_id).filter(Boolean))];
      if (authorIds.length > 0) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', authorIds);

        const profileMap: Record<string, Profile> = {};
        profileData?.forEach(p => {
          profileMap[p.id] = { full_name: p.full_name };
        });
        setProfiles(profileMap);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === selectedCategory));
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    await supabase
      .from('community_posts')
      .update({ likes: post.likes + 1 })
      .eq('id', postId);

    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      discussion: 'bg-blue-100 text-blue-700',
      question: 'bg-purple-100 text-purple-700',
      success_story: 'bg-green-100 text-green-700',
      announcement: 'bg-yellow-100 text-yellow-700',
      help_needed: 'bg-red-100 text-red-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatCategory = (category: string) => {
    return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getAuthorName = (authorId: string | null) => {
    if (!authorId) return 'Anonymous';
    return profiles[authorId]?.full_name || 'Community Member';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600 mt-2">Connect, share, and learn from fellow restoration advocates</p>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="discussion">Discussion</option>
          <option value="question">Question</option>
          <option value="success_story">Success Story</option>
          <option value="announcement">Announcement</option>
          <option value="help_needed">Help Needed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No posts yet</p>
          <p className="text-gray-500 text-sm mt-2">Be the first to start a conversation</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {formatCategory(post.category)}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
              <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserIcon className="w-4 h-4" />
                  <span>{getAuthorName(post.author_id)}</span>
                </div>

                <button
                  onClick={() => handleLike(post.id)}
                  disabled={!user}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium">{post.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <PostForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadPosts();
          }}
        />
      )}
    </div>
  );
}
