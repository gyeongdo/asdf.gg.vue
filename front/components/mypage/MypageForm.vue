<template>
  
  <div>
    <v-card>
      
      <v-toolbar flat color="primary" dark>
          <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar>
      
      <mypage-tab
          
      />
    </v-card>

    <v-card>
      <v-file-input
        v-model="files"
        color="deep-purple accent-4"
        counter
        label="File input"
        multiple
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        outlined
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
    </v-card>

    <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-textarea
              label="Three rows"
              auto-grow
              outlined
              rows="3"
              row-height="25"
              shaped
            >
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              filled
              auto-grow
              label="Four rows"
              rows="4"
              row-height="30"
              shaped
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <container>
        <div>
          <img src="https://www.fmkorea.com/files/attach/new/20191212/14339012/1697021828/2483987178/99b983892094b5c6d2fc3736e15da7d1.jpg" alt="thumb_l_5BC5F08BC6A982F8F2F9A54EF9EC82B7.jpg" data-file-srl="2483987190">
          <img src="https://www.automatetheplanet.com/wp-content/uploads/2015/06/Test-URL-Redirects-WebDriver-HttpWebRequest-867x560.jpg">
        </div>
      </container>
    </div>
</template>

<script>
import MypageTab from '~/components/mypage/MypageTab'

export default {
    components: {
      MypageTab,
    },
    data() {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        files: [],
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },

  }
</script>

<style scoped>
  /* a {
    color: inherit;
    text-decoration: none;
  } */
</style>

