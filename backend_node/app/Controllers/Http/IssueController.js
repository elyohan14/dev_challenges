'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with issues
 */
const Redis = use('Redis')
const issue = {
  id: 1,
  description: ''
}
const userIssue = {
  issueId: 1,
  name: 'Florencia'
}
class IssueController {
  /**
   * Show a list of all issues.
   * GET issues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new issue.
   * POST issues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params, response }) {
    const req = request.all()
    // return params.issue
    // Check if the issue number exists
    const issues = await Redis.get('issues') ? JSON.parse(await Redis.get('issues')) : []
    console.log('issues', issues)
    const exists = issues ? issues.find(val => val.id == params.issue) : false

    console.log('req', req)
    if (!exists) {
      // Create the issue
      issues.push({
        id: params.issue,
        description: req.description
      })
      await Redis.set('issues', JSON.stringify(issues))
    }
    
    // Asociate the user with issue
    // Check if user already joined to issue
    const userIssues = await Redis.get('userIssues') ?  JSON.parse(await Redis.get('userIssues')) : []
    const userIssuesExists = userIssues ? userIssues.find(val => val.issueId == params.issue && val.name == req.name) : false

    if (!userIssuesExists) {
      userIssues.push({
        issueId: params.issue,
        name: req.name
      })      
    }
    response.send(await Redis.get('issues'))
  }

  /**
   * Display a single issue.
   * GET issues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update issue details.
   * PUT or PATCH issues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a issue with id.
   * DELETE issues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = IssueController
