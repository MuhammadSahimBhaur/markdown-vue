import { createApp } from 'vue'
import App from './App.vue'
import About from "./components/AboutApp.vue";
import AddMarkdown from "./components/AddMarkdown.vue";
import { createStore } from 'vuex'
import axios from "axios";
import { createWebHistory, createRouter } from "vue-router";

// const About = { template: '<div>About</div>' }
// const Home = { template: '<div>Home</div>' }


const routes = [
    { path: '/', component: AddMarkdown },
    { path: '/logout', component: About },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    mode: 'history',
    routes, // short for `routes: routes`
})

// Make sure to _use_ the router instance to make the
// whole app router-aware.

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
                // console.log(response)
                // JSON responses are automatically parsed.
                commit('loadMarkdown', response.data)
            }
            catch (error) {
                console.log(error);
            }
        },
        async savePosts({ commit }, source) {
            console.log(commit, "savePosts", source)
            commit('addMarkdown', { "start": source, "key": Math.random() })
            // try {
            //     const response = await axios({
            //         method: "POST", url: "/api/addpost", data: {
            //             start: source
            //         }
            //     })
            //     console.log("response:", response.data)
            //     dispatch("loadPosts")
            //     // console.log(commit, response)

            // }
            // catch (error) {
            //     console.log(error);
            // }
        },
        async save({ commit, state }) {
            console.log(commit, state.md)
            try {
                const response = await axios({
                    method: "POST", url: "/api/saveall", data: {
                        posts: state.md
                    }
                })
                console.log("response:", response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        ,
        async deletePost({ state }, ID) {
            let newList = state.md.filter((item) => {
                return item.key != ID;
            })
            state.md = newList;
            // console.log("deletePost called", commit)
            // try {
            //     const response = await axios({
            //         method: "DELETE", url: "/api/deletepost", data: {
            //             _id: ID
            //         }
            //     })
            //     console.log('deleted ->', response);
            //     dispatch("loadPosts");
            //     // JSON responses are automatically parsed.
            //     // commit('addMarkdown', { _id: response, start: source })
            //     // this.dispatch("loadPosts")

            // }
            //     catch(error) {
            //     console.log(error);
            // }
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
app.use(router)

app.use(store)

app.mount('#app')