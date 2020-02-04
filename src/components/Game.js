import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import useKeyPress from '../hooks/useKeyPress';
import RoomInfo from './RoomInfo';
import Map from './Map';

function Game() {
  const [user, setUser] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const nPress = useKeyPress('n');
  const sPress = useKeyPress('s');
  const ePress = useKeyPress('e');
  const wPress = useKeyPress('w');

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
        console.log(res.data);

        const { name, title, description, players, error_msg } = res.data;
        setUser(name);
        setCurrentRoom({ title, description, players, error_msg });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  let xAxis = 0;
  let yAxis = 0;

  const moveMap = (direction) => {
    direction === 'n' ? (yAxis += 1) : (yAxis = yAxis);
    direction === 's' ? (yAxis -= 1) : (yAxis = yAxis);
    direction === 'e' ? (xAxis += 1) : (xAxis = xAxis);
    direction === 'w' ? (xAxis -= 1) : (xAxis = xAxis);
  };

  const move = (direction) => {
    moveMap(direction);
    console.log(direction);
    axiosWithAuth()
      .post('api/adv/move/', { direction })
      .then((res) => {
        const { title, description, players, error_msg } = res.data;
        setCurrentRoom({ title, description, players, error_msg });
      })
      .catch((err) => console.log(err));
  };

  nPress && move('n');
  sPress && move('s');
  ePress && move('e');
  wPress && move('w');

  return loading ? null : (
    <Fragment>
      <RoomInfo currentRoom={currentRoom} user={user} />
      {/* <Map xAxis={xAxis} yAxis={yAxis} /> */}
    </Fragment>
  );
}

export default Game;
