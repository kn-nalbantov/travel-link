import { Parse } from './App';

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
  const result = await post('/users', { username, email, password });

  const userData = {
    username: username,
    email: email,
    objectId: result.objectId,
    sessionToken: result.sessionToken,
  };
  setUserData(userData);

  return result;
}

export async function logout() {
  await post('/logout');
}

export async function createDestination(name, region, img, description) {
  const fileToBase64 = await getBase64(img);
  const myNewObject = new Parse.Object('destinations');
  myNewObject.set('name', name);
  myNewObject.set('region', region);
  myNewObject.set('img', new Parse.File(img.name, { base64: fileToBase64 }));
  myNewObject.set('description', description);
  myNewObject.set('createdBy', Parse.User.current());
  try {
    const result = await myNewObject.save();
    // Access the Parse Object attributes using the .GET method
    console.log('destination created', result);
  } catch (error) {
    console.error('Error while creating destinations: ', error);
  }

  function getBase64(file) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export async function getDestinationsByOwnerId(ownerId) {
  const destinations = Parse.Object.extend('destinations');
  const query = new Parse.Query(destinations);
  query.equalTo('createdBy', {
    "__type": "Pointer",
    "className": "_User",
    "objectId": ownerId
});
  try {
    const results = await query.find();
    return results;
  } catch (error) {
    console.error('Error while fetching destinations', error);
  }
}

export async function getDestinationById(id) {
  const destinations = Parse.Object.extend('destinations');
  const query = new Parse.Query(destinations);
  query.equalTo('objectId', id);
  try {
    const results = await query.find();
    return results;
  } catch (error) {
    console.error('Error while fetching destinations', error);
  }
}