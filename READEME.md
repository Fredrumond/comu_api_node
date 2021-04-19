### Endpoints

- Cadastrar cidade
	- POST -> /cidade
- Cadastrar cliente
	- POST -> /cliente
- Consultar cidade pelo nome
	- GET -> /cidade?nome=
- Consultar cidade pelo estado
	- GET -> /cidade?estado=
- Consultar cliente pelo nome
	- GET -> /cliente?nome=
- Consultar cliente pelo Id
	- GET -> /cliente?id=
- Remover cliente
	- DELETE -> /cliente/:id
- Alterar o nome do cliente
	- PUT/PATCH -> /cliente/:id

### Considere o cadastro com dados básicos:
- Cidades: nome e estado
- Cliente: nome completo, sexo, data de nascimento, idade e cidade onde mora.

