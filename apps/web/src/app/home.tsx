import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { IFormInputs, IssueButtonData, ReceivedBookData } from '../tools/type';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../style.css';

export function Home() {
  const [lbsList, setlbsList] = useState<ReceivedBookData[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const baseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${baseUrl}lbs`);
    const result = await response.json();
    setlbsList(result);
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
    await getList();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  async function deleteButton(id: string) {
    alert('are you sure you want to delete this item?');
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
      await getList();
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  async function statusButton(
    id: string,
    statusButton: string,
    availability: string
  ) {
    const data: IssueButtonData = {
      bookAvailability: availability,
      statusButton: statusButton,
    };

    const baseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${baseUrl}lbs?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    await getList();
  }

  return (
    <>
      <div>
        <h1>Add Book</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="formStyle"
            {...register('bookName', { required: true })}
          />
          {errors.bookName && 'Book name is required'}
          <input
            className="formStyle"
            {...register('bookAuthor', { required: true })}
          />
          {errors.bookAuthor && 'Book author is required'}
          <input
            className="formStyle"
            {...register('bookPages', { required: true })}
          />
          {errors.bookPages && 'Book pages is required'}
          <input
            className="formStyle"
            {...register('bookPrice', { required: true })}
          />
          {errors.bookPrice && 'Book price is required'}
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>

      <h1>All Books</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Book Name</TableCell>
                <TableCell align="center">Book Author</TableCell>
                <TableCell align="center">Book Pages</TableCell>
                <TableCell align="center">Book Price</TableCell>
                <TableCell align="center">Book Availability</TableCell>
                <TableCell align="center">Issue</TableCell>
                <TableCell align="center">Return</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lbsList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.bookName}
                  </TableCell>
                  <TableCell align="center">{row.bookAuthor}</TableCell>
                  <TableCell align="center">{row.bookPages}</TableCell>
                  <TableCell align="center">{row.bookPrice}</TableCell>
                  <TableCell align="center">{row.bookPrice}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<KeyboardReturnIcon />}
                      onClick={() =>
                        statusButton(row.id, 'ISSUED', 'not available')
                      }
                      disabled={row.statusButton === 'ISSUED' ? true : false}
                    >
                      {row.statusButton}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      startIcon={<KeyboardReturnIcon />}
                      onClick={() => statusButton(row.id, 'ISSUE', 'available')}
                      disabled={row.statusButton === 'ISSUE' ? true : false}
                    >
                      RETURN
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => deleteButton(row.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
