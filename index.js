const express = require('express');

var app = express();
app.use(express.json());

app.get('/', function (req, res, next) {
  return res.json({
    message: 'Hi',
  });
});

app.get('/odbc', async function (req, res, next) {
  try {
    const connection = await odbc.connect(
      'dsn=Cas_8611;UID=mobile;PWD=Foundation#1'
    );
    let data = await connection.query(`SELECT 
        TABLE_SCHEMA,
        TABLE_NAME,
        COLUMN_NAME,
        DATA_TYPE,
        COLUMN_DEFAULT,
        CHARACTER_MAXIMUM_LENGTH
    FROM INFORMATION_SCHEMA.COLUMNS;`);
    connection.close();
    return res.json({
      costcodes: data,
    });
  } catch (err) {
    return res.json({
      error: err,
    });
  }
});

app.listen(8000, function (err) {
  if (!err) console.log('Started at 8000');
});
