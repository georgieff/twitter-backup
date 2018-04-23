import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if(err) {
        return console.log(err);
    }

    const $ = cheerio.load(markup);

    $('head').prepend('<link rel="stylesheet" href="style.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
        if(err) {
            console.log(err);
        }
        console.log('index.html written to /dist'.green);
    });

    fs.rename('src/config.example.js', 'src/config.js',function (err) {
        if(err) {
            console.log(err);
        }
        console.log('config renamed'.green);
    });
});
