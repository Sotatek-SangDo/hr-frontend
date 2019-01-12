var path = require('path')
var webpack = require('webpack')
// Add these
const PrerenderSPAPlugin = require('prerender-spa-plugin')
// Renders headlessly in a downloaded version of Chromium through puppeteer
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer
const JSDOMRenderer = require('@prerenderer/renderer-jsdom')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
	entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new PrerenderSPAPlugin({
      staticDir: __dirname, // The path to the folder where index.html is.
      routes: ['/'], // List of routes to prerender.
      renderer: new PuppeteerRenderer(),
      // Wait to render until the element specified is detected with document.querySelector.
			renderAfterElementExists: '#app',
			renderAfterDocumentEvent: 'render-event'
			// Renders after 5000 milliseconds. (5 seconds.)
  		renderAfterTime: 5000
    }),
    new webpack.DefinePlugin({
    	'process.env.BROWSER': JSON.stringify(true)
  	}),
    new PrerenderSPAPlugin({
      staticDir: __dirname, // The path to the folder where index.html is.
      routes: ['/'], // List of routes to prerender.
      renderer: new JSDOMRenderer()
    }),
     new HtmlWebpackPlugin()
  ]
}