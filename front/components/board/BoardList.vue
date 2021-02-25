<template>
  <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Calories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td><nuxt-link :to="`/boardDetail/${item.name}`">{{ item.name }}</nuxt-link></td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'ruriweb',
            calories: 159,
          },
          {
            name: 'dcBest',
            calories: 11,
          },
          {
            name: 'etorrent',
            calories: 11,
          },
          {
            name: 'lol',
            calories: 11,
          },
          {
            name: 'dogdrip',
            calories: 13,
          },
          {
            name: 'theqoo',
            calories: 'https://theqoo.net/hot?filter_mode=normal',
          },
          {
            name: 'fmkorea',
            calories: '15',
          },
          {
            name: 'fmkorea-mistery',
            calories: '15',
          },
        ],
      }
    },
  }
</script>
<style scoped>

</style>
