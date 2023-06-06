// import Vue from 'vue';
import Vuex from 'vuex';


export const store = new Vuex.Store({
    state:{
        storeC: {lat: 43.65, lng: -79.38},
        storeM: [],
        storeP: [],
    },
    mutations:{
        addMarkers(state, payload){
            state.storeM.push({position: payload});
        },
        addPlaces(state, payload){
            state.storeP.push(payload);
        },
        changeCenter(state, payload){
            state.storeC = payload;
        },
        deleteMarkers(state, payload){
            state.storeM.splice(payload, 1)
        },
        deletePlaces(state, payload){
            state.storeP.splice(payload, 1)
        }
    },
    actions:{
    },
    getters:{
        getCenter: state => {
            return state.storeC;
        },
        getMarker: state =>{
            return state.storeM;
        },
        getPlaces: state => {
            return state.storeP;
        }
    }
})