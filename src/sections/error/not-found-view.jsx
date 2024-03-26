import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const renderHeader = (
    <Box
      component="img"
      src="/assets/Logo-removebg-preview .png"
      alt='logo'
      sx={{
        mx: 'auto',
        display:'block',
        width:260,
      }}
    />
    
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Désolé, page introuvable !
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          Désolé, nous n&rsquo;avons pas trouvé la page que vous recherchez. Peut-être avez-vous mal saisi l&rsquo;URL ? Assurez-vous de vérifier votre orthographe
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 1, sm: 2 },
            }}
          />

          <Button href="/" size="large" variant="contained" style={{backgroundColor:'#D99815'}} component={RouterLink}>
            Retourner
          </Button>
        </Box>
      </Container>
    </>
  );
}
