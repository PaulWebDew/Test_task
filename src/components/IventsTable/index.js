import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Table, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { darkTheme } from '../../components/Header';
import { getFormatDate } from '../UsersTable';

import { addAction } from '../../store/slices/actionSlice';

function IventsTable() {
  const dispatch = useDispatch();
  const actions = useSelector((state) => state.actions.value);
  const scrollRef = useRef();

  const [autoscroll, setAutoscroll] = useState(true);

  const scrollHandler = (e) => {
    let element = e.target;
    if (Number(element.scrollHeight) - Number(element.scrollTop) > 600) {
      setAutoscroll(false);
    } else setAutoscroll(true);
  };

  const websocket = useWebSocket('wss://test.relabs.ru/event', {
    shouldReconnect: (closeEvent) => true,
  });
  const { lastJsonMessage } = websocket;

  useEffect(() => {
    if (lastJsonMessage) dispatch(addAction(lastJsonMessage));
  }, [lastJsonMessage, dispatch]);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      autoscroll && scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [actions, autoscroll]);

  return (
    <Container>
      <Typography sx={{ textAlign: 'center' }} m={2} variant="h5" component="h5">
        События
      </Typography>
      <ThemeProvider theme={darkTheme}>
        <TableContainer
          component={Paper}
          sx={{ position: 'relative', maxHeight: '29rem' }}
          onScroll={scrollHandler}>
          <Table aria-label="simple table" stickyHeader ref={scrollRef}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e1e1e' }}>Дата</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e' }}>Событие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody ref={scrollRef}>
              {actions &&
                actions.map((action, ind) => (
                  <TableRow key={ind + action.ctime}>
                    <TableCell component="th" scope="row">
                      {getFormatDate(action.ctime)}
                    </TableCell>
                    <TableCell>{action.event}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </Container>
  );
}

export default IventsTable;
