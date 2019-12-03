<template>
    <v-container>
      <h2>게시판 상세</h2>
      <board-detail-card />
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
      // const url = this.$route.params.id;
      // this.$store.dispatch('boardDetail/boardDetail', { postId : url});
    },
    fetch({ store, params }) {
      const url = params.id;
      return store.dispatch('boardDetail/boardDetail', { postId : url});
    },
    computed: {
      boardDetail() {
        console.log('boardDetail props2 :: ', this.$store.state.boardDetail.boardDetail);
        this.$store.state.boardDetail.boardDetail;
      }
    }
  }
</script>

<style>

</style>
