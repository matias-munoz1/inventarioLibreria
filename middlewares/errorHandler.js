// Middleware para manejar errores
const errorHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
};

export default errorHandler;
