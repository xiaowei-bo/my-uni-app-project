const ENV = process.env.NODE_ENV;
const apiMap = {
    "development": "test_api",
    "test": "test_api",
    "production": "prod_api"
}

export {
    ENV,
    apiMap
}