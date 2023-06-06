<template>
  <map-marker></map-marker>
  <check-table></check-table>
</template>


<script>
import MapMarker from './components/MapMarker.vue';
import CheckTable from './components/CheckTable.vue';

export default {
  name: 'App',
  components: {
    MapMarker,
    CheckTable,
  },
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
