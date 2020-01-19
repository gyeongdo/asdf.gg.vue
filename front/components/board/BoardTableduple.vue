<template>
  <!-- <v-simple-table class="elevation-1" fixed-header height="300px"> -->
    <!-- <table> -->
    <!-- <template v-slot:default> -->
      <!-- <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
      <tbody> -->
        <!-- <template v-if="checkDuplication.length != 0">
          <tr v-for="list in checkDuplication.data.list" :key="list.name" class="clear">
            <td><h4>{{ list.title }}</h4></td>
          </tr>
         </template> -->
      <!--</tbody> -->
    <!-- </template> -->
  <!-- </v-simple-table> -->
  <!-- </table> -->
  <v-container>
  <div class="bd_lst_wrp">
    <div class="tl_srch clear tl_srch_">
      <div class="bd_tl">
        <h1 class="ngeb clear">fm</h1>
      </div>
    </div>
    <template v-if="checkDuplication.length != 0">
      <ol class="bd_lst bd_zine zine zine1 bd_m_lst img_load">
        <li class="clear" v-for="list in checkDuplication.data.list" :key="list.name">	
          <div class="rt_area">		
            <h4>		
              <a :href="list.url" target="_blank">
                {{ list.title }}
              </a>	
            </h4>		
            <div class="info">		
              <span><i class="fa fa-clock-o"></i>	
              <b>{{ list.time }}</b>		
              </span>	
              <span ><i class="fa fa-star"></i><span>추천</span><b>{{ list.recomd }}</b></span>
            </div>
          </div>	
        </li>
      </ol>
    </template>
    <template v-else>
      <ol class="bd_lst bd_zine zine zine1 bd_m_lst img_load">
        <li>
          <div class="rt_area">		
            <h4>
              값이 없어요.
            </h4>
          </div>
        </li>
      </ol>
    </template>
  </div>
  </v-container>
</template>
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>
</v-container>
<script>
  import { mapState } from 'vuex';

  export default {
    data () {
      return {
        
      }
    },
    methods: {
        
    },
    mounted () {
      
    },
    computed: {
      ...mapState('board', ['checkDuplication']),
    },
  }
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }
  .bd_lst_wrp {

  }
  .clear {
    margin: 0;
    padding: 10px;
  }
  .info {
    font-size: 11px;
    line-height: 1;
    color: #999;
    word-break: break-word;
    list-style: none;
    background-color: aliceblue !important;
  }
  .bd_lst {
    list-style: none;
  }
</style>
