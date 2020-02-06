import React, { useState } from 'react';
import './App.scss';
import 'react-vis/dist/style.css';
import links from '../data/links.js';
import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from 'react-vis';

function Map({ currentX, currentY, rooms }) {
  const [hoverRoom, setHoverRoom] = useState('');
  const corners = [
    { x: 12, y: 12 },
    { x: -1, y: 12 },
    { x: 12, y: -1 },
    { x: -1, y: -1 },
  ];

  const player =
    currentX !== undefined && currentY !== undefined
      ? [{ x: currentX, y: currentY }]
      : null;

  const roomsArr = rooms
    ? rooms.map((room) => ({
        x: room.x,
        y: room.y,
      }))
    : null;

  return (
    <div className="grid-overlay-2">
      {!!hoverRoom && <div className="room-title">{hoverRoom}</div>}
      <div className="scanlines" id="map">
        <XYPlot height={600} width={600} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />
          <MarkSeries
            className="rooms"
            strokeWidth={32}
            opacity="0.1"
            data={roomsArr}
            color="lightGreen"
          />
          <MarkSeries
            className="player-dot"
            strokeWidth={31}
            opacity="1"
            data={player}
            color="orange"
          />
          <LineMarkSeries
            className="path"
            lineStyle={{ stroke: 'lightGreen', strokeWidth: '3px' }}
            markStyle={{ stroke: 'lightGreen', strokeWidth: '12px' }}
            onSeriesMouseOut={() => setHoverRoom('')}
            onValueMouseOver={(datapoint) => {
              const hover = rooms.find((room) => {
                return room.x === datapoint.x && room.y === datapoint.y;
              });
              setHoverRoom(hover.title);
            }}
            data={links}
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
