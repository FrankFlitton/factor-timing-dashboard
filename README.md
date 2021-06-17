# Factor Timing Dashboard

Made with create react app.

```sh
npm i && npm start
```

## General Approach
This app uses a minimal and data-centric approach. As little as been hardcoded as possible to keep the codebase DRY and allow for flexibility if another field is added.

No UI framework is used. Only essential dependencies are introduced to the project. Presentational components are created with Styled Components - quickly - using flexbox.

Basic accessibility for screen readers is present as well as a responsive layout that meets the desktop layout spec.

### Important Files

```src/util/tableCalculations.js```

Calculations and setup of table data. The 'math' starts around at line 60.

My approach is to take sub-arrays of the relevant data using the start and end dates. In one pass, perform calculations to build two hashmaps of relevant meta data (eg, occurrence and sums). Finally, the calculations are performed with the hashmap and formatting is applied.

The data is stored and processed using the Time Period name as the primary key.

```public/json/```

Data source files are kept. All JSON are accessed with fetch and loaded within the app.

```src/state/index.js```

The data is stored in `/state` using the Context api with a reducer pattern and accessed with custom hooks.

### Limitations

During testing, no negative results for `Forward Return` could be produced with the provided dataset. If the sum is negative the proper visual will behave as expected.

If start and end date share the same value, react throws `children with the same key` errors. The app will still work as expected.

This app has only been tested on OSX Chrome.

Mobile view could use some love.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
