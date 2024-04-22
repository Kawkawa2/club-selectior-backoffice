import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useMemo, useState, useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { removeUser } from 'src/utils/helper';

import Api from 'src/services/api';
import { account } from 'src/_mock/account';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ selected, setSelected,filterName, onFilterName, getAllAdmins }) {
  const api = useMemo(() => new Api(), []);
  const router =  useRouter();
  const [flag,setFlag]=useState(false);
  // handle form submit -- delete admins
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(account.id, flag);
    
  
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
        <Tooltip title="Delete">
          <IconButton onClick={handleSubmit}  sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
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
