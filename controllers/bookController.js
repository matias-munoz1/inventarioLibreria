import Book from '../models/book.js';
import Movement from '../models/movement.js';

// Obtener todos los libros
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un libro por ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(400).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo libro
export const createBook = async (req, res) => {
  try {
    const { title, description, stock, status } = req.body;
    const book = await Book.create({ title, description, stock, status });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un libro existente
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, status, category, publisher, city } =
    req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Registra el movimiento si la ciudad ha cambiado
    if (book.city !== city) {
      await Movement.create({
        bookId: book.id,
        fromCity: book.city,
        toCity: city,
        stock: book.stock,
      });
    }

    book.title = title;
    book.description = description;
    book.stock = stock;
    book.status = status;
    book.category = category;
    book.publisher = publisher;
    book.city = city;

    await book.save();
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMovements = async (req, res) => {
  try {
    const movements = await Movement.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro y reasignar IDs
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();

      // Reasignar IDs de los libros restantes
      const books = await Book.findAll({ order: [['id', 'ASC']] });
      for (let i = 0; i < books.length; i++) {
        books[i].id = i + 1;
        await books[i].save();
      }

      res.status(204).json();
    } else {
      res.status(400).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
