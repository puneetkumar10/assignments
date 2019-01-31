var localConfig = require('./env/config.local');

var config = {
    local: localConfig
}

module.exports = {
    config: function () { return config[process.env.NODE_ENV] || config.local }
}
