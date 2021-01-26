import React, {useEffect, useState} from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Warning from "@material-ui/icons/EvStation";
import Station from "@material-ui/icons/EvStation";
import Slot from '@material-ui/icons/BatteryChargingFull';
import Scooter from "@material-ui/icons/TwoWheeler";
import Euro from '@material-ui/icons/Euro';
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Map from "components/Map/Map";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

let scooterQty = 7;

function getData() {
  fetch('http://localhost:5000/api/scooter/all')
      .then(response => {
        if (!response.ok) {
          console.log('error');
        }
        return response.json();
      })
      .then((data) => {
        console.log( data);
      })
      .then(
          setTimeout(getData(), 1000)
      )
  console.log("scooterQty--->  "+scooterQty );
}

export default function Dashboard() {
  const classes = useStyles();


  const [scooterQty, setScooterQty] = useState(0);
  const [stationQty, setStationQty] = useState(0);
  const [slotQty, setSlotQty] = useState(0);
  const [availableQty, setAvailableQty] = useState(0);
  const [geodata, setGeodata] = useState([]);
  // const [data, setData] = useState({ hits: [] });

  const  countParameterStation = (data) => {

    let countStation = 0;
    let countSlot = 0;
    let countAva = 0;
    let geodata = [];
    data.forEach((item) => {
      setStationQty(++countStation);
      item.geodata ? geodata.push(item.geodata + ',' + item.location) : geodata.push([51, 31]);
      setGeodata(geodata);
      if(item.arr_slots.length > 0) {
        setSlotQty(countSlot += item.arr_slots.length);
      }
      item.arr_slots.forEach(slot => {
        if(slot.slot_status === 0) {
          setAvailableQty(++countAva)
        }
      })
    });
  };


  useEffect(() => {


    //getData();
    const fetchData1 = async () => {
      const result = await axios(
          'http://localhost:5000/api/scooter/all',
      );
      //setData(result.data);
    };

    // const fetchData = async () => {
      fetch('http://localhost:5000/api/scooter/all')
          .then(response => {
            if (!response.ok) {
              console.log('error');
            }
            return response.json();
          })
          .then((data) => {
            setScooterQty(data.length);
            console.log('XXXX');
          })


    fetch('http://localhost:5000/api/station/all')
        .then(response => {
          if (!response.ok) {
            console.log('error');
          }
          return response.json();
        })
        .then((data) => {
          if(data.length > 0) {
            countParameterStation(data)
          }
        })

    // fetchData();
    console.log("scooterQty--->  "+scooterQty );
    console.log("stationQty--->  "+stationQty );
  },[]);



  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Station/>
              </CardIcon>
              <p className={classes.cardCategory}>Stations</p>
              <h3 className={classes.cardTitle}>
                {stationQty}<small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {stationQty} ONLINE
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Slot />
              </CardIcon>
              <p className={classes.cardCategory}>Slots</p>
              <h3 className={classes.cardTitle}>{slotQty}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {availableQty} AVAILABLE
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Scooter/>
              </CardIcon>
              <p className={classes.cardCategory}>Scooters</p>
              <h3 className={classes.cardTitle}>{scooterQty}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                {slotQty - availableQty} ON CHARGE
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Euro />
              </CardIcon>
              <p className={classes.cardCategory}>Balance</p>
              <h3 className={classes.cardTitle}>100 $</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                END 24/06/20
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card cardMap>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Euro />
              </CardIcon>
            </CardHeader>
            <Map geodata={geodata}/>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Charges</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                charge power in day.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
