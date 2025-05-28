import { setActivePinia, createPinia } from 'pinia';
import { useCharacterStore } from '@/store/characterStore';

describe('Character Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with an empty characters list', () => {
    const store = useCharacterStore();
    expect(store.characters).toEqual([]);
  });

  it('increments like count', () => {
    const store = useCharacterStore();
    store.likeCharacter(5);
    store.likeCharacter(5);
    expect(store.likes[5]).toBe(2);
  });
});
