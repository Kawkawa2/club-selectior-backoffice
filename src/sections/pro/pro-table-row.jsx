import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function UserTableRow({
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
}) 
{

  const [open, setOpen] = useState(null);
  const base =import.meta.env.VITE_APP_BACKEND_API_URL_Image;
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{num_siret}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={image} src={`${base}/${image}`} />
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Modifier
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
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
  selected: PropTypes.any,
};
