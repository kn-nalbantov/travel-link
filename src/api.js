export function setUserData(data) {
  sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
  return JSON.parse(sessionStorage.getItem('userData'));
}

export function clearUserData() {
  sessionStorage.removeItem('userData');
}

const hostname = 'https://parseapi.back4app.com';

async function request(url, options) {
  try {
    const res = await fetch(hostname + url, options);

    if (res.ok === false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    try {
      return await res.json();
    } catch (_) {
      return res;
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

function createOptions(method = 'get', data) {
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': 'q4F1zNj3A1adPXkE9NB3OnpOVYHuqRxQb4HRjmqG',
      'X-Parse-REST-API-Key': 'UzYSpqEOQhUM8SiENRuOECI1Q5k4pxdjD1ggrKZz',
    },
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  return options;
}

export async function get(url) {
  return request(url, createOptions());
}

export async function post(url, data) {
  return request(url, createOptions('post', data));
}

export async function put(url, data) {
  return request(url, createOptions('put', data));
}

export async function del(url) {
  return request(url, createOptions('delete'));
}

export async function login(email, password) {
  const result = await post('/login', { email, password });

  const userData = {
    username: result.username,
    email: result.email,
    objectId: result.objectId,
    sessionToken: result.sessionToken,
  };
  setUserData(userData);

  return result;
}

export async function register(username, email, password) {
  const result = await post('/register', { username, email, password });

  const userData = {
    username: result.username,
    email: result.email,
    objectId: result.objectId,
    sessionToken: result.sessionToken,
  };
  setUserData(userData);

  return result;
}

export async function logout() {
  await post('/logout');
}
