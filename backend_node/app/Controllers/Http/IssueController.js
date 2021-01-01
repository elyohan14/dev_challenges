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
  async getIssues (id = undefined) {
    const issues = await Redis.get('issues') ? JSON.parse(await Redis.get('issues')) : []
    if (id) {
      return issues.find(val => val.id == id)
    }
    return issues
  }

  /**
   * Send issues to client and show/hide voting values according the issue status
   *
   */
  async sendIssues () {
    const issues = await this.getIssues()
    const topic = Ws.getChannel('poker').topic('poker')

    // Send issues through websocket
    if(topic){
      topic.broadcast('issues', this.formatIssues(issues))
    }
  }

  formatIssues (issues) {
    const allIssues = issues
    if (Array.isArray(allIssues)) {
      allIssues.forEach(element => {
        let sum = 0
        if (element.status === 'voting') {
          element.members.forEach(element2 => {
            delete element2.value
          })
        } else {
          element.members.forEach(element2 => {
            sum += element2.value
          })
        }
        element.avg = (sum / element.members.length).toFixed(2)
      })
    } else {
      let sum = 0
        if (allIssues.status === 'voting') {
          allIssues.members.forEach(element2 => {
            delete element2.value
          })
        } else {
          allIssues.members.forEach(element2 => {
            sum += element2.value
          })
        }
        allIssues.avg = (sum / allIssues.members.length).toFixed(2)
    }
    
    return allIssues
  }

  /**
   * Save issues to redis and update their status
   *
   */
  async saveIssues (issues) {
    // Before save I loop the issues and update the status if all the members voted or passed
    const issuesValues = issues
    issuesValues.forEach(element => {
      const membersQty = element.members.length
      let membersVoted = 0
      element.members.forEach(element2 => {
        if (element2.status == 'voted' || element2.status == 'passed') {
          membersVoted++
        }
      })
      element.status = membersQty == membersVoted ? 'reveal' : 'voting'
    })
    await Redis.set('issues', JSON.stringify(issuesValues))
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
    response.send(this.formatIssues(await this.getIssues()))
  }

  /**
   * Create/save a new issue and join an user.
   * POST issue/:issue/join
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
        status: 'voting',
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
    await this.saveIssues(issues)
    await this.sendIssues()
    response.send(true)
  }

  /**
   * Display a single issue.
   * GET issue/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(this.formatIssues(await this.getIssues(params.issue)))
  }

  /**
   * Emit vote on a issue
   * POST issue/:issue/vote
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async vote ({ request, params, response }) {
    const { userName, value } = request.all()
    const issueNumber = params.issue
    const issues = await this.getIssues()
    // Find the issue index
    const exists = issues ? issues.findIndex(val => val.id == issueNumber) : false
    const issue = issues[exists]
    const isJoined = issue.members.find(val => val.name === userName)
    const voted = issue.members.find(val => val.name === userName && (val.status === 'voted' || val.status === 'passed'))
    if (issue.status != 'voting') { // If status is not voting
      // Reject vote
      response.unprocessableEntity('The issue status is not voting')
    } else if (!isJoined) { // If user not joined
      // Reject vote
      response.unprocessableEntity('The user not joined to issue')
    } else if (voted) {
      // Reject vote
      response.unprocessableEntity('The user already voted or passed')
    } else { // If no errors
      // Allow vote
      const participantIndex = issue.members.findIndex(val => val.name === userName)
      issue.members[participantIndex].value = value != '?' ? value : undefined
      issue.members[participantIndex].status = value != '?' ? 'voted' : 'passed'

      issues[exists] = issue
      // Save the issues
      await this.saveIssues(issues)
      await this.sendIssues()
      response.send(true)
    }
  }

  /**
   * Leave a single issue.
   * Post issue/:issue/leave
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async leave ({ params, request, response, view }) {
    const req = request.all()
    const issues = await this.getIssues()
    const exists = issues ? issues.findIndex(val => val.id == params.issue) : false
    if (exists != -1) {
      const issue = issues[exists]
      const memberIndex = issue.members.findIndex(val => val.name === req.userName)
      issue.members.splice(memberIndex, 1)
      issues[exists] = issue
      await this.saveIssues(issues)
      await this.sendIssues()
    }
    response.send(true)
  }

}

module.exports = IssueController
