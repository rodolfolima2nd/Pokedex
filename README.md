# 🔴 Pokédex

<div align="center">

![Status](https://img.shields.io/badge/status-ativo-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![PokeAPI](https://img.shields.io/badge/PokeAPI-ef5350)

Uma Pokédex web responsiva que apresenta os 151 primeiros Pokémon da PokeAPI.

O projeto permite explorar os Pokémon em uma lista com tipos e imagens, além de abrir um modal com detalhes adicionais.

</div>

## ✨ Funcionalidades

- Lista os 151 primeiros Pokémon da PokeAPI.
- Exibe número, nome, tipos e imagem em cartões responsivos.
- Abre um modal com detalhes do Pokémon ao clicar no cartão.
- Suporta abertura dos detalhes com `Enter` ou `Espaço`.
- Exibe altura, peso, atributos-base, habilidades e descrição da espécie.
- Permite fechar o modal pelo botão, pelo fundo escurecido ou pela tecla `Esc`.
- Inclui animação nos cartões e respeito à configuração de movimento reduzido do sistema.

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript
- PokeAPI
- Normalize.css
- Google Fonts: Roboto

## 📋 Pré-requisitos

Não há dependências ou ferramentas de build obrigatórias.

Para executar o projeto, você precisa de:

- Um navegador moderno;
- Uma conexão com a internet, pois os dados e algumas imagens são obtidos da PokeAPI;
- Opcionalmente, um servidor local, como a Live Server do VS Code ou o Apache do XAMPP.

## 🚀 Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/rodolfolima2nd/Pokedex.git
cd Pokedex
```

O projeto não possui instalação de pacotes. Não é necessário executar `npm install` ou gerar arquivos de build.

## ▶️ Como executar

### Visual Studio Code

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão Live Server, se ainda não estiver disponível.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.

### XAMPP

1. Coloque a pasta do projeto dentro de `C:\xampp\htdocs`.
2. Inicie o Apache pelo painel de controle do XAMPP.
3. Acesse `http://localhost/Pokedex/`.

Também é possível abrir `index.html` diretamente em um navegador moderno.

## 🎮 Como utilizar

Ao carregar a página, os cartões dos Pokémon são gerados automaticamente a partir da PokeAPI.

- Passe o mouse sobre um cartão para reproduzir a animação.
- Clique em um cartão para abrir os detalhes.
- Use `Enter` ou `Espaço` quando um cartão estiver selecionado pelo teclado.
- Feche o modal pelo botão `×`, pelo fundo escuro ou pela tecla `Esc`.

## 📁 Estrutura do projeto

```text
Pokedex/
├── index.html
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   └── pokedex.css
│   └── js/
│       └── main.js
└── README.md
```

- `index.html`: estrutura principal da página e inclusão dos recursos.
- `assets/css/global.css`: estilos base e configurações responsivas gerais.
- `assets/css/pokedex.css`: grade dos Pokémon, cartões e modal de detalhes.
- `assets/js/main.js`: consulta à PokeAPI e criação dos elementos na página.

## 🧪 Testes

O projeto não possui testes automatizados. Para validar as alterações, execute-o em um servidor local e verifique a carga dos Pokémon, a abertura e o fechamento dos detalhes e o layout em diferentes tamanhos de tela.

## 🤝 Contribuição

Contribuições são bem-vindas.

1. Faça um fork do repositório.
2. Crie uma branch para sua alteração:

   ```bash
   git checkout -b minha-melhoria
   ```

3. Faça e teste as alterações.
4. Envie um pull request com uma descrição clara do que foi modificado.

Para mudanças maiores, abra uma issue antes para discutir a proposta.

## 💬 Suporte

Se encontrar um problema ou tiver uma sugestão, utilize a [página de issues](https://github.com/rodolfolima2nd/Pokedex/issues) deste repositório.

## 🙏 Créditos

- Dados e imagens: [PokeAPI](https://pokeapi.co/)
- Sprites: [PokeAPI Sprites](https://github.com/PokeAPI/sprites)
- Ícones visuais e identidade: comunidade Pokémon
- Autor: [rodolfolima2nd](https://github.com/rodolfolima2nd)

## 📄 Licença

Este projeto ainda não possui um arquivo de licença definido. Até que uma licença seja adicionada, os direitos de uso não estão explicitamente concedidos pelo repositório.
