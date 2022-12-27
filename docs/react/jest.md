#### Jest

- [source jest.config](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/utils/createJestConfig.js)
- [How to start testing](https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/)
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Jest DOM matchers cheatsheet](https://github.com/testing-library/jest-dom)


##### Debugging

1. Open in the Chrome browser: [Inspector](chrome://inspect/#devices)
2. Put in the package.json this part into "jest" section (without of the first brace `{}`)
    ```json
    {
	  "transform": {
	  	"^.+(.d)?\\.tsx?$": [
	  		"<rootDir>/node_modules/ts-jest",
	  		{
	  			"tsconfig": "<rootDir>/tsconfig.json",
	  			"diagnostics": true
	  		}
	  	]
	  },

      "bail": true,
      "testEnvironment": "jsdom",
      "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
      "moduleFileExtensions": [
        "js",
        "ts",
        "jsx",
        "tsx",
        "json",
        "node",
        "web.js",
        "web.ts",
        "web.tsx",
        "web.jsx"
      ],
      "setupFilesAfterEnv": [
        "<rootDir>/src/setupTests.ts"
      ]
    }
    ```

