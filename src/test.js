const axios = require('axios')

const requestActiveInfo = ()=>{
    return axios.get('https://www.xiteng.com/xitenggamenode/activityInfo').then(res=>res);
}

const test = async ()=>{
    const activeInfo = await requestActiveInfo();
    console.log('res ',activeInfo)
}

test();