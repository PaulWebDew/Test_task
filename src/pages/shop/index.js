import React, { useEffect, useState } from 'react';
import { fetchGoods } from '../../store/slices/goodsSlice';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../../components/Header';
import styled from '@emotion/styled';
import { purple } from '@mui/material/colors';

function Shop() {
  const dispatch = useDispatch();
  const goods = useSelector((state) => state.goods.value);
  const [favIcon, setFavIcon] = useState([]);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
  const handleClick = (id) => {
    if (!favIcon.includes(id)) setFavIcon([...favIcon, id]);
    if (favIcon.includes(id)) {
      const newArr = favIcon.filter((item) => item !== id);
      setFavIcon([...newArr]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={1}>
        {goods.map((item) => (
          <Grid item key={item.id} maxWidth={300} mt={3} mx={'auto'}>
            <Card
              sx={{
                borderRadius: 2,
                ':hover': {
                  outline: '2px solid white',
                },
              }}>
              <CardMedia component="img" height="200" image={item.thumbnail} alt="Paella dish" />
              <CardContent>
                <Typography variant="h6" component="h4" color="text.primary">
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} &#8381;
                </Typography>
                <Typography variant="body" color="text.main" my={1}>
                  {item.brand} / {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Box display={'flex'} gap={1} my={1}>
                  <Rating name="read-only" value={item.rating} readOnly />
                  <Typography variant="body" color="text.main">
                    {item.rating}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(to right, #d3f8d4, #ecff51 )',
                    borderRadius: '30px',
                  }}>
                  рассрочка 0-0-6
                </Button>
                <br />
                <Box my={1}>
                  <ColorButton
                    size="small"
                    variant="contained"
                    color={'success'}
                    sx={{ borderRadius: '10px' }}>
                    В корзину
                  </ColorButton>
                  <IconButton
                    sx={favIcon.includes(item.id) ? { color: 'red' } : {}}
                    onClick={() => handleClick(item.id)}>
                    <FavoriteTwoToneIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default Shop;
