import Vue from 'vue';
import Router from 'vue-router';
import DemoOne from './DemoOne.vue';
import DemoTwo from './DemoTwo.vue';
import DemoThree from './DemoThree.vue';
import DemoFour from './DemoFour.vue';

Vue.use(Router);

const router = [{
  path: '/demo1',
  component: DemoOne,
}, {
  path: '/demo2',
  component: DemoTwo,
}, {
  path: '/demo3',
  component: DemoThree,
}, {
  path: '/demo4',
  component: DemoFour,
}];

export default new Router({
  routes: router,
});
