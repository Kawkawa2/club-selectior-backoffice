import * as React from 'react';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import { Stack, Container,FormHelperText } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { setUser } from 'src/utils/helper';

import Api  from 'src/services/api';
import { account } from 'src/_mock/account';

import Iconify from 'src/components/iconify';

export default function BasicCard() {
  const api = new Api();
  const router = useRouter();

  // hooks 
  const [showPassword, setShowPassword] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);
  const [name, setName] = React.useState(account?.displayName || '');
  const [email, setEmail] = React.useState(account?.email || '');
  const [password, setPassword] = React.useState('');
  const [cpassword, setCPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [errors, setErrors]=React.useState({
    name:'',
    email:'',
    password:'',
    cpassword:'',
    oldPassword:'',
  });

  // handle toggle  show password icon
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };
  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  // handlw validation for both forms
  function validateForm1() {
    let valid = true;
    let newErrors = {};
  
    // validate the name field
    if (!name.trim() || (!account || !account.displayName)) {
      newErrors = { ...newErrors, name: "Veuillez entrer votre Nom complet" };
      valid = false;
    }
  
    // validate the email field
    if (!email.trim() || (!account || !account.email)) {
      newErrors = { ...newErrors, email: "Veuillez entrer votre email" };
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email) || (!account || !account.email)) {
      newErrors = { ...newErrors, email: "Entrer un email valide" };
      valid = false;
    }
  
    // Update errors state only if new errors are found
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Clear errors if no new errors are found
      setErrors({});
    }
  
    console.log('new errors', newErrors);
    return valid;
  }
  // handlw validation for both forms
  function validateForm2() {
      let valid = true;
      let newErrors = {};
    
      // validate the oldpassword field
      if (!oldPassword.trim()) {
        newErrors = { ...newErrors, oldPassword: "Veuillez entrer votre ancien mot de passe" };
        valid = false;
      }
    
      // validate the password field
      if (!password.trim()) {
        newErrors = { ...newErrors, password: "Veuillez entrer votre nouveau mot de passe" };
        valid = false;
      } 

      // validate the cpassword field
      if (!cpassword.trim()) {
        newErrors = { ...newErrors, cpassword: "Veuillez saisir à nouveau le mot de passe" };
        valid = false;
      }
      // password and cpassword must match

      if (password && cpassword &&  password !== cpassword ){
        newErrors = { ...newErrors, cpassword: "Les mots de passe doivent correspondre" };
        valid = false;
      }
    
      // Update errors state only if new errors are found
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        // Clear errors if no new errors are found
        setErrors({});
      }
    
      console.log('new errors form 2', newErrors);
      return valid;
  }
    
  // handle form submit 1 -- name && email 
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    const admin = {
      name,
      email
    } 
    console.log('admin',admin);      
    if (validateForm1()){ 
      api.ModifierUser(admin,account?.id).then(response => {
          if (response.status === true) {
            console.log(response) 
            setUser(JSON.stringify(response?.user));
            toast.success(
              response.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            router.reload();

          } else if(response.email){
            setErrors({email: response?.email})
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

  // handle form submit 2 -- change password 
  const handleSubmit2 = async (event) => {
      event.preventDefault();
      const admin = {
        oldPassword,
        password
      } 
      console.log('admin 2',admin);      
      if (validateForm2()){ 
        api.ModifierMDP(admin,account?.id).then(response => {
            if (response.status === true) {
              console.log(response) 
              setUser(JSON.stringify(response?.user));
              toast.success(
                response.message, {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              router.reload();
  
            } else if(response.oldPassword){
              setErrors({oldPassword: response?.oldPassword})
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


  return (
    <Container>
      {/* container header */}
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Gestion de profil</Typography>
      </Stack>

      <Stack direction='row' spacing={{sm:7,xs:2}}  useFlexGap flexWrap="wrap"
      sx={{
        my: {sm:'auto', xs:5}, 
        mx:{sm:'auto', xs:5}
      }}
      >
        {/* admin personal informations */}
        <Card 
        variant="outlined"
          sx={{ 
            maxWidth: 275 , 
            maxHeight:{sm:300},
            borderRadius: 1,
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
          }}
          component='form'
          id='adminForm1'
        >
            <Box sx={{ py: 1 }}>
                <Typography sx={{ fontSize: 14 , textAlign:'center', fontWeight:500 }} color="text.black" gutterBottom component='div'>
                  Informations Personnelles:
                </Typography>
            </Box>
          <Divider />
          <CardContent>
                <Box component='form' sx={{ py: 2 }}> 
                    <input type='hidden' name='id_user' value={account?.id} />
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Le nom..."
                      type="text"
                      variant="standard"
                      sx={{
                        mb:1,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={name}
                      onChange={(event) =>{ setName(event.target.value)}} 
                      error={errors.name}
                    />
                    <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.name}>{errors.name}</FormHelperText>

                    <TextField
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      label="Adresse e-mail..."
                      type="email"
                      variant="standard"
                      sx={{
                        mb:1,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={email}
                      onChange={(event) =>{ setEmail(event.target.value)}} error={errors.email}
                    />
                    <FormHelperText sx={{fontSize:13, mb:1}}  error={errors.email}>{errors.email}</FormHelperText>

                </Box>

          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent:'end', display: 'flex', flexWrap: 'wrap'}}>
              <Button type='reset' color='inherit'>Annuler</Button>
              <Button type="submit" color='warning' onClick={handleSubmit1}>Modifier</Button>
          </CardActions>
        </Card>
        
        {/* admin password */}
        <Card 
        variant="outlined"
          sx={{ maxWidth: 275 , 
            borderRadius: 1,
            alignItems: 'center',
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
          }}
          component='form'
          id='adminForm2'

        >
            <Box sx={{ py: 1 }}>
                <Typography sx={{ fontSize: 14 , textAlign:'center', fontWeight:500 }} color="text.black" gutterBottom component='div'>
                  Changer  le mot de passe :
                </Typography>
            </Box>
          <Divider />
          <CardContent>
                <Box component='form' sx={{ py: 2 }}> 
                    <input type='hidden' name='id_user' value={account?.id} />
                    <TextField
                      required
                      id="opsw"
                      name="opsw"
                      label="Ancien Mot de passe..."
                      type={showOldPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{
                        mb:1,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={oldPassword}
                      onChange={(event) =>{ setOldPassword(event.target.value)}} 
                      error={errors.oldPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleToggleOldPasswordVisibility}
                              edge="end"
                            >
                              <Iconify icon={showOldPassword ? 'ph:eye' : 'ph:eye-slash'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.oldPassword}>{errors.oldPassword}</FormHelperText>
                    <TextField
                      required
                      id="psw"
                      name="psw"
                      label="Nouveau Mot de passe..."
                      type={showPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{
                        mb:1,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={password}
                      onChange={(event) =>{ setPassword(event.target.value)}} error={errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              <Iconify icon={showPassword ? 'ph:eye' : 'ph:eye-slash'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.password}>{errors.password}</FormHelperText>
                    <TextField
                      required
                      id="cpsw"
                      name="cpsw"
                      label="Confirmation mdp..."
                      type={showCPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{
                        mb:1,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={cpassword}
                      onChange={(event) =>{ setCPassword(event.target.value)}} 
                      error={errors.cpassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleToggleCPasswordVisibility}
                              edge="end"
                            >
                              <Iconify icon={showCPassword ? 'ph:eye' : 'ph:eye-slash'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.cpassword}>{errors.cpassword}</FormHelperText>
                </Box>
          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent:'end', display: 'flex', flexWrap: 'wrap'}} >
              <Button type='reset' color='inherit'>Annuler</Button>
              <Button type="submit" color='warning' onClick={handleSubmit2} >Modifier</Button>
          </CardActions>
        </Card>
      </Stack>

    </Container>
  );
}
