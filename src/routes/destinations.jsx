import React, { useState, useEffect } from 'react';
import { getDestinations } from '../data';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [visible, setVisible] = useState({ display: 'none' });
  function onClick() {
    setVisible({ display: 'block' });
    if (visible.display === 'block') {
      setVisible({ display: 'none' });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getDestinations();
      setDestinations(res.results);
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="banner-header">All Destinations</h2>
      <main>
        {destinations.map(x => (
          <div className='travelCard' key={x.objectId}>
            <h2>{x.name}</h2>
            <p>Region: {x.region}</p>
            <img src={x.img.url} alt={x.img.name} />
            <button className='detailsBtn' onClick={onClick}>Details</button>
          </div>
        ))}
      </main>
    </>
  );
}
