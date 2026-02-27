const {  defineConfig} = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    use: {
        baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    reporter: [['html'], ['list']]
})