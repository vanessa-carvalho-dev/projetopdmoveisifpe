# **SouConcursado**

> *O seu orientador vocacional para o serviço público*

SouConcursado é uma aplicação móvel de utilidade pública que atua como um **orientador vocacional para o serviço público**.

O seu objetivo principal é filtrar o universo diverso dos concursos e dar um ponto de partida para o candidato iniciante. Através de perguntas de múltipla escolha, a aplicação traça o perfil e fornece recomendações sobre quais carreiras públicas você pode seguir.

## O que Podemos Encontrar no Aplicativo?

- **Autenticação e Perfil:**
    - Login e cadastro para que o seu perfil e resultados fiquem guardados.
- **Quiz Vocacional (Mapeamento de Perfil):**
    - É o fluxo de perguntas de múltipla escolha para traçar o seu perfil
- **Geração de Perfil:**
    - Após responder o quiz, fica disponível o relatório com as áreas de atuação no serviço público que mais se adequam
- **Listagem de Concursos Recomendados:**
    - O app filtra a base de dados de concursos e mostra apenas aqueles que dão match com o perfil gerado.
- **Detalhes do Concurso:**
    - Permite que o utilizador clique num concurso da lista para ver mais informações incluindo o link para edital
- **Guia de Estudos:**
    - Um guia para iniciar os estudos na área recomendada com indicação de matérias que precisam ser estudadas
- **Quiz de Nivelamento:**
    - Ligado ao Guia de Estudos, esta funcionalidade permite ao utilizador fazer um breve quiz para cada matéria-base. O objetivo é que ele tenha uma percepção inicial do seu próprio nível e saiba onde precisa de concentrar mais os seus esforços.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando:
- **Expo** - Framework para desenvolvimento de aplicações React Native
- **React Native** - Framework para desenvolvimento de aplicações móveis

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (instalado globalmente ou via npx)
- Para testar no dispositivo físico: [Expo Go](https://expo.dev/go) instalado no seu smartphone (Android ou iOS)

## Como Executar o Projeto

### 1. Instalar as Dependências

Navegue até a pasta do projeto e instale as dependências:

```bash
cd my-app
npm install
```

ou, se estiver usando yarn:

```bash
cd my-app
yarn install
```

### 2. Iniciar o Servidor de Desenvolvimento

Execute o comando para iniciar o servidor Expo:

```bash
npm start
```

### 3. Executar no Dispositivo ou Emulador

Após iniciar o servidor, você verá um QR code no terminal. Você pode:

**Opção 1: Usar Expo Go no dispositivo físico**
- Abra o app **Expo Go** no seu smartphone
- Escaneie o QR code exibido no terminal
- O app será carregado no seu dispositivo

**Opção 2: Usar Emulador Android**
```bash
npm run android
```

**Opção 3: Usar Simulador iOS (apenas no macOS)**
```bash
npm run ios
```

**Opção 4: Executar no navegador (Web)**
```bash
npm run web
```

### 4. Comandos Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Inicia o app no emulador Android
- `npm run ios` - Inicia o app no simulador iOS (apenas macOS)
- `npm run web` - Inicia o app no navegador
- `npm run lint` - Executa o linter para verificar erros no código

## Estrutura do Projeto

```
projetopdmoveisifpe/
├── my-app/
│   ├── app/                    # Rotas e telas da aplicação
│   │   ├── (tabs)/            
│   │   ├── quiz.tsx          
│   │   ├── quiz-result.tsx    
│   │   ├── welcome.tsx       
│   │   └── ...
│   ├── components/            # Componentes reutilizáveis
│   ├── constants/            # Dados e constantes
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Funções utilitárias
│   └── package.json          # Dependências do projeto
└── README.md                 # Este arquivo
```

## Sobre este Projeto

Este projeto está sendo desenvolvido para avaliação na disciplina de **Programação para Dispositivos Móveis** do IFPE (Instituto Federal de Educação, Ciência e Tecnologia de Pernambuco).


## Recursos Adicionais

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/docs/getting-started)

---

**Desenvolvido por Vanessa Carvalho**

