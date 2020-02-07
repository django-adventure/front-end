import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Display from './Display';
import Map from './Map';
import LeftPanel from './InfoPanel';
import Header from './Header';

function Game() {
  const [user, setUser] = useState('');
  const [uuid, setUuid] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState([]);
  const [coords, setCoords] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
        // console.log(res);
        const {
          name,
          title,
          description,
          players,
          error_msg,
          uuid,
          rooms,
          x,
          y,
        } = res.data;
        setUuid(uuid);
        setUser(name);
        setCurrentRoom({ title, description, players, error_msg });
        setLoading(false);
        setCoords({ x: x, y: y });
        setRooms(rooms);
      })
      .catch((err) => console.log(err));
  }, []);

  const updatePlayers = () => {
    axiosWithAuth()
      .get('api/adv/players/')
      .then((res) => {
        const { players } = res.data;
        setCurrentRoom((prev) => ({ ...currentRoom, players }));
      })
      .catch((err) => console.log(err));
  };

  const parseText = (text) => {
    setOutput((prev) => [...prev, { output: `>>> ${text}` }]);
    let args = text.toLowerCase().split(' ');
    let cmd = args[0];

    const moveUsage = 'Usage: move < n | s | e | w >';
    const help = [
      { output: 'help -  This output' },
      { output: `move - Attempts to move in the direction supplied.` },
      { output: `say - Broadcasts a message to any players in current room.` },
      { output: 'look - Checks the room for items.' },
      { output: 'inventory - Checks your inventory.' },
      { output: 'get - Picks up specified item from current room.' },
      { output: 'drop - Drops specified item into current room.' },
      { output: 'clear - Clears your screen' },
    ];

    if (cmd === 'move') {
      if (args.length === 2) {
        const direction = args[1];
        const valid = ['n', 's', 'e', 'w', 'north', 'south', 'east', 'west'];
        if (valid.includes(direction)) {
          move(direction[0]);
        } else {
          setOutput((prev) => [...prev, { output: moveUsage }]);
        }
      } else {
        setOutput((prev) => [...prev, { output: moveUsage }]);
      }
    } else if (cmd === 'clear') {
      setOutput([]);
    } else if (cmd === 'say') {
      const text = args.slice(1).join(' ');
      say(text);
    } else if (cmd === 'help') {
      setOutput((prev) => [...prev, ...help]);
    } else {
      setOutput((prev) => [...prev, { output: `No such command '${cmd}'` }]);
    }
  };

  const say = (text) => {
    axiosWithAuth()
      .post('api/adv/say/', { message: text })
      .catch((err) => console.log(err));
  };

  const move = (direction) => {
    axiosWithAuth()
      .post('api/adv/move/', { direction })
      .then((res) => {
        const { title, description, players, error_msg } = res.data;
        setCurrentRoom({ title, description, players, error_msg });

        // checks if  x and y coords have been updated
        if (res.data.x !== undefined && res.data.y !== undefined) {
          setCoords({ x: res.data.x, y: res.data.y });
        }
        // add the error message to the display output
        error_msg.length &&
          setOutput((prev) => [...prev, { output: error_msg }]);

        // add the sucess message to the display output
        const dirs = { n: 'north', s: 'south', e: 'east', w: 'west' };
        const successMsg = `You walked ${dirs[direction]}`;
        !error_msg.length &&
          setOutput((prev) => [...prev, { output: successMsg }]);
      })
      .catch((err) => console.log(err));
  };

  const messageEventHandler = (data) => {
    // if message is a result of a player leaving or engering a room...
    if (
      data.message.includes('has walked') ||
      data.message.includes('has entered')
    ) {
      // rerun the request to get the current players in the room
      updatePlayers();
    }
    setOutput((prev) => [...prev, { output: data.message, time: Date.now() }]);
  };

  return loading ? null : (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Header />
          <Map
            currentX={coords.x}
            currentY={coords.y}
            rooms={rooms}
            currentRoom={currentRoom}
          />
        </div>
        <div
          style={{
            paddingTop: 35,
            width: '100%',
            marginLeft: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LeftPanel currentRoom={currentRoom} user={user} move={move} />
          <Display
            parseText={parseText}
            output={output}
            uuid={uuid}
            messageEventHandler={messageEventHandler}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Game;
