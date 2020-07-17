const Tail = require('tail').Tail;
const YAML = require('yaml');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const log = require('./src/log');

const configPath = process.env.CONFIG_PATH || 'config.yaml'

log.debug(`Reading config from path ${configPath}`)

if (!fs.existsSync(configPath)) {
    log.error(`Error: config file does not exist at path ${configPath}`);
    process.exit(1);
}

const configData = fs.readFileSync(configPath, 'utf8');

let config;

try {
    config = YAML.parse(configData);
} catch (e) {
    log.error(`Unable to parse YAML config: ${e}`)
    process.exit(1)
}

let tails = {};
let regexes = {};
let watchedFiles = [];

let watchFile = (path, format, fallback = false) => {
    tails[path] = new Tail(path);
    regexes[path] = [];
    if (typeof format === 'string') {
        regexes[path].push(new RegExp(format, 'i'));
    } else {
        regexes[path] = format.map((fmt) => {
            return new RegExp(fmt, 'i');
        });
    }

    tails[path].on('line', (line) => {
        let data = null;

        for (let regex of regexes[path]) {
            data = regex.exec(line);
            if (data !== null) {
                console.log(JSON.stringify(data.groups));
                break;
            }
        }

        if (data === null && fallback === true) {
            console.log(JSON.stringify({message: line}));
        }
    });

    tails[path].on('error', (error) => {
        log.error(`ntail error while processing file: ${error}`)
    });

    watchedFiles.push(path);
}

let checkFiles = () => {
    config.files.forEach((file) => {
        glob(file.pattern, {}, (err, files) => {
            if (err) {
                log.error(err);
                return;
            }

            let diff = _.difference(files, watchedFiles);
            if (diff.length > 0) {
                log.debug(`Found new files matching pattern ${file.pattern}: ${diff.join(', ')}`)

                diff.forEach((path) => {
                    watchFile(path, file.format, file.fallback);
                });
            }
        })
    });
}

checkFiles();

setInterval(checkFiles, 10000);
