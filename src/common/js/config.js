const ENV = process.env.NODE_ENV;
const xueUrlMap = {
    "development": "test_api",
    "test": "test_api",
    "production": "prod_api"
}

export {
    ENV,
    xueUrlMap
}