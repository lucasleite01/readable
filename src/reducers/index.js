import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  VOTE_UP_POST,
  VOTE_DOWN_POST,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
  DELETE_POST,
  EDIT_POST,
  ADD_POST,
  DELETE_COMMENT,
  EDIT_COMMENT,
  ADD_COMMENT
} from '../actions';

const defaultPostData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}

const defaultCommentData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
}

function post(state = defaultPostData, action) {
  switch (action.type) {
    case VOTE_UP_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      };
    case VOTE_DOWN_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      };
    case DELETE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: action.deleted
        }
      };
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body,
          commentCount: action.commentCount
        }
      };
    case ADD_POST:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          author: action.author,
          category: action.category,
          voteScore: action.voteScore,
          deleted: action.deleted,
          commentCount: action.commentCount
        }
      };
    default:
      return state;
  }
}

function comment(state = defaultCommentData, action) {
  // console.log(action);
  switch (action.type) {
    case VOTE_UP_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      };
    case VOTE_DOWN_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: action.deleted
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          timestamp: action.timestamp,
          body: action.body
        }
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          parentId: action.parentId,
          timestamp: action.timestamp,
          body: action.body,
          author: action.author,
          voteScore: action.voteScore,
          deleted: action.deleted,
          parentDeleted: action.parentDeleted
        }
      };
    default:
      return state;
  }
}

const rootPersistConfig = {
  key: 'root-reducer',
  storage,
}

const postPersistConfig = {
  key: 'post-reducer',
  storage,
}

const commentPersistConfig = {
  key: 'comment-reducer',
  storage,
}

const rootReducer = combineReducers({
  post: persistReducer(postPersistConfig, post),
  comment: persistReducer(commentPersistConfig, comment)
});

export default persistReducer(rootPersistConfig, rootReducer);
