import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Stack, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { account } from 'src/_mock/account';

import Iconify from 'src/components/iconify';

export default function BasicCard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };


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
          sx={{ maxWidth: 275 , 
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
                        mb:2,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={account?.displayName || ''}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      label="Adresse e-mail..."
                      type="email"
                      variant="standard"
                      sx={{
                        mb:2,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      defaultValue={account?.email || ''}
                    />
                </Box>

          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent:'end', display: 'flex', flexWrap: 'wrap'}}>
              <Button type='reset' color='inherit'>Annuler</Button>
              <Button type="submit" color='warning'>Modifier</Button>
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
                      id="psw"
                      name="psw"
                      label="Mot de passe..."
                      type={showPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{
                        mb:2,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
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
                    <TextField
                      required
                      margin="dense"
                      id="cpsw"
                      name="cpsw"
                      label="Confirmation mdp..."
                      type={showCPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{
                        mb:2,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
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
                </Box>
          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent:'end', display: 'flex', flexWrap: 'wrap'}} >
              <Button type='reset' color='inherit'>Annuler</Button>
              <Button type="submit" color='warning'>Modifier</Button>
          </CardActions>
        </Card>
      </Stack>

    </Container>
  );
}
