/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';
process.env.NODE_ENV = 'production';

webpack(webpackConfig).run((err, stats) => {
    if(err) {
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasError) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if(jsonStats.hasWarnings) {
        return jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`webpack stats: ${stats}`);

    console.log('all good'.bold.green);

    return 0;
});
