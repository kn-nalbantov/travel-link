import { Link } from "react-router-dom";

export default function Login() {
  function onClick(e) {
    e.target.parentNode.children[1].focus();
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log('submitted');
  }

  return (
    <main className="registerBox">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className='register'>
          <label htmlFor='username' onClick={onClick}>Username</label>
          <input type='text' name='email' />
        </div>
        <div className='register'>
          <label htmlFor='email' onClick={onClick}>Email</label>
          <input type='email' name='email' />
        </div>
        <div className='register'>
          <label htmlFor='password' onClick={onClick}>Password</label>
          <input type='password' name='password' />
        </div>
        <div className="register">
          <input type="submit" value="Submit"/>
        </div>
      </form>
      <p>Don't have an account?<Link to="/register"> Sign up now</Link></p>
    </main>
  );
}
