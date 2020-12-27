<template>
   <div>
    <div class="fullscreen column items-center justify-center bg-grey-4">
      <transition
        appear
        enter-active-class="animated flipInY"
        leave-active-class="animated fadeOutDown"
      >
        <q-card
          class="bg-white login relative-position"
          style="border-radius: 15px"
        >
          <!-- <q-card-section style="background-color: #F2F27F" class="column justify-center text-center text-white q-pt-xl" /> -->
          <!-- <q-separator /> -->
          <q-card style="text-align: center;">
            <div class="q-pl-lg q-pr-lg">
              <q-input v-model="form.email" type="email" placeholder="Name"
                error-message="Ingrese su correo" @keyup.enter="submit">
              </q-input>
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
  name: 'Login',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    submit () {}
  }
}
</script>
