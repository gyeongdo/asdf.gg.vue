<template>
    <v-container>
      <h2>asdf</h2>
      <board-card />
      
      <div>
        <v-data-table
          v-model="selected"
          :single-select="singleSelect"
           show-select
          :headers="headers"
          :items="desserts"
          :search="search"
          :options.sync="options"
          :server-items-length="totalDesserts"
          :loading="loading"
          class="elevation-1"
          @click:row="selectRow"
        >

          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-spacer></v-spacer>
              
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn v-if="me" color="primary" dark class="mb-2" v-on="on">삭제</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">title</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field 
                            v-for="select in selected"
                            v-bind:key="select.id"
                            :value="select.id"
                            disabled 
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>


                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="del">삭제</v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template slot="items" slot-scope="props" >
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
        dialog: false,
        singleSelect: false,
        selected: [],
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
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
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
      close () {
        this.dialog = false
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      },
      async del(){
        
        const delId = this.selected.map(v =>{
          return v.id
        })

        await this.$store.dispatch('board/deleteBoards', {params: delId})
          .then(()=> {
            this.close();
          });
      },
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
