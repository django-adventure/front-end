import React from 'react';
import './App.scss';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from 'react-vis';

function Map({ x, y, rooms }) {
  // console.log(rooms);
  const corners = [
    { x: 12, y: 12 },
    { x: -1, y: 12 },
    { x: 12, y: -1 },
    { x: -1, y: -1 },
  ];
  const player = [{ x: `${x}`, y: `${y}` }];
  const links = [
    { x: 6, y: 6 },
    { x: 6, y: 9 },
    { x: 4, y: 9 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
    { x: 3, y: 11 },
    { x: 3, y: 10 },
    { x: 2, y: 10 },
    { x: 4, y: 10 },
    { x: 4, y: 9 },
    { x: 6, y: 9 },
    { x: 6, y: 11 },
    { x: 4, y: 11 },
    { x: 6, y: 11 },
    { x: 6, y: 10 },
    { x: 7, y: 10 },
    { x: 7, y: 11 },
    { x: 7, y: 10 },
    { x: 8, y: 10 },
    { x: 6, y: 10 },
    { x: 6, y: 9 },
    { x: 7, y: 9 },
    { x: 6, y: 9 },
    { x: 6, y: 7 },
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 7, y: 7 },
    { x: 8, y: 7 },
    { x: 8, y: 8 },
    { x: 8, y: 9 },
    { x: 10, y: 9 },
    { x: 8, y: 9 },
    { x: 8, y: 8 },
    { x: 11, y: 8 },
    { x: 8, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 7 },
    { x: 6, y: 7 },
    { x: 6, y: 7 },
    { x: 6, y: 6 },
    { x: 9, y: 6 },
    { x: 9, y: 7 },
    { x: 9, y: 6 },
    { x: 11, y: 6 },
    { x: 9, y: 6 },
    { x: 9, y: 5 },
    { x: 11, y: 5 },
    { x: 9, y: 5 },
    { x: 9, y: 4 },
    { x: 11, y: 4 },
    { x: 10, y: 4 },
    { x: 10, y: 3 },
    { x: 10, y: 4 },
    { x: 8, y: 4 },
    { x: 9, y: 4 },
    { x: 9, y: 6 },
    { x: 8, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 6 },
    { x: 7, y: 6 },
    { x: 7, y: 3 },
    { x: 9, y: 3 },
    { x: 7, y: 3 },
    { x: 7, y: 2 },
    { x: 9, y: 2 },
    { x: 7, y: 2 },
    { x: 7, y: 1 },
    { x: 8, y: 1 },
    { x: 7, y: 1 },
    { x: 7, y: 0 },
    { x: 9, y: 0 },
    { x: 7, y: 0 },
    { x: 7, y: 6 },
    { x: 6, y: 6 },
    { x: 6, y: 3 },
    { x: 5, y: 3 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 6, y: 0 },
    { x: 6, y: 2 },
    { x: 5, y: 2 },
    { x: 5, y: 0 },
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 4, y: 0 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
    { x: 4, y: 3 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 4, y: 4 },
    { x: 6, y: 4 },
    { x: 6, y: 6 },
    { x: 5, y: 6 },
    { x: 5, y: 6 },
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 1, y: 6 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 0, y: 6 },
    { x: 2, y: 6 },
    { x: 2, y: 7 },
    { x: 0, y: 7 },
    { x: 1, y: 7 },
    { x: 1, y: 8 },
    { x: 0, y: 8 },
    { x: 1, y: 8 },
    { x: 1, y: 7 },
    { x: 2, y: 7 },
    { x: 2, y: 6 },
    { x: 2, y: 6 },
    { x: 5, y: 6 },
    { x: 5, y: 8 },
    { x: 5, y: 7 },
    { x: 3, y: 7 },
    { x: 4, y: 7 },
    { x: 4, y: 8 },
    { x: 2, y: 8 },
    { x: 4, y: 8 },
    { x: 4, y: 7 },
    { x: 5, y: 7 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 6, y: 10 },
    { x: 5, y: 10 },
  ]; // <-- very long

  const roomsArr = rooms
    ? rooms.map((room) => ({
        x: room.x,
        y: room.y,
      }))
    : null;

  return (
    <div className="grid-overlay-2">
      <div className="scanlines" id="map">
        <XYPlot height={700} width={700} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 5, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 5, opacity: 0.1 }} />
          <MarkSeries
            className="path"
            strokeWidth={40}
            opacity="0.1"
            data={roomsArr}
            color="green"
          />
          <LineMarkSeries
            className="linemark-series-example"
            style={{
              strokeWidth: '4px',
            }}
            opacity="0.8"
            lineStyle={{ stroke: 'green' }}
            markStyle={{ stroke: 'green' }}
            data={links}
          />
          <MarkSeries
            className="player-dot"
            strokeWidth={20}
            opacity="1"
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
