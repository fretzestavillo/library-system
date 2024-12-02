import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { IFormInputs, ReceivedBookData } from '../tools/type';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export function Home() {
  const [lbsList, setlbsList] = useState<ReceivedBookData[]>([]);

  useEffect(() => {
    const items = localStorage.getItem('lbsStorageList');
    if (items) {
      setlbsList(JSON.parse(items));
    }
  }, []);

  const getList = async () => {
    const baseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${baseUrl}lbs`);
    const result = await response.json();
    console.log(result, typeof result, ' here I am');
    localStorage.setItem('lbsStorageList', JSON.stringify(result));
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const baseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${baseUrl}lbs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    getList();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  async function deleteButton(id: string) {
    const baseUrl = 'http://localhost:3000/api/';
    try {
      const response = await fetch(`${baseUrl}lbs?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      getList();
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  return (
    <>
      <h1>All Books</h1>
      <div>
        <ul>
          {lbsList &&
            lbsList.map((book: ReceivedBookData) => (
              <li key={book.id}>
                <div>Book Name: {book.bookName}</div>
                <div>Book Author: {book.bookAuthor}</div>
                <div>Book Pages: {book.bookPages}</div>
                <div>Book Price: {book.bookPrice}</div>
                <div>Book Availability: Available</div>
                <div>Issue: Issue</div>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  startIcon={<KeyboardReturnIcon />}
                >
                  Return
                </Button>
                <Button
                  onClick={() => deleteButton(book.id)}
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </li>
            ))}
        </ul>
        <h1>Add Book</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('bookName', { required: true })} />
          {errors.bookName && 'Book name is required'}
          <input {...register('bookAuthor', { required: true })} />
          {errors.bookAuthor && 'Book author is required'}
          <input {...register('bookPages', { required: true })} />
          {errors.bookPages && 'Book pages is required'}
          <input {...register('bookPrice', { required: true })} />
          {errors.bookPrice && 'Book price is required'}
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
