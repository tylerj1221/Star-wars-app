// src/store/characterStore.js
import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    characters: [],
    likes: {}, // key: character id, value: count
    reviews: [] // each review: { characterId, name, watchedDate, rating, description }
  }),
  actions: {
    async fetchCharacters() {
      try {
        // Check for cached data in localStorage
        const cached = localStorage.getItem('characters');
        if (cached) {
          // If cached data is available, use it
          this.characters = JSON.parse(cached);
          return;
        }
        
        // If no cached data, start fetching
        let url = 'https://swapi.tech/api/people/';
        let allResults = [];

        while (url) {
          const response = await fetch(url);
          const data = await response.json();
          allResults.push(...data.results);
          url = data.next;
        }

        const detailedCharacters = await Promise.all(
          allResults.map(async (char, index) => {
            const detailResponse = await fetch(char.url);
            const detailData = await detailResponse.json();
            return {
              id: index,
              ...detailData.result.properties,
              description: detailData.result.description,
              uid: detailData.result.uid,
              _id: detailData.result._id,
              __v: detailData.result.__v,
            };
          })
        );
        
        // Update our state and cache the result in localStorage.
        this.characters = detailedCharacters;
        localStorage.setItem('characters', JSON.stringify(detailedCharacters));
      } catch (error) {
        console.error("Error fetching characters", error);
      }
    },
    likeCharacter(characterId) {
      if (this.likes[characterId]) {
        this.likes[characterId]++;
      } else {
        this.likes[characterId] = 1;
      }
    },
    async submitReview(review) {
      try {
        const response = await fetch('https://your-backend.com/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(review)
        });
        if (!response.ok) {
          throw new Error('Review submission failed');
        }
        this.reviews.push(review);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
});
