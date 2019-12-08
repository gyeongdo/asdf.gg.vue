<template>
  <v-container v-if="me">
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="onSubmitForm"
    >

      <v-text-field
        label="Id"
        disabled
        :value="boardDetail.id"
      ></v-text-field>
      
      <v-text-field
        :rules="nameRules"
        label="Name"
        v-model="name"
        required
      ></v-text-field>

      <v-text-field
        v-model="calories"
        label="Calories"
        required
      ></v-text-field>

      <v-text-field
        v-model="fat"
        label="Fat"
        required
      ></v-text-field>

      <v-text-field
        label="Carbs"
        v-model="carbs"
        required
      ></v-text-field>

      <v-text-field
        v-model="protein"
        label="Protein"
        required
      ></v-text-field>

      <v-text-field
        v-model="iron"
        label="iron"
        required
      ></v-text-field>

      <v-text-field
        label="userId"
        readonly
        :value="boardDetail.UserId"
      ></v-text-field>

      <v-text-field
        label="createdAt"
        readonly
        :value="$moment(boardDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')"
      ></v-text-field>

      <v-text-field
        label="updatedAt"
        readonly
        :value="$moment(boardDetail.updatedAt).format('YYYY-MM-DD HH:mm:ss')"
      ></v-text-field>

      <v-btn
        type="submit"
        :disabled="!valid"
        color="success"
        class="mr-4"
        v-if="me.id === boardDetail.UserId"
      >
        작성
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Reset Validation
      </v-btn>
    </v-form>
  </v-container>
  <v-container v-else>
    <h4>로그인 후 이용 가능합니다</h4>
    <login-form />
  </v-container>
</template>

<script>

  import LoginForm from '~/components/LoginForm';
  
  export default {
    components: {
      LoginForm
    },
    props: {
      boardDetail: {
        type:Object,
        required: true,
      }
    },
    methods: {
      onSubmitForm() {
        if (! this.$store.state.users.me) {
            alert('로그인 후 이용 가능합니다.');
            return;
        }
        const id = this.boardDetail.id;
        
        if (this.$refs.form.validate() ) {
          this.$store.dispatch('boardDetail/boardUpdate', {
            id:id,
            name:this.name,
            calories:this.calories,
            fat:this.fat,
            carbs:this.carbs,
            protein:this.protein,
            iron:this.iron,
          });
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        console.log('valid', this.$store.state.users.me);
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },

    data() {
      return {
        valid: true,
        name: this.boardDetail.name,
        calories: this.boardDetail.calories,
        fat: this.boardDetail.fat,
        carbs: this.boardDetail.carbs,
        protein: this.boardDetail.protein,
        iron: this.boardDetail.iron,
        nameRules: [
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        checkbox: false,
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
  a {
    color: inherit;
    text-decoration: none;
  }
</style>
