import { apartments } from "@/api/apartments";
import { defineStore } from "pinia";

export const useApartmentStore = defineStore("apartment", {
  state: () => ({
    apartments: apartments,
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 10,
  }),

  getters: {
    getPropertyById: (state) => (id) => {
      return state.apartments.find((property) => property.id === id);
    },

    getAvailableApartments: (state) => () => {
      const res = state.apartments.filter((el) => {
        return (
          el.location.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          el.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });

      return res;
    },
    getApartments: (state) => () => {
      const res = state.apartments.filter((el) => {
        return (
          el.location.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          el.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });

      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;

      return res.slice(start, end);
    },
  },
  actions: {
    setQuery(query: string) {
      this.searchQuery = query;
    },

    setPage(page: number) {
      this.currentPage = page;
    },
  },
});
