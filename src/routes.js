import { createRouter, createWebHistory } from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob(['./pages/**/*.vue'])
const MAIN_ROUTE = '/home'

const paths = Object.keys(pages).map((path) => {
    const name = path
        .match(/\.\/pages(.*)\.vue$/)[1]
        .replace(/\/index$/, '')
        .toLowerCase()

    const title = path.match(/^(.*\/)(.*)(\.vue)$/)?.[2]

    return {
        path: name === MAIN_ROUTE ? '/' : name,
        component: pages[path], // () => import('./pages/*.vue')
        meta: { title }
    }
})

const errorPath = { path: '/:pathMatch(.*)*', component: () => import('./pages/Error.vue'), meta: { title: '😞⁴⁰⁴' } }

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        ...paths,
        errorPath,
    ],
})

router.beforeEach((to, from) => {
    document.title = to.meta?.title || 'Your tournament'
})

export default router
