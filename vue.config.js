module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        linux: {
          target: 'AppImage',
          category: 'Presentation',
          publish: 'github',
        },
        win: {
          publish: 'github',
          //target: 'portable'
        },

        // options placed here will be merged with default configuration and passed to electron-builder
      },
    },
  },
}
