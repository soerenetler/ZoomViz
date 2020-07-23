module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        linux: {
          target: 'AppImage',
          category: 'Presentation',
          publish: 'github',
          icon: 'src/assets/Chattarize_icon_256.png'
        },
        win: {
          publish: 'github',
          icon: 'src/assets/Chattarize_icon_256.png'
          //target: 'portable'
        },

        // options placed here will be merged with default configuration and passed to electron-builder
      },
    },
  },
}
