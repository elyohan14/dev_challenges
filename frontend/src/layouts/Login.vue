<template>
  <div>
    <div class="fullscreen column items-center justify-center bg-grey-4">
      <transition appear enter-active-class="animated flipInY" leave-active-class="animated fadeOutDown">
        <q-card class="bg-white login relative-position" style="border-radius: 15px">
          <q-card-section>
            <div class="text-h6 text-grey-7">Workana Planning Poker System</div>
            <div class="text-subtitle2 text-grey-7">Hiring challenge</div>
          </q-card-section>
          <q-card style="text-align: center;">
            <div class="q-pl-lg q-pr-lg">
              <q-input v-model="form.name" placeholder="Name" error-message="Ingrese su correo" @keyup.enter="submit" />
            </div>
          </q-card>
          <q-card-actions vertical class="q-pa-md">
            <q-btn class="text-white" rounded label="Start" color="primary" @click="submit" />
          </q-card-actions>
        </q-card>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  created () {
    if (this.getUserName()) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    submit () {
      if (this.form.name) {
        this.$q.localStorage.set('name', this.form.name)
        this.$router.push('/dashboard')
      } else {
        this.$q.notify({
          type: 'warning',
          message: 'You must enter a name'
        })
      }
    },
    getUserName () {
      return this.$q.localStorage.getItem('name')
    }
  }
}
</script>
