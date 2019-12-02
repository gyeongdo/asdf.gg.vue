<template>
    
    <v-tabs
        vertical
    >
            <v-tab
                v-for="i in 3"
                v-bind:key="i"
            >
                <v-icon left>mdi-account</v-icon>
                Option {{ i }}
            </v-tab>

            <v-tab-item
                v-for="i in 3"
                v-bind:key="i"
            >
                <v-card flat>
                    <v-card-text>
                    <p>
                        asdf {{ i }}
                    </p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
    </v-tabs>

</template>

<script>
export default {
    props: {
      tab: {
        type: String,
      },
    },
    data() {
      return {
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
  .v-tab {
      margin-left:0 !important;
  }
</style>

