import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        // {
        //     path: '/new-campaign',
        //     component: () => import('../views/PastCampaign.vue')
        // },
    ]
})

export default router
