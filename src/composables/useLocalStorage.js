import { ref } from 'vue';

export const useLocalStorage = key => {
  const value = ref(JSON.parse(localStorage.getItem(key)) || []);

  const setItem = updatedValue => {
    localStorage.setItem(key, JSON.stringify(updatedValue));
    value.value = JSON.parse(localStorage.getItem(key));
  };

  return { value, setItem };
};
