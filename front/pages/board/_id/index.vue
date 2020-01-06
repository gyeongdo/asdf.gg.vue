<template>

      <board-list />
      
</template>

<script>

  import BoardCard from '~/components/board/BoardCard'
  import BoardTable from '~/components/board/BoardTable'
  import BoardList from '~/components/board/BoardList'

  export default {
    components: {
      BoardCard,
      BoardTable,
      BoardList,
    },
    data () {
      return {
        
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    watch: {

    },
    async mounted () {
      console.log('mounted1');

    },
    methods: {
      close () {
        this.dialog = false
      },



    },
  }
</script>

<style>

</style>
