<template>
    <v-container>
      <div>
        <v-data-table
          v-model="selected"
           dense
           show-select
          :headers="headers"
          :sort-desc="[false]"
          :items="desserts"
          :options.sync="options"
          :server-items-length="totalDesserts"
          :loading="loading"
          class="elevation-1"
          @click:row="selectRow"
          current-items
        >

          <template v-slot:top>
            <div class="my-2"> 
              <h2 style="padding-left: 20px;">{{ parentMessage }}</h2>
            </div>

            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" v-on="on">등록</v-btn>
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="getDuplicate(parentMessage)">중복</v-btn>
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="refresh(parentMessage, 'normal')">갱신</v-btn>
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="refresh(parentMessage, 'best')">일반</v-btn>
                </template>
              </v-dialog>
              
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">등록</span>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="save">글쓰기</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

            <v-spacer></v-spacer>
            <div>
              
              <template>
                <v-text-field>
                  <v-icon slot="append" color="red">mdi-plus</v-icon>
                </v-text-field>
              </template>

            </div>
          </template>
          
          <template v-slot:item.url="{ item }">
            <v-chip class="ma-2" small target="_blank" :href="item.url" color="#FF69B4" label text-color="white">{{ titleSlice(item.title) }}</v-chip>
          </template>

          <template v-slot:item.time="{ item }">
            <span class="ma-2" small color="pink" label text-color="white">시간: {{item.time}}  추천: {{item.recomd}}</span>
          </template>


       </v-data-table>
      </div>

      <!-- 중복체크 테이블 -->

      
    </v-container>
</template>

<script>

  import BoardCard from '~/components/board/BoardCard'

  export default {
    props: { 
      parentMessage: String 
    },
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
        title: '',
        params: {
          draw: 0,
          search: '',
          skip: 0,
          sort: 'id',
          order: -1,
          limit: 20
        },
        headers: [
          { 
            text: 'title',
            value: 'url' 
          },
          { 
            text: 'info',
            value: 'time'
          },
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
              this.desserts = data.items;
              this.totalDesserts = data.total;
            })
        },
        deep: true
      }
    },
    async mounted () {
      console.log('mounted1');
      await this.getDataFromApi()
        .then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        })
    },
    methods: {
      titleSlice(title){
        if(title.length > 20){
          return title.slice(0,19) + '...';
        }
        return title;
      },
      // 갱신 버튼 클릭
      async refresh(web, type) {
        
        await this.$store.dispatch('board/getRefresh', { params: web, type})
          .then(()=> {
            const { sortBy, descending, page, rowsPerPage } = this.options
            let items = this.$store.state.board.mainBoards._embedded && this.$store.state.board.mainBoards._embedded.boardList;
            let total = this.$store.state.board.mainBoards && this.$store.state.board.mainBoards.page.totalElements;
            
            if (rowsPerPage > 0) {
              items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              console.log('items rowsPerPage : ', items);
            }
            this.loading = false
            this.desserts = items;
            this.totalDesserts = total;
          });
      },
      // 중복 체크
      async getDuplicate(web) {
        this.loading = true;
        
        await this.$store.dispatch('board/getDuplication', { params: this.selected[0].title, web })
        .then( () => {
            this.loading = false;
            console.log("kength : ", this.$store.state.board.checkDuplication.data.list);
            if (this.$store.state.board.checkDuplication.data.list.length == 0) {
              console.log("중복 없음");
              this.save();
            } else {
              console.log('중복 있음')
            }
        });
      },
      replaceAll(str, searchStr, replaceStr) {
        return str.split('bbs').join('m');
      },
      close () {
        this.dialog = false
      },
      async del(){
        const delId = this.selected.map(v => v.id);
        await this.$store.dispatch('board/deleteBoards', {params: delId})
          .then(()=> {
            this.close();
          });
      },
      // 글 등록 버튼 클릭
      async save () {
        this.$store.state.board.checkDuplication = [];

        var params = {};
        let selId = [];
        selId = this.selected.map(v => v.id);
        
        console.log("selId : ", selId);

        let url = "";
        let title = "";
        this.$store.state.board.mainBoards._embedded.boardList.map( v => {
            if(v.id === selId[0]) {
              url = v.url;
              title = v.title;
            }
        });

        params = {
          id: selId[0],
          web: this.parentMessage,
          title,
          url,
        };

        await this.$store.dispatch('board/getSelenium', { params })
          .then(()=>{
              this.selected = [];
          });
      },
      async selectRow(event) {
        // this.$router.push({
        //   path:`/boardDetail/${event.id}`
        // });
      },
      async getDataFromApi () {
        this.loading = true
        
        await this.$store.dispatch('board/loadBoards', { params : this.options, web: this.parentMessage })
          .then(()=>{

          });
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.options
          
          let items = this.$store.state.board.mainBoards._embedded && this.$store.state.board.mainBoards._embedded.boardList;
          let total = this.$store.state.board.mainBoards && this.$store.state.board.mainBoards.page.totalElements;
          
          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            console.log('items rowsPerPage : ', items);
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
.v-data-table__mobile-row {
 display: flex; 
}
.v-data-table__mobile-row__cell{
  font-size: 12px;
  color: #356859 !important;
}

</style>