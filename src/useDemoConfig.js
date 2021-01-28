import React from "react";
//

const options = {
  elementType: ["line", "area", "bar", "bubble"],
  primaryAxisType: ["linear", "time", "log", "ordinal"],
  secondaryAxisType: ["linear", "time", "log", "ordinal"],
  primaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  grouping: ["single", "series", "primary", "secondary"],
  tooltipAnchor: [
    "closest",
    "top",
    "bottom",
    "left",
    "right",
    "center",
    "gridTop",
    "gridBottom",
    "gridLeft",
    "gridRight",
    "gridCenter",
    "pointer"
  ],
  tooltipAlign: [
    "auto",
    "top",
    "bottom",
    "left",
    "right",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "center"
  ],
  snapCursor: [true, false]
};

const optionKeys = Object.keys(options);

export default function useChartConfig({
  series,
  useR,
  show = [],
  count = 1,
  resizable = true,
  canRandomize = true,
  dataType = "time",
  elementType = "line",
  primaryAxisType = "time",
  secondaryAxisType = "linear",
  primaryAxisPosition = "bottom",
  secondaryAxisPosition = "left",
  primaryAxisStack = false,
  secondaryAxisStack = true,
  primaryAxisShow = true,
  secondaryAxisShow = true,
  tooltipAnchor = "closest",
  tooltipAlign = "auto",
  grouping = "primary",
  snapCursor = true,
  datums = 10,
}) {
  const [state, setState] = React.useState({
    series,
    count,
    resizable,
    canRandomize,
    dataType,
    elementType,
    primaryAxisType,
    secondaryAxisType,
    primaryAxisPosition,
    secondaryAxisPosition,
    primaryAxisStack,
    secondaryAxisStack,
    primaryAxisShow,
    secondaryAxisShow,
    tooltipAnchor,
    tooltipAlign,
    grouping,
    snapCursor,
    datums,
    data: makeDataFrom(dataType, series, useR, datums)
  });

  React.useEffect(() => {
    setState(old => ({
      ...old,
      data: makeDataFrom(dataType, series, useR, datums)
    }));
  }, [count, dataType, datums, series, useR]);

  const randomizeData = () =>
    setState(old => ({
      ...old,
      data: makeDataFrom(dataType, old.series, useR, old.datums)
    }));

    const updateDatums = (inputDatums) =>
    setState(old => ({
        ...old,
        datums: inputDatums,
        data: makeDataFrom(dataType, old.series, useR, inputDatums)
    }));

    const updateSeries = (inputSeries) =>
    setState(old => ({
        ...old,
        series: inputSeries,
        data: makeDataFrom(dataType, inputSeries, useR, old.datums)
    }));

  const Options = optionKeys
    .filter(option => show.indexOf(option) > -1)
    .map(option => (
      <div key={option}>
        {option}: &nbsp;
        <select
          value={state[option]}
          onChange={({ target: { value } }) =>
            setState(old => ({
              ...old,
              [option]:
                typeof options[option][0] === "boolean"
                  ? value === "true"
                  : value
            }))
          }
        >
          {options[option].map(d => (
            <option value={d} key={d.toString()}>
              {d.toString()}
            </option>
          ))}
        </select>
        <br />
      </div>
    ));

  return {
    ...state,
    randomizeData,
    updateDatums,
    updateSeries,
    Options
  };
}

function makeDataFrom(dataType, series, useR, datums) {
    let firstLegs = [...new Array(series)].map((_, i) => {
        return randn_bm()
        }).sort();
    return [...new Array(series)].map((d, i) => makeSeries(i, dataType, useR, datums + 1, firstLegs[i]));
}

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ) + 3;
}

function makeSeries(i, dataType, useR, datums, firstLeg) {
  const length = datums;

  var prev = 0
  return {
    label: `Series ${i + 1}`,
    data: [...new Array(length)].map((_, w) => {
        const x = 0.001 + w;
        let y = 0
        if (w === 0) {
            y = 0.001
        }
        else if (w === 1) {
            y = firstLeg;
        }
        else {
            y = randn_bm() + prev
        }
        const r = 1;
        prev = y;
        return {
            primary: x,
            secondary: y,
            radius: r
        };
    })
  };
}