<template>
  <v-app id="inspire">
    <nav>
      <v-toolbar>
        <!-- 좌측 홈 링크 -->
        <v-toolbar-title>  
          <nuxt-link to="/">veneziar.com</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- 좌측 홈 링크 -->

        <!-- 우측 큰 웹화면 메뉴 -->
        <v-toolbar-items 
          class="hidden-sm-and-down"
        >
        <template v-for="item in items">
          <v-btn
             v-if="item.title !== 'login'"
            :key="item.icon"
            :to="item.url"
            text
            class="btn-span"
          >{{ item.title }}</v-btn>

          <!-- <v-btn
             v-if="item.title === 'login'"
            :key="item.icon"
            :to="item.url"
            text
            class="btn-span"
            @click="loginDialog()"
          >
          {{ isLogin }}
          </v-btn> -->

          <v-btn
             v-if="item.title === 'login'"
            :key="item.icon"
            :to="item.url"
            text
            class="btn-span"
            @click="loginDialog()"
          >
          {{ isLogin }}
          </v-btn>
            
        </template>
        </v-toolbar-items>
        <!-- 우측 큰 웹화면 메뉴 -->

        <!-- 우측 드랍다운 메뉴 -->
        <template>
          <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  icon
                  v-on="on"
                  color="black"
                  class="hidden-md-and-up"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <v-btn v-if="item.title !== 'login'" text nuxt :to="item.url" :style="{ display: 'flex', alignItems: 'center' }">
                    {{ item.title }}
                  </v-btn>
                  <v-btn v-else text :style="{ display: 'flex', alignItems: 'center' }" @click="loginDialog()">
                    {{ isLogin }} 
                  </v-btn>

                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <!-- 우측 드랍다운 메뉴 -->

      </v-toolbar>

      <v-dialog
        v-model="dialog3"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span>Login</span>
            <v-spacer></v-spacer>
            <login-form />
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="loginDialog()"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </nav>

    <!-- 메인 -->
    <v-row no-gutters>
      
      <!-- <v-col cols="12" md="2">
      </v-col> -->
      
      <v-col cols="12" md="12">
        <nuxt />
      </v-col>

      <!-- <v-col cols="12" md="2">
      </v-col> -->
      
    </v-row>

    <!-- footer kd add -->
    <v-footer
        dark
        padless
      >
        <v-card
          text
          tile
          class="darkgrey lighten-1 white--text text-center"
        >
          <v-card-text>

            <div>
              <img :src="icon" alt="icon">
              <img :src="icon1" alt="icon">
              <img :src="icon2" alt="icon">
              <img :src="gmailIcon" alt="icon">
            </div>
            
          </v-card-text>

          <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
          </v-card-text>
        </v-card>
      </v-footer>
      <!-- footer kd add -->


  </v-app>
</template>

<script>
  import LoginForm from '~/components/LoginForm';

  export default {
    components: {
      LoginForm,
    },
    data() {
      return {
        dialog3: false,

        hashtag: '',
         items: [
          { title: 'profile', url: '/profile' },
          { title: 'signup', url: '/signup' },
          { title: 'board', url: '/board' },
          { title: 'match', url: '/match' },
          { title: 'boardToFm', url: '/boardToFm' },
          { title: 'login', },

          // { title: 'login', @click="dialog3 = !dialog3" },
        ],
      };
    },
    methods: {
      onSearchHashtag() {
        this.$router.push({
          path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
        });
        this.hashtag = '';
      },
      loginDialog() {
        if( this.me ) {
          this.$router.push({
            path: '/mypage',
          });
        } else {
          this.dialog3 = !this.dialog3
        }
      },
      // isLogin() {
      //   if( this.me ){
      //     return 'Mypage';
      //   } {
      //     return 'Login';
      //   }
      // }
    },
    computed: {
      isLogin() {
        if( this.me ){
          return 'Mypage';
        } {
          return 'Login';
        }
      },
      me() {
        return this.$store.state.users.me;
      },
      icon () { 
        return require('@/static/icon/email-24px.svg') 
      },
      icon1 () { 
        return require('@/static/icon/facebook-social-media-svgrepo-com.svg') 
      },
      icon2 () { 
        return require('@/static/icon/Instagram.svg') 
      },
      gmailIcon () { 
        return require('@/static/icon/New_Logo_Gmail.svg') 
      },
    },
  };
</script>

<style scoped>
  a {
    /* display: inline-block; */
    text-decoration: none;
    color: inherit;
  }

  img {
    padding-right: 5px;
    width: 30px;
  }

</style>
