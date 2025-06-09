import { useState } from 'react';
import { getBookById } from '../services/bookService';
import type {Book} from "../models/Book.model"

interface SearchBookProps {
  onBookFound: (book: Book) => void;
}


export default function SearchBook({ onBookFound }: SearchBookProps) {
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!searchId) return setError('Por favor ingresa un ID');
    const id = parseInt(searchId);
    if (isNaN(id)) return setError('El ID debe ser un número');

    try {
      const book = await getBookById(id);
      onBookFound(book);
    } catch {
      setError('Libro no encontrado');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Buscar Libro por ID</h3>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="text"
          placeholder="ID del libro"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          Buscar
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

