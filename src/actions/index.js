export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';

export function addPost(post) {
  return {
    type: ADD_POST, ...post
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST, ...post
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST, ...post
  }
}

export function voteUp(post) {
  return {
    type: VOTE_UP, ...post
  }
}

export function voteDown(post) {
  return {
    type: VOTE_DOWN, ...post
  }
}
