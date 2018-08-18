export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_UP_POST = 'VOTE_UP_POST';
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST';
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT';
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export function addCategory(post) {
  return {
    type: ADD_CATEGORY, ...post
  }
}

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

export function voteUpPost(post) {
  return {
    type: VOTE_UP_POST, ...post
  }
}

export function voteDownPost(post) {
  return {
    type: VOTE_DOWN_POST, ...post
  }
}

export function addComment(cmt) {
  return {
    type: ADD_COMMENT, ...cmt
  }
}

export function editComment(cmt) {
  return {
    type: EDIT_COMMENT, ...cmt
  }
}

export function deleteComment(cmt) {
  return {
    type: DELETE_COMMENT, ...cmt
  }
}

export function voteUpComment(cmt) {
  return {
    type: VOTE_UP_COMMENT, ...cmt
  }
}

export function voteDownComment(cmt) {
  return {
    type: VOTE_DOWN_COMMENT, ...cmt
  }
}
