import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCharacterStore } from '@/store/characterStore';
import ReviewForm from '@/components/ReviewForm/ReviewForm.vue';

export default {
  name: 'CharacterDetail',
  components: {
    ReviewForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useCharacterStore();

    const characterId = computed(() => parseInt(route.params.id, 10));

    const character = computed(() => 
      store.characters.find(c => c.id === characterId.value) || {}
    );

    const attributeLabels = {
      gender: 'Gender',
      skin_color: 'Skin Colour',
      hair_color: 'Hair Colour',
      eye_color: 'Eye Colour',
      height: 'Height',
      mass: 'Weight',
      birth_year: 'Birth Year',
    };

    onMounted(async () => {
      if (!store.characters.length) {
        await store.fetchCharacters();
      }
    });

    const goBack = () => {
      router.push({ name: 'CharacterList' });
    };

    return {
      character,
      attributeLabels,
      goBack,
    };
  },
};
