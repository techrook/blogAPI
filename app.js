
const app = require('./index')
const CONFIG = require('./config/config')
require('./DB/db').connect();

const PORT = CONFIG.PORT || 3000;



app.get('/', (req,res)=>{
    logger.info('welcome to my blog')
    return res.json({ status: true })
    
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})

