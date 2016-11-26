module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: process.env.NODE_ENV === 'production' ? __dirname + '/prod' : __dirname + "/dist/js",
        publicPath: __dirname + "/src/js",
        filename: "app.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a valid name to reference 
            query: {
                presets: ['es2015', 'react']
            }
        },
        /*,{ 
            test: /\.css$/,
            loader: "style-loader!css-loader" 
                
        },*/
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    }
};

