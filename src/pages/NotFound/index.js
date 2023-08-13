import React from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: purple,
      }}>
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        Страница, которую Вы ищете, не существует!
      </Typography>
      <Link href={'/'}>
        <Button variant="contained">На Главную</Button>
      </Link>
    </Box>
  );
};
export default NotFound;
