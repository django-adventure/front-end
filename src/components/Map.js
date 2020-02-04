import React, { Component } from 'react';
import './App.css';
import 'react-vis/dist/style.css';
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
    { x: 10, y: 10 },
    { x: 0, y: 10 },
    { x: 10, y: 0 },
  ];
  const player = [{ x: `${xAxis}`, y: `${yAxis}` }];

  return (
    <div className="grid-overlay">
      <XYPlot height={700} width={700} /*stroke="green"*/>
        <VerticalGridLines style={{ strokeWidth: 5, opacity: '0.2' }} />
        <HorizontalGridLines style={{ strokeWidth: 5, opacity: '0.2' }} />
        {/* <XAxis />
        <YAxis /> */}
        {/* <LineSeries data={corners} /> */}
        <MarkSeries
          className="player-dot"
          strokeWidth={20}
          opacity="0.8"
          // sizeRange={[5, 15]}
          data={player}
          color="green"
        />
        <MarkSeries
          className="mark-series-example"
          strokeWidth={0.9}
          opacity="0.1"
          // sizeRange={[5, 15]}
          data={corners}
        />
      </XYPlot>
    </div>
  );
}

export default Map;
