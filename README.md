# 💪 Fitness Exclusive — App de Treino (Cícero Pereira da Silva)

PWA de gerenciamento de treinos baseado na ficha da academia Fitness Exclusive.

---

## ✅ Funcionalidades

- **Dashboard com plano semanal** — 14 semanas visíveis, semana atual destacada
- **Treinos A–G completos** — exercícios exatos da ficha (imagem 1)
- **Acompanhamento por série** — registre carga (kg) e repetições por série
- **Temporizador duplo** — stopwatch total + countdown de descanso ajustável
- **Progresso salvo** — usa `localStorage`, não perde ao fechar o app
- **Biblioteca** — todos os exercícios agrupados por grupo muscular
- **Link SmartWorkout** — cada exercício linka para a biblioteca de execução
- **PWA** — pode ser instalado na tela inicial do celular

---

## 📁 Estrutura de Pastas

```
treino-exclusive/
├── public/
│   └── manifest.json          # Config PWA
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Tela inicial com plano semanal
│   │   ├── ListaExercicios.jsx # Lista de exercícios de cada treino
│   │   ├── ExercicioDetalhe.jsx # Tela individual + temporizadores
│   │   ├── Biblioteca.jsx      # Catálogo de exercícios
│   │   └── BottomNav.jsx       # Navegação inferior
│   ├── context/
│   │   └── AppContext.jsx      # Estado global + localStorage
│   ├── data/
│   │   └── treinos.js          # Todos os dados da ficha
│   ├── hooks/
│   │   └── useTimer.js         # Hooks de stopwatch e countdown
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Setup Local (Passo a Passo)

### 1. Instalar Node.js
Baixe em https://nodejs.org (versão LTS recomendada, 18+)

### 2. Criar a pasta e copiar os arquivos
```bash
mkdir treino-exclusive
cd treino-exclusive
# Copie todos os arquivos deste projeto para esta pasta
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Rodar localmente
```bash
npm run dev
```
Acesse: http://localhost:5173/treino-exclusive/

---

## 🌐 Deploy no GitHub Pages (Passo a Passo)

### Pré-requisito: ter Git e conta no GitHub

### 1. Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome do repositório: `treino-exclusive` (exatamente esse nome)
3. Marque como **Público**
4. Clique em "Create repository"

### 2. Configurar o repositório local
```bash
cd treino-exclusive
git init
git add .
git commit -m "Initial commit - App de treino Fitness Exclusive"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/treino-exclusive.git
git push -u origin main
```
> ⚠️ Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub

### 3. Fazer o deploy
```bash
npm run deploy
```
Este comando:
1. Executa `npm run build` → gera a pasta `dist/`
2. Publica a pasta `dist/` na branch `gh-pages` do seu repositório

### 4. Ativar GitHub Pages
1. No seu repositório no GitHub, vá em **Settings** → **Pages**
2. Em "Source", selecione a branch **gh-pages**
3. Clique em **Save**
4. Aguarde ~2 minutos

### 5. Acessar o app
```
https://SEU_USUARIO.github.io/treino-exclusive/
```

---

## ♻️ Atualizar após mudanças

```bash
# Faça suas alterações no código, depois:
git add .
git commit -m "Atualização: descrição das mudanças"
git push
npm run deploy
```

---

## ⚠️ Se o nome do repositório for diferente

Se você criou o repositório com outro nome (ex: `meu-treino`), edite o `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/meu-treino/',  // ← coloque o nome exato do repositório
})
```

E no `index.html`, troque todas as ocorrências de `/treino-exclusive/` pelo nome correto.

---

## 📱 Instalar como App no Celular (PWA)

### Android (Chrome):
1. Abra o site no Chrome
2. Toque nos 3 pontinhos → "Adicionar à tela inicial"

### iPhone (Safari):
1. Abra o site no Safari
2. Toque no ícone de compartilhar → "Adicionar à tela de início"

---

## 🛠️ Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local de desenvolvimento |
| `npm run build` | Gera versão de produção na pasta `dist/` |
| `npm run preview` | Pré-visualiza a versão de produção |
| `npm run deploy` | Build + deploy no GitHub Pages |
