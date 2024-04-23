import { toast } from 'react-toastify';
import { useState, useEffect,useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {FormLabel, FormHelperText } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Api from 'src/services/api';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import PromoCodeTableRow from '../promo-code-table-row';
import PromoCodeTableHead from '../promo-code-table-head';
import PromoCodeTableToolbar from '../promo-code-table-toolbar';
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

export default function PromoCodePage() {

  const [page, setPage] = useState(0);
  const [promoCodes, setPromoCodes] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [forPro, setForPro] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [errors, setErrors]=useState({
    code:'',
    price:'',
    forPro:'',
    startDate:'',
    endDate:'',    
  });

  const freeData=()=>{
    setCode('');
    setPrice('');
    setForPro(0);
    setStartDate('');
    setEndDate('');
    setErrors({});
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handlw validation for  form
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the code field
    if (!code.trim()) {
      newErrors = { ...newErrors, code: "Veuillez entrer le code promo" };
      valid = false;
    }
  
    // validate the price field type (only numbers allowed)
    if (!price) {
      newErrors = { ...newErrors, price: "Veuillez entrer le prix réduit" };
      valid = false;
    }
    else if(price && !/^\d+$/.test(price)) {
      newErrors = { ...newErrors, price: "Le prix doit contenir uniquement des chiffres" };
      valid = false;
    }

    // validate the start date field
    if (!startDate) {
      newErrors = { ...newErrors, startDate: "Veuillez entrer la date de  début" };
      valid = false;
    }

    // validate the start date field
    if (!endDate) {
      newErrors = { ...newErrors, endDate: "Veuillez entrer la date de fin" };
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

  // handle form submit 1 -- name && email 
  const handleSubmit1 = async (event) => {
      const api = new Api();
      event.preventDefault();
      const promo_code = {
        code,
        price,
        'for_pro':forPro,
        'start_date':startDate, 
        'end_date': endDate, 
      } 
      console.log('c',promo_code)
      if (validateForm()){ 
        api.AjouterCodePromo(promo_code).then(response => {
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
              getAllPromoCode();
              freeData();
              handleClose();
            } else if(response.code){
              setErrors({code: response?.code})
            }else if(response.startDate){
              setErrors({startDate: response?.startDate})
            }
          })
          .catch(err=> {
            console.error('Error:', err);
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

  // fetch the data from the back end  for promoCodes
  const getAllPromoCode = useCallback(() => {
    const api = new Api();

    api.getAllPromoCode().then((res) => {
      setPromoCodes(res);
    });
    
  }, []); // Empty dependency array since there are no dependencies

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = promoCodes.map((n) => n.id);
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
    inputData: promoCodes,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    getAllPromoCode(); // This will run only once when the component mounts
  }, [getAllPromoCode]); // Add getAllPromoCode to the dependency array to ensure useEffect is re-triggered when getAllPromoCode changes

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Gestion des Codes promos</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
          Ajouter  un code promo
        </Button>
      </Stack>

      {/* modal for adding a pro */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ajouter un  code promo
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
              <FormLabel>
                <InputLabel sx={{fontSize:14}} id="forPro">Type de bénéficiaire...</InputLabel>
                <Select
                  required
                  labelId="forPro"
                  id="forPro"
                  value={forPro}
                  name='forPro'
                  variant="standard"
                  size='small'
                  label="Type de bénéficiaire..."
                  fullWidth
                  sx={{
                    mb:4,
                    fontSize:13,
                    label:{
                      fontSize:14,
                    }
                  }}
                  onChange={(event) =>{ setForPro(event.target.value)}} 
                  error={!!errors.forPro}
                >
                  <MenuItem value={1}>Professionnel</MenuItem>
                  <MenuItem value={0}>Particulier</MenuItem>
                </Select>
              </FormLabel>

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
                  value={startDate} // Format the date before setting it to the TextField
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
                  value={endDate} // Format the date before setting it to the TextField
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
                value={code}
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
                value={price}
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
            Ajouter
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* table */}
      <Card>
        <PromoCodeTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          getAllPromoCode={getAllPromoCode}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PromoCodeTableHead
                order={order}
                orderBy={orderBy}
                rowCount={promoCodes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'code', label: 'Code' },
                  { id: 'price', label: 'Prix' },
                  { id: 'for_pro', label: 'Type de Bénéficiaire' },
                  { id: 'start_date', label: 'Date de début' },
                  { id: 'end_date', label: 'Date de fin' },
                  { id: 'status', label: 'Etat' },
                  { id: 'created_at', label: 'Créé à' },
                  { id: 'updated_at', label: 'Modifié à' },
                  { id: 'action', label: 'Action' },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PromoCodeTableRow
                      key={row.id}
                      id={row.id}
                      code={row.code}
                      price={row.price}
                      forPro={row.for_pro}
                      startDate={row.start_date}
                      endDate={row.end_date}
                      created_at={row.created_at}
                      updated_at={row.updated_at}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      getAllPromoCode={getAllPromoCode}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, promoCodes.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={promoCodes.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
