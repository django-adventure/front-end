import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

function Time() {
  const initialDate = () => new Date();
  const [time, setTime] = useState(initialDate);

  useEffect(() => {
    const intervalID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalID);
  });

  const formattedTime = `${format(time, 'LL-dd-2041 HH:mm:ss')}`;
  return <StyledTime>{formattedTime}</StyledTime>;
}

export default Time;

const StyledTime = styled.div`
  position: absolute;
  top: 0;
  left: 35px;
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #18ff62;
`;
