import { useState } from 'react';
import { toast } from 'react-toastify';

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
    event.preventDefault();
    const admin = {
      email,
      password
    }       
   if (validateForm()){ 
      api.Login(admin).then(response => {
          if (response.status === true) {
            setUser(JSON.stringify(response?.user));
            router.reload();

          } else if(response.email){
            setErrors({email: response?.email})
          }else if(response.password){
            setErrors({password : response?.password })
          }
        })
        .catch(err=> {
          console.error('Error:', err);
          toast.error(
            'Erreur interne du serveur', {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );     
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
                      <Iconify icon={showPassword ? 'ph:eye' : 'ph:eye-slash'} />
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
            color="primary"
            onClick={handleLogin}
          >
            Se connecter
          </LoadingButton>
        </>
    );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.main, 0.08),
          imgUrl: '/assets/background/overlay_1.svg',
        }),
        height: 1,
        bgcolor: 'background.default',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, px: 2 }}>
        <Card
          sx={{
            p: { xs: 3, sm: 5 },
            width: 1,
            maxWidth: 420,
            borderRadius: 3,
            boxShadow: (t) => t.customShadows.z24,
          }}
        >
          <Logo />
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
