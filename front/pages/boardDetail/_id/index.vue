<template>
    <v-container>
      <h2 v-if="boardDetail">게시판 상세</h2>
      <board-detail-card :boardDetail="boardDetail"/>
    </v-container>
</template>

<script>

import BoardDetailCard from '~/components/board/BoardDetailCard';

export default {
    components: {
      BoardDetailCard
    },
    data () {
      return {

      }
    },
    mounted() {
    
    },
    computed: {
      boardDetail() {
        return this.$store.state.boardDetail.boardDetail;
      }
    },
    fetch({ store, params }) {
      const paramsId = params.id;
      return store.dispatch('boardDetail/boardDetail', { postId : paramsId});
    },
  }
</script>

<style>

</style>
