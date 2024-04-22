import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
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
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
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

export default function PromoCodeTableRow({
  id,
  code,
  price,
  forPro,
  created_at,
  updated_at,
  selected,
  handleClick,
  getAllPromoCode
}) 
{

  const [open, setOpen] = useState(null);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);

  const [Code, setCode] = useState(code);
  const [Price, setPrice] = useState(price);
  const [ForPro, setForPro] = useState(forPro);
  const [errors, setErrors]=useState({
    code:'',
    price:'',
    forPro:'',
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


  // delete the data 
  const freeData=()=>{
    setCode(code);
    setPrice(price);
    setForPro(forPro);
    setErrors({});
  }
  // handlw validation for  form
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the numSiret field
    if (!Code.trim() || !code) {
      newErrors = { ...newErrors, code: "Veuillez entrer le code promo" };
      valid = false;
    }
  
    // validate the postalCode field type (only numbers allowed)
    if (!Price || !price) {
      newErrors = { ...newErrors, price: "Veuillez entrer le prix réduit" };
      valid = false;
    }
    else if(Price && !/^\d+$/.test(Price)) {
      newErrors = { ...newErrors, price: "Le prix doit contenir uniquement des chiffres" };
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
      const promo_code = {
        'code': Code,
        'price':Price,
        'for_pro':ForPro,
      } 
      if (validateForm()){ 
        api.ModifierCodePromo(promo_code,id).then(response => {
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
              getAllPromoCode()
              // router.reload();
              
            } else if(response.code){
              setErrors({code: response?.code})
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
      api.SupprimerCodePromo(id).then(response => {
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
          getAllPromoCode();
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
        <TableCell>{code}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>
          {
          forPro?
          <Chip label="professionnel" size="small" color="primary"/>
          :
          <Chip label="Particulier" size="small" color="warning" />
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

          {/* modal for updating a pro */}
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openUpdateDialog}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Modifier un  code promo
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
                <InputLabel sx={{fontSize:14}} id="forPro">Type de bénéficiaire...</InputLabel>
                <Select
                  required
                  labelId="forPro"
                  id="forPro"
                  name='forPro'
                  variant="standard"
                  size='small'
                  label="Type de bénéficiaire..."
                  fullWidth
                  sx={{
                    mb:2,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  value={ForPro}
                  onChange={(event) =>{ setForPro(event.target.value)}} 
                  error={!!errors.forPro}
                >
                  <MenuItem value={1}>Professionnel</MenuItem>
                  <MenuItem value={0}>Particulier</MenuItem>
              </Select>
                
                <TextField
                  required
                  id="code"
                  name="code"
                  label="Code ..."
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
                  value={Code}
                  onChange={(event) =>{ setCode(event.target.value)}} 
                  error={!!errors.code}
                />
                <FormHelperText sx={{fontSize:13,mb:1}} error={!!errors.code}>{errors.code}</FormHelperText>
                
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Prix ..."
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
                  value={Price}
                  onChange={(event) =>{ setPrice(event.target.value)}} 
                  error={!!errors.price}
                />
                <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.price}>{errors.price}</FormHelperText>

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
            Supprimer <i>{code} </i>
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

PromoCodeTableRow.propTypes = {
  id: PropTypes.any,
  code: PropTypes.any,
  price: PropTypes.any,
  forPro: PropTypes.any,
  created_at: PropTypes.any,
  updated_at: PropTypes.any,
  handleClick: PropTypes.func,
  getAllPromoCode:PropTypes.func,
  selected: PropTypes.any,
};
