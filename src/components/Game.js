import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import Display from './Display';
import Map from './Map';
import LeftPanel from './InfoPanel';
import Header from './Header';

function Game() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isTextCleared, setIsTextCleared] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
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
          inventory,
          room_items,
        } = res.data;

        setUser({ name, uuid, coords: { x, y }, inventory });
        setCurrentRoom({ title, description, players, room_items, error_msg });
        setLoading(false);
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
    let args = text.split(' ');
    let cmd = args[0].toLowerCase();

    const moveUsage = 'Usage: move < n | s | e | w >';
    const stealUsage = 'Usage: steal <item> from <player>';
    const scanUsage = 'Usage: scan <player>';
    const help = [
      { output: 'help -  This output' },
      { output: 'move - Attempts to move in the direction supplied' },
      { output: 'say - Broadcasts a message to any players in current room' },
      { output: 'look - Checks the room for items' },
      { output: 'inventory - Checks your inventory' },
      { output: 'get - Picks up specified item from current room' },
      { output: 'drop - Drops specified item into current room' },
      { output: 'scan <player> - Reveals inventory of the target player' },
      { output: 'steal <item> from <player> - Steals item from target player' },
      { output: 'clear - Clears your screen' },
      { output: 'credits - Lists the developers of Digital Wasteland' },
    ];

    if (cmd === 'move') {
      if (args.length === 2) {
        const direction = args[1].toLowerCase();
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
      setIsTextCleared(true);
      setOutput([]);
    } else if (cmd === 'say') {
      const text = args.slice(1).join(' ');
      say(text);
    } else if (cmd === 'get') {
      const item = args
        .slice(1)
        .join(' ')
        .toLowerCase();
      get(item);
    } else if (cmd === 'drop') {
      const item = args
        .slice(1)
        .join(' ')
        .toLowerCase();
      drop(item);
    } else if (cmd === 'look') {
      look();
    } else if (cmd === 'inventory') {
      inventory();
    } else if (cmd === 'help') {
      setOutput((prev) => [...prev, ...help]);
    } else if (cmd === 'credits') {
      // List the credits
      setIsTextCleared(true);
      setOutput([]);
      setShowCredits(true);
    } else if (cmd === 'scan') {
      if (args.length === 2) {
        const targetPlayer = args[1];
        if (targetPlayer !== user.name) {
          scan(targetPlayer);
        } else {
          setOutput((prev) => [...prev, { output: "You can't scan yourself" }]);
        }
      } else {
        setOutput((prev) => [...prev, { output: scanUsage }]);
      }
    } else if (cmd === 'steal') {
      if (args.length === 4 && args[2].toLowerCase() === 'from') {
        const item = args[1].toLowerCase();
        const targetPlayer = args[3];
        if (targetPlayer !== user.name) {
          steal(item, targetPlayer);
        } else {
          setOutput((prev) => [
            ...prev,
            { output: "You can't steal from yourself" },
          ]);
        }
      } else {
        setOutput((prev) => [...prev, { output: stealUsage }]);
      }
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
        console.log('MOVE', res.data);
        const { title, description, players, room_items, error_msg } = res.data;
        setCurrentRoom({ title, description, players, room_items, error_msg });

        // checks if  x and y coords have been updated
        if (res.data.x !== undefined && res.data.y !== undefined) {
          setUser({ ...user, coords: { x: res.data.x, y: res.data.y } });
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

  const get = (item) => {
    axiosWithAuth()
      .post('api/adv/get/', { item: item })
      .then((res) => {
        if (res.data.error_msg.length) {
          setOutput((prev) => [...prev, { output: res.data.error_msg }]);
        } else {
          setOutput((prev) => [
            ...prev,
            { output: `${res.data.message}: ${res.data.item.description}` },
          ]);
          const { room_items, inventory } = res.data;
          setUser({ ...user, inventory });
          setCurrentRoom((prev) => ({ ...currentRoom, room_items }));
        }
      })
      .catch((err) => console.log(err));
  };

  const drop = (item) => {
    axiosWithAuth()
      .post('api/adv/drop/', { item: item })
      .then((res) => {
        if (res.data.error_msg.length) {
          setOutput((prev) => [...prev, { output: res.data.error_msg }]);
        } else {
          setOutput((prev) => [...prev, { output: res.data.message }]);
          const { room_items, inventory } = res.data;
          setUser({ ...user, inventory });
          setCurrentRoom((prev) => ({ ...currentRoom, room_items }));
        }
      })
      .catch((err) => console.log(err));
  };

  const look = () => {
    axiosWithAuth()
      .get('api/adv/look/')
      .then((res) => {
        if (res.data.room_items.length !== 0) {
          let str = 'Items in this zone: ';
          let arr = res.data.room_items.map((item) => {
            return `${item.name} x${item.count}`;
          });
          let joined_arr = arr.join(', ');
          setOutput((prev) => [...prev, { output: str + joined_arr }]);
        } else {
          setOutput((prev) => [...prev, { output: 'No items in this room.' }]);
        }
      })
      .catch((err) => console.log(err));
  };

  const inventory = () => {
    if (user && user.inventory.length !== 0) {
      let itemList = user.inventory
        .map((item) => {
          return `${item.name} x ${item.count}`;
        })
        .join(', ');
      setOutput((prev) => [
        ...prev,
        { output: 'Items in your inventory: ' + itemList },
      ]);
    } else {
      setOutput((prev) => [...prev, { output: 'No items in your inventory.' }]);
    }
  };

  const scan = (player) => {
    axiosWithAuth()
      .post('api/adv/scan/', { player: player })
      .then((res) => {
        if (res.data.error_msg.length) {
          setOutput((prev) => [...prev, { output: res.data.error_msg }]);
        } else if (res.data.items.length === 0) {
          setOutput((prev) => [
            ...prev,
            { output: `${player} is not carrying anything.` },
          ]);
        } else {
          let itemList = res.data.items
            .map((item) => {
              return `${item.name} x ${item.count}`;
            })
            .join(', ');
          setOutput((prev) => [
            ...prev,
            { output: `${player} is carrying: ${itemList}` },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  const steal = (item, player) => {
    axiosWithAuth()
      .post('api/adv/steal', { item, player })
      .then((res) => {
        if (res.data.error_msg.length) {
          setOutput((prev) => [...prev, { output: res.data.error_msg }]);
        } else {
          setUser({ ...user, inventory: res.data.inventory });
          setOutput((prev) => [
            ...prev,
            { output: `You stole ${player}'s ${item}!` },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateInventory = () => {
    axiosWithAuth()
      .get('api/adv/inventory')
      .then((res) => {
        setUser({ ...user, inventory: res.data.inventory });
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
    } else if (data.message.includes('stole your')) {
      // someone stole from the user, refetch their inventory
      updateInventory();
    }
    setOutput((prev) => [...prev, { output: data.message, time: Date.now() }]);
  };

  return loading ? null : (
    <GameWrapper>
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
          <Map user={user} rooms={rooms} currentRoom={currentRoom} />
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
            isTextCleared={isTextCleared}
            parseText={parseText}
            output={output}
            user={user}
            messageEventHandler={messageEventHandler}
            showCredits={showCredits}
            setShowCredits={setShowCredits}
          />
        </div>
      </div>
    </GameWrapper>
  );
}

export default Game;

const GameWrapper = styled.div`
  width: 1300px;
  margin: 0 auto;
  min-width: 1300px;
  width: 100%;
  max-width: 1500px;
`;
