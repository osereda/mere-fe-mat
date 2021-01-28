import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import './bah.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";

export default class BillingAndHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            selectedDate: '2014-08-18T21:11:54',
            columns: [
                { field: 'sc_id', headerName: 'ID', width: 70 },
                { field: 'sc_type', headerName: 'Type', width: 130 },
                { field: 'sc_pow', headerName: 'Charge level, %', width: 130 },
                { field: 'sc_status', headerName: 'Status',type: 'number', width: 90 },
                { field: 'sc_perm', headerName: 'Permission',type: 'number', width: 90 },
                { field: 'sc_location', headerName: 'Station location',
                    description: 'address Station location',
                    sortable: false,
                    width: 160
                    // valueGetter: (params) =>
                    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
                },
            ],
            rows: [{ id: 1, sc_type: 'Snow', sc_pow: 'Jon', age: 35 }]
        };

        this.setScooterData = this.setScooterData.bind(this);
        this.getScooterData = this.getScooterData.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

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

    handleDateChange = (date) => {
        this.setState({ selectedDate: date})
    };

    render() {
        return(
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className="bahCardTitleWhite">Power And Cost</h4>
                            <p className="bahCardCategoryWhite">
                                Information Power And Cost
                            </p>
                        </CardHeader>
                        <CardBody>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection />
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}
