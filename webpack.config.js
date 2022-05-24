const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

  devtool: 'source-map',
  mode: 'production',
	entry: ['babel-polyfill', './src/index.jsx'],

	output: {
	  path: __dirname + '/dist',
		filename: 'js/index.js',
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
	  minimize: true,
	  minimizer: [new TerserPlugin()],
  },

	module: {
		rules: [

			{
				test: /\.json$/,
				loader: "json-loader"
			},

			{
        test: /\.jsx?$/,
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
