export default function Create() {
  function onClick(e) {
    e.target.nextElementSibling.focus();
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <main>
      <div className='createBox'>
        <form onSubmit={onSubmit}>
          <h2>Add a Destination</h2>
          <label htmlFor='name' onClick={onClick}>Name</label>
          <input type='text' name='name' />
          <label htmlFor='region' onClick={onClick}>Region</label>
          <input type='text' name='region' />
          <label htmlFor='img' onClick={onClick}>Select an image</label>
          <input type='file' name='img' />
          <label htmlFor='description' onClick={onClick}>Description</label>
          <textarea name="description" cols="20" rows="5"></textarea>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </main>
  );
}
