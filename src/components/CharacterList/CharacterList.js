import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCharacterStore } from '@/store/characterStore';

export default {
  name: 'CharacterList',
  setup() {
    const store = useCharacterStore();
    const router = useRouter();

    // Fetch characters on mount if not already loaded
    onMounted(async () => {
      if (!store.characters.length) {
        await store.fetchCharacters();
      }
    });

    const characters = computed(() => store.characters);

    const goToDetail = (id) => {
      router.push({ name: 'CharacterDetail', params: { id } });
    };

    const like = (id) => {
      store.likeCharacter(id);
    };

    const getLikes = (id) => store.likes[id] || 0;

    return {
      characters,
      goToDetail,
      like,
      getLikes,
    };
  },
};
