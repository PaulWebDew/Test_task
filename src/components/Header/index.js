import React from 'react';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Stack,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
};

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg">
            <Stack>
              <List style={flexContainer} sx={{ maxWidth: '40%' }}>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  selected={pathname === '/'}
                  onClick={() => navigate('/')}>
                  <ListItemText primary="Главная страница" />
                </ListItemButton>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  selected={pathname === '/shop'}
                  onClick={() => navigate('/shop')}>
                  <ListItemText primary="Магазин" />
                </ListItemButton>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  selected={pathname === '/login'}
                  onClick={() => navigate('/login')}>
                  <ListItemText primary="Авторизация" />
                </ListItemButton>
              </List>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
