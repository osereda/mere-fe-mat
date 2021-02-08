import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import './scooter.css';
import configData from "../../config.json"
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import CardIcon from "../../components/Card/CardIcon";
import ScooterIcon from "@material-ui/icons/TwoWheeler";

export default class ScootersV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            scootersQty: 0,
            grantedQty: 0,
            deniedQty: 0,
            chargingQty: 0,
            notChargingQty: 0,
            columns: [
                { field: 'sc_id', headerName: 'ID', flex: 0.3},
                { field: 'sc_type', headerName: 'Type', flex: 0.3},
                { field: 'sc_pow', headerName: 'Charge level, %', flex: 0.3},
                { field: 'sc_status', headerName: 'Status', flex: 0.3 },
                { field: 'sc_perm', headerName: 'Permission', flex: 0.3 },
                { field: 'sc_location', headerName: 'Station location',
                    description: 'address Station location',
                    sortable: false,
                    flex: 0.3
                },
            ],
            rows: [],
            f_rows:[],
            isAll: true,

            filterCountry: 'Israel',
            filterCiti: 'Tel Aviv',
            scDropdownCountry: [
                { title: 'All'},
                // { title: 'UK'}
                { title: 'Israel'}
            ],
            scDropdownCity: [
                { title: 'All'},
                { title: 'Tel Aviv'}
            ]

        };

        this.setScooterData = this.setScooterData.bind(this);
        this.getScooterData = this.getScooterData.bind(this);
        this.filterScooter = this.filterScooter.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    getScooterData() {
        fetch(configData.SERVER_URL+'scooter/all')
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
        let chargingQty = 0;
        let notChargingQty = 0;
        let grantedQty = 0;
        let deniedQty = 0;
        let scootersQty = 0;
        data.forEach((item, i) => {
            item.id = i;
            scootersQty++;
            if(item.sc_status === 1) {
                chargingQty++;
                item.sc_status = 'Charging';
            }
            if(item.sc_status === 0 || item.sc_status === 3){
                notChargingQty++;
                item.sc_status = 'Not charging';
            }
            if(item.sc_perm === 1) {
                grantedQty++;
                item.sc_perm = 'Granted';
            }
            if(item.sc_perm === 0) {
                deniedQty++;
                item.sc_perm = 'Denied';
            }
        })
        this.setState({ rows: data})
        this.setState({ f_rows: data});
        this.setState({ scootersQty: scootersQty});
        this.setState({ chargingQty: chargingQty});
        this.setState({ notChargingQty: notChargingQty});
        this.setState({ grantedQty: grantedQty});
        this.setState({ deniedQty: deniedQty});
        this.filterScooter();
    }

    filterScooter() {
        let filteredArr = [];
        filteredArr = this.state.rows.filter(item => {
            if (this.state.isAll !== true ) {
                if (item.sc_status === "Charging" && document.getElementById("radio-2").checked) {
                    return item;
                }
                if (item.sc_perm === "Granted" && document.getElementById("radio-3").checked) {
                    return item;
                }
                // if (item.sc_status === "Not charging" && document.getElementById("radio-4").checked) {
                //     return item;
                // }
            }
            return item;

        })
        this.setState({rows: filteredArr});
    }

    handleFilter() {
        if(document.getElementById("radio-1").checked){
            this.setState({ isAll: true});
        }
        if(document.getElementById("radio-2").checked ||
            document.getElementById("radio-3").checked ||
            document.getElementById("radio-4").checked){
            this.setState({ isAll: false});
        }
    }

    handleCountryChange = (event) => {
        if(event !== null) {
            this.setState({filterCountry: event.title});
        }
    };

    componentDidMount() {
        this.getScooterData();
    }

    render() {
        return(
            <div>
                <GridContainer>
                    <div className="stDropdown">
                        <GridItem xs={12} sm={12} md={12}>
                            <Autocomplete
                                className="stDropdown"
                                id="combo-box-demo"
                                options={this.state.scDropdownCountry}
                                defaultValue={this.state.scDropdownCountry[0]}
                                getOptionLabel={(option) => option.title}
                                onChange={(event, value) => this.handleCountryChange(value)}
                                style={{ width: 130 }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Country" variant="outlined" />}
                            />
                            <Autocomplete
                                className="stDropdown"
                                id="combo-box-demo"
                                onChange={(event, value) => console.log(value)}
                                options={this.state.scDropdownCity}
                                defaultValue={this.state.scDropdownCity[0]}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 130, maxHeight: 20 }}
                                renderInput={(params) =>
                                    <TextField {...params} label="City" variant="outlined" />}
                            />

                        </GridItem>
                    </div>
                    <div className="stDropdown-btn">
                        <GridItem xs={12} sm={12} md={12}>
                            <div className="form_radio_btn_start">
                                <input onClick={this.handleFilter} id="radio-1" type="radio" name="radio" value="1"/>
                                <label htmlFor="radio-1">All</label>
                            </div>
                            <div className="form_radio_btn">
                                <input onClick={this.handleFilter} id="radio-2" type="radio" name="radio" value="2"/>
                                <label htmlFor="radio-2">Charging</label>
                            </div>
                            <div className="form_radio_btn">
                                <input  onClick={this.handleFilter} id="radio-3" type="radio" name="radio" value="3"/>
                                <label htmlFor="radio-3">Granted</label>
                            </div>
                            <div className="form_radio_btn_end">
                                <input onClick={this.handleFilter} id="radio-4" type="radio" name="radio" value="4" />
                                <label htmlFor="radio-4">Not charging</label>
                            </div>
                        </GridItem>
                    </div>
                </GridContainer>
                <p className="stCountStr">
                    Scooters&nbsp;-&nbsp;&nbsp;Scooters qty: {this.state.scootersQty}&nbsp;
                    Granted: {this.state.grantedQty}&nbsp;
                    Denied: {this.state.deniedQty}&nbsp;
                    Charging: {this.state.chargingQty}&nbsp;
                    Not charging: {this.state.notChargingQty}&nbsp;
                </p>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader className="stHeadTableIcon" color="info" stats icon>
                                <CardIcon color="success">
                                    <ScooterIcon />
                                </CardIcon>
                            </CardHeader>
                            <CardBody>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection />
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
