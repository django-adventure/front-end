import React, { Component } from 'react';
import './App.scss';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

function Map({ x, y }) {
  const corners = [
    { x: 12, y: 12 },
    { x: 0, y: 12 },
    { x: 12, y: 0 },
    { x: 0, y: 0 },
  ];
  const player = [{ x: `${x}`, y: `${y}` }];

  return (
    <div className="grid-overlay-2">
      <div className="scanlines" id="map">
        <XYPlot height={700} width={700} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 5, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 5, opacity: 0.1 }} />
          <MarkSeries
            className="player-dot"
            strokeWidth={15}
            opacity="0.8"
            data={player}
            color="green"
          />
          <MarkSeries
            className="corners"
            strokeWidth={0.7}
            opacity="0.0"
            data={corners}
          />
        </XYPlot>
      </div>
    </div>
  );
}

export default Map;
