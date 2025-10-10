import { useState, useCallback } from 'react';
import { bookService } from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookService.getAllBooks(filters);
      setBooks(response.books || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBookById = useCallback(async (id) => {
    try {
      const book = await bookService.getBookById(id);
      return book;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const createBook = useCallback(async (bookData) => {
    try {
      const newBook = await bookService.createBook(bookData);
      setBooks(prev => [newBook, ...prev]);
      return newBook;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateBook = useCallback(async (id, bookData) => {
    try {
      const updatedBook = await bookService.updateBook(id, bookData);
      setBooks(prev => prev.map(book => book.id === id ? updatedBook : book));
      return updatedBook;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteBook = useCallback(async (id) => {
    try {
      await bookService.deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
  };
};
