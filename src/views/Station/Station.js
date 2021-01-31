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
                { field: 'slot_info', headerName: 'Status',type: 'number', flex: 0.3 },
            ],
            htable: 400,

            stCountry: [
                { title: 'Izrael'},
                // { title: 'Italy'}
            ],
            stCity: [
                { title: 'Tel Aviv'},
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
        data.forEach((item, i) => {
            item.n = ++i;
            item.st_counts_slot = item.id_slots.length;
            item.st_status = "online";
            countSlots = countSlots + item.id_slots.length;
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
        this.setState({ location: data[0].location});
        this.filterStation();
    }

    filterStation() {
        let tmpArr = [];
        let arrOfSlots = [];
        if(this.state.isAll !== true) {
            tmpArr = this.state.f_rows.forEach(item => {
                if (item.arr_slots.length > 0)
                    arrOfSlots = item.arr_slots.filter(sl => {
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
                return item;
            })
            this.setState({ rows: arrOfSlots});
        } else
        this.setState({ rows: this.state.f_rows[0].arr_slots});
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

    handleChange = (event) => {
        //setAge(event.target.value);
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
                                options={this.state.stCountry}
                                defaultValue={this.state.stCountry[0]}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 130 }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Country" variant="outlined" />}
                            />
                            <Autocomplete
                                className="stDropdown"
                            id="combo-box-demo"
                            options={this.state.stCity}
                            defaultValue={this.state.stCity[0]}
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
                    Station&nbsp;-&nbsp;&nbsp;stationQty: {this.state.stationQty}&nbsp;
                    slotQty: {this.state.slotQty}&nbsp;
                    availableQty: {this.state.availableQty}&nbsp;
                    occupiedQty: {this.state.occupiedQty}&nbsp;
                    outOfWork: {this.state.outOfWork}&nbsp;
                </p>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader className="stHeadTableIcon" color="info" stats icon>
                            <CardIcon color="success">
                                <StationIcon />
                            </CardIcon>
                            <h6 className="stHeadTable">
                                Station ID: &nbsp;&nbsp;000247&nbsp;&nbsp;
                            </h6>
                            <h6 className="stHeadTable">
                                Location: &nbsp;&nbsp;{this.state.location}
                            </h6>
                        </CardHeader>
                        <CardBody>
                            <div style={{ height: this.state.htable, width: '100%' }}>
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
