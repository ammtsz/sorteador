## Overview

A drawer application initially developed to do a Secret Santa during the pandemic. It simulates the presential Secret Santa draw, where everyone is gather (in this case, everyone is online) and one by one pick a name, but since there is no need for log in, there is always the possibility of someone draw it's own name.

Check the deployed project [here](https://sorteador-ammtsz.herokuapp.com/)


## Built With

* [Create React App](https://github.com/facebook/create-react-app)
* React Router
* React Hooks
* SASS
* Firebase

## Starting the project

Clone the repository:

`https://github.com/ammtsz/sorteador.git`

Change directory:

`cd sorteador`

In the project directory, run:

`npm install`

`npm start`

It will run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



## Firebase

This project is integrated with Firebase. To integrate it to your Firebase account:

1. Create an account
2. Go to console
3. Click on 'Add project'
4. Create your project
5. Add an App (select 'Web' option)
6. Register your web app

Once it is done, you will have a `firebaseConfig`. Copy those datas and replace it on the project. Go to `./src/firebase/firebase.utils.jsx` and replace it on:

```javascript
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

```

The project uses 'Cloud Firestore' from Firebase, so you need to 'Create database' on Cloud Firestore.


## Dependencies
```
    "firebase": "^8.0.0",
    "node-sass": "^4.14.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.0",
```


## Rules
* add all participants names by adding name by name in the input field and clicking on 'Adicionar' button
* start the draw by clicking on 'iniciar Sorteio' button
* one participant at a time will click on 'Sortear' button (can be in different devices or not)
* a name will be displayed
* to draw another name on the same device, click on 'Sortear mais uma pessoa' otherwise, just wait until there is no more names left to draw
* the amount of draws left is showed in real time
* whenever it is needed, you can cancel the draw and start over
