import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import {FormLabel,FormHelperText } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import DialogContentText from '@mui/material/DialogContentText';

import { useRouter } from 'src/routes/hooks';

import { removeUser } from 'src/utils/helper';

import Api from 'src/services/api';
import { account } from 'src/_mock/account';

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
  name,
  email,
  created_at,
  updated_at,
  selected,
  handleClick,
  getAllAdmins
}) 
{
  const api = useMemo(() => new Api(), []);
  const router =  useRouter();
  const [flag,setFlag]=useState(false);

  // the hooks
  const [open, setOpen] = useState(null);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);

  const [Name,setName] = useState(name);
  const [Email,setEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [errors, setErrors]=useState({
    name:'',
    email:'',
    password:'',
    cpassword:'',
  });

  // functio that handle dialog open and close
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

  // delete the data 
  const freeData=()=>{
    setName(name);
    setEmail(email);
    setPassword('');
    setCPassword('');
    setErrors({});
  }

  // function  that validate the form  
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the name field
    if (!Name.trim() ||!name) {
      newErrors = { ...newErrors, name: "Veuillez entrer votre Nom complet" };
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
      event.preventDefault();
      const admin = {
        name:Name,
        email:Email,
        password
      } 
      if (validateForm()){ 
        api.ModifierAdmin(admin,id).then(response => {
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
              getAllAdmins();
              
            } else if(response.email){
              setErrors({email: response?.email})
            }
          })
          .catch(err=> {
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
      event.preventDefault();
      api.SupprimerAdmin(id).then(response => {
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
          getAllAdmins();
          if(flag){
            console.log('flag inside',flag)
            // Remove the user from local storage
            removeUser('user');
            router.reload();
          }
        }
      })
      .catch(err=> {
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

  useEffect(()=>{
    if(id===account.id)
    {
      setFlag(true);
    }
},[id])

  return (
    <>
      {/* table content */}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormLabel component='a' href='/assets/images/avatars/avatar_25.jpg' target="_blank">
              <Avatar alt='image admin' src='/assets/images/avatars/avatar_25.jpg' />
            </FormLabel>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell >
          <a href={`mailto:${email}`} style={{textDecoration:'none'}}>{email}</a>
        </TableCell>
        <TableCell>{created_at}</TableCell>
        <TableCell>{updated_at}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Actions */}
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
        {/* action  update */}
        <MenuItem onClick={handleClickOpenUpdate}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Modifier
        </MenuItem>

        {/* modal for updating an admin */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openUpdateDialog}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modifier un  admin
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
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Le nom..."
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
                  value={Name}
                  onChange={(event) =>{ setName(event.target.value)}} 
                  error={!!errors.name}
                />
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.name}>{errors.name}</FormHelperText>
                
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

        {/* action  delete */}
        <MenuItem onClick={handleClickOpenDelete}  sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>

        {/* modal for deleting an admin */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Supprimer <i>{name}</i>
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
  name: PropTypes.any,
  handleClick: PropTypes.func,
  getAllAdmins:PropTypes.func,
  updated_at: PropTypes.any,
  created_at: PropTypes.any,
  email: PropTypes.any,
  selected: PropTypes.any,
};
