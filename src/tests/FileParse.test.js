const fs = require('fs');
const path = require('path');


describe('FileParser Tests', () => {
    let filePath;

    beforeEach(() => {
        filePath = path.resolve(__dirname, '../', 'commands.txt');
    });

    it('should read a file and return a result', () => {
        fs.readFileSync(filePath, (err, data) => {
            if (err) throw err;

            expect(data).not.toBeNull();
        })
    });

    it('should read the file contents and split commands into an array', () => {
        fs.readFileSync(filePath, (err, data) => {
            if (err) throw err;
            const dataArray = data.split(/\r\n/);
            expect(dataArray).not.toBeNull();
            expect(dataArray.length).toBeGreaterThan(1);
        })
    })
});