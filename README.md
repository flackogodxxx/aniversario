# Página de Surpresa Especial

Este é um projeto de página web romântica e responsiva criada com Next.js e Tailwind CSS para surpreender uma pessoa especial. A página inclui vários elementos interativos e personalizáveis.

## Características

- 🖼️ **Galeria de fotos** com navegação por setas
- 💌 **Mensagem personalizada** que expressa seus sentimentos
- ⏱️ **Contagem regressiva** para um evento ou encontro especial
- 🎵 **Música de fundo** que pode ser ativada com um clique
- 📱 **Compartilhamento** nas redes sociais
- 📲 **QR Code** com mensagem secreta
- 🌙 **Modo escuro** automático
- 📱 **Design responsivo** para visualização em qualquer dispositivo

## Como executar o projeto

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Como personalizar

### Fotos

Substitua os arquivos placeholder em `public/images/` por suas próprias fotos. Certifique-se de manter os mesmos nomes de arquivo ou atualize as referências no código.

### Música de fundo

Substitua o arquivo placeholder em `public/music/background-music.mp3` por uma música de sua escolha. Formatos suportados: MP3, WAV, OGG.

### Mensagem personalizada

Edite a mensagem no arquivo `src/app/page.tsx`. Procure pela seção:

```jsx
{/* Mensagem personalizada */}
<section className="mb-12 bg-white/60 dark:bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg">
  ...
</section>
```

### Data do evento

Para ajustar a contagem regressiva, modifique a data no arquivo `src/app/page.tsx`:

```jsx
// Data para contagem regressiva (substitua pela data do seu evento)
const TARGET_DATE = new Date('2023-12-31T00:00:00'); // Formato: AAAA-MM-DDTHH:MM:SS
```

### Mensagem do QR Code

Edite a mensagem secreta no arquivo `src/app/page.tsx`:

```jsx
<QRCodeMessage 
  message="Sua mensagem secreta aqui!"
  size={150}
/>
```

## Recursos adicionais

Para personalização mais avançada, você pode modificar os componentes individuais:

- `src/components/PhotoGallery.tsx` - Personalização da galeria de fotos
- `src/components/CountdownTimer.tsx` - Personalização da contagem regressiva
- `src/components/QRCodeMessage.tsx` - Personalização do QR Code
- `src/components/ShareButtons.tsx` - Personalização dos botões de compartilhamento
- `src/components/BackgroundMusic.tsx` - Personalização do controle de música

## Licença

Este projeto é livre para uso pessoal. Espalhe o amor! ❤️
