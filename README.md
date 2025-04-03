# Tegonal React Router Starters

This project contains various React Router starters, each tailored for different use cases. The goal is to provide a solid foundation for building applications with React Router, showcasing best practices and efficient patterns.

All starters are designed to be easily extensible and customizable, allowing developers to adapt them to their specific needs. The starters are built with TypeScript and utilize the latest features of React Router.

## Available Starters
- **ssr-daisyui**: A starter template for server-side rendering (SSR) with DaisyUI components.

## Getting Started

To get started with any of the starters, use `create-react-router` and reference the starter template using its location on GitHub like so:

```bash
# ssr-daisyui
npx create-react-router@latest --template https://github.com/tegonal/react-router-templates/tree/main/packages/ssr-daisyui
```

Then, follow the instructions of `create-react-router` to set up your project.

To get the project up and running, navigate to the project directory that was just created and run:

```bash
yarn install # to install all dependencies
yarn up # to update the dependencies
yarn dev # to start the development server
```

## When to use which?

Arguments that can help you decide between SSR and CSR:

### SSR (Server-Side Rendering)

- **SEO**: If your application has public content and needs to be indexed by search engines, SSR might be the better choice.
- **Performance**: SSR can improve the initial load time of your application, especially for content-heavy pages.
- **User Experience**: SSR can provide a better user experience by reducing the time to first paint (TTFP) and time to interactive (TTI).
- **Accessibility**: SSR can improve accessibility for users with slow internet connections or older devices.
- **Progressive Enhancement**: SSR can be a good choice if you want to ensure that your application works even if JavaScript is disabled or not fully supported. React Router can, if thoughtfully implemented, create pages that work without JavaScript unless heavy interaction is required.
- **Content Management Systems (CMS)**: If your application is built on a CMS, SSR can help to deliver content faster and improve SEO.
- **Integrated APIs or Facades**: An SSR approach can be useful if you need simple APIs or facades that would otherwiese either cause complex client side code or a separate API server.

### CSR (Client-Side Rendering)

- **Interactivity**: If your application is highly interactive and requires a lot of client-side rendering, CSR may be a better choice.
- **Development Speed**: CSR can be faster to develop and deploy, especially for smaller applications or prototypes.
- **Simplicity**: If your application is simple and doesn't require complex routing or state management, CSR may be a better choice.
- **Cost**: CSR can be cheaper to host and maintain, especially for smaller applications or prototypes as they can be served statically.
- **Development Experience**: If you are more comfortable with client-side rendering and have experience with it, CSR may be a better choice.
- **Ecosystem**: If you are already using a lot of client-side libraries and frameworks, switching to SSR might require a bit of mental gymnastics.

In the end, both SSR and CSR have their pros and cons and both approaches can be used to create the same application and features. If you feel more comfortable with one approach over the other, this could be an additional argument to base a decision on. As always, it depends.