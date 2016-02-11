# validate.js-xor
[![Build Status](https://travis-ci.org/gaggle/validate.js-xor.svg?branch=master)](https://travis-ci.org/gaggle/validate.js-xor)
[![Coverage Status](https://coveralls.io/repos/github/gaggle/validate.js-xor/badge.svg?branch=master)](https://coveralls.io/github/gaggle/validate.js-xor?branch=master)

`Exclusive or` validation plugin for [validate.js](http://validatejs.org).

Install:

    npm install gaggle/validate.js-xor

Use:

    var validate = require("validate.js")
    require("validate.js-xor").register()

    schema = {"foo": {xor: "bar"}, "bar": {xor: "foo"}}
    validate({foo: "value"}, this.schema)
    // => undefined

    validate({foo: "value", bar: "value"}, this.schema)
    // => { foo: [ 'cannot both define bar and foo' ],
            bar: [ 'cannot both define foo and bar' ] }
