const mongoose = require('mongoose');
const Book = require('../models/bookModel');

// get all Books
const getAllBooks = async (req, res) => {

  try {
    const books = await Book.find({}).sort({createdAt: -1})
    res.status(200).json(books)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Book
const createBook = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newBook = new Book({
      ...req.body,
      user_id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get Book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such book'});
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    // checks if the book exists and if the user is the owner of the book by checking the user_id returned from the token
    // user_id is the reference to the user who created the book
    const book = await Book.findByIdAndDelete({ _id: id, user_id: user_id });
    //const book = await Book.findByIdAndDelete({ _id: id,});
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update Book by ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    // added user_id to the query to check if the user is the owner of the book
    const user_id = req.user._id;
    const book = await Book.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  deleteBook,
  updateBook,
};
