import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import useKeyPress from '../hooks/useKeyPress';
import RoomInfo from './RoomInfo';
import Display from './Display';
import Map from './Map';

function Game() {
  const [user, setUser] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputFocused, setInputFocused] = useState();
  const [output, setOutput] = useState([]);
  const [coords, setCoords] = useState({
    x: undefined,
    y: undefined,
  });

  const nPress = useKeyPress('n');
  const sPress = useKeyPress('s');
  const ePress = useKeyPress('e');
  const wPress = useKeyPress('w');

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
        const { name, title, description, players, error_msg } = res.data;
        setUser(name);
        setCurrentRoom({ title, description, players, error_msg });
        setLoading(false);
        setCoords({ x: res.data.x, y: res.data.y });
      })
      .catch((err) => console.log(err));
  }, []);

  const parseText = (text) => {
    setOutput((prev) => [...prev, `>>> ${text}`]);
    let args = text.toLowerCase().split(' ');
    let action = args[0];

    if (action === 'move' && args.length === 2) {
      const direction = args[1];
      const validDirs = ['n', 's', 'e', 'w', 'north', 'south', 'east', 'west'];
      if (validDirs.includes(direction)) {
        move(direction[0]);
      } else {
        setOutput((prev) => [...prev, 'I do not understand that command']);
      }
    } else if (action === 'clear' && args.length === 1) {
      setOutput([]);
    } else {
      setOutput((prev) => [...prev, 'I do not understand that command']);
    }
  };

  const move = (direction) => {
    console.log(direction);
    axiosWithAuth()
      .post('api/adv/move/', { direction })
      .then((res) => {
        const { title, description, players, error_msg } = res.data;
        setCurrentRoom({ title, description, players, error_msg });
        if (res.data.x && res.data.y) {
          setCoords({ x: res.data.x, y: res.data.y });
        }
        // add the error message to the display output
        error_msg.length && setOutput((prev) => [...prev, error_msg]);

        // add the sucess message to the display output
        const dirs = { n: 'north', s: 'south', e: 'east', w: 'west' };
        const successMsg = `You walked ${dirs[direction]}`;
        !error_msg.length && setOutput((prev) => [...prev, successMsg]);
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
      <Display
        setFocus={setInputFocused}
        parseText={parseText}
        output={output}
      />
      <Map x={coords.x} y={coords.y} />
      <RoomInfo currentRoom={currentRoom} user={user} />
    </Fragment>
  );
}

export default Game;
