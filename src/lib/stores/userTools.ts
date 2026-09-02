import { writable } from 'svelte/store';

const FAVORITES_KEY = 'gezymath_favorites';
const RECENT_KEY = 'gezymath_recent';

function createFavoritesStore() {
  const isBrowser = typeof window !== 'undefined';
  const initialFavs: string[] = isBrowser
    ? JSON.parse(localStorage.getItem(FAVORITES_KEY) || '["tripel-pythagoras", "persamaan-kuadrat"]')
    : ['tripel-pythagoras', 'persamaan-kuadrat'];

  const { subscribe, update, set } = writable<string[]>(initialFavs);

  return {
    subscribe,
    toggleFavorite: (toolId: string) => {
      update((favs) => {
        let newFavs: string[];
        if (favs.includes(toolId)) {
          newFavs = favs.filter((id) => id !== toolId);
        } else {
          newFavs = [...favs, toolId];
        }
        if (isBrowser) {
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
        }
        return newFavs;
      });
    },
    isFavorite: (toolId: string, favsList: string[]) => favsList.includes(toolId)
  };
}

function createRecentStore() {
  const isBrowser = typeof window !== 'undefined';
  const initialRecent: string[] = isBrowser
    ? JSON.parse(localStorage.getItem(RECENT_KEY) || '["fpb-kpk", "kalkulator"]')
    : ['fpb-kpk', 'kalkulator'];

  const { subscribe, update } = writable<string[]>(initialRecent);

  return {
    subscribe,
    addRecent: (toolId: string) => {
      update((recents) => {
        const filtered = recents.filter((id) => id !== toolId);
        const newRecents = [toolId, ...filtered].slice(0, 6);
        if (isBrowser) {
          localStorage.setItem(RECENT_KEY, JSON.stringify(newRecents));
        }
        return newRecents;
      });
    }
  };
}

export const favoritesStore = createFavoritesStore();
export const recentStore = createRecentStore();
