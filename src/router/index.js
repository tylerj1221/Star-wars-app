// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CharacterList from '@/components/CharacterList/CharacterList.vue';
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail.vue';

const routes = [
  { path: '/', component: CharacterList, name: 'CharacterList' },
  { path: '/character/:id', component: CharacterDetail, name: 'CharacterDetail', props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
