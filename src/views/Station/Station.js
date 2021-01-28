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
import './station.css';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import Scooter from "@material-ui/icons/TwoWheeler";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

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
                <TableCell align="center">{row.st_id}</TableCell>
                <TableCell align="center">{row.st_status}</TableCell>
                <TableCell align="center">{row.st_counts_slot}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="addTableBody" style={{ paddingBottom: 1, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography className="tableHeader" variant="h8" gutterBottom component="div">
                                Slots
                                <hr/>
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead className="tableBody">
                                    <TableRow style={{ textColor: "red"}} >
                                        <TableCell>Pad ID</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Info</TableCell>
                                        <TableCell align="right">Charge level, %</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="tableBody" >
                                    {row.arr_slots.map((slotRow) => (
                                        <TableRow key={slotRow.slot_id}>
                                            <TableCell component="th" scope="row">
                                                {slotRow.slot_id}
                                            </TableCell>
                                            <TableCell>{slotRow.slot_status}</TableCell>
                                            <TableCell align="right">{slotRow.slot_status}</TableCell>
                                            <TableCell align="right">{slotRow.slot_power}</TableCell>
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
        n: PropTypes.number.isRequired,
        st_id: PropTypes.number.isRequired,
        st_status: PropTypes.number.isRequired,
        st_counts_slot: PropTypes.number.isRequired,
        loc: PropTypes.number.isRequired,
        arr_slots: PropTypes.arrayOf(
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


export default class Station extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            rows:[],
            stationQty: 0,
            slotQty : 0,
            availableQty : 0,
            occupiedQty : 0,
            outOfWork : 0
        };

        this.GetStationData = this.GetStationData.bind(this);
        this.setStationData = this.setStationData.bind(this);
    }


    GetStationData() {
        fetch('http://localhost:5000/api/station/all')
            .then(response => {
                if (!response.ok) {
                    console.log('error');
                }
                return response.json();
            })
            .then((data) => {
                if(data.length > 0) {
                    console.log('data ->' + data);
                    this.setStationData(data)
                }
            })
            .then( setTimeout(this.GetStationData, 1000))
    }

    setStationData(data) {
        let countSlots = 0;
        let availableSlot = 0;
        data.forEach((item, i) => {
            item.n = ++i;
            item.st_counts_slot = item.id_slots.length;
            item.st_status = "online";
            countSlots = countSlots + item.id_slots.length;
            this.setState({ stationQty: i});
            this.setState({ slotQty: countSlots})
        })
        this.setState({ rows: data})
    }

    componentDidMount() {
        this.GetStationData();
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
                            <h4 className="cardTitleWhite">Stations</h4>
                            <p className="cardCategoryWhite">
                                Information: stationQty - {this.state.stationQty}&nbsp;
                                slotQty - {this.state.slotQty}&nbsp;
                                availableQty - {this.state.availableQty}&nbsp;
                                occupiedQty - {this.state.occupiedQty}&nbsp;
                                outOfWork - {this.state.outOfWork}&nbsp;
                            </p>
                        </CardHeader>
                        <CardBody>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell/>
                                            <TableCell>№</TableCell>
                                            <TableCell align="center">Station ID</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center">Count of slots</TableCell>
                                            <TableCell align="center">Location</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.rows.map((row) => (
                                            <Row key={row.n} row={row}/>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}
