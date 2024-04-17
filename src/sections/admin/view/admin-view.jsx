import { useState, useEffect,useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import {FormHelperText } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';

import Api from 'src/services/api';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../admin-table-row';
import UserTableHead from '../admin-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../admin-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AdminPage() {

  const [page, setPage] = useState(0);
  const [admins, setAdmins] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handle toggle  show password icon
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  // fetch the data from the back end 
  const getAllAdmins = useCallback(() => {
    const api = new Api();

    api.getAllAdmins().then((res) => {
      setAdmins(res.admins);
    });
    
  }, []); // Empty dependency array since there are no dependencies

  console.log(admins);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = admins.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: admins,
    comparator: getComparator(order, orderBy),
    filterName,
  });


  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    getAllAdmins(); // This will run only once when the component mounts
  }, [getAllAdmins]); // Add getAllAdmins to the dependency array to ensure useEffect is re-triggered when getAllAdmins changes

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Gestion des Admins</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
          Ajouter  un admin
        </Button>
      </Stack>

      {/* modal for adding an admin */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ajouter un  admin
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

        <DialogContent dividers>
          <Box component='form' sx={{ py: 2 , width: 500 , minWidth:200}}> 
          <Stack direction='row' spacing={{sm:7,xs:2}}  useFlexGap flexWrap="wrap"
            sx={{
              my: {sm:'auto', xs:5}, 
              mx:{sm:'auto', xs:5}
            }}
            >
              <TextField
                required
                id="name"
                name="name"
                label="Le nom..."
                type="text"
                variant="standard"
                sx={{
                  mb:1,
                  fontSize:13,
                  label:{
                    fontSize:14,
                  }
                }}
                // defaultValue={name}
                // onChange={(event) =>{ setName(event.target.value)}} 
                // error={errors.name}
              />
              {/* <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.name}>{errors.name}</FormHelperText> */}
              
              <TextField
                required
                id="email"
                name="email"
                label="Adresse e-mail..."
                type="email"
                variant="standard"
                sx={{
                  mb:1,
                  fontSize:13,
                  label:{
                    fontSize:14,
                  }
                }}
            
                // defaultValue={email}
                // onChange={(event) =>{ setName(event.target.value)}} 
                // error={errors.email}
              />
              {/* <FormHelperText sx={{fontSize:13, mb:1}}  error={errors.email}>{errors.email}</FormHelperText> */}
              
              <TextField
                required
                id="psw"
                name="psw"
                label="Mot de passe..."
                type="password"
                variant="standard"
                sx={{
                  mb:1,
                  fontSize:13,
                  label:{
                    fontSize:14,
                  }
                }}
                // defaultValue={password}
                // onChange={(event) =>{ setPassword(event.target.value)}} error={errors.password}
                // error={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
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

              {/* <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.password}>{errors.password}</FormHelperText> */}
              <TextField
                required
                      id="cpsw"
                      name="cpsw"
                      label="Confirmation mdp..."
                      type={showCPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{
                        mb:1,
                        fontSize:13,
                        label:{
                          fontSize:14,
                        }
                      }}
                      // defaultValue={cpassword}
                      // onChange={(event) =>{ setCPassword(event.target.value)}} 
                      // error={errors.cpassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
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
              {/* <FormHelperText sx={{fontSize:13,mb:1}}  error={errors.cpassword}>{errors.cpassword}</FormHelperText> */}

          </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{justifyContent:'end', display: 'flex', flexWrap: 'wrap'}}>
          <Button type='reset' onClick={handleClose}  color="inherit">
            Annuler
          </Button>
          <Button type='submit' autoFocus onClick={handleClose}  color="warning">
            Ajouter
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* table */}
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={admins.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Nom' },
                  { id: 'email', label: 'Email' },
                  { id: 'created_at', label: 'Créé à' },
                  { id: 'updated_at', label: 'Modifié à' },
                  { id: 'action', label: 'Action' },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      email={row.email}
                      created_at={row.created_at}
                      updated_at={row.updated_at}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, admins.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={admins.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
