# amex-assessment

See [unitTest.md](./unitTest.md) for the assessment prompt.

## Getting Started

Install Node v22 using your favorite Node Version Manager. I used [fnm](https://github.com/Schniz/fnm).

```bash
npm install

# Builds TS files + Type Declaration files
npm run build

# Only build Type Declaration files
npm run build:types

# Lint & Format using BiomeJS
npm run lint
npm run format

# Test with Vitest + RTL (optionally use watch mode)
npm run test
npm run test:watch

# Check types with `noEmit`
npm run check
```

## Task One - Configuration and Documentation

The tools used for this task include the suggested dependencies of React, Vitest, React Testing Library, and TypeScript.

Some notes for the configuration of this project:

* A `.node-version` file was included to be used with various Node version managers, such as `fnm`, `asdf`, `mise`, `n`, etc.

* Vitest is configured using `vite.config.ts`. This configuration file is also used to configure Vite build configuration

* Source files are written in TypeScript under the `/src` directory. In the future, consider using a monorepo structure perhaps with pnpm or yarn workspaces to allow for the multiple packages (a docsite, a core package, packages for different applications etc). Also consider adding a `clean` script to clean the `dist` directory.

* Dependencies necessary for testing, building, and typechecking are included as "dependencies" as opposed to "devDependencies" -- this is so that these dependencies are included in "production" CI environments. "devDependencies" are relegated to tools that are necessary only for development environments.

* Linting and formatting are done using `@biomejs/biome`. I chose BiomeJS because it is zero-config by default, and has zero transient dependencies, which helps keep the scope of this assessment smaller. In a larger project, consider using dedicated tools like eslint/prettier which are more well-known, and in the case of eslint, have wider support for rules/configs/plugins.

* `husky` is used to add a Git hook to run the `lint` and `format` scripts for each commit.

* Preliminary work was done to configure `vite`, `tsconfig.build.json` and `package.json` for preparing the library to be published to a registry. This includes:
  * Configure Rollup via `vite.config.ts` to export builds to the `/dist` directory
  * Configure `tsc` to build type declaration files to the `/dist` directory
  * Configure `package.json` to specify export and typedef paths
  * Configure `package.json` to specify React + ReactDOM as peerDependencies

The work to make the `amex-assessment` a consumable Node package is preliminary and has not been tested, but lays some of the groundwork.

## Task Two -- Component Build

The provided testcases were added to `src/Modal.test.tsx` mostly unchanged. The following changes were made:

* Necessary imports for testing-library, user-event, and the component (Modal) were added.
* `Scenario` and `renderWithUser` were implemented
* A `beforeEach` hook was added to clear the spy calls before each test case

The component itself was implemented in `src/Modal.tsx`. Some things to note about the implementation:

* Props extend `ComponentPropsWithoutRef<'div'>` to allow arbitrary props to be passed by the developer to be added to the root `div` element -- this allows for extra flexibility with the `Modal` component since the developer can forward `div` HTML attributes as part of `Modal` props.

* A `div` was chosen to be the root element as opposed to a `dialog`, as native HTML5 `dialog` elements have implement functionality that may conflict with any programmatic behavior we may want to add to the Modal component.
  * A BiomeJS ignore comment was added here, as by default, the linter will suggest using a `dialog` element. Consider adding a BiomeJS config file.

* `useCallback` was used to cache event handlers -- this should provide a negligible perf boost, but helps keep the library lean and performant assuming the `onClose` handler is also cached.