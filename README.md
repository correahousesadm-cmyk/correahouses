# Correa Houses – Site Institucional

Site institucional da **Correa Houses**, empresa de quitinetes mobiliadas em Campo Grande – MS.

**URL de produção:** [https://correahouses.com.br](https://correahouses.com.br)

---

## Estrutura do Projeto

```
├── index.html              ← Página principal (todo o conteúdo do site)
├── css/style.css           ← Estilos (variáveis, temas, responsivo)
├── js/main.js              ← Interações (tema, menu mobile, animações, galeria)
├── Dados/
│   ├── Imagens/            ← Fotos das unidades (.webp)
│   └── Logo/               ← Logos em SVG (logo1, logo2, logo3)
├── vercel.json             ← Configuração de deploy no Vercel (headers, cache, redirects)
├── robots.txt              ← Regras para buscadores
├── sitemap.xml             ← Mapa do site para SEO
├── site.webmanifest        ← Manifesto PWA
└── .gitignore              ← Arquivos ignorados pelo Git
```

> O site é **100% estático** — não usa frameworks, não precisa de build, nem de Node.js.

---

## Seções do Site (index.html)

| Seção         | ID HTML         | Descrição                                       |
|---------------|-----------------|--------------------------------------------------|
| Header/Nav    | `#header`       | Logo, links de navegação, toggle de tema, botão WhatsApp |
| Hero          | `#home`         | Banner principal com preço e CTA                 |
| Sobre         | `#sobre`        | Quem somos, diferenciais                         |
| Unidades      | `#unidades`     | Cards com o que está incluído no aluguel          |
| Como Alugar   | `#como-alugar`  | Passo a passo do processo de aluguel              |
| Galeria       | `#galeria`      | Fotos das unidades (carrossel/grid)               |
| Localização   | `#localizacao`  | Endereço e mapa                                  |
| Contato/CTA   | `#contato`      | Chamada final com botão WhatsApp                 |
| Footer        | `footer`        | Informações de contato e créditos                |

---

## Como Fazer Alterações

### Pré-requisitos

- **Git** instalado ([git-scm.com](https://git-scm.com))
- **Editor de código** (VS Code recomendado)
- Conta no **GitHub** com acesso ao repositório
- Conta no **Vercel** vinculada ao repositório

### 1. Clonar o Repositório

```bash
git clone https://github.com/correahousesadm-cmyk/correahouses.git
cd correahouses
```

### 2. Abrir no Editor

```bash
code .
```

### 3. Visualizar Localmente

Basta abrir o `index.html` no navegador. Outra opção é usar a extensão **Live Server** do VS Code para ver alterações em tempo real.

---

## Guia de Alterações Comuns

### Alterar Textos

Edite diretamente no `index.html`. Os textos estão organizados por seção (veja tabela acima).

**Exemplo — mudar o preço:**
```html
<!-- Procure por R$ 1.099 e altere o valor -->
<strong>R$ 1.099,00/mês</strong>
```

> ⚠️ O preço aparece em mais de um lugar. Use **Ctrl+H** (Localizar e Substituir) para atualizar todas as ocorrências.

### Alterar Número de WhatsApp

O número atual é `556791503759` (67 9150-3759). Ele aparece em vários links no `index.html`.

**Para trocar**, use Localizar e Substituir (`Ctrl+H`):
- Procurar: `556791503759`
- Substituir: o novo número (código do país + DDD + número, sem espaços)

### Alterar Endereço

O endereço `Rua Guenka Kosuke, 05` aparece em:
- **Linha ~61** — Schema.org (dados estruturados)
- **Linha ~489** — Seção de localização
- **Linha ~639** — Footer

Use Localizar e Substituir para atualizar todos.

### Alterar Imagens

1. Coloque as novas imagens em `Dados/Imagens/` (preferencialmente `.webp` para performance)
2. No `index.html`, atualize o atributo `src` da tag `<img>` correspondente
3. Atualize também o atributo `alt` com uma descrição da imagem

### Alterar Logo

Substitua os arquivos em `Dados/Logo/`:
- `logo1.svg` — Favicon e ícone PWA
- `logo2.svg` — Logo no header (navbar)
- `logo3.svg` — Logo alternativa

### Alterar Cores e Visual

As cores são definidas como variáveis CSS no arquivo `css/style.css`:

```css
:root {
    --clr-primary: #c8a45c;        /* Cor principal (dourado) */
    --clr-primary-light: #e0c77a;  /* Variação clara */
    --clr-primary-dark: #a88a3e;   /* Variação escura */
    --clr-whatsapp: #25d366;       /* Cor do botão WhatsApp */
    --clr-bg: #0a0a0f;             /* Fundo principal (tema escuro) */
    --clr-text: #f0f0f5;           /* Cor do texto */
}
```

O site possui **dois temas** (claro e escuro). As variáveis do tema claro estão mais abaixo no CSS, dentro de `[data-theme="light"]`.

### Alterar Fontes

As fontes são carregadas do Google Fonts no `<head>` do `index.html`:
- **Playfair Display** — títulos
- **Inter** — corpo de texto

Para trocar, altere o link do Google Fonts e as variáveis CSS `--ff-heading` e `--ff-body`.

### Configurar Google Search Console

No `index.html`, linha 18, substitua o placeholder:
```html
<meta name="google-site-verification" content="COLE_SEU_CODIGO_AQUI">
```
pelo código fornecido pelo Google Search Console.

### Adicionar Google Analytics

Insira o script do GA4 logo antes do `</head>` no `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Processo de Deploy (Vercel)

### Deploy Automático (recomendado)

O repositório está conectado ao **Vercel**. Todo push para a branch `main` gera um deploy automático.

**Fluxo completo:**

```bash
# 1. Faça suas alterações nos arquivos

# 2. Adicione as alterações ao Git
git add -A

# 3. Crie um commit descritivo
git commit -m "Atualiza preço das unidades"

# 4. Envie para o GitHub (dispara deploy automático)
git push origin main
```

Após o push, o Vercel detecta a mudança e publica automaticamente em ~30 segundos.

### Verificar Status do Deploy

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **correahouses**
3. Veja o status do último deploy (✓ Ready = publicado)

### Preview de Alterações

Cada push em uma branch diferente de `main` gera uma **URL de preview** no Vercel:

```bash
# Criar uma branch de teste
git checkout -b minha-alteracao

# Fazer alterações e commit
git add -A
git commit -m "Teste: novo banner"

# Enviar a branch (gera URL de preview)
git push origin minha-alteracao
```

Após validar no preview, faça merge na `main`:

```bash
git checkout main
git merge minha-alteracao
git push origin main
```

### Configurações do Vercel (vercel.json)

O arquivo `vercel.json` define:
- **Headers de segurança** — X-Frame-Options, X-XSS-Protection, etc.
- **Cache de assets** — imagens e logos com cache de 1 ano, CSS com cache de 30 dias
- **Clean URLs** — remove `.html` das URLs

> Não altere o `vercel.json` a menos que saiba o que está fazendo.

---

## Domínio Personalizado

O domínio `correahouses.com.br` é configurado no painel do Vercel:
1. Vercel Dashboard → Projeto → Settings → Domains
2. O DNS do domínio deve apontar para os servidores do Vercel

Se precisar trocar o domínio, atualize também:
- `sitemap.xml` (tag `<loc>`)
- `robots.txt` (URL do Sitemap)
- `site.webmanifest` (se necessário)

---

## Arquivos Importantes

| Arquivo            | Função                                                  |
|--------------------|---------------------------------------------------------|
| `index.html`       | Todo o conteúdo do site, SEO, Schema.org                |
| `css/style.css`    | Estilos, variáveis de cores/fontes, responsividade       |
| `js/main.js`       | Tema claro/escuro, menu mobile, animações, galeria       |
| `vercel.json`      | Config de deploy: headers, cache, redirects              |
| `sitemap.xml`      | Mapa do site para Google                                 |
| `robots.txt`       | Regras de indexação para buscadores                      |
| `site.webmanifest` | Manifesto PWA (nome, ícone, cores)                       |

---

## Contato do Projeto

- **WhatsApp:** (67) 9150-3759
- **Endereço:** Rua Guenka Kosuke, 05 – Campo Grande, MS
- **Repositório:** [github.com/correahousesadm-cmyk/correahouses](https://github.com/correahousesadm-cmyk/correahouses)
