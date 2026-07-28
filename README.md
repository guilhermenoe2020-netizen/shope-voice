# Shope Voice

Ferramenta pessoal para agilizar a criação de vídeos de afiliados: narração com voz de IA, hashtags de SEO e legendas de conversão. Não é um editor de vídeo, não tem login, cadastro ou banco de dados — tudo roda localmente, na sua máquina.

## Stack

- **Frontend:** React + Vite, mobile-first, sem dependências de UI pesadas (CSS puro com design tokens)
- **Backend:** Node.js + Express
- **Processamento de vídeo/áudio:** FFmpeg
- **Voz de IA:** vozes neurais gratuitas do Microsoft Edge (via `msedge-tts`), sem chave de API

## Estrutura do projeto

```
shope-voice/
├── backend/
│   └── src/
│       ├── routes/       -> define os endpoints HTTP
│       ├── controllers/  -> orquestra a requisição (sem lógica de negócio)
│       ├── services/     -> lógica de negócio (TTS, FFmpeg, hashtags, legendas)
│       ├── middleware/   -> upload (multer) e tratamento de erros
│       ├── utils/        -> limpeza automática de arquivos temporários
│       ├── data/         -> dicionários (hashtags) — fácil de expandir
│       └── assets/fonts/ -> fonte Montserrat usada na legenda queimada
└── frontend/
    └── src/
        ├── pages/        -> uma página por item do menu
        ├── components/   -> AppShell (navegação) + components/ui (reutilizáveis)
        ├── services/     -> api.js, único ponto de contato com o backend
        └── hooks/        -> useAsyncTask (loading/erro), useHashRoute (navegação)
```

Arquitetura em camadas no backend (`routes → controllers → services`) para que cada parte tenha uma única responsabilidade: rotas não sabem de FFmpeg, controllers não sabem de HTTP puro, services não sabem de Express. Isso facilita expandir cada funcionalidade sem afetar as outras.

## Como rodar

Pré-requisitos: **Node.js 18+** e **FFmpeg** instalado e disponível no PATH (`ffmpeg -version` deve funcionar no terminal).

### 1. Backend

```bash
cd backend
npm install
npm start
```

A API sobe em `http://localhost:4000`.

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173` (o Vite já está configurado para redirecionar `/api` para o backend, sem problema de CORS).

## Decisões de arquitetura importantes

### Narração (vozes de IA)
Usamos as vozes neurais gratuitas do Microsoft Edge (`pt-BR-FranciscaNeural` e `pt-BR-AntonioNeural`), acessadas pela biblioteca `msedge-tts`. É o mesmo motor de voz usado por vários apps populares de edição para criadores — natural, sem custo e sem exigir cadastro em nenhum serviço de IA paga. **Requer conexão com a internet** no momento de gerar a narração (não requer chave de API).

O código foi desenhado para trocar de provedor de voz facilmente no futuro (ex.: ElevenLabs, Azure Speech) sem alterar rotas, controllers ou o frontend — basta editar `backend/src/services/ttsService.js`.

### Vídeo original intacto
O FFmpeg nunca recodifica a imagem (`-c:v copy`): a narração é **misturada** à trilha de áudio original (não a substitui), cada uma posicionada no tempo certo com `adelay` + `amix`. Isso garante qualidade máxima e velocidade.

### Hashtags
Motor baseado em regras + dicionário de categorias (`backend/src/data/hashtagDictionary.js`), sem depender de IA externa. Deliberadamente **não analisa o conteúdo visual do vídeo** (isso exigiria uma IA de visão computacional paga) — quando o produto não é digitado, a heurística usa o nome do arquivo de vídeo enviado. Para evoluir isso no futuro (ex.: integrar uma IA de visão), o ponto de extensão já está isolado em `hashtagService.js`.

### Legendas
As 10 sugestões de conversão são geradas por templates (`captionSuggestionsService.js`), cobrindo os 7 gatilhos pedidos (dor, curiosidade, benefício, solução, escassez, POV, descoberta). A legenda é "queimada" no vídeo via FFmpeg `drawtext`, com fundo amarelo, texto preto e fonte Montserrat, posicionada no terço inferior do quadro.

**Transcrição automática de fala** (gerar a legenda ouvindo o áudio) não está incluída nesta versão porque exige um modelo de reconhecimento de voz local pesado (ex.: Vosk, com download de +50MB por idioma). A arquitetura já reserva o lugar certo para isso (`captionsController.js` → um futuro `speechToTextService.js`), caso você quiera adicionar depois.

### Sem armazenamento permanente
Todo upload vai para `backend/tmp/`, é apagado imediatamente após a resposta ser enviada ao navegador, e um job de segurança limpa qualquer resíduo a cada 5 minutos.

## Rumo a um SaaS (se um dia quiser evoluir)
O projeto já está organizado para isso: trocar o provedor de TTS, adicionar autenticação, fila de processamento (para vídeos grandes) ou armazenamento em nuvem são mudanças isoladas em `services/`, sem precisar reescrever rotas ou o frontend.
