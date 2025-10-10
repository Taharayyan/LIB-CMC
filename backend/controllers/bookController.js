import { Book, User } from '../models/index.js';

export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (category) whereClause.category = category;
    if (search) {
      whereClause.$or = [
        { title: { $iLike: `%${search}%` } },
        { author: { $iLike: `%${search}%` } }
      ];
    }

    const books = await Book.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'uploader',
        attributes: ['username', 'avatar_url']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      books: books.rows,
      totalCount: books.count,
      totalPages: Math.ceil(books.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id, {
      include: [{
        model: User,
        as: 'uploader',
        attributes: ['username', 'avatar_url']
      }]
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, category, description } = req.body;
    const uploaded_by = req.user.userId;

    const book = await Book.create({
      title,
      author,
      category,
      description,
      pdf_path: req.file ? req.file.path : null,
      uploaded_by
    });

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, description } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user owns the book or is admin
    if (book.uploaded_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this book' });
    }

    await book.update({ title, author, category, description });
    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user owns the book or is admin
    if (book.uploaded_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this book' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};
