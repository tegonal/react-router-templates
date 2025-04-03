# Project Documentation

## Technologies

This starter template is built using the following technologies:

- **TypeScript**: For type-safe JavaScript development
- **[React Router 7](https://reactrouter.com)**: Framework mode, configured for server-side rendering (SSR)
- **[React 19](https://react.dev/reference/react)**: The latest version of React
- **[Tailwind 4](https://tailwindcss.com/docs/installation/using-vite)**: For utility-first CSS styling
- **[Vite](https://vite.dev/guide/)**: For fast development and build times

Notable libraries and tools used in this project include:

- **[remix-i18next](https://sergiodxa.github.io/remix-i18next/)**: Internationalization framework for multi-language support
- **[daisyui](https://daisyui.com/)**: Tailwind CSS component library for minimalistic UI components as close as possible to vanilla HTML and elaborate theming (see `/app/styles/tailwind.css`)
- **[class-variance-authority](https://cva.style)**: For creating flexible component variants
- **[remix-hook-form](https://github.com/forge-42/remix-hook-form)**: For form handling, using `zod` for validation
- **react-markdown**: For rendering Markdown content in React
- **lucide-react**: All the icons you will probably ever need
- **@uidotdev/usehooks**: A collection of useful React hooks
- **lodash-es**: For utility functions

Other notable mentions:

- **Self-hosted fonts**: Open Sans preinstalled and ready to use as an example for
  self-hosting fonts. The font files are located in `/public/assets/open-sans/` and the CSS
  file is located in `/app/styles/fonts.css`. You can add your own fonts by
  following the same structure.
- **[Plausible.io](https://plausible.io/) Integration**: Ready to use with
  [Plausible](https://plausible.io/) for analytics, page views and events; on the server and client side. The integration is located in `/app/lib/plausible/`. You can add your own Plausible domain by
  editing the .env file if you're self-hosting. Events are only ever sent to an included api route so you can run event collection on the same domain as your app.
- **Eslint, Prettier**: Preconfigured with sensible defaults for TypeScript and React. You can
  customize the configuration files to your liking. The project uses the presets provided by `@epic-web/config`.

## Project Structure

- `/app/`: Main application directory
  - `/components/`: Reusable UI components
    - `/typography/`: General typography components like headings, paragraphs, etc.
    - `/theme/`: Layout and theming components, header, footer, etc.
    - `/ui/`: UI components like buttons, inputs, etc.
  - `/routes/`: Route components and page definitions
    - `/files/`: Common file based routes
    - `/api/`: Routes that are only handling API requests
  - `/lib/`: Utility functions, API clients, helpers, ...
  - `/hooks/`: Custom React hooks
  - `/config/`: Various configuration files
  - `/styles/`: Global styles and CSS files for tailwind
  - `/middleware/`: React Router middleware
- `/public/`: Static assets

## Development

```bash
yarn run dev # start the development server
yarn run build # build the project
yarn run up # update dependencies
yarn run i18n:extract # extract i18n keys and default values
```

## Deployment

You can use the included Dockerfile to build and deploy the project. The Dockerfile is located in the root of the project. The project also includes a build pipeline for GitHub to store an image on ghcr.io.
