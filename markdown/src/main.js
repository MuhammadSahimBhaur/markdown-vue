import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import axios from "axios";


// Create a new store instance.
const store = createStore({
    state() {
        return {
            md: []
        }
    },
    mutations: {
        addMarkdown(state, source) {
            // console.log(source)
            state.md.push(source);
        },
        loadMarkdown(state, source) {
            // console.log(source)
            state.md = source;
        }

    },
    actions: {
        async loadPosts({ commit }) {
            try {
                const response = await axios.get('http://localhost:5000/api/loaddata');
                console.log(response)
                // JSON responses are automatically parsed.
                commit('loadMarkdown', response.data)
            }
            catch (error) {
                console.log(error);
            }
        },
        async savePosts({ commit }, source) {
            console.log(source)
            try {
                const response = await axios({
                    method: "POST", url: "/api/addpost", data: {
                        start: source
                    }
                })
                console.log(response)
                // JSON responses are automatically parsed.
                commit('addMarkdown', { _id: response, start: source })
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getters: {
        getMd(state) {
            // console.log(state.md)
            return state.md;
        }
    }

})

let app = createApp(App)

app.use(store)

app.mount('#app')