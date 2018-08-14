import {
  VOTE_UP,
  VOTE_DOWN,
  DELETE_POST,
  EDIT_POST,
  ADD_POST
} from '../actions';

const defaultData = {
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

function post(state = defaultData, action) {
  console.log(action);
  switch (action.type) {
    case VOTE_UP:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      };
    case VOTE_DOWN:
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
          body: action.body
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

export default post;
