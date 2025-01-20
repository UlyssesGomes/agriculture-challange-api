# Restful API Node.js - Projeto de AgricultureChallenge

Este é um projeto que implementa uma api RESTful construída com Node.js com Nestjs e o banco de dados PostgreSQL. O objetivo deste projeto é demonstrar como criar uma API robusta e escalável para manipular entidades em diferentes formatos atendendo os requisitos do desafio encontrado no link https://github.com/brain-ag/trabalhe-conosco.

## Requisitos
### Software Necessário

* Node.js 22.13.0
* npm 10.9.2
* PostgreSQL 9.5.22

### Bibliotecas Utilizadas

* winston: biblioteca de log para gerenciar logs da aplicação
* body-parser: middleware para manipular requisições HTTP e extrair dados dos corpos das mensagens
* @nestjs/common: pacote do NestJS para comum utilização em projetos
* @nestjs/config: pacote do NestJS para configuração de variáveis de ambiente
* @nestjs/core: pacote do NestJS para core da aplicação
* @nestjs/platform-express: pacote do NestJS para plataforma Express.js
* @nestjs/swagger: pacote do NestJS para geração de documentação Swagger
* @nestjs/typeorm: pacote do NestJS para integração com TypeORM
* class-transformer: biblioteca para transformar objetos entre formatos (ex: JSON -> Object)
* class-validator: biblioteca para validação de objetos
* dotenv: pacote para carregar variáveis de ambiente a partir de um arquivo .env
* nest-winston: pacote do NestJS para integração com winston
* pg: driver do PostgreSQL para Node.js
* reflect-metadata: biblioteca para reflexão metadados em TypeScript
* rxjs: biblioteca para manipulação de observáveis (async/await)
* swagger-ui-express: pacote para renderização da documentação Swagger
* typeorm: biblioteca de ORM (Object-Relational Mapping) para PostgreSQL
* winston: biblioteca de log para gerenciar logs da aplicação

## Instalação
Para instalar as dependências necessárias, execute o seguinte comando no terminal:
```bash
npm install
```
Isso instalará todas as dependências listadas no arquivo `package.json`.

## Execução
Para executar a aplicação, use o comando abaixo:
```bash
npm run start:dev
```
Isso iniciará o servidor e você poderá acessar a API via browser ou ferramenta de teste.

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