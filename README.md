[![Develop health](https://github.com/cybermerlin/family_budget/actions/workflows/review.yml/badge.svg?branch=develop)](https://github.com/cybermerlin/family_budget/actions/workflows/review.yml)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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

### npm run storybook

To start on localhost:6000 a server with a storybook project - list of ui components with a documentation and some user case scenarios.


## For beginners: how to start a project
Run only the necessary commands.

- Make Fork repository from GitHub (copy all branches).

- Used to target an existing repository and create a clone, or copy of the target repository.
```git clone https://github.com/dm-rybalchenko/family_budget``` 

- Go to the project folder.
```cd ./family_budget```

- Installs a package and any packages that it depends on.
```npm install```

- Runs the app in the development mode (read above "Available scripts")
```npm start``` 

And then open the browser and enter the address that the system will write in the console.


## Documentaions

### Learn More

- [how to make a Service](https://dev.to/dansolhan/simple-dependency-injection-functionality-for-react-518j)
- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).


### Components

- [AntD components (base elements of this whole project)](https://ant.design/docs/react/introduce)
- [Third-Party Libraries](https://ant.design/docs/react/recommendation)
- [storybook](https://storybook.js.org/docs/react/get-started/introduction)
    - [video instruction](https://www.youtube.com/watch?v=x-x47qHq3nY)
    - [ru start page](https://www.conductor.com/nightlight/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B8-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D1%81-%D0%B8%D1%81/)
    - Storybook have some additions:
        - [storyshots](https://github.com/storybooks/storybook/blob/master/addons/storyshots) — Snapshot testing
        - [actions](https://github.com/storybooks/storybook/blob/master/addons/actions) — Actions logging. It's create a function, which have results of executions in an Action Logger's tab. This is a comfortable case for logging parameters by types onApply n onClick.
        - [links](https://github.com/storybooks/storybook/blob/master/addons/links) — Making links between pages in the Storybook.
        - [comments](https://github.com/storybooks/storybook/blob/master/addons/comments) — Commenting.
        - [info](https://github.com/storybooks/storybook/blob/master/addons/info) — Annotating components.
        - [knobs](https://github.com/storybooks/storybook/blob/master/addons/knobs) — Modifying properties of components.
        - [options](https://github.com/storybooks/storybook/blob/master/addons/options) — Customizing UI Storybook’а


### TypeScript Definitions

To be able to use libraries written in JS, you need to use these same TypeScript Definitions for them. And there is even a whole open source project in which people write such definitions for popular projects. You can search and download them on the site, or you can put a console utility that will simplify this process:

```npm install -g tsd```

With this utility, we will load the definitions for React and store the TypeScript definition entry in the tsd.json file:

```tsd query react --action install --save```

### Links with documentations about libraries

- [editable table example Source](https://github.com/archit-p/editable-react-table)
- [Editable table example in Sandbox (live coding)](https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark)
- [Editable table with math components Source](https://github.com/ruilisi/fortune-sheet)
