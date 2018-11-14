const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
});
AWS.config.accessKeyId="AKIAIR2A5OFFRS4LKKJQ";
AWS.config.secretAccessKey="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"
const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: 'Books',
};
console.log('Scanning Books table.');

docClient.scan(params, onScan);
function onScan(err, data) {
    if (err) {
        console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Scan succeeded.');
        data.Items.forEach((book) => {
            console.log(book.name, book.year, book.type, book.author);

        });

        if (typeof data.LastEvaluatedKey !== 'undefined') {
            console.log('Scanning for more...');
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
