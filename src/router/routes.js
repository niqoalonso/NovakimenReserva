import store from '@/state/store'

export default [{
    path: '/login',
    name: 'login',
    component: () => import('../views/pages/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({
            name: 'home'
          })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/pages/account/register'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({
            name: 'home'
          })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot-password',
    component: () => import('../views/pages/account/forgot-password'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({
            name: 'home'
          })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch('auth/logOut')
        } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
          store.dispatch('authfack/logout')
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? {
          name: 'home'
        } : {
          ...routeFrom
        })
      },
    },
  }, {
    path: '/',
    name: 'home',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/dashboard/index')
  },
  {
    path: '/calendar',
    name: 'calendar',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/calendar/index')
  },
  {
    path: '/chat',
    name: 'chat',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/chat/index')
  },
  {
    path: '/ecommerce/products',
    name: 'Products',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/products')
  },
  {
    path: '/ecommerce/product-detail/:id',
    name: 'Product Detail',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/product-detail')
  },
  {
    path: '/ecommerce/orders',
    name: 'Orders',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/orders')
  },
  {
    path: '/ecommerce/customers',
    name: 'Customers',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/customers')
  },
  {
    path: '/ecommerce/cart',
    name: 'Cart',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/cart')
  },
  {
    path: '/ecommerce/checkout',
    name: 'Checkout',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/checkout')
  },
  {
    path: '/ecommerce/shops',
    name: 'Shops',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/shops')
  },
  {
    path: '/ecommerce/add-product',
    name: 'Add Product',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/ecommerce/add-product')
  },
  {
    path: '/email/inbox',
    name: 'Inbox',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/email/inbox')
  },
  {
    path: '/email/reademail/:id',
    name: 'Read Email',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/email/reademail')
  },
  {
    path: '/invoices/detail',
    name: 'Invoice Detail',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/invoices/detail')
  },
  {
    path: '/invoices/list',
    name: 'Invoice List',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/invoices/list')
  },
  {
    path: '/contacts/grid',
    name: 'User Grid',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/contacts/grid')
  },
  {
    path: '/contacts/list',
    name: 'User List',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/contacts/list')
  },
  {
    path: '/contacts/profile',
    name: 'Profile',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/contacts/profile')
  },
  {
    path: '/utility/starter',
    name: 'Starter-page',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/utility/starter')
  },
  {
    path: '/utility/maintenance',
    name: 'maintenance',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/maintenance')
  },
  {
    path: '/utility/comingsoon',
    name: 'comingsoon',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/comingsoon')
  },
  {
    path: '/utility/timeline',
    name: 'timeline',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/timeline')
  },
  {
    path: '/utility/faqs',
    name: 'faqs',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/faqs')
  },
  {
    path: '/utility/pricing',
    name: 'pricing',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/pricing')
  },
  {
    path: '/utility/404',
    name: 'error-404',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/404')
  },
  {
    path: '/utility/500',
    name: 'error-500',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/utility/500')
  },
  {
    path: '/form/elements',
    name: 'elements',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/elements')
  },
  {
    path: '/form/validation',
    name: 'validation',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/validation')
  },
  {
    path: '/form/advanced',
    name: 'form-advanced',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/advanced')
  },
  {
    path: '/form/editor',
    name: 'editor',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/editor')
  },
  {
    path: '/form/upload',
    name: 'upload',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/upload')
  },
  {
    path: '/form/repeater',
    name: 'repeater',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/repeater')
  },
  {
    path: '/form/wizard',
    name: 'wizard',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/wizard')
  },
  {
    path: '/form/mask',
    name: 'mask',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/form/mask')
  },
  {
    path: '/tables/basic',
    name: 'basic-table',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/tables/basic')
  },
  {
    path: '/tables/advanced',
    name: 'advanced',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/tables/advanced')
  },
  {
    path: '/charts/apex',
    name: 'apex',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/charts/apex/index')
  },
  {
    path: '/charts/chartist',
    name: 'chartist',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/charts/chartist/index')
  },
  {
    path: '/charts/chartjs',
    name: 'chartjs',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/charts/chartjs/index')
  },
  {
    path: '/charts/echart',
    name: 'echart',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/charts/echart/index')
  },
  {
    path: '/icons/unicons',
    name: 'unicons',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/icons/unicons')
  },
  {
    path: '/icons/boxicons',
    name: 'boxicons',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/icons/boxicons')
  },
  {
    path: '/icons/materialdesign',
    name: 'materialdesign',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/icons/materialdesign')
  },
  {
    path: '/icons/dripicons',
    name: 'dripicons',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/icons/dripicons')
  },
  {
    path: '/icons/fontawesome',
    name: 'fontawesome',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/icons/fontawesome')
  },
  {
    path: '/maps/google',
    name: 'google',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/maps/google')
  },
  {
    path: '/maps/leaflet',
    name: 'leaflet',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/maps/leaflet')
  },
  {
    path: '/ui/alerts',
    name: 'alerts',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/alerts')
  },
  {
    path: '/ui/buttons',
    name: 'buttons',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/buttons')
  },
  {
    path: '/ui/cards',
    name: 'cards',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/cards')
  }, {
    path: '/ui/carousel',
    name: 'carousel',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/carousel')
  }, {
    path: '/ui/dropdown',
    name: 'dropdown',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/dropdown')
  }, {
    path: '/ui/grid',
    name: 'grid',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/grid')
  }, {
    path: '/ui/images',
    name: 'images',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/images')
  }, {
    path: '/ui/lightbox',
    name: 'lightbox',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/lightbox')
  },
  {
    path: '/ui/modals',
    name: 'modals',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/modals')
  },
  {
    path: '/ui/rangeslider',
    name: 'rangeslider',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/rangeslider')
  },
  {
    path: '/ui/progressbar',
    name: 'progressbar',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/progressbar')
  },
  {
    path: '/ui/sweet-alert',
    name: 'sweet-alert',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/sweet-alert')
  },

  {
    path: '/ui/tabs-accordions',
    name: 'tabs-accordions',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/tabs-accordions')
  },
  {
    path: '/ui/typography',
    name: 'typography',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/typography')
  },

  {
    path: '/ui/video',
    name: 'video',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/video')
  },
  {
    path: '/ui/general',
    name: 'general',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/general')
  },
  {
    path: '/ui/colors',
    name: 'colors',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/colors')
  },
  {
    path: '/ui/rating',
    name: 'rating',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/ui/rating')
  },
  {
    path: '/auth/login-1',
    name: 'login-1',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/auth/login-1')
  },
  {
    path: '/auth/register-1',
    name: 'register-1',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/auth/register-1')
  },{
    path: '/auth/lock-screen',
    name: 'lock-screen',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/auth/lock-screen')
  },{
    path: '/auth/recoverpwd',
    name: 'recoverpwd',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/auth/recoverpwd')
  },

]