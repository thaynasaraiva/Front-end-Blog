import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';

function Footer() {
  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  var footerComponent

  if(token !== '') {
    footerComponent = <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
  >
    <Grid alignItems="center" item xs={12}>
      <Box style={{ backgroundColor: '#A082B9', height: '120px' }}>
        <Box
          paddingTop={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ color: '#FFE1D2' }}
          >
            Siga-nos nas redes sociais{' '}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <a
            href="https://www.facebook.com/generationbrasil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon style={{ fontSize: 60, color: '#FFE1D2' }} />
          </a>
          <a
            href="https://www.instagram.com/generationbrasil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon style={{ fontSize: 60, color: '#FFE1D2' }} />
          </a>
          <a
            href="https://www.linkedin.com/school/generationbrasil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon style={{ fontSize: 60, color: '#FFE1D2' }} />
          </a>
        </Box>
      </Box>
      <Box style={{ backgroundColor: '#66747C', height: '60px' }}>
        <Box paddingTop={1}>
          <Typography
            variant="subtitle2"
            align="center"
            gutterBottom
            style={{ color: '#FFE1D2' }}
          >
            © 2020 Copyright:
          </Typography>
        </Box>
        <Box>
          <a
            target="_blank"
            href="https://brasil.generation.org"
            rel="noopener noreferrer"
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ color: '#FFE1D2' }}
              align="center"
            >
              brasil.generation.org
            </Typography>
          </a>
        </Box>
      </Box>
    </Grid>
  </Grid>
  }

  return (
    <>
      {footerComponent}
    </>
  );
}

export default Footer;
