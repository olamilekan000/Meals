export default = {
  apps : [{
    name: "app",
    script: "./app.js",
    exec_interpreter : "babel-node",
    exec_mode        : "fork",
    instances: "1",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
