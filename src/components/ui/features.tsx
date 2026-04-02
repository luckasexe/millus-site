import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FeaturesProps {
  features: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    image: string;
  }[];
}

export function Features({ features }: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;
    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();
      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia cumque, unde delectus consequuntur ab accusantium odio quasi et sunt nisi facere quo fuga velit vero porro rem maiores cum.
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Lorem Ipsum
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">
          <div
            ref={containerRef}
            className="lg:space-y-8 md:space-x-6 lg:space-x-0 overflow-x-auto overflow-hidden no-scrollbar lg:overflow-visible flex lg:flex-col flex-row order-1 pb-4 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => { featureRefs.current[index] = el; }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  <div
                    className={`flex lg:flex-row flex-col items-start space-x-4 p-3 max-w-sm md:max-w-sm lg:max-w-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-white md:shadow-xl rounded-xl md:border border-gray-200"
                        : ""
                    }`}
                  >
                    <div
                      className={`p-3 hidden md:block rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-sky-500 text-white"
                          : "bg-sky-100 text-sky-500"
                      }`}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`text-lg md:mt-4 lg:mt-0 font-semibold mb-2 transition-colors duration-300 ${
                          isActive ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`transition-colors duration-300 text-sm ${
                          isActive ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-4 bg-gray-100 rounded-sm h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className="h-full bg-sky-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative order-1 max-w-lg mx-auto lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <img
                className="rounded-2xl border border-gray-100 shadow-lg w-full h-auto"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
