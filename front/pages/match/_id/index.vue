<template>
  <!-- <div>
    <login-form />
    
  </div> -->
  <!-- <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">BASiL</h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat color="basil">
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card> -->
<div>
  
  <!-- 검색 카드 -->
  <div class="Header">
      <!-- <v-col cols="12" sm="6" md="3"> -->
          <div>
            <v-container>
              <v-row>
                <v-col cols="4" sm="6">
                  <v-text-field
                    v-model="champId"
                    label="아이디를 입력해주세요"
                    style="width:300px;"
                    flex
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="6">
                  <v-btn
                    @click="seach"
                  >검색</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
          
          
        <!-- </v-col> -->
        
  </div>
  <!-- 검색 카드 -->

  <div class="Header">
    <div class="PastRank">
      <ul class="PastRankList">
        <li class="Item tip">
          <b>s9</b>
          Chelleanger
        </li>
      </ul>
    </div>
    <div class="Face">
      <div class="ProfileIcon">
          <div class="borderImage">
            <img class="ProfileImage" src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4216.jpg?image=q_auto&v=1518361200" />
          <span class="Level tip">112</span>
          </div>
      </div>
    </div>
    <div class="Profile">
      <div class="Information">
        <div class="Team">
            Top Esports
          <span class="Name">[Knight9]</span>
        </div>
        <span class="Name">kk9qwq</span>

      <div class="Rank">
        <div class="LadderRank">
          <a href="/ranking/ladder/summonerName=kk9qwq" class="tip Link tpd-delegation-uid-1" title="" target="_blank">
                랭킹 <span class="ranking">4</span>위
          </a>
        </div>
      </div>
      </div>
      <div class="Buttons">
        <button class="Button SemiRound Blue" id="SummonerRefreshButton" onclick="$.OP.GG.summoner.renewBtn.start(this, '82545404');" style="position: relative;">전적</button>
        <button id="top_tiergraph" class="Button SemiRound White" onclick="$.OP.GG.summoner.openLpHistoryGraph('kk9qwq', '#ExtraView');">티어 그래프</button>
      </div>

    </div>
  </div>

  <!-- body -->
  <div class="Content">
    <!-- 왼쪽 카드 -->
    <div class="SideContent">
      <div class="TierBox Box">
        <div class="SummonerRatingMedium">
          <div class="Medal tip tpd-delegation-uid-1" title="">
            <img src="//opgg-static.akamaized.net/images/medals/challenger_1.png?image=q_auto&amp;v=1" class="Image">
          </div>
          <div class="TierRankInfo">
            <div class="RankType">솔로랭크</div>
                <div class="TierRank">Challenger</div>
            <div class="TierInfo">
              <span class="LeaguePoints">
                1,478 LP
              </span>
                /
              <span class="WinLose">
                <span class="wins">691승</span>
                <span class="losses">518패</span>
                <br>
                <span class="winratio">승률 57%</span>
              </span>
            </div>
            <div class="LeagueName"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 왼쪽 카드 -->

      <!-- 오른쪽 카드 -->
      <!-- body -->
      <div class="RealContent">
        <div class="GameListContainer" data-summoner-id="82545404" data-last-info="1574454525">
          <div class="RealContentSize">			
            <div class="GameAverageStatsBox" id="GameAverageStatsBox-matches">
              <div class="Box">
                <table class="GameAverageStats">
                  <tbody>
                    <tr>
                      <td class="Title" colspan="2">
                        <div class="WinRatioTitle">
                          <span class="total">20</span>전
                          <span class="win">13</span>승
                          <span class="lose">7</span>패
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>		
          </div>
        </div>
      </div>
      <!-- body -->
  </div>

</div>
</template>

<script>

import LoginForm from '~/components/LoginForm';

export default{
  components: {
    LoginForm,
  },
  data () {
      return {
        champId:'',
        tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dol',
      }
    },
  methods: {
    seach(){
      this.$store.dispatch('match/matchLoads', {name: this.champId});
    }
  },
  
}

</script>

<style>
/* Helper classes */
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .basil {
    background-color: #FFFBE6 !important;
  }
  .basil--text {
    color: #356859 !important;
  }
  .Header {
    position: relative;
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0 0 0;
  }
  .PastRank {
    margin-top: -5px;
    padding-left: 30px;
    padding-bottom: 15px;
  }
  .PastRankList {
    display: inline-block;
    margin: 0 0 0 5px;
    padding: 0;
  }
  .Face {
    display: inline-block;
    width: 100px;
    padding-left: 30px;
    vertical-align: top;
  }
  .Profile {
    position: relative;
    display: inline-block;
    height: 100px;
    margin: 0 25px 0 25px;
    vertical-align: top;
    line-height: 1.1;
  }
  .ProfileIcon {
    position: relative;
  }
  .borderImage {
    position: absolute;
    left: -10px;
    top: -10px;
    width: 120px;
    height: 120px;
    background-position: center bottom;
    background-repeat: no-repeat;
  }
  .ProfileImage {
    display: block;
    width: 100px;
    height: 100px;
  }
  .Team {
    color: #242929;
    font-size: 12px;
    margin-bottom: 3px;
  }
  .Name {
    color: #242929;
    font-size: 20px;
    font-weight: bold;
    margin-right: 4px;
    vertical-align: middle;
  }
  .Rank {
    margin-bottom: 5px;
  }

  .SideContent {
    display: inline-block;
    width: 300px;
    font-size: 12px;
    vertical-align: top;
  }
  .RealContent {
    border-color: #242929;
    display: inline-block;
    width: 690px;
    margin-left: 10px;
    font-size: 12px;
    vertical-align: top;
  }
  .Box {
    margin-top: 50px;
    border: 1px solid #cdd2d2;
    box-shadow: 0 1px #dcdfdf;
    background: #f2f2f2;
    border-radius: 2px;
  }
  .SummonerRatingMedium {
    display: table;
    width: 100%;
    color: #879292;
    position: relative;
    background-color: #f2f2f2;
    padding: 8px 0;
  }
  .Medal {
    display: table-cell;
    vertical-align: middle;
    width: 120px;
    height: 124px;
    text-align: center;
  }
  .Medal .Image {
    width: 104px;
    height: 104px;
    margin: -5px 0 -10px 0;
  }
  .Content {
    width: 1000px;
    min-height: 500px;
    margin: 0 auto;
  }
  .RealContent {
    min-height: 500px;
    margin: 0 auto;
  }
  .GameAverageStats {
    display: table;
    width: 100%;
    table-layout: auto;
    background-color: #ededed;
  }
  .GameListContainer {
    margin-top: 10px;
  }
  .RealContentSize {
    width: 100%;
  }
</style>
