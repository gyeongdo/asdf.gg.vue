<template>
  <div>
    <post-images :images="post.Images || []" />
    <v-card-title>
      <h3 class="headline mb-0">
        <!-- <nuxt-link :to="'/user/' + post.user.id"> -->
        <!-- {{post.user.nickname}} -->
        <!-- </nuxt-link> -->
        <v-btn v-if="canFollow && me" small @click="onFollow">팔로우</v-btn>
        <v-btn v-else-if="canUnfollow && me" small @click="onUnfollow">언팔로우</v-btn>
      </h3>
    </v-card-title>

    <v-card-text>
      <span v-for="(node, i) in nodes" :key="i">
          <nuxt-link v-if="node.startsWith('#')" :to="`/hashtag/${node.slice(1)}`">{{node}}</nuxt-link>
          <span v-else>{{node}}</span>
      </span>

      <div>{{$moment(post.createdAt).fromNow()}}</div>
    </v-card-text>
  </div>
</template>

<script>
  import PostImages from './PostImages';
  export default {
    components: {
      PostImages,
    },
    props: {
      post: {
        type: Object,
      },
    },
    computed: {
      nodes() {
        return this.post.content.split(/(#[^\s#]+)/);
      },
      me() {
        return this.$store.state.users.me;
      },
      canFollow() {
        return this.me && this.post.User.id !== this.me.id && !this.me.Followings.find(v => v.id === this.post.User.id);
      },
      canUnfollow() {
        return this.me && this.post.User.id !== this.me.id && this.me.Followings.find(v => v.id === this.post.User.id);
      },
    },
    methods: {
      onFollow() {
        this.$store.dispatch('users/follow', {
          userId: this.post.User.id,
        });
      },
      onUnfollow() {
        this.$store.dispatch('users/unfollow', {
          userId: this.post.User.id,
        });
      },
    },
  };
</script>

<style scoped>
  a {
    text-decoration: none;
    color: inherit;
  }
</style>