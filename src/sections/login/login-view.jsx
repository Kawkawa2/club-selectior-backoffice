import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import {FormHelperText }  from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { setUser } from 'src/utils/helper';

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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]=useState({
    email:'',
    password:'',
  });
  const api = new Api();

  function validateForm() {
    let valid = true;

    if (!email.trim()) {
      setErrors({email:"Veuillez entrer votre email"});
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({email:"Entrer un email valide"});
      valid = false;
    }
    else if(!password) {
      setErrors({password:"Veuillez entrer votre Mot de passe"});
      valid = false;
    }
    return valid;
  }
  const handleLogin = async (event) => {
    const admin = {
      email,
      password
    }       
   if (validateForm()){ 
      api.Login(admin).then(response => {
          if (response.status === true) {
            setUser(JSON.stringify(response.data));
            console.log(response.data.user) 
            router.push('/');

          } else {
            console.log('error',response.data.message);
            // toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Email  ou mot de passe incorrect ', life: 3000 });
          }
        })
        .catch(err=> {
          // toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Email  ou mot de passe incorrect ', life: 3000 });
          console.error('Error:', err);
        });
     
   } 
  }
  const renderForm = (
       <>
          <Stack spacing={2} paddingBottom={2}>
            <TextField name="email" label="Adresse Email"onChange={(event) =>{ setEmail(event.target.value)}} error={errors.email} />
            <FormHelperText sx={{fontSize:'0.9em'}}  error={errors.email}>{errors.email}</FormHelperText>
            <TextField

              name="password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
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
            <FormHelperText sx={{fontSize:'0.9em'}} error={errors.password}>{errors.password}</FormHelperText>

          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{backgroundColor:'#31B3BB'}}
            onClick={handleLogin}
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
