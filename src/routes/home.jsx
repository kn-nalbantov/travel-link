import { useState } from 'react';

export default function Home() {
  const [visible, setVisible] = useState({ display: 'none' });
  function onClick() {
    setVisible({ display: 'block' });
    if (visible.display === 'block') {
      setVisible({ display: 'none' });
    }
  }
  return (
    <main>
      <div className='travelCard'>
        <h2>Rila Monastery</h2>
        <p>
          Region: <a href='/'>South-West</a>
        </p>
        <img
          src='https://s2.qwant.com/thumbr/0x380/6/a/bb79fb8cedfdac31b959301192b56541c59021727faf4bad3c36647ad9a63d/Rila-Monastery-1-0.jpg?u=https%3A%2F%2Fwww.oddcities.com%2Fwp-content%2Fuploads%2F2014%2F03%2FRila-Monastery-1-0.jpg&q=0&b=1&p=0&a=0'
          alt='Rila Monastery'
        />
        <button className='detailsBtn' onClick={onClick}>
          Details
        </button>
        <p id='description' style={visible}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa laudantium nemo ullam rerum rem sit a iusto
          vel. Quidem, tempore libero animi maxime totam iste ut placeat quod optio odit?
        </p>
      </div>
    </main>
  );
}
