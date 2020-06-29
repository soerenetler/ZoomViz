# real-world-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Releasing
by https://github.com/samuelmeuli/action-electron-builder

When you want to create a new release, follow these steps:

    1. Update the version in your project's package.json file (e.g. 1.2.3)
    2. Commit that change (git commit -am v1.2.3)
    3. Tag your commit (git tag v1.2.3). Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release
    4. Push your changes to GitHub (git push && git push --tags)

After building successfully, the action will publish your release artifacts.