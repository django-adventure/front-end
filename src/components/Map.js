import React, { useState } from 'react';
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
  console.log(currentX, currentY);
  // const [hoverRoom, setHoverRoom] = useState();
  const corners = [
    { x: 12, y: 12 },
    { x: -1, y: 12 },
    { x: 12, y: -1 },
    { x: -1, y: -1 },
  ];
  const player =
    currentX && currentY !== undefined
      ? [{ x: `${currentX}`, y: `${currentY}` }]
      : null;
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
          <VerticalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />
          <MarkSeries
            className="rooms"
            strokeWidth={32}
            opacity="0.1"
            data={roomsArr}
            color="lightGreen"
          />
          <LineMarkSeries
            className="path"
            opacity="0.9"
            lineStyle={{ stroke: 'lightGreen', strokeWidth: '4px' }}
            markStyle={{ stroke: 'lightGreen', strokeWidth: '10px' }}
            onSeriesMouseOut={(event) => {
              // setHoverRoom([
              //   {
              //     label: null,
              //   },
              // ]);
            }} //...
            onValueMouseOver={(datapoint, event) => {
              // console.log(datapoint);
              // const hover = rooms.filter((room) => {
              //   return room.x === datapoint.x && room.y === datapoint.y;
              // });
              // if (hover !== null || undefined) {
              //   const title = hover.map((element) => {
              //     return element.title;
              //   });
              //   setHoverRoom([
              //     {
              //       x: datapoint.x,
              //       y: datapoint.y,
              //       label: title[0],
              //       // rotation: 15,
              //       style: {
              //         color: 'black',
              //         fontSize: 50,
              //         fontWeight: 'bold',
              //       },
              //     },
              //   ]);
              // }
              // console.log(hoverRoom);
            }} //...
            data={links}
          />
          <MarkSeries
            className="player-dot"
            strokeWidth={15}
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
