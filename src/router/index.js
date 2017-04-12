import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Chat from '@/components/Chat';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/chat/:chatId/',
      name: 'Chat',
      component: Chat,
    },
    {
      path: '/chat/:chatId/:userId',
      name: 'Chat',
      component: Chat,
    },
  ],
});
