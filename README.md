# Vue-starter

Kit de départ préconfiguré incluant [VueJS](https://github.com/vuejs/vue), [Babel](https://babeljs.io/), [Webpack](https://webpack.js.org/) et [ESLint](https://eslint.org/) pour le cours GLO-3102.

## Using Vuex
https://github.com/vuejs/vuex

## Buefy
https://buefy.github.io/documentation

## Trello
https://trello.com/b/ibR7e57W/web1

## API
https://github.com/GLO3102/UBeat/wiki/2-API

## Installation local de l'API

```bash
docker run -d --name mongodb  -p 27017:27017 mongo:latest
```

À utiliser dans main.js

```
axios.defaults.baseURL = 'http://localhost:3000/unsecure/';
```


## Prérequis
- Git [Windows](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Windows), [Mac](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Mac), [Linux](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Linux)
- [Node.js](https://nodejs.org/en/) (version LTS recommandée)

Vérifier que Node est installé avec la commande:
```bash
node -v
```
Vérifier que Node est installé avec la commande:
```bash
npm -v
```

## Installation

```bash
# install dependencies
npm install
```

## Développement
```bash
# serve with hot reload at localhost:8080
npm start
```

## Livrables

https://github.com/GLO3102/UBeat/blob/master/Enonce.md

## Notes
### Vue
Ce projet a été généré avec [vue-cli](https://github.com/vuejs/vue-cli) en suivant le template webpack. Voir le [guide](http://vuejs-templates.github.io/webpack/) et la [documentation de vue-loader](http://vuejs.github.io/vue-loader) pour plus de détails.

### ESLint
ESLint est configuré afin de respecter un certain standard de code à travers votre équipe. Il est basé sur la [configuration airbnb](https://github.com/airbnb/javascript) qui rassemble les règles de base populaires. Libre à vous de modifier cette configuration via `.eslintrc.js`.
