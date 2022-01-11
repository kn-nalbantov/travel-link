import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationById, updateDestination } from '../api';

export default function Edit() {
  const urlParams = useParams();
  const [name, setName] = useState();
  const [region, setRegion] = useState();
  const [description, setDescription] = useState();
  
  function onClick(e) {
    e.target.nextElementSibling.focus();
  }
  
  useEffect(() => {
    async function fetchData() {
      const res = await getDestinationById(urlParams.id);
      setName(res[0].attributes.name);
      setRegion(res[0].attributes.region);
      setDescription(res[0].attributes.description);
    }
    fetchData();
  }, [urlParams.id]);
  


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

  function onChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'region') {
      setRegion(e.target.value);
    }
    if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  }

  return (
    <main>
      <div className='createBox'>
        <form onSubmit={onSubmit}>
          <h2>Edit Destination</h2>
          <label htmlFor='name' onClick={onClick}>
            Name
          </label>
          <input type='text' name='name' value={name} onChange={onChange} />
          <label htmlFor='region' onClick={onClick}>
            Region
          </label>
          <input type='text' name='region' value={region} onChange={onChange} />
          <label htmlFor='img' onClick={onClick}>
            Select an image
          </label>
          <input type='file' name='img' />
          <label htmlFor='description' onClick={onClick}>
            Description
          </label>
          <textarea name='description' cols='20' rows='5' value={description} onChange={onChange}></textarea>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </main>
  );
}
