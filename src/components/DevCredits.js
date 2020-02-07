import React, { useEffect } from 'react';

function DevCredits({ setShowCredits }) {
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
    // eslint-disable-next-line
  }, []);

  function downHandler({ key }) {
    // setKeyPressed(true)
    setShowCredits(false);
  }

  return (
    <div>
      <div style={{ marginBottom: 15 }}>Digital Wasteland Development Team</div>

      <span>Cameron Alvarado - </span>
      <a
        href="https://github.com/CameronAlvarado"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/CameronAlvarado
      </a>
      <br />
      <span>Allison Donnelly - </span>
      <a
        href="https://github.com/allisonkydy"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/allisonkydy
      </a>
      <br />
      <span>Samir Lilienfeld - </span>
      <a
        href="https://github.com/samir-hub"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/samir-hub
      </a>
      <br />
      <span>Jonathan Taylor - </span>
      <a
        href="https://github.com/jonyonson"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/jonyonson
      </a>
      <br />
      <a
        href="https://github.com/django-adventure"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: '15px', display: 'block' }}
      >
        View the source code
      </a>
      <div style={{ marginTop: '15px' }}>Press any key to exit credits</div>
    </div>
  );
}

export default DevCredits;
