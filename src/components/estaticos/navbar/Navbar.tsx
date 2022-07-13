import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { addToken } from '../../../store/tokens/action';


function Navbar() {
  let navigate = useNavigate();

  let dispatch = useDispatch()
  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  )

  function goLogout() {
    dispatch(addToken(''))
    alert('Usuário deslogado');
    navigate('/login');
  }

  var navbarComponent

  if (token !== '') {
    navbarComponent = <AppBar  position="static">
      <Toolbar  className='fixas' variant="dense">
        <Box className="cursor">
          <Typography variant="h4" color="inherit">
            MySpace
          </Typography>
        </Box>
 
        <Box display="flex" justifyContent="start">
          <Link to="/home">
            <Box mx={1} className="cursor">
              <Typography variant="h6" color="inherit">
                Home
              </Typography>
            </Box>
          </Link>

          <Link to='/posts'>
            <Box mx={1} className="cursor">
              <Typography variant="h6" color="inherit">
                Postagens
              </Typography>
            </Box>
          </Link>

          <Link to="/temas">
            <Box mx={1} className="cursor">
              <Typography variant="h6" color="inherit">
                Temas
              </Typography>
            </Box>
          </Link>

          <Link to="/formularioTema">
            <Box mx={1} className="cursor">
              <Typography variant="h6">
                Novo tema
              </Typography>
            </Box>
          </Link>
          <Box mx={1} className="cursor" onClick={goLogout}>
            <Typography variant="h6" color="inherit">
              Logout
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
