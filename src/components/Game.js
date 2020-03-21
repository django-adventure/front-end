import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import Display from './Display';
import Map from './Map';
import ControlPanel from './ControlPanel';
import Header from './Header';

function Game() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isTextCleared, setIsTextCleared] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // show loading indicator if the page hasn't loaaded
    // after 400 ms (Heroku sleeping)
    setTimeout(() => {
      setShowLoader(true);
    }, 400);
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
        const {
          name,
          uuid,
          x,
          y,
          inventory,
          title,
          description,
          players,
          error_msg,
          rooms,
          room_items,
        } = res.data;
        setUser({ name, uuid, inventory, coords: { x, y } });
        setCurrentRoom({ title, description, players, room_items, error_msg });
        setLoading(false);
        setShowLoader(false);
        setRooms(rooms);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateRoom = () => {
    axiosWithAuth()
      .get('api/adv/room/')
      .then((res) => {
        const { players, room_items } = res.data;
        setCurrentRoom((prev) => ({ ...prev, players, room_items }));
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
      {
        output:
          'say <message> - Broadcasts a message to any players in current room',
      },
      { output: 'look - Checks the room for items' },
      { output: 'inventory - Checks your inventory' },
      { output: 'get <item> - Picks up specified item from current room' },
      { output: 'drop <item> - Drops specified item into current room' },
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

  const say = (message) => {
    axiosWithAuth()
      .post('api/adv/say/', { message })
      .catch((err) => console.log(err));
  };

  const move = (direction) => {
    axiosWithAuth()
      .post('api/adv/move/', { direction })
      .then((res) => {
        const { title, description, players, room_items, error_msg } = res.data;
        setCurrentRoom({ title, description, players, room_items, error_msg });

        // checks if  x and y coords have been updated
        const { x, y } = res.data;
        if (x !== undefined && y !== undefined) {
          setUser((prev) => ({ ...prev, coords: { x, y } }));
        }

        if (error_msg.length > 0) {
          setOutput((prev) => [...prev, { output: error_msg }]);
        } else {
          const dirs = { n: 'north', s: 'south', e: 'east', w: 'west' };
          const output = `You walked ${dirs[direction]}`;
          setOutput((prev) => [...prev, { output }]);
        }
      })
      .catch((err) => console.log(err));
  };

  const get = (item) => {
    axiosWithAuth()
      .post('api/adv/get/', { item })
      .then((res) => {
        if (res.data.error_msg.length) {
          setOutput((prev) => [...prev, { output: res.data.error_msg }]);
        } else {
          const { room_items, inventory, message, item } = res.data;
          setOutput((prev) => [
            ...prev,
            { output: `${message}: ${item.description}` },
          ]);
          setUser((prev) => ({ ...prev, inventory }));
          setCurrentRoom((prev) => ({ ...prev, room_items }));
        }
      })
      .catch((err) => console.log(err));
  };

  const drop = (item) => {
    axiosWithAuth()
      .post('api/adv/drop/', { item: item })
      .then((res) => {
        console.log(res.data);
        if (res.data.error_msg.length) {
          setOutput((prev) => [...prev, { output: res.data.error_msg }]);
        } else {
          const { room_items, inventory } = res.data;
          setUser((prev) => ({ ...prev, inventory }));
          setCurrentRoom((prev) => ({ ...prev, room_items }));
          setOutput((prev) => [...prev, { output: res.data.message }]);
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
          setUser((prev) => ({ ...prev, inventory: res.data.inventory }));
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
        setUser((prev) => ({ ...prev, inventory: res.data.inventory }));
      })
      .catch((err) => console.log(err));
  };

  const messageEventHandler = (data) => {
    if (data.update) {
      if (data.update === 'room') {
        updateRoom();
      } else if (data.update === 'inventory') {
        updateInventory();
      }
    }

    if (data.message) {
      setOutput((prev) => [
        ...prev,
        { output: data.message, time: Date.now() },
      ]);
    }
  };

  return loading ? (
    <GameWrapper>
      {showLoader ? (
        <LoadingWrapper>
          <h1>Loading...</h1>
        </LoadingWrapper>
      ) : null}
    </GameWrapper>
  ) : (
    <GameWrapper>
      <div className="wrapper">
        <div className="flex-left">
          <Header />
          <Map user={user} rooms={rooms} currentRoom={currentRoom} />
        </div>
        <div className="flex-right">
          <ControlPanel currentRoom={currentRoom} user={user} move={move} />
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

  .wrapper {
    display: flex;
    justify-content: space-between;
    padding-top: 10;
  }

  .flex-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .flex-right {
    padding-top: 35px;
    width: 100%;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'VT323', monospace;
  color: #18ff62;
  font-size: 22px;
`;
