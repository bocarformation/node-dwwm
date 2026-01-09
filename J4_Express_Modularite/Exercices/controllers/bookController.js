// On simule une BDD
const books = [
  { id: 1, title: "Le Petit Prince", author: "Saint-Exupéry" },//0
  { id: 2, title: "1984", author: "Orwell" } //1
];

export const getAllBooks = (req, res) => {

    if(!books || books.length === 0) {
        return res.status(400).json({message: "Pas de livres trouvés"})
    }

  res.json(books);
}

export const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Livre non trouvé" });
  }
  res.json(book);
}

export const createBook = (req, res) => {
  const newBook = req.body;
  if (!newBook.title) {
    return res.status(400).json({ error: "Le titre est obligatoire" });
  }
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
}

export const updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Livre non trouvé" });
  }
  updatedData.id = id;
  books[index] = updatedData;
  res.json(books[index]);
}

export const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Livre non trouvé" });
  }


  books.splice(index, 1);
  res.status(204).json({message: "Livre supprimé avec succès"});
}