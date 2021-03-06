const app = require("./app")
const configJson = require("./util/config")

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];


async function main() {
  app.listen(config.port, () => console.log(`server run listening on port ${config.port}`))
}
main()