import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import './dashboard.css';

export default function MapCenterMark(geodata) {
    let lat=51.4949045;
    let lon=31.2946714;
    let geopositionArr = Object.keys(geodata).map((key) => [geodata[key]]);
    let geoposition = geopositionArr[0][0];
    if(geoposition && geoposition.length > 0) {
        const newCoords = geoposition[0].split(",");
        lat = parseFloat(newCoords[0]);
        lon = parseFloat(newCoords[1]);
    }
    else {
        //geoposition = ['0,0']
    }

    const [coords, setCoords] = useState([lat, lon]);

    const handleChangeList = (e) => {
        const target = e.target.outerText;
        const newCoords = target.split(",");
        lat = parseFloat(newCoords[0]);
        lon = parseFloat(newCoords[1]);
        setCoords([lat, lon]);
    };

    useEffect(() => {
        console.log(coords);
    }, [coords]);

    return (
        <div className="db_container">
            <div className="db_box">
                <div className="db_item">
                    {geoposition.map((item) => {
                        return (
                            <>
                            <ul onClick={handleChangeList}>{item}</ul>
                            <hr/>
                            </>
                        )
                    })}
                </div>
                <div className="db_item_map">
                    <MapComponent coords={coords}/>
                </div>
            </div>
        </div>
    );
}
