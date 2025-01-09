# Restful API Node.js - Projeto de AgricultureChallenge

Este é um projeto que implementa uma api RESTful construída com Node.js, utilizando a biblioteca Express.js e o banco de dados Postgres. O objetivo deste projeto é demonstrar como criar uma API robusta e escalável para manipular entidades em diferentes formatos atendendo os requisitos do desafio encontrado no link https://github.com/brain-ag/trabalhe-conosco.

## Requisitos
### Software Necessário

* Node.js 14 ou superior
* npm 6 ou superior
* Postgres (localhost ou conexão remota)

### Bibliotecas Utilizadas

* express: framework de desenvolvimento web
* body-parser: middleware para manipular requisições HTTP

## Instalação
Para instalar as dependências necessárias, execute o seguinte comando no terminal:
```bash
npm install
```
Isso instalará todas as dependências listadas no arquivo `package.json`.

## Execução
Para executar a aplicação, use o comando abaixo:
```bash
node app.js
```
Isso iniciará o servidor e você poderá acessar a API via browser ou ferramenta de teste.

## Rotas
Aqui estão as rotas disponíveis na aplicação:

### GET /
Retorne informações sobre a aplicação

### POST /
Crie uma nova entidade

### PUT /:id
Atualize uma entidade existente

### DELETE /:id
Remova uma entidade

## Testes
Para executar os testes, use o comando abaixo:
```bash
npm run test
```
Isso executará os testes unitários e de integração definidos no arquivo `jest.config.js`.

## Documentação
A documentação da API está disponível em `/docs` ou acessada diretamente via browser.

## Contribua
Para contribuir com este projeto, siga as seguintes instruções:

1. Faça um fork deste repositório.
2. Crie uma nova branch para desenvolvimento (git checkout -b nova-feature).
3. Implemente a sua alteração ou correção.
4. Execute os testes e verifique se tudo está funcionando corretamente.
5. Commit suas mudanças (git commit -m "descrição da alteração").
6. Faça um push para o seu repositório (git push origin nova-feature).

## Licença
Este projeto é licenciado sob a Licença MIT.