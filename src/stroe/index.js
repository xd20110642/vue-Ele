import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

 const store= new Vuex.Store({
    state:{
        seller:null,
        goods:null,
        
     },
     mutations:{
        seller(state,mess){
            axios.get('/api/seller')
            .then(function (response) {
                if(response.status==200){
                 state.seller=response.data.data;
                  } 
              console.log(state.seller);
            })
            .catch(function (error) {
              console.log(error);
            });
         },
         goods(state){
            axios.get('/api/goods')
            .then(function (response) {
                if(response.status==200){
                    state.goods=response.data.data;
                  } 
              console.log(state.goods);
            })
            .catch(function (error) {
              console.log(error);
            });
         }
     },
    //  actions:{
    //      seller(context){
    //         axios.get('/api/seller')
    //         .then(function (response) {
    //             if(response.status==200){
    //               context.state.seller=response.data.data;
    //               } 
    //           console.log(context.state.seller);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //      },
    //      goods(context){
    //         axios.get('/api/goods')
    //         .then(function (response) {
    //             if(response.status==200){
                 
    //               } 
    //           console.log(context.state.goods);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //      }
    //  }
 })


 export default store