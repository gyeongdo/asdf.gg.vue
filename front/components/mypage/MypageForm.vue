<template>
  <v-card>
    
    <v-toolbar flat color="primary" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar>

    <mypage-tab
        
    />
  </v-card>
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

