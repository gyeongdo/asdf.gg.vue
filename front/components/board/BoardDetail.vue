<template>
  <div>
    <board-table :parentMessage="urlParam" />
    <board-table :parentMessage="myList" />
    <board-tableduple />
  </div>
</template>

<script>

  import BoardTable from '~/components/board/BoardTable'
  import BoardTableduple from '~/components/board/BoardTableduple'

  export default {
    components: {
      BoardTable,
      BoardTableduple
    },
    data () {
      return {
        dialog: false,
      }
    },
    // fetch({ store }) {
    //   console.log('fetch1');
    //   return this.$store.dispatch('board/loadBoards', { params : this.params});
    // },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      urlParam() {
          return this.$route.params.id;
      },
      myList() {
        return 'myList'
      }
    },
    methods: {
    
    },
  }

</script>

<style>

</style>