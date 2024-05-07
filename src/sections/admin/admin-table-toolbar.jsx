import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useMemo, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
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

export default function UserTableToolbar({ selected, setSelected,filterName, onFilterName, getAllAdmins }) {
  const api = useMemo(() => new Api(), []);
  const router =  useRouter();

  const [openDeletesDialog, setDeletesDialog] = useState(false);
  const [flag,setFlag]=useState(false);

  // function that handle  dialog that delete pro
  const handleClickOpenDeletes= () => {
    setDeletesDialog(true);
  };
  const handleCloseDeletes = () => {
    setDeletesDialog(false);
  };

  // handle form submit -- delete admins
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // If the selected array does not contain the current user's ID, proceed with deleting the selected admins
    api.SupprimerAdmins(selected).then((response) => {
      if (response.status === true) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSelected([]);
        console.log('flag outside',flag)
        if(flag){
          console.log('flag inside',flag)
          // Remove the user from local storage
          removeUser('user');
          router.reload();
        }
        getAllAdmins();
      }
    })
    .catch((err) => {
      console.log('Error',err)
      toast.error('Erreur interne du serveur', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  useEffect(()=>{
      if(selected.includes(account.id))
      {
        setFlag(true);
      }
  },[selected])
  
    
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {/* display the number selected or the search bar  */}
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selected.length} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Rechercher un admin..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {/* display the delete all icon button */}
      {selected.length > 0 ? (
        <>
        <Tooltip title="Delete">
          <IconButton onClick={handleClickOpenDeletes}  sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
        
        {/* modal for deleting many Administrateurs */}
        <Dialog
          open={openDeletesDialog}
          onClose={handleCloseDeletes}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Supprimer des Administrateurs
          </DialogTitle>
          <DialogContent sx={{width: {sm:400} , minWidth:200}}>
            <DialogContentText id="alert-dialog-description">
              Est ce que vous êtes sûr de vouloir supprimer ces Administrateurs? Cette opération est irréversible!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeletes} color='inherit'>Annuler</Button>
            <Button onClick={handleSubmit} color='warning'>Supprimer</Button>
          </DialogActions>
        </Dialog>
        
        </>
      ) : (
        null
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  getAllAdmins: PropTypes.func,

};
