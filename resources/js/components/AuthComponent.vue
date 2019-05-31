<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        <form @submit.prevent="auth()">

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input v-model="authData.username" id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Senha</label>

                                <div class="col-md-6">
                                    <input v-model="authData.password" id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                    <button type="button" class="btn btn-primary" @click="teste()">
                                        teste
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                authData: {},
            };
        },
        methods: {
            auth() {
                this.$passport.accessToken(this.authData);
            },
            teste() {
                axios.get('/api/user').then((res) => {
                    console.log('usuário atual: ',res.data);
                });
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
