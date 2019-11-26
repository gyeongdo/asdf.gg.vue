<template>
  <v-app id="inspire">
    <nav>
      <v-toolbar>
        <v-toolbar-title>  
          <nuxt-link to="/">ASDF.GG</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-for="item in items"
            :key="item.icon"
            :to="item.link"
            text
          >{{ item.title }}</v-btn>
        </v-toolbar-items>

        <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
                color="black"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-btn text nuxt :to="item.url" :style="{ display: 'flex', alignItems: 'center' }">
                  {{ item.title }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

      </v-toolbar>

      <!-- <v-toolbar dark color="darkgrey">
        <v-toolbar-title>
          <nuxt-link to="/">asdf.gg</nuxt-link>
        </v-toolbar-title>

          <v-spacer />

        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field
                v-model="hashtag"
                label="검색"
                hide-details
                prepend-icon="mdi-magnify"
              />
            </div>
          </v-form>
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>

      </v-toolbar> -->
    </nav>

    <!-- 메인 -->
    <v-row no-gutters>
      
      <v-col cols="12" md="2">
        <login-form />
      </v-col>
      
      <v-col cols="12" md="10">
        <nuxt />
      </v-col>
      
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
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
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
        hashtag: '',
         items: [
          { title: 'profile', url: '/profile' },
          { title: 'signup', url: '/signup' },
          { title: 'board', url: '/board' },
          // { title: 'Click Me4' },
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
    },
    computed: {
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
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }

  img {
    padding-right: 5px;
    width: 30px;
  }
</style>
