<template>
    <v-container>
      <h2>asdf</h2>
      <board-card />
      
      <div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :options.sync="options"
          :server-items-length="totalDesserts"
          :loading="loading"
          class="elevation-1"
          @click:row="selectRow"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td >{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
            </tr>
          </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
        </v-data-table>
      </div>
      
    </v-container>
</template>

<script>

  import BoardCard from '~/components/board/BoardCard'

  export default {
    components: {
      BoardCard,
    },
    data () {
      return {
        search: '',
        totalDesserts: 100,
        desserts: [],
        loading: true,
        options: {},
        params: {
          draw: 0,
          search: '',
          skip: 0,
          sort: 'id',
          order: -1,
          limit: 10
        },
        headers: [
          {
            text: 'Dessert',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ]
      }
    },
    // fetch({ store }) {
    //   console.log('fetch1');
    //   return this.$store.dispatch('board/loadBoards', { params : this.params});
    // },
    watch: {
      options: {
        handler () {
          console.log('watch1');
          this.getDataFromApi()
            .then(data => {
              this.desserts = data.items
              this.totalDesserts = data.total
            })
        },
        deep: true
      }
    },
    async mounted () {
      console.log('mounted1');
      await this.getDataFromApi()
        .then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
        })
    },
    methods: {
      async selectRow(event) {
        this.$router.push({
          path:`/boardDetail/${event.id}`
        });
      },
      async getDataFromApi () {
        console.log('method getDataFromApi');
        this.loading = true
        await this.$store.dispatch('board/loadBoards', { params : this.options})
          .then(()=>{

          });
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.options
          
          let items = this.$store.state.board.mainBoards.boards;
          let total = this.$store.state.board.mainBoards.total.length || this.$store.state.board.mainBoards.total.length;

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          this.loading = false
          resolve({
            items,
            total
          })
        })        
      },
    },
  }
</script>

<style>

</style>
