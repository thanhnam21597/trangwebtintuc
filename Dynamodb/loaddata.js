const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

AWS.config.accessKeyId="AKIAIR2A5OFFRS4LKKJQ";
AWS.config.secretAccessKey="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"
let docClient = new AWS.DynamoDB.DocumentClient();

console.log('Start importing');

let allBooks = JSON.parse(fs.readFileSync('tintuc.json', 'utf-8'));

console.log(allBooks);
allBooks.forEach((book) => {
    let params = {
        TableName: "Books",
        Item: {
            "name": book.name,
            "year": book.year,
            "type": book.type,
            "author": book.author
        }
    };

    docClient.put(params,(err, data) => {
        if (err) {
            console.error(`Unable to add book ${book.title}, ${JSON.stringify(err, null, 2)}`);
        }else{
            console.log(`Book created ${book.name}`);
        }
    });
});