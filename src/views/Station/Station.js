import React from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import {
    ButtonGroup,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select, TextField
} from "@material-ui/core";
import configData from "../../config.json"
import './station.css';
import CardIcon from "../../components/Card/CardIcon";
import StationIcon from "@material-ui/icons/EvStation";
import {DataGrid} from "@material-ui/data-grid";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class Station extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            stRows:[],
            rows:[],
            f_rows:[],
            stationQty: 0,
            slotQty : 0,
            availableQty : 0,
            occupiedQty : 0,
            outOfWork : 0,
            location : '',

            isAll: true,
            isAvailable: false,
            isOccupied: false,
            isUnavailable: false,
            isOnline: false,
            isOffline: false,

            columns: [
                { field: 'slot_id', headerName: 'ID', flex: 0.3},
                { field: 'slot_status', headerName: 'Status', flex: 0.3},
                { field: 'slot_power', headerName: 'Charge level, %', flex: 0.3},
                { field: 'slot_info', headerName: 'Status', flex: 0.3 },
            ],
            htable: 400,

            filterCountry: 'Israel',
            filterCiti: 'Tel Aviv',
            stDropdownCountry: [
                { title: 'All'},
                // { title: 'UK'}
                { title: 'Israel'}
            ],
            stDropdownCity: [
                { title: 'All'},
                { title: 'Tel Aviv'}
            ]


        };

        this.isActive = true;
        this.tmpArr = [];

        this.GetStationData = this.GetStationData.bind(this);
        this.setStationData = this.setStationData.bind(this);
        this.filterStation = this.filterStation.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }


    GetStationData() {
        fetch(configData.SERVER_URL+'station/all')
            .then(response => {
                if (!response.ok) {
                    console.log('error');
                }
                return response.json();
            })
            .then((data) => {
                if(data.length > 0) {
                    this.setStationData(data)
                }
            })
            .then( setTimeout(this.GetStationData, 1000))
    }

    setStationData(data) {
        let countSlots = 0;
        let availableSlot = 0;
        let occupiedSlot = 0;
        let tmpStDropdownCountry =[];
        data.forEach((item, i) => {
            item.n = ++i;
            item.st_counts_slot = item.id_slots.length;
            item.st_status = "online";
            countSlots = countSlots + item.id_slots.length;
            // this.state.stDropdownCountry.forEach(country => {
            //     if(item.location.split(',')[0] !== country.title) {
            //         tmpStDropdownCountry.push({title: item.location.split(',')[0]});
            //         this.setState({ stDropdownCountry: tmpStDropdownCountry});
            //     }
            // });
            this.setState({ stationQty: i});
            item.arr_slots.forEach((sl, i) => {
                sl.id = i;
                if(sl.slot_status === 0) {
                    availableSlot++;
                    sl.slot_status = 'Available';
                }
                if(sl.slot_status === 1) {
                    occupiedSlot++;
                    sl.slot_status = 'Occupied';
                }
                if(sl.slot_info === 0) {
                    sl.slot_info = 'Offline';
                }
                if(sl.slot_info === 1) {
                    sl.slot_info = 'Online';
                }
            });
        })
        // this.setState({ rows: data});
        this.setState({ f_rows: data});
        this.setState({ slotQty: countSlots});
        this.setState({ availableQty: availableSlot});
        this.setState({ occupiedQty: occupiedSlot});
        // this.setState({ stDropdownCountry: tmpStDropdownCountry});
        this.filterStation();
    }

    filterStation() {
        let filteredArr = [];
        if(true) {
            filteredArr = this.state.f_rows.filter(item => {
                if(item.location.split(',')[0] === this.state.filterCountry) {
                    if (this.state.isAll !== true && item.arr_slots.length > 0) {
                        item.arr_slots = item.arr_slots.filter(sl => {
                            if (sl.slot_status === "Occupied" && document.getElementById("radio-2").checked) {
                                return sl;
                            }
                            if (sl.slot_status === "Available" && document.getElementById("radio-3").checked) {
                                return sl;
                            }
                            if (sl.slot_info === "Online" && document.getElementById("radio-5").checked) {
                                return sl;
                            }
                        });
                    }
                    return item;
                }

            })
            this.setState({rows: filteredArr});
        }
        else {
            this.setState({rows: this.state.f_rows});
        }
    }

    handleFilter() {
        if(document.getElementById("radio-1").checked){
            this.setState({ isAll: true});
        }
        if(document.getElementById("radio-2").checked ||
            document.getElementById("radio-3").checked ||
            document.getElementById("radio-4").checked ||
            document.getElementById("radio-5").checked ||
            document.getElementById("radio-6").checked ){
            this.setState({ isAll: false});
        }
    }

    componentDidMount() {
        this.GetStationData();
    }

    handleCountryChange = (event) => {
        if(event !== null) {
            this.setState({filterCountry: event.title});
        }
    };

    render() {
        return (
            <div>
                <GridContainer>
                    <div className="stDropdown">
                        <GridItem xs={12} sm={12} md={12}>
                            <Autocomplete
                                className="stDropdown"
                                id="combo-box-demo"
                                options={this.state.stDropdownCountry}
                                defaultValue={this.state.stDropdownCountry[0]}
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
                                options={this.state.stDropdownCity}
                                defaultValue={this.state.stDropdownCity[0]}
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
                                <label htmlFor="radio-2">Occupied</label>
                            </div>
                            <div className="form_radio_btn">
                                <input  onClick={this.handleFilter} id="radio-3" type="radio" name="radio" value="3"/>
                                <label htmlFor="radio-3">Available</label>
                            </div>
                            <div className="form_radio_btn">
                                <input onClick={this.handleFilter} id="radio-4" type="radio" name="radio" value="4" />
                                <label htmlFor="radio-4">Unavailable</label>
                            </div>
                            <div className="form_radio_btn">
                                <input  onClick={this.handleFilter} id="radio-5" type="radio" name="radio" value="5"/>
                                <label htmlFor="radio-5">Online</label>
                            </div>
                            <div className="form_radio_btn_end">
                                <input  onClick={this.handleFilter} id="radio-6" type="radio" name="radio" value="6"/>
                                <label htmlFor="radio-6">Offline</label>
                            </div>
                        </GridItem>
                    </div>
                </GridContainer>
                <p className="stCountStr">
                    Station&nbsp;-&nbsp;&nbsp;Station qty: {this.state.stationQty}&nbsp;
                    Pad qty: {this.state.slotQty}&nbsp;
                    Available pads: {this.state.availableQty}&nbsp;
                    Occupied pads: {this.state.occupiedQty}&nbsp;
                    Out of work: {this.state.outOfWork}&nbsp;
                </p>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    {this.state.rows.map(item => {
                        return (
                            <Card>
                                <CardHeader className="stHeadTableIcon" color="info" stats icon>
                                    <CardIcon color="success">
                                        <StationIcon />
                                    </CardIcon>
                                    <h6 className="stHeadTable">
                                        Station ID: &nbsp;&nbsp;000247&nbsp;&nbsp;
                                    </h6>
                                    <h6 className="stHeadTable">
                                        Location: &nbsp;&nbsp;{item.location}
                                    </h6>
                                </CardHeader>
                                <CardBody>
                                    <div style={{ height: this.state.htable, width: '100%' }}>
                                        <DataGrid rows={item.arr_slots} columns={this.state.columns} pageSize={5} checkboxSelection />
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })}
                    {/*<Card>*/}
                    {/*    <CardHeader className="stHeadTableIcon" color="info" stats icon>*/}
                    {/*        <CardIcon color="success">*/}
                    {/*            <StationIcon />*/}
                    {/*        </CardIcon>*/}
                    {/*        <h6 className="stHeadTable">*/}
                    {/*            Station ID: &nbsp;&nbsp;000247&nbsp;&nbsp;*/}
                    {/*        </h6>*/}
                    {/*        <h6 className="stHeadTable">*/}
                    {/*            Location: &nbsp;&nbsp;{this.state.location}*/}
                    {/*        </h6>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardBody>*/}
                    {/*        <div style={{ height: this.state.htable, width: '100%' }}>*/}
                    {/*            <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection />*/}
                    {/*        </div>*/}
                    {/*    </CardBody>*/}
                    {/*</Card>*/}
                </GridItem>
            </GridContainer>
            </div>
        );
    }
}
