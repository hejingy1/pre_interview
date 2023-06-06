import { createApp } from 'vue'
import { store } from './stores/table'
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'

const app = createApp(App);
app.use(store);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBhxa94GfjGZdtqllKjEoF0Uq86RAAeBpo',
        libraries: "places",
    },
}).mount('#app')
