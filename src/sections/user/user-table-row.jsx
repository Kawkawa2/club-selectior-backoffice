import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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

// import { useRouter } from 'src/routes/hooks';

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
  first_name,
  last_name,
  email,
  status,
  created_at,
  updated_at,
  handleClick,
  getAllParticulars,
})
{
  const base =import.meta.env.VITE_APP_BACKEND_API_URL_Image;
  // const router = useRouter();

  // hooks
  const [open, setOpen] = useState(null);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);


  const [fname, setFName] = useState(first_name);
  const [lname, setLName] = useState(last_name);
  const [Image, setImage] = useState(null);
  const [Email,setEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showCameraIcon, setShowCameraIcon] = useState(false);
  const [errors, setErrors]=useState({
    fname:'',
    lname:'',
    image:'',
    email:'',
    password:'',
    cpassword:'',
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
  const handleReset = ()=>{
    freeData()
  }

  // function that handle  dialog that delete particular
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
    setFName(first_name);
    setLName(last_name);
    setImage();
    setEmail(email);
    setPassword('');
    setCPassword('');
    setErrors({});
  }
  // function  that validate the form  
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the fname field
    if (!fname.trim() || !first_name){
      newErrors = { ...newErrors, fname: "Veuillez entrer votre prénom" };
      valid = false;
    }
    // validate the lname field
    if (!lname.trim() ||!last_name) {
      newErrors = { ...newErrors, lname: "Veuillez entrer votre nom" };
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
      const particular = {
        first_name:fname,
        last_name:lname,
        image:Image,
        email:Email,
        password,
      } 
      if (validateForm()){ 
        api.ModifierParticular(particular,id).then(response => {
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
              freeData();
              handleClose();
              handleCloseMenu();
              getAllParticulars();
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
      api.SupprimerParticulier(id).then(response => {
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
          getAllParticulars();
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

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormLabel component='a' href={`${base}/${image}`} target="_blank">
              <Avatar alt={image} src={`${base}/${image}`} />
            </FormLabel>
            <Typography variant="subtitle2" noWrap>
              {first_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{last_name}</TableCell>

        <TableCell >
          <a href={`mailto:${email}`} style={{textDecoration:'none'}}>{email}</a>
        </TableCell>
        <TableCell>
          {
          status?
          <Chip label='Abonné(e)' size="small" color="info"/>
          :
          <Chip label='Non Abonné(e)' size="small" color="error" />
          }  
        </TableCell>
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

         {/* modal for updating a particular */}
         <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openUpdateDialog}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modifier un  particulier
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
                    alt="particulier"
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
                  id="fname"
                  name="fname"
                  label="Prénom..."
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
                  value={fname}
                  onChange={(event) =>{ setFName(event.target.value)}} 
                  error={!!errors.fname}
                />
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.fname}>{errors.fname}</FormHelperText>

                <TextField
                  required
                  id="lname"
                  name="lname"
                  label="Nom..."
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
                  value={lname}
                  onChange={(event) =>{ setLName(event.target.value)}} 
                  error={!!errors.lname}
                />
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.lname}>{errors.lname}</FormHelperText>

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
            <Button type='reset' onClick={handleReset} color="inherit">
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

        {/* modal for deleting a particular */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Supprimer <i>{first_name}{" "}{last_name}</i>
          </DialogTitle>
          <DialogContent sx={{width: {sm:400} , minWidth:200}}>
            <DialogContentText id="alert-dialog-description">
              Est ce que vous êtes sûr de vouloir supprimer cet Prticulier? Cette opération est irréversible!
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
  first_name: PropTypes.any,
  handleClick: PropTypes.func,
  getAllParticulars: PropTypes.func,
  last_name: PropTypes.any,
  status: PropTypes.any,
  email: PropTypes.any,
  created_at: PropTypes.any,
  updated_at: PropTypes.any,
  selected: PropTypes.any
};
