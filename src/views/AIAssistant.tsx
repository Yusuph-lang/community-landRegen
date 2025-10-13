import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Land Restoration AI Assistant. I can help you with:\n\n• Best practices for reforestation and soil restoration\n• Guidance on biodiversity conservation\n• Tips for sustainable agriculture\n• Information about native species for your region\n• Project planning and implementation strategies\n• Climate-resilient land management techniques\n\nWhat would you like to learn about today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'How do I start a reforestation project?',
    'What are the best native trees for tropical climates?',
    'How can I improve soil health naturally?',
    'Tell me about companion planting techniques',
    'What is regenerative agriculture?',
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('reforestation') || lowerMessage.includes('tree') || lowerMessage.includes('forest')) {
      return 'Reforestation is a critical strategy for land restoration. Here are key steps to start:\n\n1. **Site Assessment**: Evaluate soil quality, water availability, and existing vegetation\n2. **Species Selection**: Choose native species adapted to your local climate\n3. **Planning**: Create a planting schedule aligned with rainy seasons\n4. **Preparation**: Clear invasive species and prepare planting sites\n5. **Planting**: Use proper techniques to ensure seedling survival\n6. **Maintenance**: Regular watering, mulching, and protection from pests\n7. **Monitoring**: Track growth and survival rates\n\nConsider working with local forestry experts and engaging community members. Would you like specific recommendations for your region?';
    }

    if (lowerMessage.includes('soil') || lowerMessage.includes('health')) {
      return 'Soil health is fundamental to land restoration. Here are proven methods to improve it:\n\n**Natural Amendments:**\n• Compost and organic matter\n• Cover crops (legumes, grasses)\n• Mulching to retain moisture\n• Biochar for carbon sequestration\n\n**Practices:**\n• Minimize tillage to preserve soil structure\n• Rotate crops to prevent depletion\n• Use companion planting\n• Avoid chemical fertilizers\n• Implement agroforestry systems\n\n**Testing:**\nRegularly test pH, nutrients, and organic content. Would you like information about specific soil types or challenges?';
    }

    if (lowerMessage.includes('biodiversity') || lowerMessage.includes('native') || lowerMessage.includes('species')) {
      return 'Biodiversity is essential for ecosystem resilience. Here\'s how to promote it:\n\n**Native Species:**\n• Research plants indigenous to your area\n• Create diverse plantings (not monocultures)\n• Include various layers: canopy, understory, ground cover\n• Plant species that support local wildlife\n\n**Habitat Creation:**\n• Leave dead wood for insects\n• Create water sources\n• Establish wildlife corridors\n• Minimize pesticide use\n\n**Monitoring:**\nTrack species diversity over time using biodiversity indices. Partner with local conservation groups for guidance. What\'s your specific region or ecosystem type?';
    }

    if (lowerMessage.includes('sustainable') || lowerMessage.includes('agriculture') || lowerMessage.includes('regenerative')) {
      return 'Sustainable and regenerative agriculture transforms land use. Key principles:\n\n**Core Practices:**\n1. Crop rotation and diversification\n2. Integrating livestock (managed grazing)\n3. Reducing external inputs\n4. Building soil organic matter\n5. Water conservation techniques\n\n**Regenerative Techniques:**\n• No-till or minimal tillage\n• Permanent soil cover\n• Perennial crops where possible\n• Agroforestry integration\n• Composting and vermiculture\n\n**Benefits:**\n• Increased yields over time\n• Carbon sequestration\n• Water retention\n• Resilience to climate change\n\nWould you like specific crop recommendations or techniques for your project?';
    }

    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('how')) {
      return 'Starting a land restoration project requires careful planning:\n\n**Step 1: Assessment**\n• Analyze current land conditions\n• Identify degradation causes\n• Set measurable goals\n\n**Step 2: Research**\n• Study successful similar projects\n• Consult local experts\n• Understand local regulations\n\n**Step 3: Planning**\n• Create a detailed timeline\n• Budget for materials and labor\n• Identify funding sources\n• Engage stakeholders\n\n**Step 4: Implementation**\n• Start small with pilot areas\n• Document everything\n• Adapt based on results\n\n**Step 5: Monitoring**\n• Track progress regularly\n• Measure against goals\n• Share learnings\n\nWhat type of land restoration are you interested in? I can provide more specific guidance.';
    }

    if (lowerMessage.includes('climate') || lowerMessage.includes('drought') || lowerMessage.includes('resilient')) {
      return 'Building climate resilience in land restoration:\n\n**Water Management:**\n• Rainwater harvesting systems\n• Swales and berms for water retention\n• Drought-tolerant native species\n• Mulching to reduce evaporation\n\n**Climate-Adapted Species:**\n• Choose heat and drought-tolerant varieties\n• Use deep-rooted plants\n• Consider future climate projections\n\n**Soil Carbon:**\n• Increase organic matter\n• Maintain permanent soil cover\n• Practice regenerative techniques\n\n**Diverse Systems:**\n• Mixed species plantings\n• Multiple income sources\n• Flexible management approaches\n\nWhat climate challenges are you facing in your region?';
    }

    return 'That\'s an interesting question about land restoration! While I can provide general guidance, I\'d recommend:\n\n1. **Check our Educational Resources** for detailed articles and guides\n2. **Join Community Discussions** to learn from experienced practitioners\n3. **Explore Existing Projects** for real-world examples\n\nCould you rephrase your question or ask about:\n• Reforestation techniques\n• Soil health improvement\n• Biodiversity conservation\n• Sustainable agriculture\n• Project planning\n\nI\'m here to help you succeed in your restoration efforts!';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full">
          <Bot className="w-6 h-6" />
          <span className="text-lg font-bold">AI Land Restoration Assistant</span>
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized guidance on land restoration, sustainable practices, and ecosystem management
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg flex flex-col" style={{ height: '600px' }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-gray-100 px-6 py-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about land restoration, soil health, reforestation..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Suggested Questions</h3>
        <div className="flex flex-wrap gap-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(question)}
              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-all text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
