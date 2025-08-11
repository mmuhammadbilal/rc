import { useState, useEffect } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { BsTrophy } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";

const TournamentModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  const slideData = [
    {
      id: 1,
      title: "🚨 League Matches Deadline Alert!",
      icon: <FaExclamationTriangle className="text-7xl text-yellow-300 drop-shadow-gold animate-bounce" />,
      content: "13 August, Wednesday, 5:00 PM",
      subContent: "India and Pakistan out from Tournament",
      bgColor: "bg-gradient-to-br from-[#3a0d0d] via-[#7a1010] to-[#ff1a1a]",
      textColor: "text-yellow-200"
    },
    {
      id: 2,
      title: "⏳ Qualifier & Eliminator Timeline",
      icon: <IoTimeOutline className="text-7xl text-cyan-300 drop-shadow-gold animate-spin-slow" />,
      content: "13 AUG Wednesday: 6:00 PM – 11:59 PM",
      subContent: "2-hour grace period available",
      bgColor: "bg-gradient-to-br from-[#001f29] via-[#004d61] to-[#00b8d9]",
      textColor: "text-cyan-200"
    },
    {
      id: 3,
      title: "🏆 Grand Final",
      icon: <BsTrophy className="text-7xl text-yellow-300 drop-shadow-gold animate-pulse" />,
      content: "14 August",
      subContent: "Epic 3-match series!",
      bgColor: "bg-gradient-to-br from-[#2c003e] via-[#4b0082] to-[#d400d4]",
      textColor: "text-pink-200"
    }
  ];

  useEffect(() => {
    const shuffledSlides = [...slideData].sort(() => Math.random() - 0.5);
    setSlides(shuffledSlides);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const closeModal = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-serif">
      {/* Dim royal background */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={closeModal}
      />

      {/* Royal modal container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-4 border-yellow-400 shadow-[0_0_60px_rgba(255,215,0,0.9)] animate-fadeInScale">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 z-10 rounded-full bg-yellow-500/20 p-2 text-yellow-300 hover:bg-yellow-500/40 transition"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Slides */}
        <div className="relative h-96">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transform transition-all duration-700 ease-in-out ${slide.bgColor} ${
                index === currentSlide ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-6">{slide.icon}</div>
                <h2 className={`mb-4 text-4xl font-extrabold tracking-widest ${slide.textColor} drop-shadow-gold`}>
                  {slide.title}
                </h2>
                <p className="mb-2 text-3xl font-black text-white drop-shadow-lg">
                  {slide.content}
                </p>
                <p className="text-lg text-yellow-100 italic">{slide.subContent}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-yellow-300 w-6 shadow-[0_0_10px_gold]"
                  : "bg-yellow-300/50 w-3 hover:bg-yellow-400"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentModal;
