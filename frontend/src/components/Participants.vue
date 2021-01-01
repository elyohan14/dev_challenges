<template>
  <div>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Participants {{ issue.status == 'reveal' && issue.avg > 0 ? '- Avg ' + issue.avg : '' }}</q-toolbar-title>
    </q-toolbar>
    <q-list bordered>
      <q-item v-for="contact in issue.members" :key="contact.id" class="q-mb-sm" v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/avatar${randomNumber()}.jpg`">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.value }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon v-if="contact.status == 'voted'" name="check_circle" color="green"><q-tooltip>Voted</q-tooltip></q-icon>
          <q-icon v-if="contact.status == 'waiting'" name="alarm" color="green"><q-tooltip>Waiting</q-tooltip></q-icon>
          <q-icon v-if="contact.status == 'passed'" name="minimize" color="green"><q-tooltip>Passed</q-tooltip></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ['issues', 'issueid'],
  computed: {
    issue () {
      return this.issues.find(val => val.id === this.issueid)
    }
  },
  methods: {
    randomNumber () {
      return parseInt(Math.floor(Math.random() * 6) + 1)
    }
  }
}
</script>
