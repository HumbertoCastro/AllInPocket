import { useEffect } from 'react';
import currentTime from '../../helpers/ClockFunction';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function Clock() {

  const d = new Date();
  console.log(d.getDay());
  let day = weekday[d.getDay()];

  useEffect(() => {
    currentTime();
  }, []);

  return (
    <div className="row">
      <p id="clock" className="n-margin i-b">0</p>
      <p className="i-b n-margin">{ day }</p>
    </div>
  );
}

export default Clock;
