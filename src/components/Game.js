import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import useKeyPress from '../hooks/useKeyPress';
import RoomInfo from './RoomInfo';

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

  const move = (direction) => {
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
    </Fragment>
  );
}

export default Game;
