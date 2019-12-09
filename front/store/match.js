import Vue from 'vue';
import throttle from 'lodash.throttle';


export const state = () => ({
    matchList: []
})

export const mutations = {
    matchLoads(state, payload) {
        state.matchList = payload;
    },
}

export const actions = {
    // boards 등록
    async matchLoads({commit, state}, payload){

        console.log('payload : ',payload);
        try {
            const res = await this.$axios.get(`/match/${payload.name}`);
            console.log('res.data : ', res.data);
            await commit('matchLoads', res.data);
        } catch (err) {
            console.error(err);
        }
    },
}