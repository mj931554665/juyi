import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getLoginToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
const loginWhiteList = ['/404', '/dashboard']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getLoginToken()

  if (hasToken) {
    if (to.path === '/login') {

      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // check user permissions, if no, jump 404
        /*const curl = store.getters.child
        const purl = store.getters.parent
        if (curl.includes(to.path) || loginWhiteList.includes(to.path)) {
          next()
        } else {
          next({ path: '/404' })
        }*/
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          // check user permissions, if no, jump 404
         /* const curl = store.getters.child
          const purl = store.getters.parent
          if (curl.includes(to.path) || loginWhiteList.includes(to.path)) {
            next()
          } else {
            next({ path: '/404' })
          }*/
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else if (to.path.includes('/404')) {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
