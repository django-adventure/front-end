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
import links from '../data/links.js';

function Map({ currentX, currentY, rooms }) {
  // console.log(rooms);
  const corners = [
    { x: 12, y: 12 },
    { x: -1, y: 12 },
    { x: 12, y: -1 },
    { x: -1, y: -1 },
  ];
  const player = [{ x: `${currentX}`, y: `${currentY}` }];
  const roomsArr = rooms
    ? rooms.map((room) => ({
        x: room.x,
        y: room.y,
      }))
    : null;

  return (
    <div className="grid-overlay-2">
      <div className="scanlines" id="map">
        <XYPlot height={600} width={600} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 5, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 5, opacity: 0.1 }} />
          <MarkSeries
            className="rooms"
            strokeWidth={32}
            opacity="0.1"
            data={roomsArr}
            color="lightGreen"
          />
          <LineMarkSeries
            className="path"
            style={{
              strokeWidth: '3px',
            }}
            opacity="0.8"
            lineStyle={{ stroke: 'lightGreen' }}
            markStyle={{ stroke: 'lightGreen' }}
            data={links}
          />
          <MarkSeries
            className="player-dot"
            strokeWidth={14}
            opacity="1"
            data={player}
            color="lightGreen"
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
