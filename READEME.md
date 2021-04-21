# COMU_API_NODE

## Instruções de uso

#### Clonando o repositório

Execute o seguinte comando:
```terminal
$ git clone https://github.com/Fredrumond/comu_api_node
```

#### Criando arquivo .env

Para criar o arquivo `.env`  e o `.env.test` siga os seguintes passos:

- Abra seu terminal e use o seguinte comando `cp .env.example .env` e pronto o `.env` esta criado.
- - Abra seu terminal e use o seguinte comando `cp .env.test.example .env.test` e pronto o `.env.test` esta criado.

- Abra os arquivo e complete as variáveis de acordo com suas configurações

#### Instalando pacotes

```terminal
$ yarn
```

#### Rodando migration

```terminal
$ yarn sequelize db:migrate
```

#### Rodando a aplicação

```terminal
$ yarn dev
```

#### Rodando os testes

```terminal
$ yarn test
```

### Endpoints

- Cadastrar cidade
	- POST -> /cidade
``` js
Body:
{
	"name": "Congonhas",
	"state": "Minas Gerais"
}
Response:
200
{
  "message": "Cidade cadastrada com sucesso"
}
```
- Cadastrar cliente
	- POST -> /cliente
``` js
Body:
{
	"name": "Frederico Drumond",
	"sex": 1,
	"birth_date": "08/02/1993",
	"age": 28,
	"id_city": 5
}
Response:
200
{
  "message": "Cliente cadastrado com sucesso"
}
```
- Consultar cidade pelo nome
	- GET -> /cidade?nome=
``` js
Response:
200
{
  "city": {
    "id": 3,
    "name": "Congonhas",
    "state": "Minas Gerais",
    "createdAt": "2021-04-21T16:04:10.000Z",
    "updatedAt": "2021-04-21T16:04:10.000Z"
  },
  "message": "Cidade encontrada"
}
```
- Consultar cidade pelo estado
	- GET -> /cidade?estado=
``` js
Response:
200
{
  "city": [
    {
      "id": 3,
      "name": "Congonhas",
      "state": "Minas Gerais",
      "createdAt": "2021-04-21T16:04:10.000Z",
      "updatedAt": "2021-04-21T16:04:10.000Z"
    },
    {
      "id": 4,
      "name": "Congonhas",
      "state": "Minas Gerais",
      "createdAt": "2021-04-21T16:05:59.000Z",
      "updatedAt": "2021-04-21T16:05:59.000Z"
    },
    {
      "id": 5,
      "name": "Congonhas",
      "state": "Minas Gerais",
      "createdAt": "2021-04-21T19:17:56.000Z",
      "updatedAt": "2021-04-21T19:17:56.000Z"
    }
  ],
  "message": "Estado encontrado"
}
```
- Consultar cliente pelo nome
	- GET -> /cliente?nome=
``` js
Response:
200
{
  "client": {
    "id": 8,
    "name": "Frederico Drumond",
    "sex": 1,
    "birth_date": "1993-08-02",
    "age": 28,
    "id_city": 5,
    "createdAt": "2021-04-21T22:49:31.000Z",
    "updatedAt": "2021-04-21T22:49:31.000Z"
  },
  "message": "Cliente encontrado"
}
```
- Consultar cliente pelo id
	- GET -> /cliente/:id
``` js
Response:
200
{
  "client": {
    "id": 8,
    "name": "Frederico Drumond",
    "sex": 1,
    "birth_date": "1993-08-02",
    "age": 28,
    "id_city": 5,
    "createdAt": "2021-04-21T22:49:31.000Z",
    "updatedAt": "2021-04-21T22:49:31.000Z"
  },
  "message": "Cliente encontrado"
}
```
- Remover cliente
	- DELETE -> /cliente/:id
``` js
Response:
200
{
  "message": "Cliente removido"
}
```
- Alterar o nome do cliente
	- PATCH -> /cliente/:id
``` js
Body:
{
	"name": "Frederico Xavier"
}
Response:
200
{
  "message": "Cliente atualizado"
}
```
### Considere o cadastro com dados básicos:
- Cidades: nome e estado
- Cliente: nome completo, sexo, data de nascimento, idade e cidade onde mora.
