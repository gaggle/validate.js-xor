"use strict";
var expect = require("must")
var validate = require("validate.js")
var validateXor = require("../")

validateXor.register(validate)

describe("validate.js-xor.js", function () {
  describe("#register", function () {
    it("should register itself", function () {
      var module = {validators: {}}
      validateXor.register(module)
      expect(module.validators.xor).to.be.a.function()
    })
  })

  describe("simple schema", function () {
    beforeEach(function () {
      this.schema = {"foo": {xor: "bar"}, "bar": {xor: "foo"}}
    })

    it("should validate if either key is specified", function () {
      var res1 = validate({foo: "value"}, this.schema)
      expect(res1).to.be.undefined()

      var res2 = validate({bar: "value"}, this.schema)
      expect(res2).to.be.undefined()
    })

    it("should fail if both keys are specified", function () {
      var res = validate({foo: "val", bar: "val"}, this.schema)
      expect(res).to.be.object()
    })

    it("should fail if neither keys are specified", function () {
      var res = validate({}, this.schema)
      expect(res).to.be.object()
    })
  })

  describe("nested parameters", function () {
    beforeEach(function () {
      this.schema = {
        "foo.bar": {xor: "spam.ham"},
        "spam.ham": {xor: "foo.bar"}
      }
    })

    it("should validate if either key is specified", function () {
      var res1 = validate({foo: {bar: "val"}}, this.schema)
      expect(res1).to.be.undefined()

      var res2 = validate({spam: {ham: "val"}}, this.schema)
      expect(res2).to.be.undefined()
    })

    it("should fail if both keys are specified", function () {
      var res = validate({foo: {bar: "val"}, spam: {ham: "val"}}, this.schema)
      expect(res).to.be.object()
    })

    it("should fail if neither keys are specified", function () {
      var res = validate({foo: "invalid"}, this.schema)
      expect(res).to.be.object()
    })
  })

  describe("async integration", function () {
    beforeEach(function () {
      this.schema = {"foo": {xorAsync: "bar"}, "bar": {xorAsync: "foo"}}
    })

    it("should validate", function () {
      return validate.async({foo: "val"}, this.schema)
        .must.resolve.to.object()
    })

    it("should reject", function () {
      return validate.async({foo: "val", bar: "val"}, this.schema)
        .must.reject.to.object()
    })
  })
})
