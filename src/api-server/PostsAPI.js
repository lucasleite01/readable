const config = require('./config');
const api = `http://localhost:${config.port}`;

// Generate a unique token
export let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token,
  'Content-type': 'application/json'
}

//Get all of the categories available for the app
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

//Get all of the posts available for the app
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const incrementVote = (post, option) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option: `${option}`})
  })
    .then(res => res.json())
