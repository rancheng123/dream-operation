
var apiConfig = {
    //dev
    'dev-dream.mxj360.com' : 'https://dev-operation-api.mxj360.com',

    //qa
    'qa-dream.mxj360.com'  : 'https://qa-operation-api.mxj360.com',

    //rc
    'dream.mxj360.com'  : 'https://online-operation-api.mxj360.com',
    //local
    //'10.28.12.21:8388'  : 'http://10.28.12.150',
    //'10.28.12.94:8388'  : 'https://qa-operation-api.mxj360.com',

}


var config = {
    debug: {
        event: /event=true/,
        trace: /trace=true/,
        mobile: /mobile=true/,
        interface: /interface=true/,
        window: /window=true/,
    },

    //接口地址
    api:  apiConfig[location.host] || 'https://dev-operation-api.mxj360.com',
    mockApi:  'http://localhost:8389'

};
export default config;

