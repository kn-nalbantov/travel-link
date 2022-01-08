export default function Edit() {
  function onClick(e) {
    e.target.nextElementSibling.focus();
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const region = formData.get('region');
    const img = formData.get('img');
    const description = formData.get('description');
  }

  return (
    <main>
      <div className='createBox'>
        <form onSubmit={onSubmit}>
          <h2>Edit Destination</h2>
          <label htmlFor='name' onClick={onClick}>
            Name
          </label>
          <input type='text' name='name' />
          <label htmlFor='region' onClick={onClick}>
            Region
          </label>
          <input type='text' name='region' />
          <label htmlFor='img' onClick={onClick}>
            Select an image
          </label>
          <input type='file' name='img' />
          <label htmlFor='description' onClick={onClick}>
            Description
          </label>
          <textarea name='description' cols='20' rows='5'></textarea>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </main>
  );
}
