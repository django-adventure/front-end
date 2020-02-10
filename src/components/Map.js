import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import Clock from './Clock';
import links from '../data/links.js';

import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from 'react-vis';

function Map({ user, rooms, currentRoom }) {
  const player = user ? [{ x: user.coords.x, y: user.coords.y }] : null;
  const [hoverRoom, setHoverRoom] = useState('');
  const corners = [
    { x: 12, y: 12 },
    { x: -1, y: 12 },
    { x: 12, y: -1 },
    { x: -1, y: -1 },
  ];

  // const roomsArr = rooms
  //   ? rooms.map((room) => ({
  //       x: room.x,
  //       y: room.y,
  //     }))
  //   : null;

  const generateKey = (pre) => `${pre}_${new Date().getTime()}`;

  return (
    <div className="grid-overlay">
      {!!hoverRoom && <div className="room room--hover">{hoverRoom}</div>}
      <div className="room room--current">{currentRoom.title}</div>
      <ul className="room-items">
        {currentRoom.room_items.map((item) => (
          <li key={generateKey(item.name)}>{`${item.name} x ${item.count}`}</li>
        ))}
      </ul>
      <Clock />
      <div className="scanlines" id="map">
        <XYPlot height={600} width={600} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />

          {/* uncomment next 3 lines to help with drawing new map nodes */}
          {/* console.log(currentX, currentY) */}
          {/* <XAxis />
          <YAxis /> */}

          {/* <MarkSeries
            className="rooms"
            strokeWidth={22}
            opacity="0.1"
            data={roomsArr}
            color="lightGreen"
          /> */}

          <LineMarkSeries
            className="path"
            opacity="0.9"
            lineStyle={{ stroke: 'lightGreen', strokeWidth: '3px' }}
            markStyle={{ stroke: 'lightGreen', strokeWidth: '5px' }}
            onSeriesMouseOut={() => setHoverRoom('')}
            data={links}
            onValueMouseOver={(datapoint) => {
              const hover = rooms.find((room) => {
                return room.x === datapoint.x && room.y === datapoint.y;
              });
              setHoverRoom(hover.title);
            }}
          />

          <MarkSeries
            className="player-dot"
            strokeWidth={18}
            opacity="1"
            data={player}
            color="orange"
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
