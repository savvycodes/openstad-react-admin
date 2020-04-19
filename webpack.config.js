const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

	devtool: 'eval-source-map',
	// mode: 'production',
	mode: 'development',

	entry: './src/index.jsx',

	output: {
		path: __dirname + '/../frontend/lib/modules/admin-editor-widgets/public/', //
	//	path: __dirname + '/dist',
		filename: 'js/index.js',
	//	filename: 'js/openstad-component.js',
    library: 'OpenstadReactAdmin',
    libraryTarget: 'window',
	},

	externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
	},

  plugins: [
    new MiniCssExtractPlugin({
      //filename: 'css/default.css',
      filename: 'css/main.css', //
      ignoreOrder: false,
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.jsx?$/,
        exclude: /\/core-js/,
        minify(file, sourceMap) {
          const extractedComments = [];
          const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
                .minify(
                  file,
                  { /* Your options for minification */ },
                );
          return { error, map, code, warnings, extractedComments };
        }

      })
    ]
  },

	module: {
		rules: [

			{
				test: /\.json$/,
				loader: "json-loader"
			},

			{
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",

        }
			},

      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
					//		publicPath: '/public/path/to/',
			//				publicPath: '/../openstad-landing/lib/modules/choices-guide-widgets/public/css/', //
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
			{
				test: /\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
					//		publicPath: '/public/path/to/',
			//				publicPath: '/../openstad-landing/lib/modules/choices-guide-widgets/public/css/', //
						},
					},
					'css-loader',
				],
			},

		],
	},

}
