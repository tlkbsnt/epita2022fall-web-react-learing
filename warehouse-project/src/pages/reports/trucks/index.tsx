import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DashboardLayout from '../../../components/Layout';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { Typography, Button } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { useEffect } from 'react';

import { Manifest } from '../../../types/manifest';
import { manifestService } from '../../../services';
import { reportService } from '../../../services';

import { generalUtility } from '../../../utilities';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TruckReportPage: React.FunctionComponent = () => {
  const [manifests, setManifests] = React.useState<Array<Manifest>>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getManifests = async () => {
    const response = await manifestService.getAll();
    console.log(response);
    setManifests(response);
  };

  const downLoadSummaryReport = async () => {
    const file = await reportService.getTrucksSummary();
    generalUtility.downloadFile(file, 'truck_summary.xlsx');
  };

  const downLoadSummaryReportForTruck = async (
    truckId: number,
    truckName: string,
    storeName: string
  ) => {
    const file = await reportService.getTruckReport(truckId);
    generalUtility.downloadFile(
      file,
      `${storeName}_${truckName}_${generalUtility.getTimeStampInSeconds()}.xlsx`
    );
  };

  useEffect(() => {
    getManifests();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardLayout>
      <Container maxWidth={false} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Truck Reports
            </Typography>
            <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                size="small"
                startIcon={<DownloadOutlinedIcon />}
                variant="contained"
                onClick={downLoadSummaryReport}
              >
                Download Summary Report
              </Button>
            </Paper>
          </Paper>
        </Grid>
        <Grid style={{ marginTop: 10 }} item xs={12} md={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Truck Detailed Reports
            </Typography>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Store</TableCell>
                    <TableCell align="left">
                      <strong>Truck</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Number of Items</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Arrival Date</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Is Complete</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Operations</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {manifests.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.storeName}
                      </TableCell>
                      <TableCell align="left">{row.truckName}</TableCell>
                      <TableCell align="center">{row.numberOfItems}</TableCell>
                      <TableCell align="center">
                        {row.arrivalDateString}
                      </TableCell>
                      <TableCell align="center">
                        {row.isComplete === true ? (
                          <IconButton
                            color="primary"
                            aria-label="add to shopping cart"
                          >
                            <CheckCircleOutlineIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            color="error"
                            aria-label="add to shopping cart"
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                          onClick={() => {
                            downLoadSummaryReportForTruck(
                              row.id,
                              row.storeName,
                              row.truckName
                            );
                          }}
                        >
                          <DownloadOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      colSpan={3}
                      count={manifests.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default TruckReportPage;
