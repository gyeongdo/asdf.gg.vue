<template>
    <v-container>
      <board-detail />
    </v-container>
</template>

<script>

import BoardDetail from '~/components/board/BoardDetail';

export default {
    components: {
      BoardDetail
    },
    data () {
      return {

      }
    },
    mounted() {
    
    },
    computed: {
    
    },
    // fetch({ store, params }) {
      // const paramsId = params.id;
      // return store.dispatch('boardDetail/boardDetail', { postId : paramsId});
    // },
  }
</script>

<style>

</style>
