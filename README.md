# Arquitetura MVC adaptada a arquitetura modular e em camadas

## Modelo a ser seguido

Essa aplicação seguirá um modelo arquitetural que combina elementos da arquitetura modular com aspectos da arquitetura em camadas, usando como base a arquitetura MVC, proporcionando uma estrutura organizada e escalável.

## Definindo as tecnologias base da aplicação

Nosso projeto terá como base as seguintes tecnologias:

- Node.Js + TypeScript;
- Express.Js;

## Compreendendo a estrutura das pastas

Nossa estrutura de pastas será organizada de forma a separar os diferentes componentes da aplicação, garantindo clareza e facilidade de manutenção. 

A estrutura principal será composta por duas pastas:

- src: Esta pasta conterá todos os arquivos da aplicação, incluindo o código-fonte principal.
- test: Esta pasta será destinada aos arquivos de teste, permitindo que os testes sejam mantidos separados do código-fonte principal.

Com essa estrutura, garantimos que nosso projeto permaneça organizado, facilitando o desenvolvimento e a manutenção contínua.

## Estrutura das Pastas do Código-Fonte

Dentro da pasta `src`, nossa estrutura é organizada em três diretórios principais, cada um com uma função específica:

1. **config**: Este diretório armazena os arquivos relacionados à configuração da aplicação. Isso inclui:

   1.1. **Conexão com o banco de dados**: Arquivos responsáveis pela configuração e gerenciamento da conexão com o banco de dados.

   1.2. **Configuração de variáveis de ambiente**: O arquivo `configDotenv` carrega dinamicamente as variáveis de ambiente confidenciais, garantindo segurança e flexibilidade.

2. **core**: Neste diretório, colocamos os arquivos que complementam e suportam o código principal da aplicação, incluindo:

   2.1. **Documentação**: Arquivos de documentação que ajudam na compreensão e manutenção do código.

   2.2. **Interfaces**: Definições de interfaces para garantir a tipagem correta e a comunicação entre diferentes partes do código.

   2.3. **Middlewares**: Funções de middleware que interceptam e processam requisições antes de chegarem aos controladores.

   2.4. **Utilidades**: Funções utilitárias que são usadas em diferentes partes da aplicação, promovendo a reutilização de código.

3. **modules**: Este diretório contém os módulos principais da aplicação, organizados por funcionalidades. Cada módulo inclui:

   3.1. **Serviços**: Arquivos de serviço que contêm a lógica de negócios da aplicação.

   3.2. **Controladores**: Arquivos de controladores que gerenciam as requisições e respostas HTTP.

   3.3. **Modelos**: Definições de modelos que representam a estrutura dos dados no banco de dados.
   
   3.4. **Rotas**: Arquivos de rotas que definem os endpoints da aplicação e mapeiam as requisições para os controladores correspondentes.

Essa adaptação da conhecida arquitetura M.V.C permite uma escalabilidade e manuntenção facilitada.
