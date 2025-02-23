import React,{useRef} from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar'; // Adjust the import path if necessary

// Import Feather Icons from react-icons/fi
import { FiActivity, FiArrowRight, FiMessageSquare, FiBarChart2, FiClock } from 'react-icons/fi';

const About: React.FC = () => {
  const navigate = useNavigate(); 
  const bottomRef = useRef<HTMLDivElement>(null); // Create a ref for the bottom section

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="About">
      <Box sx={{ display: 'flex', height: '100vh', mt: 3 ,}} className="bg-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box
        sx={{
        flex: 1,
        padding: 4,
        overflowY: 'auto',
        height: '100%',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Regular shadow
        bgcolor: '#ffffff', // White background
        color: '#1e2932', // Dark text for contrast
        }}
        >
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-red-900 to-red-500 text-white py-16 shadow-lg">
  <div className="container mx-auto px-4">
    <div className="flex items-center gap-3 mb-6">
      <FiActivity className="w-10 h-10 text-white" /> {/* Keeping icon white for contrast */}
      <h1 className="text-5xl font-bold">F1 History AI</h1>
    </div>
    <p className="text-xl text-gray-200 mb-8 max-w-2xl">
      Your intelligent companion for exploring Formula 1's rich history. Get detailed insights about historic races, legendary drivers, and comprehensive statistics through our advanced AI chatbot.
    </p>
    <button
      onClick={scrollToBottom}
      className="bg-white hover:bg-gray-200 text-red-600 px-8 py-3 rounded-md font-semibold flex items-center gap-2 transition-all shadow-md"
    >
      Start Exploring
      <FiArrowRight className="w-5 h-5 text-red-600" />
    </button>
  </div>
</div>

          {/* Features Grid */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dive deep into F1 history with our AI-powered platform that combines comprehensive race data with interactive visualizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Chatbot Features Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <FiMessageSquare className="w-6 h-6 text-red-600" /> {/* Replaced MessageSquare with FiMessageSquare */}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Interactive AI Chat</h3>
                    <p className="text-gray-600 mb-4">
                      Engage with our AI to explore F1's most memorable moments and get detailed race insights.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FiArrowRight className="w-4 h-4 text-red-600" /> {/* Replaced ArrowRight with FiArrowRight */}
                        Race-by-race analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <FiArrowRight className="w-4 h-4 text-red-600" /> {/* Replaced ArrowRight with FiArrowRight */}
                        Driver statistics and achievements
                      </li>
                      <li className="flex items-center gap-2">
                        <FiArrowRight className="w-4 h-4 text-red-600" /> {/* Replaced ArrowRight with FiArrowRight */}
                        Team history and evolution
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <FiBarChart2 className="w-6 h-6 text-red-600" /> {/* Replaced BarChart3 with FiBarChart2 */}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
                    <p className="text-gray-600 mb-4">
                      Explore F1 statistics through interactive charts and comprehensive analytics.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-red-600" /> {/* Replaced History with FiClock */}
                        Historical performance trends
                      </li>
                      <li className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-red-600" /> {/* Replaced History with FiClock */}
                        Championship analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-red-600" /> {/* Replaced History with FiClock */}
                        Track evolution insights
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Historic F1 Image Section */}
            <div ref={bottomRef} className="relative rounded-xl overflow-hidden h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&q=80&w=2000"
                alt="Historic Formula 1 Racing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-white p-8 max-w-xl">
                  <h3 className="text-3xl font-bold mb-4">Relive F1 History</h3>
                  <p className="text-gray-200 mb-6">
                    From the roaring engines of the past to modern-day technological marvels, explore the evolution of Formula 1 through our AI-powered platform.
                  </p>
                  <button 
                  onClick={() => navigate('/chat')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold flex items-center gap-2 transition-all">
                    Try Our Chatbot
                    <FiMessageSquare className="w-5 h-5" /> {/* Replaced MessageSquare with FiMessageSquare */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default About;