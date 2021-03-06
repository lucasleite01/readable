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

/*CATEGORIES SECTION*/
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/*new functionality to add a category*/
export const addCategory = (category) =>
  fetch(`${api}/categories/${category.name}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(category)
  })
    .then(res => res.json())

/*POSTS SECTION*/
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const changeVotePost = (post, option) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option: `${option}`})
  })
    .then(res => res.json())

export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())

export const editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(post)
  })
    .then(res => res.json())

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
  })
    .then(res => res.json())

export const getAllCommentsPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

/*COMMENTS SECTION*/

export const changeVoteComment = (comment, option) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option: `${option}`})
  })
    .then(res => res.json())

export const deleteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())

export const editComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(comment)
  })
    .then(res => res.json())

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
