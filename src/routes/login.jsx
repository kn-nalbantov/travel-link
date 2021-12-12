export default function Login() {
    return (
      <main>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">email</label>
          <input type="email" name="email"/>
          <label htmlFor="password">password</label>
          <input type="password" name="password"/>
        </form>
      </main>
    );
  }