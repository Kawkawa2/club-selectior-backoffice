import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import {FormHelperText } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import DialogContentText from '@mui/material/DialogContentText';

import Api from 'src/services/api';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function UserTableRow({
  id,
  selected,
  image,
  num_siret,
  company_name,
  email,
  phone,
  city,
  country,
  postal_code,
  adr_p,
  adr_c,
  created_at,
  updated_at,
  handleClick,
  getAllProfessional
}) 
{
  const base =import.meta.env.VITE_APP_BACKEND_API_URL_Image;

  const [open, setOpen] = useState(null);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showCameraIcon, setShowCameraIcon] = useState(false);
  const [numSiret, setNumSiret] = useState(num_siret);
  const [companyName, setCompanyName] = useState(company_name);
  const [Image, setImage] = useState(null);
  const [Email, setEmail] = useState(email);
  const [Phone, setPhone] = useState(phone);
  const [City, setCity] = useState(city);
  const [Country, setCountry] = useState(country);
  const [postalCode, setPostalCode] = useState(postal_code);
  const [adrP, setAdrP] = useState(adr_p);
  const [adrC, setAdrC] = useState(adr_c);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errors, setErrors]=useState({
    numSiret:'',
    companyName:'',
    image:'',
    email:'',
    phone:'',
    password:'',
    cpassword:'',
    city:'',
    country:'',
    postalCode:'',
    adrP:'',
    adrC:'',
  });
  // handle dialog menu
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // function that handle  dialog that update admin
  const handleClickOpenUpdate = () => {
    setUpdateDialog(true);
  };
  const handleClose = () => {
    setUpdateDialog(false);
    setOpen(null)
    freeData()
  };

  // function that handle  dialog that delete admin
  const handleClickOpenDelete = () => {
    setDeleteDialog(true);
  };
  const handleCloseDelete = () => {
    setDeleteDialog(false);
    setOpen(null)
  };

  // handle toggle  show password icon
   const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  // handle the avaar hover 
  const handleAvatarHover = () => {
    setShowCameraIcon(true);
  };

  const handleAvatarLeave = () => {
    setShowCameraIcon(false);
  };

  // delete the data 
  const freeData=()=>{
    setNumSiret(num_siret);
    setCompanyName(company_name);
    setImage(null);
    setEmail(email);
    setPhone(phone);
    setCity(city);
    setCountry(country);
    setPostalCode(postal_code);
    setAdrP(adr_p);
    setAdrC(adr_c);
    setPassword('');
    setCPassword('');
    setErrors({});
  }
  // function  that validate the form  
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the numSiret field
    if (!numSiret.trim() || !num_siret) {
      newErrors = { ...newErrors, numSiret: "Veuillez entrer votre numéro de SIRET" };
      valid = false;
    } else if (!/^\d{3}\s\d{3}\s\d{3}\s\d{4}$/.test(numSiret.trim())) {
      newErrors = { ...newErrors, numSiret: "Le numéro de SIRET doit être au format 'XXX XXX XXX XXXX'" };
      valid = false;
    }
    // validate the companyName field
    if (!companyName.trim() || !company_name) {
      newErrors = { ...newErrors, companyName: "Veuillez entrer le nom de votre entreprise" };
      valid = false;
    }
  
    // validate the email field
    if (!Email.trim() || !email) {
      newErrors = { ...newErrors, email: "Veuillez entrer votre email" };
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(Email) || !email) {
      newErrors = { ...newErrors, email: "Entrer un email valide" };
      valid = false;
    }
    // validate the phone field
    if (!Phone.trim() || !phone) {
      newErrors = { ...newErrors, phone: "Veuillez entrer votre numéro de téléphone" };
      valid = false;
    }

    // validate the city field
    if (!City.trim() || !city) {
      newErrors = { ...newErrors, city: "Veuillez entrer le nom de votre ville" };
      valid = false;
    }

     // validate the country field
     if (!Country.trim() || !country) {
      newErrors = { ...newErrors, country: "Veuillez entrer le nom de votre pays" };
      valid = false;
    }
    // validate the postalCode field type (only numbers allowed)
    if (!postalCode.trim()|| !postal_code) {
      newErrors = { ...newErrors, postalCode: "Veuillez entrer votre code postal" };
      valid = false;
    }
    else if((postalCode.trim() && postalCode!==postal_code) && !/^\d+$/.test(postalCode.trim())) {
      newErrors = { ...newErrors, postalCode: "Le code postal doit contenir uniquement des chiffres" };
      valid = false;
    }

    // validate the adrP field
    if (!adrP.trim() || !adr_p) {
      newErrors = { ...newErrors, adrP: "Veuillez entrer votre adresse principale" };
      valid = false;
    }

    // validate the password field
    if (password.trim() && !cpassword.trim()) {
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
  
    return valid;
  }

  // handle form submit 1 -- name && email && password
  const handleSubmit1 = async (event) => {
      const api = new Api();
      event.preventDefault();
      const pro = {
        'num_siret':numSiret,
        'company_name':companyName,
        'postal_code':postalCode,
        'adr_p':adrP,
        'adr_c':adrC,
        'image':Image,
        'email':Email,
        'phone':Phone,
        'city':City,
        'country':Country,
        password,
      } 
      if (validateForm()){ 
        api.ModifierProfessionnel(pro,id).then(response => {
            if (response.status === true) {
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
              // freeData();
              handleClose();
              handleCloseMenu();
              getAllProfessional()
              // router.reload();
              
            } else if(response.email){
              setErrors({email: response?.email})
            }
          })
          .catch(err=> {
            console.log('error',err);
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

  // handle form submit 2 -- delete admin
  const handleSubmit2 = async (event) => {
      const api = new Api();
      event.preventDefault();
      api.SupprimerProfessionnel(id).then(response => {
        if (response.status === true) {
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
          handleCloseDelete();
          handleCloseMenu();
          getAllProfessional();
        }
      })
      .catch(err=> {
        console.log('error',err);
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

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{num_siret}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>

          <FormLabel component='a' href={`${base}/${image}`} target="_blank">
            <Avatar alt={image} src={`${base}/${image}`} />
          </FormLabel>

            <Typography variant="subtitle2" noWrap>
              {company_name}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell>{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>{country}</TableCell>
        <TableCell>{postal_code}</TableCell>
        <TableCell>{adr_p} {adr_c!=null? `- ${adr_c}`: ''}</TableCell>

        <TableCell>{created_at}</TableCell>
        <TableCell>{updated_at}</TableCell>
        
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleClickOpenUpdate}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Modifier
        </MenuItem>

          {/* modal for updating a pro */}
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openUpdateDialog}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Modifier un  Professionnel
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Iconify icon="ri:close-fill" />
            </IconButton>

            <DialogContent dividers sx={{width: {sm:400} , minWidth:200}} >
                <Box component='form' 
                sx={{  my: {sm:'auto', xs:1}, mx:{sm:'auto', xs:1}}} > 
                <FormLabel  
                    onMouseEnter={handleAvatarHover} 
                    onMouseLeave={handleAvatarLeave} 
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      mx: 'auto'
                    }}
                  >
                     <Avatar
                      alt="pro"
                      src={Image ? URL.createObjectURL(Image) : `${base}/${image}`}
                      sx={{ width: 80, height: 80}}
                    />
                    <Input type="file" 
                      sx={{ display: 'none' }}  
                      name='image'
                      onChange={(event) => { 
                        if (event.target.files && event.target.files[0]) {
                          setImage(event.target.files[0]);
                        }
                      }} 
                    />
                    {showCameraIcon && (
                      <IconButton
                        sx={{ 
                          position: 'absolute',
                          width: 80, 
                          height: 80, 
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center', 
                          mx: 'auto'
                        }}
                        aria-label="upload picture"
                        component="span"
                      >
                        <Iconify icon="ph:camera" />
                      </IconButton>
                    )}
                </FormLabel>

                <TextField
                  required
                  id="numSiret"
                  name="numSiret"
                  label="Numéro de SIRET ..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={numSiret}
                  onChange={(event) =>{ setNumSiret(event.target.value)}} 
                  error={!!errors.numSiret}
                />
                <FormHelperText sx={{fontSize:13,mb:1}} error={!!errors.numSiret}>{errors.numSiret}</FormHelperText>
                
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  label="Nom d'entreprise ..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={companyName}
                  onChange={(event) =>{ setCompanyName(event.target.value)}} 
                  error={!!errors.companyName}
                />
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.companyName}>{errors.companyName}</FormHelperText>

                <TextField
                  required
                  id="email"
                  name="email"
                  label="Adresse e-mail..."
                  type="email"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={Email}
                  onChange={(event) =>{ setEmail(event.target.value)}} 
                  error={!!errors.email}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.email}>{errors.email}</FormHelperText>
                
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Numéro de téléphone..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={Phone}
                  onChange={(event) =>{ setPhone(event.target.value)}} 
                  error={!!errors.phone}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.phone}>{errors.phone}</FormHelperText>

                <TextField
                  required
                  id="city"
                  name="city"
                  label="Ville..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={City}
                  onChange={(event) =>{ setCity(event.target.value)}} 
                  error={!!errors.city}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.city}>{errors.city}</FormHelperText>
                
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Pays..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={Country}
                  onChange={(event) =>{ setCountry(event.target.value)}} 
                  error={!!errors.country}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.country}>{errors.country}</FormHelperText>

                <TextField
                  required
                  id="postalCode"
                  name="postalCode"
                  label="Code postal..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={postalCode}
                  onChange={(event) =>{ setPostalCode(event.target.value)}} 
                  error={!!errors.postalCode}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.postalCode}>{errors.postalCode}</FormHelperText>
                
                <TextField
                  required
                  id="adrP"
                  name="adrP"
                  label="Adresse principale..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={adrP}
                  onChange={(event) =>{ setAdrP(event.target.value)}} 
                  error={!!errors.adrP}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.adrP}>{errors.adrP}</FormHelperText>
                
                <TextField
                  id="adrC"
                  name="adrC"
                  label="Adresse complémentaire..."
                  type="text"
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={adrC}
                  onChange={(event) =>{ setAdrC(event.target.value)}} 
                  error={!!errors.adrC}
                />
                <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.adrC}>{errors.adrC}</FormHelperText>

                <TextField
                  required
                  id="psw"
                  name="psw"
                  label="Mot de passe..."
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={password}
                  onChange={(event) =>{ setPassword(event.target.value)}} 
                  error={!!errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
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
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.password}>{errors.password}</FormHelperText>

                <TextField
                  required
                  id="cpsw"
                  name="cpsw"
                  label="Confirmation mdp..."
                  type={showCPassword ? 'text' : 'password'}
                  variant="standard"
                  size='small'
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                    fontSize:14,
                    }
                  }}
                  value={cpassword}
                  onChange={(event) =>{ setCPassword(event.target.value)}} 
                  error={!!errors.cpassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
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
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.cpassword}>{errors.cpassword}</FormHelperText>
            </Box>
            </DialogContent>

            <DialogActions sx={{justifyContent:'end', display: 'flex', flexWrap: 'wrap'}}>
              <Button type='reset' onClick={freeData} color="inherit">
                Annuler
              </Button>
              <Button type='submit' autoFocus  color="warning" onClick={handleSubmit1} >
                Modifier
              </Button>
            </DialogActions>
          </BootstrapDialog>

        <MenuItem onClick={handleClickOpenDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>

        {/* modal for deleting a pro */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Supprimer <i>{company_name}</i>
          </DialogTitle>
          <DialogContent sx={{width: {sm:400} , minWidth:200}}>
            <DialogContentText id="alert-dialog-description">
              Est ce que vous êtes sûr de vouloir supprimer cet administrateur? Cette opération est irréversible!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color='inherit'>Annuler</Button>
            <Button onClick={handleSubmit2} color='warning'>Supprimer</Button>
          </DialogActions>
        </Dialog>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  image: PropTypes.any,
  num_siret: PropTypes.any,
  company_name: PropTypes.any,
  email: PropTypes.any,
  phone: PropTypes.any,
  city: PropTypes.any,
  country: PropTypes.any,
  postal_code: PropTypes.any,
  adr_p: PropTypes.any,
  adr_c: PropTypes.any,
  created_at: PropTypes.any,
  updated_at: PropTypes.any,
  handleClick: PropTypes.func,
  getAllProfessional:PropTypes.func,
  selected: PropTypes.any,
};
