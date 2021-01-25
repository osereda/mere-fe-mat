import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(n, stid, loc) {
  return {
    n,
    stid,
    loc,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 , charge: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 , charge: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 , charge: 3 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.n}
          </TableCell>
          <TableCell align="center">{row.stid}</TableCell>
          <TableCell align="center">{row.loc}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Slot
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pad ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Info</TableCell>
                      <TableCell align="right">Charge level, %</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                        <TableRow key={historyRow.date}>
                          <TableCell component="th" scope="row">
                            {historyRow.date}
                          </TableCell>
                          <TableCell>{historyRow.customerId}</TableCell>
                          <TableCell align="right">{historyRow.amount}</TableCell>
                          <TableCell align="right">{historyRow.charge}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          charge: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('1', 159, 'Anonymous dsdsds , dsdsdsdsd, dsdsdsd'),
  createData('2', 237, 9.0),
  createData('3', 262, 16.0),
];

export default function TableList() {
  return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>№</TableCell>
              <TableCell align="center">Station ID</TableCell>
              <TableCell align="center">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
