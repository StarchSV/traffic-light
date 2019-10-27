import Vue from 'vue';
import VueRouter from 'vue-router';
import config from './config';
import TrafficLight from './components/TrafficLight';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/red'
    },
    {
      path: '*',
      redirect: '/red'
    },
    {
      name: 'Red signal',
      path: config.red.path,
      props: {
        lightColor: config.red.name,
        startTime: config.red.time
      },
      component: TrafficLight,
    },
    {
      name: 'Yellow signal',
      path: config.yellow.path,
      props: {
        lightColor: config.yellow.name,
        startTime: config.yellow.time
      },
      component: TrafficLight
    },
    {
      name: 'Green signal',
      path: config.green.path,
      props: {
        lightColor: config.green.name,
        startTime: config.green.time
      },
      component: TrafficLight
    }
  ],
  mode: 'history'
});
