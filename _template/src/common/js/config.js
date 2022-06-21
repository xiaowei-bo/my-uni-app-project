const ENV = process.env.NODE_ENV;
const urlMap = {
    development: "test_url",
    test: "test_url",
    staging: "staging_url",
    production: "production_url"
}

export {
    ENV,
    urlMap
}