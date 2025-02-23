import React from "react";
import { BarChart2, Zap, Shield, Users, RefreshCw } from "react-feather";
import Sidebar from "../components/sidebar/sidebar";

interface ServiceCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  link,
}) => {
  return (
    <div
      className="group bg-white rounded-xl border border-gray-200 p-8 transition-all duration-300 hover:border-red-600 hover:shadow-xl cursor-pointer"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
      </div>
      <ul className="space-y-4 border-t border-gray-100 pt-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Zap className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; text: string }> = ({
  icon: Icon,
  title,
  text,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-50">
    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-red-600" />
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: BarChart2,
      title: "Dynamic Data Visualization",
      description: "Transform raw race data into actionable insights with our interactive analytics platform.",
      features: [
        "Real-time telemetry dashboards",
        "Historical performance comparison",
        "Predictive race modeling",
        "Customizable data overlays"
      ],
      price: "0.001",
      link: "https://f1-visualizer.streamlit.app/",
    },
    // Add more services as needed
  ];

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      text: "Enterprise-level data protection with AES-256 encryption and regular security audits.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      text: "24/7 access to F1 data specialists and technical support team.",
    },
    {
      icon: RefreshCw,
      title: "Continuous Updates",
      text: "Real-time data streams and weekly platform enhancements.",
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", marginTop: 3, backgroundColor: "white" }}>
      <Sidebar />
      <div style={{ 
          flex: 1,
          padding: 4,
          overflowY: 'auto',
          height: '100%',
          marginLeft: 2,
          marginRight: 2,
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgba(234, 215, 215, 0.79), 0 2px 4px -1px rgba(255, 252, 251, 0.96)', 
          }}>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-red-900 pt-32 pb-24 px-4 rounded-lg">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Formula 1 Data Intelligence Platform
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Advanced analytics solutions powering championship-winning decisions
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-20 -mt-16">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
              />
            ))}
          </div>

          {/* Enterprise Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Enterprise-Grade Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-center text-white">
            <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
            <div className="flex flex-row justify-center items-center gap-65">
              <div>
                <div className="text-3xl font-bold mb-2">99.99%</div>
                <div className="text-sm opacity-90">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Global Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
