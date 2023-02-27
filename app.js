
const app = require('./index')
const CONFIG = require('./config/config')
require('./DB/db').connect();

const PORT = CONFIG.PORT || 3000;



app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

