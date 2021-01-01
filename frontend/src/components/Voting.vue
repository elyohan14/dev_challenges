<template>
  <div>
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">Voting Issue #{{ issue ? issue.id : '' }}</div>
        <div class="text-subtitle2">{{ issue ? issue.description : '' }}</div>
      </q-card-section>
      <q-separator dark />
    </q-card>
    <q-card class="q-pa-md row">
      <div class="col-12">
        <q-btn v-if="joinable" class="float-right" label="Join the issue" color="primary" @click="join"/>
        <q-btn v-else class="float-right" label="Leave the issue" color="negative" @click="leave"/>
      </div>
      <q-btn class="q-mt-sm col-3" v-for="button in validVotes" :key="button" :label="button" color="primary"
       @click="vote(button)" outline rounded />
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['issues', 'issueid'],
  data () {
    return {
      validVotes: [1, 2, 3, 5, 8, 13, 20, 40, '?'],
      userName: this.$q.localStorage.getItem('name')
    }
  },
  computed: {
    issue () {
      return this.issues.find(val => val.id === this.issueid)
    },
    joinable () {
      return this.issue ? !this.issue.members.find(val => val.name === this.userName) : false
    }
  },
  methods: {
    join () {
      const formData = {
        name: this.userName
      }
      this.$api.post(`issue/${this.issueid}/join`, formData).then(res => {
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'You have successfully joined the issue'
          })
        }
      })
    },
    vote (value) {
      const formData = {
        userName: this.userName,
        value
      }
      this.$api.post(`issue/${this.issueid}/vote`, formData).then(res => {
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'You have successfully voted'
          })
        }
      })
    },
    leave () {
      const formData = {
        name: this.userName
      }
      this.$api.post(`issue/${this.issueid}/leave`, formData).then(res => {
        if (res) {
          this.$q.notify({
            type: 'positive',
            message: 'You have successfully leave the issue'
          })
        }
      })
    }
  }
}
</script>
