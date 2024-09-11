<template>
    <v-app>
        <div class="login-box">
            <v-card class="login-form">
                <v-card-title class="login-title">SignUP</v-card-title>
                <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
                <v-btn text color="light-blue" to="login">ログインはこちら </v-btn>
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="UserName"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                    <v-text-field
                    v-model="password"
                    label="password"
                    type="password">

                    </v-text-field>
                    <v-btn
                    color="success"
                    class="login-btn"
                    @click="submit"
                    :disabled="isValid">
                        SignUP
                    </v-btn>
                    <v-btn>
                        CLEAR
                    </v-btn>
                    <template>
                    <v-alert
                        dense
                        outlined
                        type="error"
                        class="error-message"
                        v-if="errorMessage"
                    >
                    {{ errorMessage }}
                    </v-alert>
                    </template>
                </v-form>
            </v-card>
        </div>
    </v-app>
  </template>
  
  <script>
  import firebase from "@/firebase/firebase"
    export default {
      data: () => ({
        valid: true,
        name: '',
        nameRules: [
          v => !!v || '名前を入力してください',
          v => (v && v.length <= 10) || '名前は10文字以内で入力してください',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        errorMessage: ""
      }),
      computed: {
        isValid(){
            return !this.valid
        }
      },
      methods: {
        async validate () {
          const { valid } = await this.$refs.form.validate()
  
          if (valid) alert('Form is valid')
        },
        reset () {
          this.$refs.form.reset()
        },
        resetValidation () {
          this.$refs.form.resetValidation()
        },
        submit () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(async (result) => {
                console.log("success", result.user)
                await result.user.updateProfile({
                    displayName: this.name
                });
                localStorage.message =" 新規作成に成功しました"
                this.$router.push('/login')
            })
            .catch((error) => {
                console.log("fail", error)
                this.errorMessage = "ユーザー認証失敗";
            })
        }
      },
    }
  </script>

<style scoped>
.login-form {
margin: 150px;
padding: 30px;
}
.login-btn {
margin-right: 20px;
}
.login-box {
    width: 50%;
    margin: 0px auto;
    padding: 30px;
}
.login-title {
    display: inline-block;
}
.error-message {
    margin-top: 20px;
}
</style>