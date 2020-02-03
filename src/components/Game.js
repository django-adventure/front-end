import React, { useState, useEffect, Fragment } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function RoomInfo({ user, currentRoom }) {
  return (
    <div>
      Username: {user} <br />
      Room: {currentRoom.title} <br />
      Description: {currentRoom.description} <br />
      Players: {currentRoom.players.join(', ')}
    </div>
  );
}

function Game() {
  const [user, setUser] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
        console.log(res.data);

        const { name, title, description, players } = res.data;
        setUser(name);
        setCurrentRoom({ title, description, players });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return loading ? null : (
    <Fragment>
      <RoomInfo currentRoom={currentRoom} user={user} />
    </Fragment>
  );
}

export default Game;
