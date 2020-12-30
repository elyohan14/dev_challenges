'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with issues
 */
const Redis = use('Redis')
const Ws = use('Ws')
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
   * Get issues from redis.
   *
   */
  async getIssues () {
    return await Redis.get('issues') ? JSON.parse(await Redis.get('issues')) : []
  }
  /**
   * Get User Issues from redis.
   *
   */
  async getUserIssues () {
    return await Redis.get('userIssues') ?  JSON.parse(await Redis.get('userIssues')) : []
  }
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
    return await this.getIssues()
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
    const userName = req.name
    const issueNumber = params.issue
    // Check if the issue number exists
    const issues = await this.getIssues()
    const exists = issues ? issues.find(val => val.id == issueNumber) : false

    if (!exists) {
      // Create the issue
      issues.push({
        id: issueNumber,
        description: req.description
      })
      await Redis.set('issues', JSON.stringify(issues))
    }
    
    // Asociate the user with issue
    // Check if user already joined to issue
    const userIssues = await this.getUserIssues()
    const userIssuesExists = userIssues ? userIssues.find(val => val.issueId == issueNumber && val.name == userName) : false

    if (!userIssuesExists) {
      userIssues.push({
        issueId: issueNumber,
        name: userName
      })      
    }

    const topic = Ws.getChannel('poker').topic('poker')
    // Send issues through websocket
    if(topic){
      topic.broadcast('issues', await this.getIssues())
    }
    response.send(true)
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
