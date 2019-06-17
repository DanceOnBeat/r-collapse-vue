module.exports = {
	// set your styleguidist configuration here
	title: 'Collapse Documentation',
  components: 'src/components/**/[A-Z]*.vue',
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            '//at.alicdn.com/t/font_1214042_r3cozao0vxo.css',
        }
      ]
    }
  },
  styleguideDir: 'docs',
  showSidebar: false,
  usageMode: 'expand',
  // exampleMode: 'hide',
	sections: [
	  {
      name: '',
      components: 'src/components/**/[A-Z]*.vue',
      sections: [
        {
          name: 'Demo 1（基本用法）',
          content: 'src/demo/demo1.md'
        },
        {
          name: 'Demo 2（自定义点击行为）',
          content: 'src/demo/demo2.md'
        },
        {
          name: 'Demo 3（手风琴模式）',
          content: 'src/demo/demo3.md'
        },
        {
          name: 'Demo 4（支持嵌套场景）',
          content: 'src/demo/demo4.md'
        }
      ]
	  }
  ],
  webpackConfig: require('./node_modules/@vue/cli-service/webpack.config')
}
