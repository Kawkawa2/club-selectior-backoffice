import { useState, useEffect,useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
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

export default function ProPage() {

  const [page, setPage] = useState(0);
  const [pros, setPros] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // fetch the data from the back end 
  const getAllProfessional = useCallback(() => {
    const api = new Api();

    api.getAllProfessional().then((res) => {
      setPros(res);
    });
    
  }, []); // Empty dependency array since there are no dependencies

  console.log('pros',pros);

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

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Ajouter  un Professionnel
        </Button>
      </Stack>

      <Card>
        <ProTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
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
                  { id: 'num_siret', label: 'numéro  de Siret' },
                  { id: 'company_name', label: 'Nom de l\'entreprise' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Téléphone' },
                  { id: 'city', label: 'Ville' },
                  { id: 'country', label: 'Pays' },
                  { id: 'postal_code', label: 'Code Postal' },
                  { id: 'adr_p', label: 'Adresse' },
                  { id: 'created_at', label: 'Créé à' },
                  { id: 'updated_at', label: 'Modifier à' },
                  { id: 'action', label: 'Action' },

                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ProPageTableRow
                      key={row.id}
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
