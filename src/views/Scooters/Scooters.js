import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import './scooter.css';

export default class Scooters extends React.Component {
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
                { field: 'sc_status', headerName: 'Status',type: 'number', flex: 0.3 },
                { field: 'sc_perm', headerName: 'Permission',type: 'number', flex: 0.3 },
                { field: 'sc_location', headerName: 'Station location',
                    description: 'address Station location',
                    sortable: false,
                    flex: 0.3
                },
            ],
            rows: []
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
        let chargingQty = 0;
        let notChargingQty = 0;
        let grantedQty = 0;
        let deniedQty = 0;
        let scootersQty = 0;
        data.forEach((item, i) => {
            item.id = i;
            scootersQty++;
            if(item.sc_status === 1) chargingQty++;
            if(item.sc_status === 0 || item.sc_status === 3) notChargingQty++;
            if(item.sc_perm === 1) grantedQty++;
            if(item.sc_perm === 0) deniedQty++;
        })
        this.setState({ rows: data})
        this.setState({ scootersQty: scootersQty});
        this.setState({ chargingQty: chargingQty});
        this.setState({ notChargingQty: notChargingQty});
        this.setState({ grantedQty: grantedQty});
        this.setState({ deniedQty: deniedQty});
    }

    componentDidMount() {
        this.getScooterData();
    }

    render() {
        return(
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className="bahCardTitleWhite">Scooters</h4>
                            <p className="bahCardCategoryWhite">
                                Scooter info:&emsp;&emsp;
                                scootersQty: {this.state.scootersQty}&emsp;
                                chargingQty: {this.state.chargingQty}&emsp;
                                notChargingQty: {this.state.notChargingQty}&emsp;
                                grantedQty: {this.state.grantedQty}&emsp;
                                deniedQty: {this.state.deniedQty}&emsp;
                            </p>
                        </CardHeader>
                        <CardBody>
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
