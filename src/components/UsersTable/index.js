import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/slices/usersSlice';
import { ThemeProvider } from '@mui/material/styles';
import {
  Button,
  Container,
  LinearProgress,
  Pagination,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';

import { darkTheme } from '../../components/Header';

import { deleteItem } from '../../store/slices/usersSlice';

export const getFormatDate = (time) => {
  const date = new Date(time);
  const result = format(date, 'dd.MM.yyyy HH:mm');
  return result;
};

function UsersTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const usersInfo = useSelector((state) => state.users);
  const items = useSelector((state) => state.users.items);
  const status = useSelector((state) => state.users.status);
  const { total, per_page } = usersInfo.value;
  const count = total / per_page;

  const removeItem = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [page, dispatch]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Container>
      <Typography sx={{ textAlign: 'center' }} m={2} variant="h5" component="h5">
        Список пользователей
      </Typography>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper} sx={{ position: 'relative' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell align="right">Роль</TableCell>
                <TableCell align="right">Время создания</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>

                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.role}</TableCell>
                    <TableCell align="right">{getFormatDate(item.ctime)}</TableCell>
                    <TableCell align="right">
                      <Button variant="text" onClick={() => removeItem(item.id)}>
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {status === 'loading' && (
            <LinearProgress sx={{ position: 'absolute', top: '0', width: '100%' }} />
          )}
          {status === 'loading' && (
            <LinearProgress sx={{ position: 'absolute', bottom: '0', width: '100%' }} />
          )}
          <Pagination
            shape="rounded"
            count={count ? count : 1}
            page={page}
            onChange={handleChange}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              m: 2,
            }}
          />
        </TableContainer>
      </ThemeProvider>
    </Container>
  );
}

export default UsersTable;
