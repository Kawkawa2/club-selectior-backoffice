import { toast } from 'react-toastify';
import { useState, useEffect,useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import {FormHelperText } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
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
import ProTableHead from '../pro-table-head';
import ProPageTableRow from '../pro-table-row';
import TableEmptyRows from '../table-empty-rows';
import ProTableToolbar from '../pro-table-toolbar';
import { emptyRows, getComparator, applyFilterPro } from '../utils';

// ----------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProPage() {

  const [page, setPage] = useState(0);
  const [pros, setPros] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showCameraIcon, setShowCameraIcon] = useState(false);
  const [numSiret, setNumSiret] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [adrP, setAdrP] = useState('');
  const [adrC, setAdrC] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errors, setErrors]=useState({
    numSiret:'',
    companyName:'',
    image:'',
    email:'',
    phone:'',
    password:'',
    cpassword:'',
    city:'',
    country:'',
    postalCode:'',
    adrP:'',
    adrC:'',
  });
  // handle toggle  show password icon
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const freeData=()=>{
    setNumSiret('');
    setCompanyName('');
    setImage(null);
    setEmail('');
    setPhone('');
    setCity('');
    setCountry('');
    setPostalCode('');
    setAdrP('');
    setAdrC('');
    setPassword('');
    setCPassword('');
    setErrors({});
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handle the avaar hover 
  const handleAvatarHover = () => {
    setShowCameraIcon(true);
  };

  const handleAvatarLeave = () => {
    setShowCameraIcon(false);
  };

  // handlw validation for  form
  function validateForm() {
    let valid = true;
    let newErrors = {};
  
    // validate the numSiret field
    if (!numSiret.trim()) {
      newErrors = { ...newErrors, numSiret: "Veuillez entrer votre numéro de SIRET" };
      valid = false;
    } else if (!/^\d{3}\s\d{3}\s\d{3}\s\d{4}$/.test(numSiret.trim())) {
      newErrors = { ...newErrors, numSiret: "Le numéro de SIRET doit être au format 'XXX XXX XXX XXXX'" };
      valid = false;
    }
  
    // validate the companyName field
    if (!companyName.trim()) {
      newErrors = { ...newErrors, companyName: "Veuillez entrer le nom de votre entreprise" };
      valid = false;
    }
  
    // validate the email field
    if (!email.trim()) {
      newErrors = { ...newErrors, email: "Veuillez entrer votre email" };
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors = { ...newErrors, email: "Entrer un email valide" };
      valid = false;
    }
  
    // validate the phone field
    if (!phone.trim()) {
      newErrors = { ...newErrors, phone: "Veuillez entrer votre numéro de téléphone" };
      valid = false;
    }
  
    // validate the city field
    if (!city.trim()) {
      newErrors = { ...newErrors, city: "Veuillez entrer le nom de votre ville" };
      valid = false;
    }
  
    // validate the country field
    if (!country.trim()) {
      newErrors = { ...newErrors, country: "Veuillez entrer le nom de votre pays" };
      valid = false;
    }
  
    // validate the postalCode field type (only numbers allowed)
    if (!postalCode.trim()) {
      newErrors = { ...newErrors, postalCode: "Veuillez entrer votre code postal" };
      valid = false;
    }
    else if(postalCode.trim() && !/^\d+$/.test(postalCode.trim())) {
      newErrors = { ...newErrors, postalCode: "Le code postal doit contenir uniquement des chiffres" };
      valid = false;
    }
  
    // validate the adrP field
    if (!adrP.trim()) {
      newErrors = { ...newErrors, adrP: "Veuillez entrer votre adresse principale" };
      valid = false;
    }
  
    // validate the password field
    if (!password.trim()) {
      newErrors = { ...newErrors, password: "Veuillez entrer votre mot de passe" };
      valid = false;
    } 
  
    // validate the cpassword field
    if (!cpassword.trim()) {
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
  
  // handle form submit 1 -- name && email 
  const handleSubmit1 = async (event) => {
      const api = new Api();
      event.preventDefault();
      const pro = {
        'num_siret':numSiret,
        'company_name':companyName,
        'postal_code':postalCode,
        'adr_p':adrP,
        'adr_c':adrC,
        image,
        email,
        phone,
        city,
        country,
        password,
      } 
      if (validateForm()){ 
        api.AjouterProfessionnel(pro).then(response => {
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
              getAllProfessional();
              freeData();
              handleClose();
            } else if(response.email){
              setErrors({email: response?.email})
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

  // fetch the data from the back end  for pros
  const getAllProfessional = useCallback(() => {
    const api = new Api();

    api.getAllProfessional().then((res) => {
      setPros(res);
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
      const newSelecteds = pros.map((n) => n.id);
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

  const dataFiltered = applyFilterPro({
    inputData: pros,
    comparator: getComparator(order, orderBy),
    filterName,
  });


  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    getAllProfessional(); // This will run only once when the component mounts
  }, [getAllProfessional]); // Add getAllProfessional to the dependency array to ensure useEffect is re-triggered when getAllProfessional changes

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Gestion des Professionnels</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
          Ajouter  un Professionnel
        </Button>
      </Stack>

      {/* modal for adding a pro */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ajouter un  Professionnel
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
              <FormLabel  
                  onMouseEnter={handleAvatarHover} 
                  onMouseLeave={handleAvatarLeave} 
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    mx: 'auto'
                  }}
                >
                  <Avatar
                    alt="particulier"
                    src={image ? URL.createObjectURL(image) : ''}
                    sx={{ width: 80, height: 80}}
                  />
                  <Input type="file" 
                    sx={{ display: 'none' }}  
                    name='image'
                    onChange={(event) => { 
                      if (event.target.files && event.target.files[0]) {
                        setImage(event.target.files[0]);
                      }
                    }} 
                  />
                  {showCameraIcon && (
                    <IconButton
                      sx={{ 
                        position: 'absolute',
                        width: 80, 
                        height: 80, 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        mx: 'auto'
                      }}
                      aria-label="upload picture"
                      component="span"
                    >
                      <Iconify icon="ph:camera" />
                    </IconButton>
                  )}
              </FormLabel>

              <TextField
                required
                id="numSiret"
                name="numSiret"
                label="Numéro de SIRET ..."
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
                value={numSiret}
                onChange={(event) =>{ setNumSiret(event.target.value)}} 
                error={!!errors.numSiret}
              />
              <FormHelperText sx={{fontSize:13,mb:1}} error={!!errors.numSiret}>{errors.numSiret}</FormHelperText>
              
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Nom d'entreprise ..."
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
                value={companyName}
                onChange={(event) =>{ setCompanyName(event.target.value)}} 
                error={!!errors.companyName}
              />
              <FormHelperText sx={{fontSize:13,mb:1}}  error={!!errors.companyName}>{errors.companyName}</FormHelperText>

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
                value={email}
                onChange={(event) =>{ setEmail(event.target.value)}} 
                error={!!errors.email}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.email}>{errors.email}</FormHelperText>
              
              <TextField
                required
                id="phone"
                name="phone"
                label="Numéro de téléphone..."
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
                value={phone}
                onChange={(event) =>{ setPhone(event.target.value)}} 
                error={!!errors.phone}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.phone}>{errors.phone}</FormHelperText>

              <TextField
                required
                id="city"
                name="city"
                label="Ville..."
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
                value={city}
                onChange={(event) =>{ setCity(event.target.value)}} 
                error={!!errors.city}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.city}>{errors.city}</FormHelperText>
              
              <TextField
                required
                id="country"
                name="country"
                label="Pays..."
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
                value={country}
                onChange={(event) =>{ setCountry(event.target.value)}} 
                error={!!errors.country}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.country}>{errors.country}</FormHelperText>

              <TextField
                required
                id="postalCode"
                name="postalCode"
                label="Code postal..."
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
                value={postalCode}
                onChange={(event) =>{ setPostalCode(event.target.value)}} 
                error={!!errors.postalCode}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.postalCode}>{errors.postalCode}</FormHelperText>
              
              <TextField
                required
                id="adrP"
                name="adrP"
                label="Adresse principale..."
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
                value={adrP}
                onChange={(event) =>{ setAdrP(event.target.value)}} 
                error={!!errors.adrP}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.adrP}>{errors.adrP}</FormHelperText>
              
              <TextField
                id="adrC"
                name="adrC"
                label="Adresse complémentaire..."
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
                value={adrC}
                onChange={(event) =>{ setAdrC(event.target.value)}} 
                error={!!errors.adrC}
              />
              <FormHelperText sx={{fontSize:13, mb:1}}  error={!!errors.adrC}>{errors.adrC}</FormHelperText>

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
        <ProTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          getAllProfessional={getAllProfessional}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProTableHead
                order={order}
                orderBy={orderBy}
                rowCount={pros.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'num_siret', label: 'Numéro  de Siret' },
                  { id: 'company_name', label: 'Nom de l\'entreprise' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Téléphone' },
                  { id: 'city', label: 'Ville' },
                  { id: 'country', label: 'Pays' },
                  { id: 'postal_code', label: 'Code Postal' },
                  { id: 'adr_p', label: 'Adresse' },
                  { id: 'created_at', label: 'Créé à' },
                  { id: 'updated_at', label: 'Modifié à' },
                  { id: 'action', label: 'Action' },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ProPageTableRow
                      key={row.id}
                      id={row.id}
                      image={row.image}
                      num_siret={row.num_siret}
                      company_name={row.company_name}
                      email={row.email}
                      phone={row.phone}
                      city={row.city}
                      country={row.country}
                      postal_code={row.postal_code}
                      adr_p={row.adr_p}
                      adr_c={row.adr_c}
                      created_at={row.created_at}
                      updated_at={row.updated_at}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      getAllProfessional={getAllProfessional}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, pros.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={pros.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
