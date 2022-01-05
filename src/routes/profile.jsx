import React, { useState, useEffect } from 'react';
import { getDestinationsByOwnerId, getUserData } from '../api';

export default function Profile() {
  const [destinations, setDestinations] = useState([]);
  const userData = getUserData();
  let ownerId;
  if (userData) {
    ownerId = userData.objectId;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getDestinationsByOwnerId(ownerId);
      setDestinations(res);
    }
    fetchData();
  });

  return (
    <>
      <h2 className="banner-header">My Publications</h2>
      <main>
        {destinations.map(x => (
          <div className='travelCard' key={x.attributes.createdAt}>
            <h2>{x.attributes.name}</h2>
            <p>Region: {x.attributes.region}</p>
            <img src={x.attributes.img._url} alt={x.attributes.img._name} />
            <button className='detailsBtn'>Details</button>
            <button className='editBtn'>Edit</button>
          </div>
        ))}
      </main>
    </>
  );
}
