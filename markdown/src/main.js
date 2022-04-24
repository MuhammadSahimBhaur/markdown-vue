import { createApp } from 'vue'
import App from './App.vue'
import Login from "./components/LogoutApp.vue";
import AddMarkdown from "./components/AddMarkdown.vue";
import { createStore } from 'vuex'
import axios from "axios";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: AddMarkdown },
    { path: '/login', component: Login },
]

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes, // short for `routes: routes`
})

const store = createStore({
    state() {
        return {
            md: [],
            loggedin: false
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
            // try {
            //     const response = await axios({
            //         method: "DELETE", url: "/api/deletepost", data: {
            //             _id: ID
            //         }
            //     })
            //     console.log('deleted ->', response);
            //     dispatch("loadPosts");

        },
        async login({ state }, { username, password }) {
            // console.log("action->", username, password)
            let logincredentials = [username, password]
            // console.log("action->", logincredentials)
            try {
                const response = await axios({
                    method: "POST", url: "/api/login", data: {
                        credentials: logincredentials
                    }
                })
                // console.log('login ->', response.data.message);
                state.loggedin = response.data.message
                return response.data.message;
                //     //     dispatch("loadPosts");

            } catch (err) {
                console.log(err)
            }

        },
        async logout({ state }) {
            // console.log("logout!")
            state.loggedin = false;
        }
    },


    getters: {
        getMd(state) {
            return state.md;
        },
        getLoggedIn(state) {
            return state.loggedin;
        }
    }
})

let app = createApp(App)
app.use(router)

app.use(store)

app.mount('#app')