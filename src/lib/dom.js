"use strict";
var e = {};
e.g = (function () {
  if ("object" == typeof globalThis) return globalThis;
  try {
    return this || new Function("return this")();
  } catch (e) {
    if ("object" == typeof window) return window;
  }
})();
var t = (function () {
  function e() {
    (this.rootNodes = new Array()),
      (this.cameras = new Array()),
      (this.lights = new Array()),
      (this.meshes = new Array()),
      (this.skeletons = new Array()),
      (this.particleSystems = new Array()),
      (this.animations = []),
      (this.animationGroups = new Array()),
      (this.multiMaterials = new Array()),
      (this.materials = new Array()),
      (this.morphTargetManagers = new Array()),
      (this.geometries = new Array()),
      (this.transformNodes = new Array()),
      (this.actionManagers = new Array()),
      (this.textures = new Array()),
      (this._environmentTexture = null),
      (this.postProcesses = new Array());
  }
  return (
    (e.AddParser = function (e, t) {
      this._BabylonFileParsers[e] = t;
    }),
    (e.GetParser = function (e) {
      return this._BabylonFileParsers[e] ? this._BabylonFileParsers[e] : null;
    }),
    (e.AddIndividualParser = function (e, t) {
      this._IndividualBabylonFileParsers[e] = t;
    }),
    (e.GetIndividualParser = function (e) {
      return this._IndividualBabylonFileParsers[e]
        ? this._IndividualBabylonFileParsers[e]
        : null;
    }),
    (e.Parse = function (e, t, i, n) {
      for (var r in this._BabylonFileParsers)
        this._BabylonFileParsers.hasOwnProperty(r) &&
          this._BabylonFileParsers[r](e, t, i, n);
    }),
    Object.defineProperty(e.prototype, "environmentTexture", {
      get: function () {
        return this._environmentTexture;
      },
      set: function (e) {
        this._environmentTexture = e;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.getNodes = function () {
      var e = new Array();
      return (
        (e = (e = (e = (e = e.concat(this.meshes)).concat(this.lights)).concat(
          this.cameras
        )).concat(this.transformNodes)),
        this.skeletons.forEach(function (t) {
          return (e = e.concat(t.bones));
        }),
        e
      );
    }),
    (e._BabylonFileParsers = {}),
    (e._IndividualBabylonFileParsers = {}),
    e
  );
})();
