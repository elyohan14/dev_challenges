<template>
  <q-page>
    <div class="row">
      <div class="col-3">
      <Issues :issues="issues" @selectIssue="selectIssue"/>
    </div>
    <div class="col-6 q-pl-md">
      <Voting v-if="issueid" :issues="issues" :issueid="issueid" :key="issueid"/>
    </div>
    <div class="col-3 q-pl-md">
      <Participants v-if="issueid" :issues="issues" :issueid="issueid" :key="issueid"/>
    </div>
    </div>
  </q-page>
</template>

<script>
import Ws from '@adonisjs/websocket-client'
import Issues from 'components/Issues'
import Voting from 'components/Voting'
import Participants from 'components/Participants'
const ws = Ws('ws://localhost:8082')
export default {
  name: 'PageIndex',
  components: {
    Issues,
    Voting,
    Participants
  },
  data () {
    return {
      issue: {},
      issues: [],
      issueid: null
    }
  },
  created () {
    this.getIssues()
    this.connectWebSocket()
  },
  methods: {
    getIssues () {
      this.$api.get('issues').then(res => {
        if (res) {
          this.issues = res
        }
      })
    },
    connectWebSocket () {
      ws.connect()
      const poker = ws.subscribe('poker')
      poker.on('ready', () => {
        console.log('ready')
      })

      poker.on('error', (error) => {
        console.log('This is the error', error)
      })
      poker.on('issues', (data) => {
        console.log('This is the issues', data)
        this.issues = data
      })

      poker.on('close', () => {
      })
    },
    selectIssue (value) {
      this.issueid = value.id
    }
  }
}
</script>
