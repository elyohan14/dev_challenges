'use strict'

const { test } = use('Test/Suite')('Issues')

const Redis = use('Redis')
async function getIssues (id = undefined) {
  const issues = await Redis.get('issues') ? JSON.parse(await Redis.get('issues')) : []
  if (id) {
    return issues.find(val => val.id == id)
  }
  return issues
}

async function showIssue (issueId) {
  return await getIssues(issueId)
}

test('Get an objetc to query issues', async ({ assert }) => {
  let result = await showIssue()
  assert.equal(typeof [], typeof result)
})
