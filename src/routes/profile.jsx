import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDestinationsByOwnerId, getUserData } from '../api';
import * as _data from '../dummy-data.json';

export default function Profile() {
  const [destinations, setDestinations] = useState(_data.results); //USED FOR TESTING
  const [visible, setVisible] = useState({ display: 'none' });
  function onClick() {
    setVisible({ display: 'block' });
    if (visible.display === 'block') {
      setVisible({ display: 'none' });
    }
  }
  const userData = getUserData();
  let ownerId;
  if (userData) {
    ownerId = userData.objectId;
  }
  /* TO BE USED IN PRODUCTION */
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await getDestinationsByOwnerId(ownerId);
  //     setDestinations(res);
  //   }
  //   fetchData();
  // }, [ownerId]);

  return (
    <>
      <h2 className='banner-header'>My Publications</h2>
      <main>
        {destinations.map(x => (
          <div className='travelCard' id={x.id}>
            <h2>{x.name}</h2>
            <p>Region: {x.region}</p>
            <img src={x.img.url} alt={x.img.name} />
            <button className='detailsBtn' onClick={onClick}>Details</button>
            <button className='editBtn'>
              <Link to={'/edit/' + x.id}>Edit</Link>
            </button>
            <p style={visible}>
              {x.description}
            </p>
          </div>
        ))}
      </main>
    </>
  );
}
