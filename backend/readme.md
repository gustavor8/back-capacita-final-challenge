# DripStore API

API REST para gerenciamento de produtos e imagens, usando Node.js, Sequelize e MySQL.

---

## Tecnologias

- Node.js
- Sequelize (ORM)
- MySQL
- Express (presumido)

---

## Configuração

- Configure o banco em `config/connection.js` com suas credenciais MySQL.
- Instale dependências: `npm install`
- A sicronização é autmatica quando você executar o server.js

---

## Modelos principais

### ProductModel

- Campos: `productId` (PK, auto-increment), `title`, `description`, `assessment`, `model`, `mark`, `ref`, `realPrice`, `descontedPrice`
- Tabela: `products`
- Sem timestamps

### ImageModel

- Campos: `imageId` (PK, auto-increment), `url`, `productId` (FK)
- Tabela: `images`
- Sem timestamps

### Associações

- `ProductModel.hasMany(ImageModel, { as: "images" })`
- `ImageModel.belongsTo(ProductModel, { as: "product" })`

---

## Endpoints principais (base `/products`)

| Método | Rota          | Descrição                            |
| ------ | ------------- | ------------------------------------ |
| GET    | /products     | Lista produtos com imagens           |
| GET    | /products/:id | Produto específico com imagens       |
| POST   | /products     | Cria produto com imagens             |
| PUT    | /products/:id | Atualiza produto e substitui imagens |
| DELETE | /products/:id | Deleta produto e imagens             |

---

## Exemplo JSON para criar/atualizar produto

```json
{
  "title": "Tênis Nike Air Max",
  "description": "Tênis esportivo confortável.",
  "assessment": 4.5,
  "model": "Air Max 2024",
  "mark": "Nike",
  "ref": "NKAM2024",
  "realPrice": "799.00",
  "descontedPrice": "599.99",
  "images": [
    {
      "url": "https://i.pinimg.com/originals/a8/21/74/a82174fd43b2b85e029b61dcdcbfeb69.jpg"
    },
    {
      "url": "https://ae01.alicdn.com/kf/S65c848eea942487d8371cb45df7d62b4P.jpg"
    }
  ]
}
```

## O que foi entregue

- Modelos `ProductModel` e `ImageModel` configurados e associados corretamente.
- Endpoints REST para criação, leitura, atualização e exclusão de produtos, com gerenciamento das imagens relacionadas.
- Configuração automática da base MySQL via Sequelize.
- Documentação básica com exemplos de uso.
- Tratamento de erros para operações comuns.

## Testes

Foram realizados testes manuais em todas as rotas utilizando Postman, garantindo o correto funcionamento das operações e a integridade das associações entre produtos e imagens.

## Pendências futuras (recomendadas)

- Implementar validações mais robustas e tratamento de erros aprimorado.
- Adicionar autenticação e controle de acesso.
- Desenvolver testes automatizados.
- Preparar documentação formal da API (ex: Swagger).
- Planejar deploy em ambiente de produção com variáveis de ambiente configuradas.

O projeto está funcional e pronto para uso inicial em ambiente de desenvolvimento. As melhorias propostas poderão ser implementadas em próximas fases para tornar a API mais segura, escalável e robusta.

```

```
