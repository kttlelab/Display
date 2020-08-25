import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { Table, Pagination } from "react-bootstrap";

import "./App.css";
import logo from "./assets/cloud.svg";
import Firebase from "./services/firebase";

const route = {
  name: "Downtown - Nyamirambo",
  code: 401,
  estimation: {
    time: 23,
    unit: "Mins",
  },
};

const App = () => {
  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  const [routes, setRoutes] = useState([]);
  setInterval(() => setTime(moment().format("HH:mm:ss")), 1000);

  const PaginateData = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }

    return (
        <Pagination className='paginator'>{items}</Pagination>
    );
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await Firebase.getCollection("routes");
      console.log("the routes are here:", data);
      setRoutes(data);
    };
    fetchRoutes();
  }, []);

  return (
    <div className="app">
      <div className="header" style={{margin: '20px 0'}}>
        {/* <div className="custom flexWrap"> */}
        <h1>ARRIVALS</h1>
          <div className="custom flexWrap" style={{ marginRight: "1rem" }}>
            <img src={logo} className="logo" alt="logo" />
            <h1>28&deg;C</h1>
          </div>
          <h1 style={{ color: "red", fontSize: '3em' }}>{time}</h1>
        {/* </div> */}
      </div>
      <div className="custom">
        {Array.from({ length: 2 }, (t, i) => (
          <>
            <Table borderless striped>
              <thead>
                <tr>
                  {["BUS", "ROUTE", "NEXT BUS ARRIVES IN"].map(
                    (item, index) => (
                      <th
                        style={{
                          textAlign: item.toLowerCase().includes("next bus")
                            ? "right"
                            : "left",
                        }}
                        key={Number(index)}
                      >
                        {item}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              {routes.length ? (
                <tbody>
                  {routes
                    .filter((r) => r.name.includes("Nyabugogo")).slice(0,10)
                    .map((d, index) => (
                      <tr key={Number(index)}>
                        <td>{`${d.operator} - ${d.id}`}</td>
                        <td>{d.name}</td>
                        <td
                          style={{
                            textAlign: "right",
                          }}
                        >{`${route.estimation.time} ${route.estimation.unit}`}</td>
                      </tr>
                    ))}
                </tbody>
              ) : null}
            </Table>
            {i === 0 && <div className="vSep" />}
          </>
        ))}
      </div>
      <PaginateData/>
    </div>
  );
};

export default App;
