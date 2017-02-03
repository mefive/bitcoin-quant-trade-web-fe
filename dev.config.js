/**
 * Created by wangjialin on 16/9/28.
 */
/*
 *
 * IMPORTANT
 *
 * Check out at first time, NEVER PUSH
 *
 * COPY IT TO dev.config.js then config your dev workspace.
 *
 * */
var config = require('./config');

var modules = {
};

var devconfig = {
  watchAll: true, // use for build all modules listed in 'modules'
  modules: [
    'tableTest'
  ]
};

module.exports = {
  getModules: function (configModules) {
    var m = Object.assign({}, modules, configModules);

    if (devconfig.watchAll) {
      return m;
    }

    else {
      var rt = {};

      for (var i = 0; i < devconfig.modules.length; i++) {
        var key = devconfig.modules[i];

        if (key in m) {
          rt[key] = m[key];
        }
      }

      return rt;
    }
  }
}