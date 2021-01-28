import { DataGrid } from '@material-ui/data-grid';
import React, { Component } from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import './pac.css';
import configData from "../../config.json";

export default class PowerAndCost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
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
                        <div style={{ height: 450, width: '100%' }}>
                            <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={10} checkboxSelection />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        )
    }
}
