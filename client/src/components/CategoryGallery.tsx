import React, { useState } from "react";
// Heroicons SVGs for arrows
const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

interface CategoryGalleryProps {
  categories: Array<{
    category: string;
    images: string[];
  }>;
}


const CategoryGallery: React.FC<CategoryGalleryProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.category || "");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const currentCategory = categories.find(cat => cat.category === selectedCategory);

  const openModal = (img: string, idx: number) => {
    setModalImage(img);
    setModalIndex(idx);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalIndex(null);
  };

  const showPrev = () => {
    if (modalIndex !== null && currentCategory) {
      const prevIdx = (modalIndex - 1 + currentCategory.images.length) % currentCategory.images.length;
      setModalImage(currentCategory.images[prevIdx]);
      setModalIndex(prevIdx);
    }
  };

  const showNext = () => {
    if (modalIndex !== null && currentCategory) {
      const nextIdx = (modalIndex + 1) % currentCategory.images.length;
      setModalImage(currentCategory.images[nextIdx]);
      setModalIndex(nextIdx);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {categories.map(cat => (
        <button
        key={cat.category}
        className={`px-4 py-2 rounded font-medium transition-colors text-sm
          ${selectedCategory === cat.category
          ? "bg-orange-600 text-white"
          : "bg-gray-100 text-black dark:bg-gray-900 dark:text-white"}
          ${selectedCategory !== cat.category
          ? "hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black"
          : ""}
        `}
        onClick={() => setSelectedCategory(cat.category)}
        >
        {cat.category}
        </button>
      ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {currentCategory?.images.map((img, idx) => (
        <button
        key={idx}
        className="focus:outline-none"
        onClick={() => openModal(img, idx)}
        style={{ background: "none", border: "none", padding: 0, margin: 0 }}
        >
        <img
          src={img}
          alt={`${selectedCategory} ${idx + 1}`}
          className="h-40 w-full object-cover rounded shadow hover:ring-2 hover:ring-orange-600 transition"
        />
        </button>
      ))}
      </div>

      {/* Modal for large image */}
      {modalImage && modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md"
          onClick={closeModal}
        >
          <button
            className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white px-2 py-2 bg-black bg-opacity-40 rounded-full hover:bg-opacity-70 flex items-center justify-center shadow-lg"
            onClick={e => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous"
          >
            <ArrowLeft />
          </button>
          <img
            src={modalImage}
            alt="Large preview"
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white px-2 py-2 bg-black bg-opacity-40 rounded-full hover:bg-opacity-70 flex items-center justify-center shadow-lg"
            onClick={e => { e.stopPropagation(); showNext(); }}
            aria-label="Next"
          >
            <ArrowRight />
          </button>
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold"
            onClick={e => { e.stopPropagation(); closeModal(); }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryGallery;
