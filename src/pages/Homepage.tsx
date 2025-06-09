// src/pages/HomePage.tsx
import { useState } from 'react';
import CreateBook from '../components/CreateBook';
import BookList from '../components/BookList';
import SearchBook from '../components/SearchBook';
import '../App.css';

export default function HomePage() {
  const [refreshList, setRefreshList] = useState(false);
  const [searchedBook, setSearchedBook] = useState(null);

  const handleBookCreated = () => {
    setRefreshList(prev => !prev);
    setSearchedBook(null);
  };

  const handleBookFound = (book: any) => {
    setSearchedBook(book);
  };

  return (
    <div className="app-container min-h-screen flex flex-col">
      <header className="app-header bg-gradient-to-r from-blue-700 to-blue-500 py-6 shadow-md">
        <h1 className="text-3xl font-bold text-white text-center tracking-wide drop-shadow">Gestión de Libros</h1>
      </header>
      <main className="app-main flex-1 w-full max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="form-section md:col-span-1 flex flex-col gap-6">
          <SearchBook onBookFound={handleBookFound} />
          <CreateBook onBookCreated={handleBookCreated} />
        </div>
        <div className="list-section md:col-span-2">
          <BookList 
            refreshTrigger={refreshList} 
            searchedBook={searchedBook}
          />
        </div>
      </main>
      <footer className="app-footer w-full bg-white border-t border-blue-200 py-4 mt-auto">
        <p className="text-center text-gray-500 text-sm">Sistema de Gestión de Libros © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
