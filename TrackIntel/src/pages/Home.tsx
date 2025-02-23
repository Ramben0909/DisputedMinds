import React, { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import TypingAnim from "../components/typer/TypingAnim";
import { ChevronLeft, ChevronRight} from "lucide-react";


const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prev) => (prev === 0 ? f1Teams.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prev) => (prev === f1Teams.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 2000); // 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeIndex]); // Re-run effect when activeIndex changes

  interface Team {
    title: string;
    description: string;
    image: string;
  }

  const f1Teams: Team[] = [
    {
      title: "Mercedes-AMG Petronas",
      description: "Eight-time consecutive constructors' champions (2014-2021), known for their silver arrows and technical innovation",
      image: "/mercedes.avif",
    },
    {
      title: "Red Bull Racing",
      description: "Known for aggressive racing and aerodynamic excellence, recent dominators of the sport",
      image: "/red bull.avif",
    },
    {
      title: "Scuderia Ferrari",
      description: "The most successful and oldest F1 team, with 16 constructors' championships and an unmatched racing legacy",
      image: "/ferrari.avif",
    },
    {
      title: "McLaren Racing",
      description: "Historic team with 8 constructors' titles, known for innovation and their papaya orange livery",
      image: "/mclaren.avif",
    },
    {
      title: "Aston Martin Cognizant",
      description: "Aston Martin returned to F1 in 2021, bringing British racing heritage and a focus on performance and luxury",
      image: "/aston martin 2024.avif",
    },
    {
      title: "Alpine F1 Team",
      description: "The French team, formerly known as Renault, is known for its engineering prowess and competitive spirit",
      image: "/alpine.avif",
    },
  ];

  const getCardStyle = (index: number): React.CSSProperties => {
    const totalCards = f1Teams.length;
    const diff = (index - activeIndex + totalCards) % totalCards; // Ensure positive index
    const distance = Math.min(diff, totalCards - diff); // Calculate shortest distance for circular effect

    let transform = "";
    let zIndex = 5 - distance;
    let opacity = 1;

    if (diff === 0) {
      transform = "translateX(-50%) scale(1)";
      zIndex = 5;
    } else if (diff <= totalCards / 2) {
      transform = `translateX(${-50 + diff * 60}%) scale(${0.9 - distance * 0.1})`;
      opacity = 0.7 - distance * 0.2;
    } else {
      transform = `translateX(${-50 - (totalCards - diff) * 60}%) scale(${0.9 - distance * 0.1})`;
      opacity = 0.7 - distance * 0.2;
    }

    return {
      transform,
      zIndex,
      opacity: Math.max(0, opacity),
    };
  };

  return (
    <div className="bg-black text-white font-sans flex flex-col overflow-hidden">
  {/* Video Background Section */}
  <div className="relative h-screen flex items-center">
    <div className="absolute inset-0">
      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src="/Race.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
    </div>
    <div className="relative z-10 w-full text-center px-8">
      <TypingAnim />
    </div>
  </div>

  {/* 3D Carousel Section */}
  <div className="relative h-screen flex justify-center items-center" style={{ marginBottom: "-100px",marginTop: "-100px" }}>
    <div className="relative h-[300px] w-full flex justify-center items-center">
      {/* Previous Button */}
      <button
        onClick={handlePrevClick}
        className="absolute left-2 p-2 rounded-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/30"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Carousel Cards */}
      {f1Teams.map((team, index) => (
        <div
          key={index}
          className="absolute h-[150px] left-1/2 top-0 w-[460px] transition-all duration-500 cursor-pointer"
          style={getCardStyle(index)}
          onClick={() => setActiveIndex(index)}
        >
          <div className="bg-black/50 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-white/10">
            <img
              src={team.image}
              alt={team.title}
              className="w-full h-[260px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{team.title}</h3>
              <p className="text-gray-300 text-sm">{team.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNextClick}
        className="absolute right-2 p-2 rounded-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/30"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>

  <div className="flex items-center justify-center ">
    <Footer />
  </div>
</div>

  );
};

export default Home;