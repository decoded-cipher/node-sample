
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {


    processUpload: async (fileName) => {

    const results = [];
    const filePath = path.join(__dirname, '../', 'storage', 'uploads', fileName);
        
    return new Promise((resolve, reject) => {

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {

                    // await fs.promises.unlink(filePath);
                    const products = results.map((product) => {
                        return {
                            name: product['Product Name'],
                            category: product['Category'],
                            price: product['Price'],
                            stock: product['Stock']
                        };
                    });
                    resolve(products);
                    
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
        });
    }


};