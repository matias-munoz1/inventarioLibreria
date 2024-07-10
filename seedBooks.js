import sequelize from './config/database.js';
import Book from './models/book.js'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

const books = [
  {
    title: 'Cien años de soledad',
    description:
      'Una obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.',
    stock: 10,
    status: true,
  },
  {
    title: 'Don Quijote de la Mancha',
    description:
      'La historia de un caballero loco y su fiel escudero, Sancho Panza, que buscan aventuras en la España del siglo XVII. Escrita por Miguel de Cervantes.',
    stock: 15,
    status: true,
  },
  {
    title: 'La sombra del viento',
    description:
      'Una novela de Carlos Ruiz Zafón que sigue la vida de Daniel Sempere después de descubrir un libro misterioso en el Cementerio de los Libros Olvidados.',
    stock: 20,
    status: false,
  },
  {
    title: 'Crónica de una muerte anunciada',
    description:
      'Otra obra de Gabriel García Márquez que relata los eventos que llevan al asesinato de Santiago Nasar en un pequeño pueblo colombiano.',
    stock: 5,
    status: true,
  },
  {
    title: 'El amor en los tiempos del cólera',
    description:
      'Una novela de Gabriel García Márquez sobre el amor eterno entre Fermina Daza y Florentino Ariza, que abarca más de cincuenta años.',
    stock: 8,
    status: false,
  },
  {
    title: 'La casa de los espíritus',
    description:
      'Isabel Allende narra la historia de la familia Trueba en una novela que mezcla realismo mágico y política en un país sudamericano sin nombre.',
    stock: 12,
    status: true,
  },
  {
    title: 'Rayuela',
    description:
      'Julio Cortázar presenta una novela experimental que puede ser leída en múltiples órdenes, explorando la vida de Horacio Oliveira en París y Buenos Aires.',
    stock: 7,
    status: true,
  },
  {
    title: 'Como agua para chocolate',
    description:
      'Laura Esquivel cuenta la historia de Tita, una joven que encuentra en la cocina su escape emocional y espiritual en la Revolución Mexicana.',
    stock: 10,
    status: false,
  },
  {
    title: 'El laberinto de los espíritus',
    description:
      'La última entrega de la saga de El Cementerio de los Libros Olvidados por Carlos Ruiz Zafón, cerrando la historia de Daniel Sempere y su familia.',
    stock: 14,
    status: true,
  },
  {
    title: 'Pedro Páramo',
    description:
      'Juan Rulfo narra la búsqueda de Juan Preciado por su padre en el pueblo fantasma de Comala, una obra fundamental del realismo mágico.',
    stock: 9,
    status: false,
  },
  {
    title: 'Ficciones',
    description:
      'Una colección de cuentos de Jorge Luis Borges que exploran temas de laberintos, bibliotecas infinitas y universos paralelos.',
    stock: 11,
    status: true,
  },
  {
    title: 'La tregua',
    description:
      'Mario Benedetti cuenta la vida monótona de un empleado de oficina que encuentra el amor inesperadamente, solo para perderlo poco después.',
    stock: 6,
    status: false,
  },
  {
    title: 'Los detectives salvajes',
    description:
      'Roberto Bolaño narra la búsqueda de dos poetas por una misteriosa escritora desaparecida en México.',
    stock: 13,
    status: true,
  },
  {
    title: 'Aura',
    description:
      'Una novela corta de Carlos Fuentes que cuenta la historia de Felipe Montero, un joven historiador que es contratado para terminar las memorias de un general.',
    stock: 8,
    status: true,
  },
  {
    title: 'El Aleph',
    description:
      'Una colección de cuentos de Jorge Luis Borges que explora temas metafísicos y filosóficos.',
    stock: 5,
    status: false,
  },
  {
    title: 'La muerte de Artemio Cruz',
    description:
      'Una novela de Carlos Fuentes que sigue la vida de un poderoso hombre de negocios en México.',
    stock: 12,
    status: true,
  },
  {
    title: 'El coronel no tiene quien le escriba',
    description:
      'Una novela corta de Gabriel García Márquez sobre un viejo coronel que espera una pensión que nunca llega.',
    stock: 7,
    status: true,
  },
  {
    title: 'La ciudad y los perros',
    description:
      'Una novela de Mario Vargas Llosa sobre la vida en una academia militar en Perú.',
    stock: 9,
    status: false,
  },
  {
    title: 'La fiesta del chivo',
    description:
      'Una novela de Mario Vargas Llosa que narra los últimos días de la dictadura de Trujillo en la República Dominicana.',
    stock: 14,
    status: true,
  },
  {
    title: 'El túnel',
    description:
      'Una novela de Ernesto Sabato sobre la obsesión y la locura de un pintor que comete un asesinato.',
    stock: 10,
    status: false,
  },
];

const seedBooks = async () => {
  try {
    await sequelize.sync({ force: true });
    await Book.bulkCreate(books);
    console.log('Books have been added');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();
