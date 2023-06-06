<template>
  <div>
    <p>Local Time: {{ localTime }}</p>
    <p>Time Zone: {{ timeZone }}</p>
  </div>
  <GMapAutocomplete
    placeholder="Enter an location"
    @place_changed='setPlace'
    style="width: 300px; height: 30%"
    @keyup.enter="addMarker"
  >
  </GMapAutocomplete>
  <button
      @click='addMarker'>Add
  </button>
  <button @click="geolocate">Get Current Location</button>
  <GMapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 300px" 
  >
    <GMapMarker
      v-for="marker in markers"
      :key="marker.id"
      :position="marker.position"
    />
  </GMapMap>
</template>
<script>


import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      currentPlace: null,
      timeZone: '',
      utcOffset: -5,
      localTime: "",
    }
  },
  computed: { 
    ...mapGetters(['getCenter', 'getMarker', 'getPlaces']),
    center (){
      return this.getCenter
    },
    markers () {
      return this.getMarker
    },
    places (){
      return this.getPlaces
    },
  },  
  methods: {
  ...mapMutations(['addMarkers', 'addPlaces', 'changeCenter']),
  setPlace(place) {
    this.currentPlace = place;
  },
  addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        
        this.addMarkers(marker)
        this.addPlaces(this.currentPlace) 
        this.changeCenter(marker)
        this.utcOffset = this.currentPlace.utc_offset/60
        this.getTimeZone()
        this.currentPlace = null;
      }
    },
  geolocate: function() {
    navigator.geolocation.getCurrentPosition(position => {  
      const current = {
        lat: position.coords.latitude, lng: position.coords.longitude,
      }
      this.changeCenter(current)
    });
  },
  getTimeZone() {
      const timeZone = Intl.DateTimeFormat(undefined, {
        timeZoneName: 'long',
        timeZone: `ETC/GMT${this.utcOffset < 0 ? '-' : '+'}${Math.abs(
          this.utcOffset
        )}`,
      }).resolvedOptions().timeZone;
      this.timeZone = timeZone;
      var d = new Date();
      var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      this.localTime = new Date(utc + (3600000*this.utcOffset));
    },
},
}
</script>