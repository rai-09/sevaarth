import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendar, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";

// Utility function to handle image loading with fallback
const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc,
  className,
  width = 800,
  height = 600,
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
      width={width}
      height={height}
    />
  );
};

const EventCard = ({ event }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
    whileHover={{ y: -5 }}
  >
    <ImageWithFallback
      src={event.image}
      alt={event.title}
      fallbackSrc="/images/logoSevaarth.png"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-2 flex items-center">
        <FaCalendar className="mr-2" /> {event.date}
      </p>
      <p className="text-gray-600 mb-2 flex items-center">
        <FaMapMarkerAlt className="mr-2" /> {event.location}
      </p>
      <p className="text-gray-700">{event.description}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Learn More
      </motion.button>
    </div>
  </motion.div>
);

const FeaturedEvent = ({ event }) => {
  const router = useRouter(); // Add this line

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-xl p-6 mb-8"
    >
      <h2 className="text-3xl font-bold mb-4">Featured Event: {event.title}</h2>
      <p className="mb-4">{event.description}</p>
      <div className="flex items-center justify-between">
        <p className="flex items-center">
          <FaCalendar className="mr-2" /> {event.date}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300"
          onClick={() => router.push("/getInvolved")} // Add this line
        >
          Register Now
        </motion.button>
      </div>
    </motion.div>
  );
};
const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const events = [
    {
      id: 1,
      title: "Community Cleanup Drive",
      date: "June 15, 2024",
      location: "Central Park",
      description:
        "Join us for a day of environmental action! Together, we can make a difference.",
      image: "https://source.unsplash.com/random/800x600?cleanup",
      category: "Environment",
    },
    {
      id: 2,
      title: "Charity Gala Dinner",
      date: "July 22, 2024",
      location: "Grand Ballroom",
      description:
        "An evening of fine dining to support our cause. Enjoy live music and a charity auction.",
      image: "https://source.unsplash.com/random/800x600?gala",
      category: "Fundraising",
    },
    {
      id: 3,
      title: "Youth Empowerment Workshop",
      date: "August 10, 2024",
      location: "Community Center",
      description:
        "A workshop empowering youth with key skills and knowledge for personal and professional success.",
      image: "https://source.unsplash.com/random/800x600?workshop",
      category: "Education",
    },
    {
      id: 4,
      title: "Annual Health Fair",
      date: "September 14, 2024",
      location: "City Square",
      description:
        "A day dedicated to health and wellness, offering free health screenings and informative sessions.",
      image: "https://source.unsplash.com/random/800x600?health",
      category: "Health",
    },
    {
      id: 5,
      title: "Winter Clothing Drive",
      date: "November 15, 2024",
      location: "Local Library",
      description:
        "Donate winter clothes to help those in need stay warm this season. Every item counts!",
      image: "https://source.unsplash.com/random/800x600?clothing",
      category: "Community Support",
    },
    {
      id: 6,
      title: "Fundraising Fun Run",
      date: "December 1, 2024",
      location: "River Walk Trail",
      description:
        "Join us for a fun run to raise funds for our NGO. All ages are welcome!",
      image: "https://source.unsplash.com/random/800x600?run",
      category: "Fitness",
    },
  ];

  const categories = [
    "All",
    "Environment",
    "Fundraising",
    "Fitness",
    "Community Support",
  ];

  const filteredEvents = events.filter(
    (event) =>
      (selectedCategory === "All" || event.category === selectedCategory) &&
      event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-gray-100 min-h-screen mt-[7%]">
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl mb-8">
            Join us in making a difference in our community
          </p>
          <motion.div
            className="flex justify-center items-center space-x-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Search events..."
              className="px-4 py-2 rounded-full text-gray-800 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
            >
              <FaSearch className="inline mr-2" /> Search
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <FeaturedEvent event={events[0]} />

        <div className="mb-8 flex justify-center space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-blue-100"} transition duration-300`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-8"
          >
            No events found. Try adjusting your search or category filter.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Events;
