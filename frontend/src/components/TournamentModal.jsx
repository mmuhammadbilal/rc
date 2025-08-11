import { useState, useEffect } from "react";

const TournamentModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  const slideData = [
    {
      id: 1,
      title: "Tournament Deadline Alert!",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z" />
        </svg>
      ),
      content: "13 August, Wednesday, 5:00 PM",
      subContent: "India and Pakistan are out of the tournament",
      bgColor: "bg-gradient-to-br from-yellow-600 via-orange-600 to-red-700",
      textColor: "text-yellow-200"
    },
    {
      id: 2,
      title: "Qualifier & Eliminator Schedule",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: "Wednesday: 6:00 PM - 11:59 PM",
      subContent: "2-hour grace period available",
      bgColor: "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900",
      textColor: "text-cyan-300"
    },
    {
      id: 3,
      title: "🔥 Grand Final",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26l6.91.64-5.27 4.73L18.18 22 12 18.27 5.82 22l1.45-8.37L2 8.9l6.91-.64L12 2z" />
        </svg>
      ),
      content: "14 August",
      subContent: "Epic 3-match series awaits!",
      bgColor: "bg-gradient-to-br from-purple-900 via-fuchsia-800 to-indigo-800",
      textColor: "text-pink-300"
    }
  ];

  useEffect(() => {
    setSlides([...slideData].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition"
        >
          ✕
        </button>

        {/* Slides */}
        <div className="relative h-96">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-700 ease-in-out transform ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              } ${slide.bgColor}`}
            >
              <div className="mb-4">{slide.icon}</div>
              <h2 className={`text-2xl font-extrabold drop-shadow-lg ${slide.textColor}`}>
                {slide.title}
              </h2>
              <p className="mt-2 text-3xl font-bold text-white drop-shadow-sm">{slide.content}</p>
              <p className="mt-1 text-lg text-white/90">{slide.subContent}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-4" : "bg-white/50"
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
