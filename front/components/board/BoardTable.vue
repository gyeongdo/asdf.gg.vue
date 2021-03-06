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
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="save2()">미갤</v-btn>
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="refresh(parentMessage, 'normal')">갱신</v-btn>
                  <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="getDuplicate(parentMessage)">중복</v-btn>
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
                <v-text-field v-model="type">
                  <v-icon slot="append" color="red">mdi-plus</v-icon>
                </v-text-field>
                <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="refresh(parentMessage, '')">검색</v-btn>
                <v-btn color="primary" style="margin: 3px" dark class="mb-2" @click="refresh(parentMessage, 'best')">일반</v-btn>
                <v-btn v-if="isMyList" color="primary" style="margin: 3px" dark class="mb-2" @click="deleteMylist()">삭제</v-btn>
              </template>
            </div>
          </template>
          
          <template v-slot:[`item.url`]="{ item }">
            <v-chip class="ma-2" small target="_blank" :href="item.url" color="#FF69B4" label text-color="white">{{ titleSlice(item.title) }}</v-chip>
          </template>

          <template v-slot:[`item.time`]="{ item }">
            <span class="ma-2" small label>시간: {{item.time}}  추천: {{item.recomd}}</span>
          </template>

          <template v-slot:[`item.boardOriginName`]="{ item }">
            <span class="ma-2" small label>type : {{item.boardOriginName}}</span>
          </template>


       </v-data-table>
      </div>
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
        type:'',
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
          { 
            text: 'type',
            value: 'boardOriginName'
          },
        ]
      }
    },
    fetch({ store }) {
      return this.$store.dispatch('board/loadBoards', { params : this.params});
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      isMyList() {
        return this.parentMessage === "myList"
      }
    },
    watch: {
      options: {
        handler () {
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
      // 내가 쓴 글 삭제하기
      async deleteMylist() {

        const conBtn = confirm("삭제하시겠습니까?");
        if( conBtn ) {
          console.log(conBtn);
        } else {
          return;
        }
        
        let selId = [];
        selId = this.selected.map(v => v.id);
        

        let url = "";
        let title = "";
        this.$store.state.board.mainBoards.content.map( v => {
            if(v.id === selId[0]) {
              url = v.url;
              title = v.title;
            }
        });
        
        var params = {
          id: selId[0],
          web: this.parentMessage,
        };

        await this.$store.dispatch('board/deleteMylist', { params })
          .then(()=> {
            
          });
        
      },
      // 갱신 버튼 클릭
      async refresh(web, type) {
        
        if(type == '' && this.type == '') {
          alert('검색어를 입력해주세요');
          return false;
        } else if(type != '') {
          this.type = '';
        } else if (type == '') {
          type = this.type;  
        }
        
        await this.$store.dispatch('board/getRefresh', { params: web, type})
          .then( () => {
            const { sortBy, descending, page, rowsPerPage } = this.options

            let items = this.$store.state.board.mainBoards.content;
            let total = this.$store.state.board.mainBoards && this.$store.state.board.mainBoards.totalElements;
            
            if (rowsPerPage > 0) {
              items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
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
            if (this.$store.state.board.checkDuplication.data.list.length == 0) {
              alert("중복 없음");
              this.save();
            } else {
            }
        });
        this.selected = [];
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
        selId = await this.selected.map(v => v.id);
        
        let url = [];
        let title = [];
        let boardOriginName = [];
        
        await this.$store.state.board.mainBoards.content.map( v => {
          selId.map((y, i) => {
            if(v.id === selId[i]) {
              url.push(v.url);
              title.push(v.title);
              boardOriginName.push(v.boardOriginName);
            }
          });
        });

        url = url.join('^');
        title = title.join('^');
        boardOriginName = boardOriginName.join('^');

        params = {
          id: selId[0],
          web: this.parentMessage,
          title,
          url,
          boardOriginName,
          category : 'humor'
        };

        await this.$store.dispatch('board/getSelenium', { params })
          .then(()=>{
              this.selected = [];
              this.dialog = false;
          });
      },
      // 미갤 저장할 때
      async save2() {
        this.$store.state.board.checkDuplication = [];

        var params = {};
        let selId = [];
        selId = this.selected.map(v => v.id);
        

        let url = "";
        let title = "";
        this.$store.state.board.mainBoards.content.map( v => {
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
          category : 'mystery'
        };

        await this.$store.dispatch('board/getSelenium', { params })
          .then(()=>{
              this.selected = [];
              this.dialog = false;
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
          
          let items = this.$store.state.board.mainBoards && this.$store.state.board.mainBoards.content;
          let total = this.$store.state.board.mainBoards && this.$store.state.board.mainBoards.totalElements;
          
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
.v-data-table__mobile-row {
 /* display: flex;  */
}
.v-data-table__mobile-row__cell{
  font-size: 14px;
  color: #356859 !important;
}
.v-icon.v-icon {
  font-size: 34px !important;
}


</style>
