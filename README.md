<div align="center">

[Work in progress] Solution for [Shoppingify dev challenge](https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x)

Created by **Julien Delort** (<a href="https://www.linkedin.com/in/juliendelort/" target="_blank">Linkedin</a>)


Live demo: https://shoppingify-bbf33.web.app/

User stories and mocks available on [the dev challenge page](https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x)
</div>

Note: This runs on node 16.


## Stack

* Front end
    * [React](https://reactjs.org/) (bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
    * [Reach router](https://github.com/reach/router)
    * [Typescript](https://www.typescriptlang.org/)
    * [Styled Components](https://styled-components.com/)
    * [lodash](https://lodash.com/)
    * NO redux: State is managed by React. See why [here](https://kentcdodds.com/blog/application-state-management-with-react)
* Back end
    * [Firestore](https://firebase.google.com/products/firestore)
    * [Firebase Hosting](https://firebase.google.com/products/hosting)
    * [Firebase Authentication](https://firebase.google.com/products/auth)

## Folders

* `src/`
    * `screens/`: Screen level components
    * `components/`: All other components
    * `model/`: Typescript model definitions
    * `firebase/`: Backend access (data fetching/writing + transformers). Intended to be accessed only by context modules (`context/`)
    * `context/`: Local state
    * `utils/`: Misc
*  `public/`: static resources 

Local state is managed inside `context/` through [custom hooks](https://reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook).

## Deploying new versions

1. Install firebase cli: `npm install -g firebase-tools`
1. Login to firebase: `firebase login`
1. Build the app: `npm run build`
1. Deploy: `firebase deploy --only hosting` (--only hosting if only changes in the React code)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
