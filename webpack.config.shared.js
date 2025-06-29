const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = path.resolve(__dirname);
const stylePath = path.resolve(projectRoot, 'src/styles/');

// 공통 SCSS 로더 설정
const getScssLoaders = (isModule = false, isDev = false) => {
  const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

  return [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: true,
        modules: isModule ? {
          auto: true,
          localIdentName: '[local]_[hash:base64]',
          exportLocalsConvention: 'camelCase'
        } : false
      }
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: require.resolve('sass'),
        sassOptions: {},
        additionalData: `
          @use "sass:meta";
          @use "sass:map";
          @use "sass:string";
          @use "sass:math";
          @use "${stylePath.replace(/\\/g, '/')}/modules/variables" as var;
          @use "${stylePath.replace(/\\/g, '/')}/helpers/functions" as fn;
        `,
      },
    }
  ];
};

// 공통 webpack 설정 함수
const getWebpackConfig = (isDev = false) => {
  const config = {
    mode: isDev ? 'development' : 'production',
    module: {
      rules: [
        // SCSS 모듈 처리
        {
          test: /\.module\.scss$/,
          use: getScssLoaders(true, isDev)
        },
        // 일반 SCSS 파일 처리
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: getScssLoaders(false, isDev)
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      alias: {
        '@': path.resolve(projectRoot, 'src')
      }
    }
  };

  return config;
};

module.exports = {
  getWebpackConfig,
  getScssLoaders
};
