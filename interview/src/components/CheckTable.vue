<template>
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Street Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="street in paginatedStreetNames" :key="street.id">
            <td><input type="checkbox" v-model="selectedStreets" :value="street" /></td>
            <td>{{ street.name }}</td>
          </tr>
        </tbody>
      </table>
  
      <div>
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
      </div>
  
      <button @click="deleteSelectedRows" v-if="selectedStreets.length > 0">Delete Selected Rows</button>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        selectedStreets: [],
        itemsPerPage: 10,
        currentPage: 1,
      };
    },
    computed: {
    ...mapGetters([ 'getPlaces']),
    paginatedStreetNames() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getPlaces.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.getPlaces.length / this.itemsPerPage);
    },
      showPagination() {
        return this.totalPages > 1;
      },
    },
    methods: {
      ...mapGetters([ 'getPlaces']),
      ...mapMutations(['deleteMarkers', 'deletePlaces']),
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        console.log(this.currentPage)
        console.log(this.totalPages)
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      deleteSelectedRows() {
        this.selectedStreets.forEach(street => {
          const index = this.getPlaces.findIndex(s => s.id === street.id);
          if (index !== -1) {
            this.deleteMarkers(index)
            this.deletePlaces(index)
          }
        });
        this.selectedStreets = [];
      },
    },
  };
  </script>
  