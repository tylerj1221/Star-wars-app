import { ref, reactive, toRaw } from 'vue';
import { useCharacterStore } from '@/store/characterStore';

export default {
  name: 'ReviewForm',
  props: {
    characterId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useCharacterStore();
    const form = ref(null);
    const errorMessage = ref('');
    
    const ratings = Array.from({ length: 10 }, (_, idx) => idx + 1);
    
    const review = reactive({
      characterId: props.characterId,
      name: '',
      watchedDate: '',
      description: '',
      rating: null,
    });
    
    async function handleSubmit() {
      errorMessage.value = '';
      try {
        await store.submitReview(toRaw(review));
      } catch (error) {
        errorMessage.value = error.message || 'Submission failed. Please try again later.';
      }
    }
    
    return {
      form,
      errorMessage,
      ratings,
      review,
      handleSubmit,
    };
  },
};