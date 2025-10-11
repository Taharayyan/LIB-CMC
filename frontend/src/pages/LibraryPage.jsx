import React, { useState, useEffect } from "react";
import BookCard from "../components/Library/BookCard";
import BookFilter from "../components/Library/BookFilter";
import { useBooks } from "../hooks/useBooks";

const LibraryPage = () => {
  const { books, loading, error, fetchBooks } = useBooks();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    page: 1,
  });

  useEffect(() => {
    fetchBooks(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            Loading books...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="card max-w-md">
          <p className="text-red-600 text-center">
            ⚠️ Error loading books: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-3">📚 Library</h1>
          <p className="text-xl text-gray-600">
            Discover and read books from our digital collection
          </p>
        </div>

        <div className="animate-slide-up">
          <BookFilter onFilterChange={handleFilterChange} />
        </div>

        <div
          className="mt-10 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {books.length === 0 ? (
            <div className="card text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-gray-500 text-lg">
                No books found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
