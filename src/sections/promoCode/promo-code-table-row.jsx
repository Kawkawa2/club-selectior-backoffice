import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';

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
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import {FormLabel,FormHelperText } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
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

export default function PromoCodeTableRow({
  id,
  code,
  price,
  forPro,
  startDate,
  endDate,
  created_at,
  updated_at,
  selected,
  handleClick,
  getAllPromoCode
}) 
{
  // const router= useRouter()
  const [open, setOpen] = useState(null);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);

  const [Code, setCode] = useState(code);
  const [Price, setPrice] = useState(price);
  const [ForPro, setForPro] = useState(forPro);
  const [status, setStatus] = useState('Disponible');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [errors, setErrors]=useState({
    code:'',
    price:'',
    forPro:'',
    startDate:'',
    endDate:'',

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

  // function that check the status of a  coupon
  const CheckPromoCodeStatus=useCallback(()=>{
    // Convert endDate string to Date object
    const currentDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
    
    // Check if endDate is less than currentDate
    if (endDate < currentDate) {
      setStatus('Expiré');
    } else {
      setStatus('Disponible');
    }
    
  },[endDate])


  // delete the data 
  const freeData=()=>{
    setCode(code);
    setPrice(price);
    setForPro(forPro);
    setStartDate('');
    setEndDate('');

    setErrors({});
  }
  // Handle change in the forPro field
  const handleChangeForPro = (event) => {
    const newValue = Number(event.target.value);
    setForPro(newValue);  
  };

  // handlw validation for  form
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the code field
    if (!Code.trim() || !code) {
      newErrors = { ...newErrors, code: "Veuillez entrer le code promo" };
      valid = false;
    }
  
    // validate the price field type (only numbers allowed)
    if (!Price || !price) {
      newErrors = { ...newErrors, price: "Veuillez entrer le prix réduit" };
      valid = false;
    }
    else if(Price && !/^\d+$/.test(Price)) {
      newErrors = { ...newErrors, price: "Le prix doit contenir uniquement des chiffres" };
      valid = false;
    }

    // validate the start date field type
    if (StartDate && !EndDate) {
      newErrors = { ...newErrors, endDate: "Veuillez entrer la date de fin" };
      valid = false;
    }
    
    // validate the start date field type
    if (EndDate && !StartDate) {
      newErrors = { ...newErrors, startDate: "Veuillez entrer la date de  début" };
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
        'start_date':StartDate,
        'end_date':EndDate
      } 
      console.log('e',promo_code)
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
              freeData();
              handleClose();
              handleCloseMenu();
              getAllPromoCode()
              // router.reload();
              
            } else if(response.code){
              setErrors({code: response?.code})
            }else if(response.startDate){
              setErrors({startDate: response?.startDate})
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

  useEffect(()=>{
    CheckPromoCodeStatus();
    
  },[CheckPromoCodeStatus])
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
          <Chip label='Professionnel' size="small" color="primary"/>
          :
          <Chip label='Particulier' size="small" color="warning" />
          }
        </TableCell>
        <TableCell>{startDate}</TableCell>
        <TableCell>{endDate}</TableCell>
        <TableCell>
          {
            status==='Expiré'?
            <Chip label={status} size="small" color="error"/>
            :
            <Chip label={status} size="small" color="success" />
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
                  onChange={handleChangeForPro} 
                  error={!!errors.forPro}
                >
                  <MenuItem value={1}>Professionnel</MenuItem>
                  <MenuItem value={0}>Particulier</MenuItem>
              </Select>
              <FormLabel>
                <InputLabel sx={{fontSize:14}} id="startDate">Date de début...</InputLabel>
                <TextField
                  required
                  id="startDate"
                  name="startDate"
                  type="date"
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
                  value={StartDate} // Format the date before setting it to the TextField
                  onChange={(event) =>{ setStartDate(event.target.value)}} 
                  error={!!errors.startDate}
                />
                <FormHelperText sx={{fontSize:13,mb:1}} error={!!errors.startDate}>{errors.startDate}</FormHelperText>
              </FormLabel>

              <FormLabel>
                <InputLabel sx={{fontSize:14}} id="endDate">Date de fin...</InputLabel>
                <TextField
                  required
                  id="endDate"
                  name="endDate"
                  type="date"
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
                  value={EndDate} // Format the date before setting it to the TextField
                  onChange={(event) =>{ setEndDate(event.target.value)}} 
                  error={!!errors.endDate}
                  
                />
                <FormHelperText sx={{fontSize:13,mb:1}} error={!!errors.endDate}>{errors.endDate}</FormHelperText>
              </FormLabel>
                
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
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  created_at: PropTypes.any,
  updated_at: PropTypes.any,
  handleClick: PropTypes.func,
  getAllPromoCode:PropTypes.func,
  selected: PropTypes.any,
};
