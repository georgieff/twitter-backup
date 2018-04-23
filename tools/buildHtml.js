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

});

if(process.env.BASE_SERVICE) {
    fs.readFile('src/config.js', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }

        const result = data.replace('BASE_SERVICE =', `BASE_SERVICE = ${process.env.BASE_SERVICE}" || `);
        fs.writeFile('src/config.js', result, 'utf8', function(err) {
            if (err) {
               return console.log(err);
            }
            console.log(result);
            console.log('edit service path for the env'.green);
        });
    });
}
