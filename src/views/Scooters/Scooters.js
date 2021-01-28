import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";

import './scooter.css';
import Scooter from "@material-ui/icons/TwoWheeler";
import CardIcon from "../../components/Card/CardIcon";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'sc_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'sc_type', numeric: true, disablePadding: false, label: 'Type' },
    { id: 'sc_pow', numeric: true, disablePadding: false, label: 'Charge level, %' },
    { id: 'sc_status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'sc_perm', numeric: true, disablePadding: false, label: 'Permission' },
    { id: 'sc_location', numeric: true, disablePadding: false, label: 'Station location' }

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className="visuallyHidden">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Scooters
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default class Scooters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            selected1: [],
            page: 0,
            dense: false,
            rowsPerPage: 5,
            rows: [{ sc_id: 1, sc_type: 'Snow', sc_pow: 'Jon', sc_status: 35, sc_location: 'ccc gggg' }],
        };

        this.handleClick = this.handleClick.bind(this);
        this.setScooterData = this.setScooterData.bind(this);
        this.getScooterData = this.getScooterData.bind(this);
    }

    handleRequestSort = (event, property) => {
        const isAsc = this.orderBy === property && this.order === 'asc';
        this.setState({ order: isAsc ? 'desc' : 'asc'})
        this.setState({ orderBy: property})
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = this.state.rows.map((n) => n.name);
            this.setState({ selected: newSelecteds})
            return;
        }
        this.setState({ selected: []})
    };

    handleClick = (event, name) => {
        console.log("name ------->" + name);
        const selectedIndex = this.selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.selected.slice(1));
        } else if (selectedIndex === this.selected.length - 1) {
            newSelected = newSelected.concat(this.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.selected.slice(0, selectedIndex),
                this.selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected})
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage})
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10)})
        this.setState({ page: 0})
    };

    handleChangeDense = (event) => {
        this.setState({ dense: event.target.checked})
    };

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    emptyRows = this.rowsPerPage - Math.min(this.rowsPerPage, rows.length - this.page * this.rowsPerPage);

    getScooterData() {
        fetch('http://localhost:5000/api/scooter/all')
            .then(response => {
                if (!response.ok) {
                    console.log('error');
                }
                return response.json();
            })
            .then((data) => {
                this.setScooterData(data);
            })
            .then( setTimeout(this.getScooterData, 1000))
    }

    setScooterData(data) {
        data.forEach((item, i) => {
            item.id = i;
        })
        this.setState({ rows: data})
    }

    componentDidMount() {
        this.getScooterData();
    }


    render() {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            {/*<CardIcon color="success">*/}
                            {/*    <Scooter/>*/}
                            {/*</CardIcon>*/}
                            <h4 className="bahCardTitleWhite">Scooters</h4>
                            <p className="bahCardCategoryWhite">
                                Scooters Information
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div >
                                <Paper>
                                    <EnhancedTableToolbar numSelected={this.state.selected.length}/>
                                    <TableContainer>
                                        <Table
                                            className="table"
                                            aria-labelledby="tableTitle"
                                            size={this.state.dense ? 'small' : 'medium'}
                                            aria-label="enhanced table"
                                        >
                                            <EnhancedTableHead
                                                numSelected={this.state.selected.length}
                                                order={this.state.order}
                                                orderBy={this.state.orderBy}
                                                onSelectAllClick={this.handleSelectAllClick}
                                                onRequestSort={this.handleRequestSort}
                                                rowCount={rows.length}
                                            />
                                            <TableBody>
                                                {stableSort(this.state.rows, getComparator(this.state.order, this.state.orderBy))
                                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                                    .map((row, index) => {
                                                        const isItemSelected = this.isSelected(row.name);
                                                        const labelId = `enhanced-table-checkbox-${index}`;

                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={(event) => this.handleClick(event, row.name)}
                                                                role="checkbox"
                                                                aria-checked={isItemSelected}
                                                                tabIndex={-1}
                                                                key={row.name}
                                                                selected={isItemSelected}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox
                                                                        checked={isItemSelected}
                                                                        inputProps={{'aria-labelledby': labelId}}
                                                                    />
                                                                </TableCell>
                                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                    {row.sc_id}
                                                                </TableCell>
                                                                <TableCell align="right">{row.sc_type}</TableCell>
                                                                <TableCell align="right">{row.sc_pow}</TableCell>
                                                                <TableCell align="right">{row.sc_status}</TableCell>
                                                                <TableCell align="right">{row.sc_perm}</TableCell>
                                                                <TableCell align="right">{row.sc_location}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {this.emptyRows > 0 && (
                                                    <TableRow style={{height: (this.dense ? 33 : 53) * this.emptyRows}}>
                                                        <TableCell colSpan={6}/>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.rows.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                                <FormControlLabel
                                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense}/>}
                                    label="Dense padding"
                                />
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}
