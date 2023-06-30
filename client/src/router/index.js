import {
    createRouter,createWebHashHistory,createWebHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import Searcher from '../components/searcher.vue'
import Home from '../components/home.vue'
import Predict from '../components/predict.vue'
import Browse from '../components/browse.vue'
import About from '../components/about.vue'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import User from '~/pages/user.vue'
import Userinfo from '../components/userinfo.vue'
import Help from '../components/help.vue'
import Modify from '../components/modify_email.vue';

const routes=[{
    path:"/",
    component:Index,
    children:[{
        path:"",
        name:'indexhome',
        component:Home,
    },{
        path:"predict",
        name:'indexpre',
        component:Predict
    },{
        path:"browse",
        name:'indexbro',
        component:Browse
    },{
        path:"about",
        name:'indexabout',
        component:About
    },{
        path:"login",
        component:Login
    },{
        path:"signup",
        component:Signup
    },{
        path:'searcher',
        name:'searcher',
        component:Searcher
    },{
        path:'help',
        name:'indexhelp',
        component:Help
    }]
},{ path: '/:pathMatch(.*)*',
name: 'NotFound', 
component: NotFound 
},{
    path:'/user/:username',
    component:User,
    children:[{
        path:"",
        name:'userhome',
        component:Home,
    },{
        path:"predict",
        name:'userpre',
        component:Predict
    },{
        path:"browse",
        name:'userbro',
        component:Browse
    },{
        path:"about",
        name:'userabout',
        component:About
    },{
        path:'searcher',
        name:'usersearcher',
        component:Searcher
    },{
        path:'userinfo',
        name:'userinfo',
        component:Userinfo
    },{
            path:'help',
            name:'userhelp',
            component:Help
    },{
        path:'modify',
        name:'usermodify',
        component:Modify
    }]
}]

const router = createRouter({
    // history:createWebHashHistory(),
    history:createWebHistory(),
    routes
})

export default router