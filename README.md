# Reactive Typesafe Webcomponents

> demos from my talk about RTW ( reactive type-safe webcomponents )

This project contains 3 implementation of the same app -> Todo list for learning new Skate Tricks!

![image](https://user-images.githubusercontent.com/1223799/31500336-6de4452c-af67-11e7-9324-6d18e3c70137.png)

## Talk + Slides

- [Slides](https://speakerdeck.com/martin_hotell/reactive-type-safe-webcomponents-with-skatejs)
- [Video]()

## Structure

- **01-wc-spec**
  - Contains implementation with platform only natives ( ES modules, vanilla WebComponents) + Typescript

- **02-vanilla-lit-html**
  - Contains implementation with platform only natives + lit-html as a renderer ( ES modules, vanilla WebComponents) + Typescript
  - bundled with Webpack ( not transpiled ;) )

- **03-wc-skate**
  - Contains implementation with skate + Typescript
  - Contains all skate renderers showcase
  - Also contains component without shadow dom
  - bundled with Webpack ( not transpiled ;) )