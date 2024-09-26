import { route } from 'quasar/wrappers';
// unplugin-vue-router
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router/auto';

// vite-plugin-vue-layouts
import { setupLayouts } from 'virtual:generated-layouts';
//import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // routes,
    // extendRoutes: (routes) => setupLayouts(routes),
    extendRoutes: (routes) => {
      return setupLayouts(
        routes.map((route) => {
          // default layout
          let layout = 'default';
          // shop layout
          if (route.path.includes('seller')) {
            layout = 'seller';
            // admin layout
          } else if (route.path.includes('admin')) {
            layout = 'admin';
          }

          route = {
            // 기존에 저장된 정보 할당
            ...route,
            // 기존에 저장된 meta 정보 할당
            meta: {
              ...route.meta,
              layout,
            },
          };
          return route;
        }),
      );
    },
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
