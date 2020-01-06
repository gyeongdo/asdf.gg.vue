<template>
<v-container>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="onSubmitForm"
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="calories"
      :counter="10"
      :rules="nameRules"
      label="Calories"
      required
    ></v-text-field>

    <!-- <v-text-field
      v-model="fat"
      :counter="10"
      :rules="nameRules"
      label="Fat"
      required
    ></v-text-field>

    <v-text-field
      v-model="carbs"
      :counter="10"
      :rules="nameRules"
      label="Carbs"
      required
    ></v-text-field>

    <v-text-field
      v-model="protein"
      :rules="nameRules"
      label="Protein"
      required
    ></v-text-field>

    <v-text-field
      v-model="iron"
      :rules="nameRules"
      label="iron"
      required
    ></v-text-field> -->

    <!-- <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Iron"
      required
    ></v-select> -->

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      type="submit"
      :disabled="!valid"
      color="success"
      class="mr-4"
    >
      작성
    </v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
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


</template>

<script>

  export default {
  
    methods: {
      onSubmitForm() {
        if (! this.$store.state.users.me) {
            alert('로그인 후 이용 가능합니다.');
            return;
          }
        if (this.$refs.form.validate() ) {
          this.$store.dispatch('board/post', {
            name: this.name,
            calories: this.calories,
            fat: this.fat,
            carbs: this.carbs,
            protein: this.protein,
            iron: this.iron,
          });
        }
        this.reset();
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
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        iron: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
          '1',
          '2',
          '3',
          '4',
        ],
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
