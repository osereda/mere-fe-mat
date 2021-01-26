import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from 'react-router-dom';
import {useEffect, useState} from "react";

// const GoBack = ({ history }) => <img src="./images/back.png" onClick={
//     () => history.goBack()} alt="Go back" />;

export default class Scooter extends React.Component {
    constructor(props) {
        super(props);

        this.condition = null;
        this.scootersQty = 0;
        this.grantedQty = 0;
        this.deniedQty = 0;
        this.chargingQty = 0;
        this.notChargingQty = 0;

        this.setScooter = this.setScooter.bind(this);
        this.onGetScooter = this.onGetScooter.bind(this);
        this.setFilteredScooter = this.setFilteredScooter.bind(this);
        this.filterInstantUpdate = this.filterInstantUpdate.bind(this);

        this.columns = [
            { field: 'sc_id', headerName: 'ID', width: 70 },
            { field: 'sc_type', headerName: 'Type', width: 130 },
            { field: 'sc_pow', headerName: 'Charge level, %', width: 130 },
            { field: 'sc_status', headerName: 'Status',type: 'number', width: 90 },
            { field: 'sc_perm', headerName: 'Permission',type: 'number', width: 90 },
            {
                field: 'sc_location',
                headerName: 'Station location',
                description: 'address Station location',
                sortable: false,
                width: 160
                // valueGetter: (params) =>
                //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
            },
        ];

        this.rows = [];
        this.rows1 = [
            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
            { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
            { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
            { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
            { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
            { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
            { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        ];
    };

    state = {
        rows3: 10
    };

    setScooter(scooter) {
        this.rows = scooter;
        this.scootersQty = 0;
        this.grantedQty = 0;
        this.deniedQty = 0;
        this.chargingQty = 0;
        this.notChargingQty = 0;
        scooter.forEach((item, i) => {
            this.scootersQty++;
            if(item.sc_status === 1) this.chargingQty++;
            if(item.sc_status === 0 || item.sc_status === 3) this.notChargingQty++;
            if(item.sc_perm === 1) this.grantedQty++;
            if(item.sc_perm === 0) this.deniedQty++;
        });

        // this.props.setScooter(scooter);
        //this.props.setFilteredScooter(scooter);
    };

    setFilteredScooter(scooter) {
        this.props.setFilteredScooter(scooter);
    };

    filterUploadData(data) {
        let filteredData = data;
        if (this.condition === 'Charging') {
            filteredData = this.props.scooter.filter((item) => {
                if(item.sc_status === 1) return item;
            });
        }
        if (this.condition === 'Charged') {
            filteredData = this.props.scooter.filter((item) => {
                if(item.sc_status === 3) return item;
            });
        }
        if (this.condition === 'Not charged') {
            filteredData = this.props.scooter.filter((item) => {
                if(item.sc_status === 0) return item;
            });
        }
        //this.setFilteredScooter(filteredData)
    }

    onGetScooter() {

        fetch('http://localhost:5000/api/scooter/all')
            .then(response => {
                if (!response.ok) {
                    console.log('error');
                }
                return response.json();
            })
            .then((data) => {
                console.log('data->'+data);
                this.rows = data
                this.state.rows3 = data.length;
                this.filterUploadData(data)
                this.setScooter(data)
            })
            .then( setTimeout(this.onGetScooter, 1000))
    }

    componentDidMount() {
        this.onGetScooter();
    }

    filterInstantUpdate(event) {
        let filteredData = this.props.scooter;
        let value = event.target.value;
        if (event.target.value === 'All') this.condition = null;

        if (value === 'Charging') {
            this.condition = 'Charging';
            filteredData = this.props.scooter.filter((item) => {
                if(item.sc_status === 1)
                    return item;
            });
        }
        if (value === 'Charged') {
            this.condition = 'Charged';
            filteredData = this.props.scooter.filter((item) => {
                if(item.sc_status === 3)
                    return item;
            });
        }
        if (value === 'Not charged') {
            this.condition = 'Not charged';
            filteredData = this.props.scooter.filter((item) => {
                if(item.sc_perm === 0)
                    return item;
            });
        }
    }


    getData() {
        const [dataTest, setData] = useState(0);

        useEffect(() => {
            setData(111);
        }, [])



    }

    render() {
        return(
            <div>
                {this.scootersQty }
                {this.state.rows3}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.rows} columns={this.columns} pageSize={5} checkboxSelection />
                </div>
            </div>
        )
    }
}
