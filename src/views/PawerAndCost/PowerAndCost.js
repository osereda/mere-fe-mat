import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';

export default class PowerAndCost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
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

    render() {
        return(
            <div>
                <p>cdcfdc</p>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection />
                </div>
            </div>
        )
    }
}
