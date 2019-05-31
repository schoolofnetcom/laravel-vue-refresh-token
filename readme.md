# Novas features

**Ver no branch new_features.**

- interceptor do Axios movido para dentro do plugin
- client_id e client_secret podem vir de fora do plugin (facilita na hora de usar - reusabilidade)
- a ação quando o refresh falha pode ser configurada na opção refresh_fail_callback, sem a necessidade de editar o plugin
- limite maximo de tentativas ainda é 10, mas pode ser alterada na opção refresh_limit

## Como usar

```
Vue.use(passport, {
    client_id: '2',
    client_secret: 'PqFvDapAoL0GY1Sr03kqhOaalSZIAB3EqZCm0UPE',
    refresh_fail_callback() {
        console.log('refresh token falhou');
    },
    refresh_limit: 3
});
```