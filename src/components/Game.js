import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import useKeyPress from '../hooks/useKeyPress';
import RoomInfo from './RoomInfo';
import Display from './Display';

function Game() {
  const [user, setUser] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputFocused, setInputFocused] = useState();

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

  // if key is pressed and text input is not in focus (user not typing)
  nPress && !inputFocused && move('n');
  sPress && !inputFocused && move('s');
  ePress && !inputFocused && move('e');
  wPress && !inputFocused && move('w');

  return loading ? null : (
    <Fragment>
      <RoomInfo currentRoom={currentRoom} user={user} />
      <Display setFocus={setInputFocused} />
    </Fragment>
  );
}

export default Game;
