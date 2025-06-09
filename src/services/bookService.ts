// src/services/bookService.ts

// src/services/bookService.ts
import type { Book } from "../models/Book.model";
import { apiClient } from "../utils/api.utils";

const ENDPOINT = "/api/books";

export async function getBooks(): Promise<Book[]> {
  const res = await apiClient.get(ENDPOINT);
  return res.data;
}

export async function createBook(book: Book): Promise<void> {
  await apiClient.post(ENDPOINT, book);
}

export async function deleteBook(id: number): Promise<void> {
  await apiClient.delete(`${ENDPOINT}/${id}`);
}

export async function getBookById(id: number): Promise<Book> {
  const res = await apiClient.get(`${ENDPOINT}/${id}`);
  return res.data;
}
