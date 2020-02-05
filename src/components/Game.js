import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import useKeyPress from '../hooks/useKeyPress';
import Display from './Display';
import Map from './Map';
import LeftPanel from './LeftPanel';

function Game() {
  const [user, setUser] = useState('');
  const [uuid, setUuid] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputFocused, setInputFocused] = useState(true);
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
        console.log(res);
        const { name, title, description, players, error_msg, uuid } = res.data;
        setUuid(uuid);
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
    let cmd = args[0];

    const moveUsage = 'Usage: move < n | s | e | w >';
    const help = [
      'help -  This output',
      `move - Attempts to move in the direction supplied. \
              Usage: move < n | s | e | w >`,
      `say - Broadcasts a message to any players in current room. \
             Usage: say hello, world!`,
      'clear - Clears your screen',
    ];

    if (cmd === 'move') {
      if (args.length === 2) {
        const direction = args[1];
        const valid = ['n', 's', 'e', 'w', 'north', 'south', 'east', 'west'];
        if (valid.includes(direction)) {
          move(direction[0]);
        } else {
          setOutput((prev) => [...prev, moveUsage]);
        }
      } else {
        setOutput((prev) => [...prev, moveUsage]);
      }
    } else if (cmd === 'clear') {
      setOutput([]);
    } else if (cmd === 'say') {
      const text = args.slice(1).join(' ');
      say(text);
    } else if (cmd === 'help') {
      setOutput((prev) => [...prev, ...help]);
    } else {
      setOutput((prev) => [...prev, `No such command '${cmd}'`]);
    }
  };

  const say = (text) => {
    axiosWithAuth()
      .post('api/adv/say/', { message: text })
      .catch((err) => console.log(err));
  };

  const move = (direction) => {
    console.log(direction);
    axiosWithAuth()
      .post('api/adv/move/', { direction })
      .then((res) => {
        const { title, description, players, error_msg } = res.data;
        setCurrentRoom({ title, description, players, error_msg });

        // checks if  x and y coords have been updated
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Display
          setFocus={setInputFocused}
          parseText={parseText}
          output={output}
          setOutput={setOutput}
          uuid={uuid}
        />
        <LeftPanel currentRoom={currentRoom} user={user} move={move} />
      </div>

      <Map x={coords.x} y={coords.y} />
    </Fragment>
  );
}

export default Game;
