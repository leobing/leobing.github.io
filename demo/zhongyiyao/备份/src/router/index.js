import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import DoctorLogin from '@/views/doctorLogin'
import DoctorRegister from '@/views/doctorRegister'
import personalPage from '@/views/personalPage'
import CaseHistory from '@/views/caseHistory'
import EditCase from '@/views/editCase'
import Anagraph from '@/views/anagraph'
import EditAnagraph from '@/views/editAnagraph'
import AnagraphDetail from '@/views/anagraphDetail'
import Platform from '@/views/platform'
import ClinicDetail from '@/views/clinicDetail'
import CaseDetail from '@/views/CaseDetail'
import Doctor from '@/views/doctor'
import ChooseRole from '@/views/chooseRole'
import ClinicLogin from '@/views/clinicLogin'
import ClinicRegister from '@/views/clinicRegister'
import ClinicList from '@/views/clinicList'
import ClinicDoctor from '@/views/clinicDoctor'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chooseRole',
      component: ChooseRole
    },
    {
      path: '/doctorLogin',
      name: 'doctorLogin',
      component: DoctorLogin
    },
    {
      path: '/clinicLogin',
      name: 'clinicLogin',
      component: ClinicLogin
    },
    {
      path:'/clinicRegister',
      name:'clinicRegister',
      component:ClinicRegister
    },
    {
      path:'/doctorRegister',
      name:'doctorRegister',
      component:DoctorRegister
    },
    {
      path:'/platform',
      name:'platform',
      component:Platform,
      children:[
        {
          path:'/',
          name:'index',
          component:Index
        },
        {
          path:'personalPage',
          name:'personalPage',
          component:personalPage,
        },
        {
          path:'clinicList',
          name:'clinicList',
          component:ClinicList
        },
        {
          path:"caseHistory",
          name:'caseHistory',
          component:CaseHistory
        },
        {
          path:'anagraph',
          name:'anagraph',
          component:Anagraph
        },
        {
          path:"editCase",
          name:"editCase",
          component:EditCase
        },
        {
          path:'editAnagraph',
          name:'editAnagraph',
          component:EditAnagraph
        },
        {
          path:'anagraphDetail',
          name:'anagraphDetail',
          component:AnagraphDetail
        },
        {
          path:'clinicDetail',
          name:'clinicDetail',
          component:ClinicDetail
        },
        {
          path:'clinicDoctor',
          name:'clinicDoctor',
          component:ClinicDoctor
        },
        {
          path:'caseDetail',
          name:'caseDetail',
          component:CaseDetail
        },
        {
          path:'doctor',
          name:'doctor',
          component:Doctor
        }
      ]
    },
    
  ]
})
