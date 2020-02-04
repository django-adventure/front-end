import React, { Component } from 'react';
import './App.css';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

function Map({ xAxis = 5, yAxis = 5 }) {
  const corners = [
    { x: 10, y: 10 },
    { x: 0, y: 10 },
    { x: 10, y: 0 },
    { x: 0, y: 0 },
  ];
  const player = [{ x: `${xAxis}`, y: `${yAxis}` }];

  return (
    <div className="grid-overlay-2">
      <div className="grid-overlay">
        <XYPlot height={700} width={700} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 5, opacity: '0.1' }} />
          <HorizontalGridLines style={{ strokeWidth: 5, opacity: '0.1' }} />
          <MarkSeries
            className="player-dot"
            strokeWidth={15}
            opacity="0.8"
            data={player}
            color="green"
          />
          <MarkSeries
            className="mark-series-example"
            strokeWidth={0.9}
            opacity="0.0"
            data={corners}
          />
        </XYPlot>
      </div>
    </div>
  );
}

export default Map;
