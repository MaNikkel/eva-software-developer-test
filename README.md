# Teste para a vaga de Software Developer

- Essa aplicação implementa o [desafio proposto](./ASSIGNMENT.md)

- Para cumprir o desafio, foram usadas as tecnologias e ferramentas:

  - Express para servidor HTTP
  - BullMQ como fila de mensagens
  - MongoDB como banco
  - Typescript (Backend e Frontend)
  - React usando Create React App
  - Tailwindcss

- Para os testes, foram utilizados:
  - jest (Backend e Frontend)
  - React Testing Library
  - MSW para mock de api no front

# Arquitetura

- O projeto se baseia numa arquitetura de adaptadores e padrões do DDD
  - Adapters serve como camada de desacoplamento das regras de negócio de implementações concretas
  - Domain segura todas as regras principais do projeto, nela se encontram as jornadas disponíveis dentro de factories
  - Infra faz a implementação da Complexidade Acidental do projeto (Banco de Dados, camada HTTP, Worker da fila etc)
  - Application orquestra a ordem que as operações devem ser processadas

# Testes

- Para rodar os testes unitários, temos um comando para o client e outro para o server:
  - `npm run -w server test`
  - `npm run -w client test`

# Iniciando o projeto

- Pré requisitos:

  - docker
  - docker compose

- Com os requisitos atendidos, basta rodar:

  - `docker compose up` ou `docker compose up -d`

- Para encerrar:

  - `docker comose down`

- Caso queira recriar os dados do banco, basta rodar:
  - `docker compose up seed -d` ou `docker compose exec api npm run seed`

# O que pode ser melhorado

- Erros

  - nem todos os possíveis erros estão sendo tratados no back, o que poderia ser melhorado visando uma estabilidade maior
  - no front não está previsto tratamento de erros, poderia ser usada uma estratégia para dar um feedback ao usuário via toast

- UX

  - O front conta apenas com um design simples sem micro experiências de UX (loading, feeadback etc) o que poderia agregar valor

- Criação dinâmica de jornadas
  - No momento as jornadas estão sendo criadas via código por meio de factories, porém poderia ser adicionada uma granularidade maior e deixar com que o usuário final possa criar as jornadas baseado em ações iniciais

# Demo

<video  controls>
  <source src="./docs/demo.mov" type="video/mp4">
</video>
