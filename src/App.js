import moment from "moment";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./App.css";
import logo from "./assets/cloud.svg";
import Firebase from "./services/firebase";
import { ABDistance, distanceToBusTime, downtown, formatDistance } from "./utils";
const columns = [
  {
    dataField: "bus",
    text: "BUS",
    sort: true,
  },
  {
    dataField: "route",
    text: "ROUTE",
    sort: true,
  },
  {
    dataField: "estimation",
    text: "NEXT BUS ARRIVES IN",
    sort: true,
  },
];

const App = () => {
  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  setInterval(() => setTime(moment().format("HH:mm:ss")), 1000);
  const [vehicles, setVehicles] = useState([]);
  const fetchVehicles = async () => {
    const data = await Firebase.getCollection("vehicles", { value: "" });
    const enhanced = data.map((d) => ({
      ...d,
      estimation: distanceToBusTime(
        formatDistance(ABDistance(downtown, { latitude: d.latitude, longitude: d.longitude }))
      ),
    }));
    setVehicles(enhanced);
  };
  useEffect(fetchVehicles, []);

  const fetchWeather = async () => {
    try {
      const {} = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=-2.0163553&lon=30.0025569&appid=cc29622412e809ae00999fc0c7cb326f&units=metric&exclude=minutely,hourly,daily"
      ).the;
    } catch (error) {}
  };

  useEffect(() => {});
  const half = vehicles.length / 2;

  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="flex horizontal"
        style={{ justifyContent: "space-between", marginBottom: "2vh" }}
      >
        <h1>ARRIVALS</h1>
        <div className="flex horizontal">
          <img className="icon" src={logo} alt="logo" />
          <h1>28&deg;C</h1>
        </div>
        <h1 style={{ color: "red" }}>{time}</h1>
      </div>
      <div className="flex horizontal" style={{ justifyContent: "space-between" }}>
        {[vehicles.slice(0, Math.ceil(half)), vehicles.slice(-Math.floor(half))].map(
          (data, index) => (
            <BootstrapTable
              key={Number(index)}
              striped
              hover
              rowStyle={{ textAlign: "center" }}
              keyField={"bus"}
              data={data}
              columns={columns}
            ></BootstrapTable>
          )
        )}
      </div>
    </div>
  );
};

export default App;
