"use strict";
var _ = require("lodash")
var s = require("util").format

exports.register = function (module) {
  if (!module) module = require("validate.js")

  var val = function (value, options, key, attributes) {
    var otherValue = _.get(attributes, options)
    if (value === undefined && otherValue === undefined) {
      return s("^%s not defined", key, value)
    }
    if (value && otherValue) {
      return s("^cannot both define %s and %s", options, key)
    }
  }

  var async = function (args) {
    args = arguments
    var promise = module.Promise
    return new promise(function (resolve) {
      var result = val.apply(this, args)
      resolve(result)
    })
  }

  module.validators.xor = val
  module.validators.xorAsync = async
}
