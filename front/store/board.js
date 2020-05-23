import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainBoards: [],
    checkDuplication: [],
})

export const mutations = {
    loadBoards(state, payload) {
        state.mainBoards = payload;
    },
    checkDuplication(state, payload) {
        state.checkDuplication = payload;
    }
}

export const actions = {
    // boards 등록
    // post({ commit, state }, payload) {
    //     this.$axios.post('/board', {
    //         name: payload.name,
    //         calories: payload.calories,
    //         fat: payload.fat,
    //         carbs: payload.carbs,
    //         protein: payload.protein,
    //         iron: payload.iron,
    //     }, {
    //         withCredentials: true,
    //     })
    //         .then((res) => {
    //             commit('addMainBoard', res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });           
    // },
    // // board 테이블 삭제
    // async deleteBoards({commit, state}, payload) {
    //     try{
    //         this.$axios.delete('/board/delete',payload,{ withCredentials: true,})
    //         .then(() => {
    //             commit('removeBoards', payload);
    //           })
    //         .catch(() => {

    //         });
    //     } catch(err) {
    //         console.log(err);
    //     }
    // },

    // boards 테이블 조회
    async loadBoards({ commit, state}, payload) {
        try {
            var convertPayload = {
                params : {
                    page: parseInt(payload.params.page) -1,
                    size: payload.params.itemsPerPage == -1 ? state.mainBoards.page.totalElements : payload.params.itemsPerPage,
                    sort: 'id,asc',
                }
            };
            const res = await this.$axios.get(`/api/boards/${payload.web}`, convertPayload);
            await commit('loadBoards', res.data);
          } catch (err) {
            console.error(err);
          }  
    },
    // 글작성
    async getSelenium({ commit, state }, payload) {
        try {
            this.$axios.post(`/api/selenium/${payload.params.web}`, {
                    id: payload.params.id,
                    url: payload.params.url,
                    title: payload.params.title,
                    category : payload.params.category,
                })
                .then(()=> {
                    // commit('removeBoards', payload);
                })
                .catch(( err ) => {
                    console.log('catch : ', err);
                });
            
        } catch(err) {
            console.log(err);
        }
    },
    // 배치 갱신
    async getRefresh({commit, stats}, payload) {
        try{
            var convertPayload = {
                params : {
                    page: 0,
                    size: 10,
                    sort: 'id,asc',
                    type: payload.type,
                }
            };

            await this.$axios.get(`/api/batch/${payload.params}/${payload.type}`, convertPayload)
            .then((res)=> {
                commit('loadBoards', res.data);
            })
            .catch(() => {

            });
        } catch(err) {
            console.log(err);
        }
    },
    // 중복 확인
    async getDuplication({ commit, stats }, payload) {
        try{
            const search = {
                title: payload.params
            };
            await this.$axios.post(`/api/batch/duplication`, search)
            .then((res)=> {
                commit('checkDuplication', res.data);
            })
            .catch(() => {

            });
        } catch(err) {
            console.log(err);
        }
    }
    

}