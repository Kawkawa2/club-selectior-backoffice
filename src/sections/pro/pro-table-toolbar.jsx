import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useMemo,useState} from 'react';

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

import Api from 'src/services/api';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ selected, setSelected, filterName, onFilterName,getAllProfessional }) {
  const api = useMemo(() => new Api(), []);
  const [openDeletesDialog, setDeletesDialog] = useState(false);

  
  // function that handle  dialog that delete admin
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
    api.SupprimerProfessionnels(selected).then((response) => {
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
        getAllProfessional();
      }
    })
    .catch((err) => {
      console.log('Error',err);
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
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selected.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selected.length} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Rechercher un Pro..."
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

      {selected.length > 0 ? (
        <>
        <Tooltip title="Delete">
          <IconButton onClick={handleClickOpenDeletes}  sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
        {/* modal for deleting many Professionnels */}
        <Dialog
          open={openDeletesDialog}
          onClose={handleCloseDeletes}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Supprimer des professionnels
          </DialogTitle>
          <DialogContent sx={{width: {sm:400} , minWidth:200}}>
            <DialogContentText id="alert-dialog-description">
              Est ce que vous êtes sûr de vouloir supprimer ces Professionnels? Cette opération est irréversible!
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
  getAllProfessional: PropTypes.func,

};
