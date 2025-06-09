import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createBook } from '../services/bookService';

// Esquema de validación para el formulario de libro
const bookSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  author: z.string().min(1, 'El autor es obligatorio'),
  publicationYear: z
    .union([z.string().min(1, 'El año es obligatorio'), z.number()])
    .refine(val => !val || (Number(val) >= 1000 && Number(val) <= new Date().getFullYear()), {
      message: `Año entre 1000 y ${new Date().getFullYear()}`,
    }),
  category: z.string().min(1, 'La categoría es obligatoria'),
});

type BookForm = z.infer<typeof bookSchema>;

interface CreateBookProps {
  onBookCreated: () => void;
}

export default function CreateBook({ onBookCreated }: CreateBookProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookForm>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      publicationYear: '',
      category: '',
    },
  });

  const onSubmit = async (data: BookForm) => {
    try {
      await createBook({
        ...data,
        publicationYear: data.publicationYear ? Number(data.publicationYear) : undefined,
      });
      alert('Libro creado con éxito');
      reset();
      onBookCreated();
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Hubo un error al crear el libro');
    }
  };

  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h2 className="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
              Agregar Nuevo Libro
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
                  Título del Libro
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="Ej: Cien años de soledad"
                />
                {errors.title && (
                  <span className="text-xs text-red-400">{errors.title.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="author" className="mb-2 block text-sm font-medium text-gray-900">
                  Autor
                </label>
                <input
                  type="text"
                  id="author"
                  {...register("author")}
                  className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="Ej: Gabriel García Márquez"
                />
                {errors.author && (
                  <span className="text-xs text-red-400">{errors.author.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="publicationYear" className="mb-2 block text-sm font-medium text-gray-900">
                  Año de Publicación
                </label>
                <input
                  type="number"
                  id="publicationYear"
                  {...register("publicationYear")}
                  className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="Ej: 1967"
                  min={1000}
                  max={new Date().getFullYear()}
                />
                {errors.publicationYear && (
                  <span className="text-xs text-red-400">{errors.publicationYear.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900">
                  Categoría
                </label>
                <input
                  type="text"
                  id="category"
                  {...register("category")}
                  className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="Ej: Realismo mágico"
                />
                {errors.category && (
                  <span className="text-xs text-red-400">{errors.category.message}</span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-1/2 rounded-lg border border-blue-500 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Libro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}