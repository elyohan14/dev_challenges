'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with issues
 */
const Redis = use('Redis')
const Ws = use('Ws')

class IssueController {
  /**
   * Get issues from redis.
   *
   */
  async getIssues () {
    return await Redis.get('issues') ? JSON.parse(await Redis.get('issues')) : []
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
    response.send(await this.getIssues())
  }

  /**
   * Create/save a new issue and join an user.
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
    const exists = issues ? issues.findIndex(val => val.id == issueNumber) : false

    if (exists === -1) { // If not exists the issue
      // Create the issue and join user
      issues.push({
        id: issueNumber,
        description: req.description,
        members: [
          {
            name: userName,
            status: 'waiting'
          }
        ]
      })
    } else { // If the issue exists
      // Join the user
      const issue = issues[exists]
      const joined = issue.members ? issue.members.find(val => val.name == userName) : false
      if (!joined) { // If the users is not joined
        issue.members.push({
          name: userName,
          status: 'waiting'
        })
        issues[exists] = issue
      }
    }
    // Save the issues
    await Redis.set('issues', JSON.stringify(issues))
    


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
