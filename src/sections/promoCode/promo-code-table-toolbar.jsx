import { useMemo} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Api from 'src/services/api';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PromoCodeTableToolbar({ selected, setSelected,  filterName, onFilterName ,getAllPromoCode}) {
  const api = useMemo(() => new Api(), []);
  
  // handle form submit -- delete admins
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If the selected array does not contain the current user's ID, proceed with deleting the selected admins
    api.SupprimerCodesPromo(selected).then((response) => {
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
        getAllPromoCode();
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
          placeholder="Rechercher un Code promo..."
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

PromoCodeTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  getAllPromoCode: PropTypes.func,

};
