<template>
  <div>
    <q-list bordered padding>
      <div class="q-pa-md float-right">
        <q-btn label="Create issue" color="primary" size="sm" @click="openCreateIssueDialog"/>
      </div>
      <div class="q-pt-md">
        <q-item-label header><b>Issues</b></q-item-label>
      </div>
      <q-item clickable v-ripple v-for="issue in issues" :key="issue.id">
        <q-item-section>
          <q-item-label>{{ issue.id }}</q-item-label>
          <q-item-label caption>
            {{ issue.description }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New issue</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="form.issue" placeholder="Story number #1" autofocus />
           <q-input dense v-model="form.description" placeholder="Story description" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add issue" @click="saveIssue" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:8082')
export default {
  data () {
    return {
      prompt: null,
      form: {},
      poker: null,
      issues: []
    }
  },
  created () {
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
  methods: {
    openCreateIssueDialog () {
      this.prompt = true
    },
    saveIssue () {
      const formData = {
        description: this.form.description,
        name: this.$q.localStorage.getItem('name')
      }
      this.$api.post(`issue/${this.form.issue}/join`, formData)
    }
  }
}
</script>
