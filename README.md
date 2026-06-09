# SwarmBuild Ops — Companheiro Mobile (Global Solution)

Aplicativo mobile em **React Native + Expo** para o tema da Global Solution
**SwarmBuild**: um enxame de rovers autônomos constrói uma cúpula de habitat lunar e o
canteiro **se auto-recupera** quando um rover falha — o lease da tarefa expira e ela é
reauctioná-da para um rover saudável, sem intervenção da Terra.

Este app é o **lado Terra** (central de operações): o operador acompanha os rovers,
**reporta ocorrências** observadas na telemetria e recebe a resposta do coordenador.

> Projeto-base da solução (simulação + coordenador em Go + dashboard 3D): `gs-fiap-space`.
> Este repositório é o cliente mobile que conversa com aquele domínio.

## Tema e objetivo

- **Tema:** orquestração de enxame para construção autônoma em ambiente hostil (cúpula lunar).
- **Objetivo do app:** permitir que um operador na Terra **consulte o canteiro**,
  **informe uma ocorrência** sobre um rover e **acompanhe a resposta de auto-recuperação**
  do sistema, mantendo um **histórico local** das ocorrências.

## Fluxo completo de uso

```
Início ─▶ Rovers (listagem) ─▶ Detalhe do rover ─▶ Reportar ocorrência
                                                          │
                                                          ▼
                              Histórico  ◀── Status/Confirmação (resposta do sistema)
```

1. **Início** — visão geral da missão (progresso da cúpula, rovers ativos, nº de ocorrências)
   e o **Monitor do enxame** (ativa alertas e simula um evento de auto-recuperação).
2. **Rovers** — listagem do roster com status de cada rover.
3. **Detalhe do rover** — dados do rover e a tarefa que ele detém; atalho para reportar.
4. **Reportar ocorrência** — formulário validado (rover, tipo, severidade, descrição).
5. **Status/Confirmação** — resposta do sistema: explica a expiração do lease e a
   reauction (self-heal) da tarefa afetada.
6. **Histórico** — todas as ocorrências registradas (persistidas localmente); toque para
   rever os detalhes; opção de limpar.

## Recurso mobile utilizado — Notificações

O app usa **`expo-notifications`** (notificações locais) porque é exatamente o que um
**companheiro de operações** faz: avisar o operador no celular quando o enxame reage. Dois
pontos de uso, ambos alinhados ao tema:

- **Resposta do coordenador:** ao registrar uma ocorrência, o coordenador devolve a ação de
  auto-recuperação como uma **notificação** ("lease expirado → tarefa reauctioná-da para um
  rover saudável"). Tocar no alerta faz **deep-link** para a tela de status da ocorrência.
- **Monitor do enxame (Início):** o botão "Simular evento do enxame" dispara um alerta de
  falha de rover + reauction — ótimo para demonstrar o self-heal no vídeo.

O fluxo trata:

- pedido de permissão em tempo de execução (botão "Ativar alertas");
- **permissão negada** (mensagem clara; o app segue funcional, mostrando a resposta na tela);
- **deep-link** ao tocar na notificação, inclusive com o app fechado (cold start).

São **apenas notificações locais** (sem servidor), então o fluxo é demonstrável offline. A
configuração do plugin fica em `app.json` (plugin `expo-notifications`).

> Notificações locais funcionam no **Expo Go (iOS)** e em qualquer **development build**.

## Manipulação de dados

- **Estado do canteiro (rovers e tarefas):** dados simulados em `src/services/worksite.ts`
  (representam o que viria do coordenador) — exibidos nas telas de listagem e detalhe.
- **Ocorrências:** persistidas localmente com **AsyncStorage** (`src/services/reports.ts`),
  sobrevivendo a reinícios do app. CRUD: criar, listar (ordenado por data), buscar por id e limpar.

## Tratamento de erros e validações

- Formulário: campos obrigatórios (rover, tipo, severidade), descrição com tamanho mínimo,
  mensagens de erro inline.
- Permissão de notificações negada tratada com mensagem clara (app segue funcional).
- **Registro não encontrado** (rover ou ocorrência inexistente) com tela dedicada.
- **Falha ao carregar dados** do armazenamento (estado de erro com "tentar novamente").
- Estados vazios (histórico sem ocorrências).

## Estrutura do projeto

```
src/
├── app/                      # Telas (roteamento por arquivos — expo-router)
│   ├── _layout.tsx           # Stack de navegação + tema
│   ├── index.tsx             # Início (visão geral da missão)
│   ├── rovers/index.tsx      # Listagem de rovers
│   ├── rovers/[id].tsx       # Detalhe do rover
│   ├── report.tsx            # Formulário de ocorrência (cadastro)
│   ├── confirmation.tsx      # Status / resposta do sistema
│   └── history.tsx           # Histórico de ocorrências
├── components/               # Componentes reutilizáveis de UI
│   ├── screen.tsx  button.tsx  card.tsx  field.tsx
│   ├── badge.tsx  option-selector.tsx  rover-card.tsx
│   ├── stat-tile.tsx  message-state.tsx
│   └── themed-text.tsx  themed-view.tsx
├── services/                 # Camada de dados e recursos do dispositivo
│   ├── worksite.ts           # Rovers e tarefas (dados simulados)
│   ├── reports.ts            # Persistência de ocorrências (AsyncStorage)
│   └── notifications.ts      # Alertas locais (expo-notifications)
├── constants/                # theme.ts, domain.ts (labels e cores)
├── hooks/                    # use-theme, use-color-scheme
└── types/                    # domain.ts (tipos do domínio)
```

Separação clara entre **telas** (`app/`), **componentes** (`components/`) e
**serviços** (`services/`). Tipos do domínio centralizados em `types/`.

## Como executar

Pré-requisitos: Node.js LTS e o app **Expo Go** no celular (ou um emulador iOS/Android).

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start

# 3. Abrir o app
#    - Celular: escaneie o QR code com o Expo Go
#    - Emulador: pressione "i" (iOS) ou "a" (Android) no terminal
```

Verificações:

```bash
npx tsc --noEmit                  # checagem de tipos
npx expo export --platform ios    # bundle de produção (valida todas as telas)
```

## Stack

- React Native `0.85` · Expo SDK `56` · expo-router (navegação por arquivos)
- TypeScript (strict) · AsyncStorage · expo-notifications

## Evidências de execução

Veja o **vídeo de demonstração** — [`gs-mobile-demo.mov`](./gs-mobile-demo.mov) — com o
fluxo completo: início → rovers → detalhe → reportar ocorrência → alerta do coordenador
(notificação local) → confirmação (self-heal) → histórico.
