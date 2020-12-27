<template>
  <div id="app">
    <head>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet" type="text/css">
      <link href="https://cdn.jsdelivr.net/npm/quasar@1.14.7/dist/quasar.min.css" rel="stylesheet" type="text/css">
    </head>
    <h1>♠ Planning Poker ♠</h1>
    <div id="logo"></div>
    <h2>Hiring Challenge 👋</h2>
    <Lobby />
    <q-btn label="Chamo"></q-btn>
  </div>
</template>

<script>
import Lobby from './components/Lobby.vue'

export default {
  name: 'App',
  components: {
    Lobby
  },
  mounted () {
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/vue@^2.0.0/dist/vue.min.js')
    document.head.appendChild(externalScript)

    let externalScript2 = document.createElement('script')
    externalScript2.setAttribute('src', 'https://cdn.jsdelivr.net/npm/quasar@1.14.7/dist/quasar.umd.min.js')
    document.head.appendChild(externalScript2)
  }
}
</script>

<style>
body {
  box-sizing: border-box;
  font-family: Arial;
  margin: 0;
  background: #fff;
  text-align: center;
}
#logo {
  margin: auto;
  height: 35px;
  width: 219px;
  background: url(https://wkncdn.com/newx/assets/build/img/workana-logo-2x.9e13d14c2.png);
  background-repeat: no-repeat;
  background-size: cover;
}
#container {
  max-width: 550px;
  margin: auto;
}
h1 {
  margin: 0px;
  color: #e76f51;
  text-shadow: 2px 2px 2px #ccc;
}
h2 {
  margin: auto;
  color: #e76f51;
  font-size: 1em;
  text-shadow: 1px 1px 2px #ccc;
  text-align: center;
}
h3 {
  color: #2a9d8f;
  text-shadow: 2px 2px 2px #ccc;
}
#voteList {
  margin: 10px auto;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-around;
}
#voteList li {
  box-sizing: border-box;
  cursor: pointer;
  height: 100px;
  width: 100px;
  margin: 0;
  padding: 30px 0;
  border-radius: 9px;
  box-shadow: 2px 2px 2px #000;
  text-shadow: 1px 1px 2px #444;
  background: #e76f51;
  color: #fff;
  margin: 10px;
  font-size: 30px;
  transition: background-color 0.3s ease font-size 0.3s ease;
}
#voteList li.voted {
  font-size: 33px;
  background: #2a9d8f;
}
#memberList {
  list-style: none;
}
#memberList li {
  box-shadow: 2px 2px 2px #444;
  text-shadow: 1px 1px 1px #444;
  background: #e76f51;
  margin: 0.5em 0;
  padding: 1em;
  border-radius: 8px;
  display: flex;
  align-content: center;
}
#memberList li div {
  width: 50%;
  display: block;
  margin: auto;
}
#memberList li div.name {
  color: #FFF;
}
#memberList li div.vote {
  color: #FFF;
  text-shadow: none;
  font-size: 1.5em;
}
#issue {
  color: #2a9d8f;
  width: 75px;
  text-align: center;
}
</style>
