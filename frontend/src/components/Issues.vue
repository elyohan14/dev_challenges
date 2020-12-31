<template>
  <div>
    <q-list bordered padding>
      <div class="q-pa-md float-right">
        <q-btn label="Create issue" color="primary" size="sm" @click="openCreateIssueDialog"/>
      </div>
      <div class="q-pt-md">
        <q-item-label header><b>Issues</b></q-item-label>
      </div>
      <q-item clickable v-ripple v-for="issue in issues" :key="issue.id" @click="selectIssue(issue)">
        <q-item-section>
          <q-item-label class="text-blue-7"><b style="cursor: pointer">{{ issue.id }}</b></q-item-label>
          <q-item-label caption>
            {{ issue.description }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New issue</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="form.issue" placeholder="Story number #1" :error="$v.form.issue.$error" autofocus />
           <q-input dense v-model="form.description" placeholder="Story description" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add issue" @click="saveIssue" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['issues'],
  data () {
    return {
      prompt: null,
      form: {},
      poker: null
    }
  },
  validations: {
    form: {
      issue: { required },
      description: { required }
    }
  },
  methods: {
    openCreateIssueDialog () {
      this.prompt = true
    },
    saveIssue () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        const formData = {
          description: this.form.description,
          name: this.$q.localStorage.getItem('name')
        }
        this.$api.post(`issue/${this.form.issue}/join`, formData).then(res => {
          if (res) {
            this.prompt = false
            this.form = {}
            this.$v.form.$reset()
          }
        })
      }
    },
    selectIssue (issue) {
      this.$emit('selectIssue', issue)
    }
  }
}
</script>
