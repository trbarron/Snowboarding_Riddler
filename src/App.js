import './App.css';
import React, { useState } from 'react';
import { Chart } from "react-charts";
import useDemoConfig from "./useDemoConfig";
import NumInput from './input';


function App() {

  const [numDatums, setNumDatums] = useState(2);
  const [numSeries, setNumSeries] = useState(4);

  let config = useDemoConfig({
      series: numSeries,
      datums: numDatums,
      dataType: "linear"
    })
  
  let data = config.data;
  // console.log(data[0].data.numDatums-1);

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        tickPadding: 1
        },
      {
        type: "linear",
        position: "left" ,
    },
    ],
    []
  );

  const colorScheme = [
    '#53cfc9',
    '#0f83ab',
  ]

  const getSeriesStyle = React.useCallback(
    (series) => ({
      transition: 'all .5s ease',
      color: series.index === 0 ? colorScheme[0] : colorScheme[1],
    }),
    []
  )


  const getDatumStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease',
    }),
    []
  )

  return (
    <div className="App">
      <header className="App-header">
        <div className="title"><h3>Snowboarding Races</h3></div>
        <Chart 
          data={data} 
          series={series} 
          axes={axes}
          getSeriesStyle={getSeriesStyle}
          getDatumStyle={getDatumStyle}
          tooltip
           />
        <div className="marginWrapper">
          <button className="numberEntry buttonEntry" onClick={() => config.randomizeData()}>
            Run Trial
          </button>
        </div>

        <div className="marginWrapper textEntryWrapper">
          <div className="textDescription">Num Racers:</div>
          <NumInput method = {config.updateSeries} startVal = "3"/>
        </div>
        <div className="marginWrapper textEntryWrapper">
        <div className="textDescription">Num Heats: </div>
          <NumInput method = {config.updateDatums} startVal = "2"/>
        </div>
      </header>
    </div>
  );
}

export default App;
