import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainBoards: [],
})

export const mutations = {
    loadBoards(state, payload) {
        state.mainBoards = payload;
    },
    addMainBoard(state, payload) {
        state.mainBoards.boards.unshift(payload);
    }
}

export const actions = {
    // boards 등록
    post({ commit, state }, payload) {
        this.$axios.post('/board', {
            name: payload.name,
            calories: payload.calories,
            fat: payload.fat,
            carbs: payload.carbs,
            protein: payload.protein,
            iron: payload.iron,
        }, {
            withCredentials: true,
        })
            .then((res) => {
                commit('addMainBoard', res.data);
            })
            .catch((err) => {
                console.log(err);
            });           
    },
    
    // boards 테이블 조회
    async loadBoards({ commit, state}, payload) {
        try {
            const res = await this.$axios.get('/board/boards',payload);
            await commit('loadBoards', res.data);
          } catch (err) {
            console.error(err);
          }  
    }
    

}