<template>
  <div>
    <q-list bordered padding>
      <div class="q-pa-md float-right">
        <q-btn label="Create issue" color="primary" size="sm" @click="openCreateIssueDialog"/>
      </div>
      <div class="q-pt-md">
        <q-item-label header><b>Issues</b></q-item-label>
      </div>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Story number</q-item-label>
          <q-item-label caption>
            Story description
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            Require password for purchase or use
            password to restrict purchase
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
          <q-input dense v-model="form.storyNumber" placeholder="Story number #1" autofocus />
           <q-input dense v-model="form.description" placeholder="Story description" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add issue" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prompt: null,
      form: {}
    }
  },
  methods: {
    openCreateIssueDialog () {
      this.prompt = true
    }
  }
}
</script>
