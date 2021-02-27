import { join, normalize } from 'path';

export default () => ({
    port: parseInt(process.env.PORT, 3000),
    jsonFile: normalize(join(__dirname, '../../db/imdb.json'))
});
