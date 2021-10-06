const path = require('path');
const fs = require('fs');
const { embed } = require('../src/index');

(async () => {
    const buffer = await embed(
        path.join(__dirname, './images/trianglify.png'), 
        `This`,
        'password-password-password'
    );

    fs.writeFileSync(
        path.join(__dirname, './images/output.png'),
        buffer
    );
})();