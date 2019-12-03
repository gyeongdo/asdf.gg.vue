import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    boardDetail: []
})

export const mutations = {
    boardDetail(state, payload) {
        state.boardDetail = payload;
    }
}

export const actions = {
    // boards 등록
    async boardDetail({commit, state}, payload){
        try {
            const res = await this.$axios.get(`/boardDetail/${payload.postId}`);
            await commit('boardDetail', res.data);
        } catch (err) {
            console.error(err);
        }
    }

}