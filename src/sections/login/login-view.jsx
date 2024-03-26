import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import Api  from 'src/services/api';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const api = new Api();

  const [showPassword, setShowPassword] = useState(false);


  const handleClick = () => {
    const admin = {
      email,
      password
    }   
    api.Login(admin).then(response => {console.log(response)})
    router.push('/dashboard');
  };

  const renderForm = (
    <>
      <Stack spacing={3} paddingBottom={2}>
        <TextField name="email" label="Adresse Email"onChange={(event) =>{ setEmail(event.target.value)}} />
        <TextField
          name="password"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        style={{backgroundColor:'#31B3BB'}}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p:5,
            width: 1,
            maxWidth: 420,
          }}
        >          
           <Logo/>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
