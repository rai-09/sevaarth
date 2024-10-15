import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

// BlogPost Component
const BlogPost = ({ post }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
    <p className="text-gray-600 mb-4">{post.content}</p>
    <div className="flex justify-between items-center">
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
        {post.category}
      </span>
      <span className="text-sm text-gray-500">{post.date}</span>
    </div>
  </motion.div>
);

// Blog Component
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");

  const postsPerPage = 6;

  const allPosts = [
    {
      id: 1,
      title: "Our Latest Initiative",
      content: "Learn about our newest project to help the community.",
      category: "Projects",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Volunteer Spotlight",
      content: "Meet the amazing volunteers who make our work possible.",
      category: "People",
      date: "2024-03-10",
    },
    {
      id: 3,
      title: "Impact Report 2024",
      content: "See the difference we have made in the past year.",
      category: "Reports",
      date: "2024-03-05",
    },
    {
      id: 4,
      title: "Upcoming Charity Event",
      content: "Join us for our annual fundraising gala.",
      category: "Events",
      date: "2024-02-28",
    },
    {
      id: 5,
      title: "New Partnership Announced",
      content: "We are excited to collaborate with a local business.",
      category: "News",
      date: "2024-02-20",
    },
    {
      id: 6,
      title: "Sustainability Initiatives",
      content: "How we are reducing our environmental impact.",
      category: "Projects",
      date: "2024-02-15",
    },
    {
      id: 7,
      title: "Community Outreach Program",
      content: "Our new program to support local families.",
      category: "Projects",
      date: "2024-02-10",
    },
    {
      id: 8,
      title: "Volunteer Training Workshop",
      content: "Enhance your skills and make a bigger impact.",
      category: "Events",
      date: "2024-02-05",
    },
    // Add more posts as needed
  ];

  const categories = ["All", ...new Set(allPosts.map((post) => post.category))];

  // Sorting function
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    return a.title.localeCompare(b.title);
  });

  // Filtering logic
  const filteredPosts = sortedPosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 mt-[8%]"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        {/* Search Bar */}
        <div className="relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <AnimatePresence>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredPosts.length > postsPerPage && (
        <div className="mt-8 flex justify-center">
          {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Blog;
