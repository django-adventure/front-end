import React, { Component, useEffect, useKey } from 'react';
import './App.css';
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  LineSeries,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';

function Map({ xAxis, yAxis }) {
  const corners = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
    { x: 10, y: 0 },
  ];
  const player = [{ x: `${xAxis}`, y: `${yAxis}` }];

  return (
    <div className="App">
      <XYPlot height={700} width={700}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {/* <LineSeries data={data} /> */}
        <MarkSeries
          className="player-dot"
          strokeWidth={20}
          opacity="1.0"
          sizeRange={[5, 15]}
          data={player}
        />
        <MarkSeries
          className="mark-series-example"
          strokeWidth={1}
          opacity="0.2"
          sizeRange={[5, 15]}
          data={corners}
        />
      </XYPlot>
    </div>
  );
}

export default Map;
