'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file contains the url routes and binding to controller actions.
|
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

const addPrefixToGroup = group => {
  // Routes group with /api/ prefix
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    Route.get('issues', 'IssueController.index')
    Route.get('issue/:issue', 'IssueController.show')
    Route.post('issue/:issue/join', 'IssueController.store')
    Route.post('issue/:issue/vote', 'IssueController.vote')
    Route.post('issue/:issue/leave', 'IssueController.leave')
  })
)


