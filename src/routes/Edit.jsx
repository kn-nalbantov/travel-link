import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationById, updateDestination } from '../api';

export default function Edit() {
  const urlParams = useParams();
  const [destination, setDestination] = useState([{ attributes: {} }]);

  function onClick(e) {
    e.target.nextElementSibling.focus();
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getDestinationById(urlParams.id);
      setDestination(res);
    }
    fetchData();
  }, [urlParams.id]);

  // console.log(destination[0].attributes)

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const region = formData.get('region');
    const img = formData.get('img');
    const description = formData.get('description');

    if (name === '' || region === '' || img === '' || description === '') {
      return alert('All fields are required!');
    }

    await updateDestination(urlParams.id, name, region, img, description);
  }

  return (
    <main>
      <div className='createBox'>
        <form onSubmit={onSubmit}>
          <h2>Edit Destination</h2>
          <label htmlFor='name' onClick={onClick}>
            Name
          </label>
          <input type='text' name='name' value={destination[0].attributes.name} />
          <label htmlFor='region' onClick={onClick}>
            Region
          </label>
          <input type='text' name='region' value={destination[0].attributes.region} />
          <label htmlFor='img' onClick={onClick}>
            Select an image
          </label>
          <input type='file' name='img' />
          <label htmlFor='description' onClick={onClick}>
            Description
          </label>
          <textarea name='description' cols='20' rows='5' value={destination[0].attributes.description}></textarea>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </main>
  );
}
