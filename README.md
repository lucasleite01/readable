# Readable API Server

This is a anonymous web comment app build for Udacity's React course.

Users are able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## Start project

To get started:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server.js`
* In another terminal window, start the application:
    - `cd readable`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Redux-persist

The project is working with redux-persist to persist the redux state on `localStorage`. When the server is restarted the initial configuration is set to redux state, but the `localStorage` remains the same. To refresh `localStorage` when you reset the server, type `localStorage.clear()` on DevTools console. It shouldn't be necessary if you don't restart the server.

## New functionalities

- The user can now add categories that will be displayed on all pages of the project and also can be used to create posts. Changes were made on `src/api-server/server.js` and `src/api-server/categories.js` for making this work.
