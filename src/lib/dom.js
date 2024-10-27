new ((function () {
  function e(e) {
    (this.canvas = e),
      console.log(
        "%cMade with %c" +
          String.fromCharCode(10084) +
          "%c for BabylonJS\n%cby ClickON",
        "font-size:2rem; color:black; background:#404040; border-radius:4px 0 0 4px; padding-left:1rem",
        "font-size:2rem; color:#ff4000; background:#404040;",
        "font-size:2rem; color:black; background:#404040; border-radius:0 4px 4px 0; padding-right:1rem",
        "font-size:0.8rem; color:black; padding:0.5rem 0 0.5rem 0"
      ),
      this.init();
  }
  return (
    (e.prototype.init = function () {
      var e = this,
        t = new It(this.canvas, !0);
      (this.scene = new Ci(t)),
        this.fillScene(),
        t.runRenderLoop(function () {
          e.scene.render();
        }),
        window.addEventListener("resize", function () {
          t.resize();
        });
    }),
    (e.prototype.fillScene = function () {
      return (
        (e = this),
        (t = void 0),
        (n = function () {
          var e,
            t,
            i,
            n,
            r = this;
          return (function (e, t) {
            var i,
              n,
              r,
              o,
              s = {
                label: 0,
                sent: function () {
                  if (1 & r[0]) throw r[1];
                  return r[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (o = {
                next: a(0),
                throw: a(1),
                return: a(2),
              }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function a(o) {
              return function (a) {
                return (function (o) {
                  if (i) throw new TypeError("Generator is already executing.");
                  for (; s; )
                    try {
                      if (
                        ((i = 1),
                        n &&
                          (r =
                            2 & o[0]
                              ? n.return
                              : o[0]
                                ? n.throw || ((r = n.return) && r.call(n), 0)
                                : n.next) &&
                          !(r = r.call(n, o[1])).done)
                      )
                        return r;
                      switch (((n = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                        case 0:
                        case 1:
                          r = o;
                          break;
                        case 4:
                          return (
                            s.label++,
                            {
                              value: o[1],
                              done: !1,
                            }
                          );
                        case 5:
                          s.label++, (n = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = s.ops.pop()), s.trys.pop();
                          continue;
                        default:
                          if (
                            !(
                              (r =
                                (r = s.trys).length > 0 && r[r.length - 1]) ||
                              (6 !== o[0] && 2 !== o[0])
                            )
                          ) {
                            s = 0;
                            continue;
                          }
                          if (
                            3 === o[0] &&
                            (!r || (o[1] > r[0] && o[1] < r[3]))
                          ) {
                            s.label = o[1];
                            break;
                          }
                          if (6 === o[0] && s.label < r[1]) {
                            (s.label = r[1]), (r = o);
                            break;
                          }
                          if (r && s.label < r[2]) {
                            (s.label = r[2]), s.ops.push(o);
                            break;
                          }
                          r[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      o = t.call(e, s);
                    } catch (e) {
                      (o = [6, e]), (n = 0);
                    } finally {
                      i = r = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return {
                    value: o[0] ? o[1] : void 0,
                    done: !0,
                  };
                })([o, a]);
              };
            }
          })(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  ((e = new $n(
                    "arcCamera",
                    7.199,
                    1.574,
                    6.4,
                    new f(0, 1, 0),
                    this.scene
                  )).upperBetaLimit = 1.63),
                  (e.lowerBetaLimit = 0),
                  (e.upperRadiusLimit = 8.3),
                  (e.lowerRadiusLimit = 3.5),
                  (e.fov = 0.9),
                  (e.wheelPrecision = 32),
                  e.attachControl(),
                  (e.layerMask = 1),
                  (e.pinchPrecision = 0),
                  (t = new cp(this.scene)),
                  [
                    4,
                    (i = t.addMeshTask(
                      "Load diamond Demo scene",
                      void 0,
                      "diamond.json"
                    )).runTask(
                      this.scene,
                      function () {
                        (r._sceneRoot = new At("DiamondSceneRoot", r.scene)),
                          i.loadedMeshes.forEach(function (e) {
                            (e.parent = r._sceneRoot), (e.layerMask = 1);
                          }),
                          n();
                      },
                      function (e) {
                        console.log(e);
                      }
                    ),
                  ]
                );
              case 1:
                return (
                  o.sent(),
                  (n = function () {
                    (r.scene.clearColor = new T(0, 0, 0, 1)),
                      (new ol("light", new f(0, 3, 0), r.scene).intensity = 3),
                      (new ol("light2", new f(0, 15, 0), r.scene).intensity =
                        5),
                      (r.scene.getMaterialByID("envMaterial").metallicF0Factor =
                        0);
                    var t = new Zn("uiCamera", new f(0, 1e4, 0), r.scene);
                    (t.layerMask = 2), (r.scene.activeCameras = [e, t]);
                    var i = Ff.CreateFullscreenUI("UI");
                    i.layer.layerMask = 2;
                    var n = new pf();
                    (n.width = "200px"),
                      (n.isVertical = !0),
                      (n.horizontalAlignment = sf.HORIZONTAL_ALIGNMENT_RIGHT),
                      (n.verticalAlignment = sf.VERTICAL_ALIGNMENT_CENTER),
                      i.addControl(n);
                    var o = new uf();
                    (o.text = "Diamond Color"),
                      (o.color = "White"),
                      (o.height = "30px"),
                      n.addControl(o);
                    var s = new vf();
                    (s.value = b.FromHexString("#ef7c50")),
                      (s.height = "150px"),
                      (s.width = "150px"),
                      (s.horizontalAlignment = sf.HORIZONTAL_ALIGNMENT_CENTER),
                      n.addControl(s);
                    var a = new pf();
                    (a.width = "200px"),
                      (a.isVertical = !0),
                      (a.horizontalAlignment = sf.HORIZONTAL_ALIGNMENT_RIGHT),
                      (a.verticalAlignment = sf.VERTICAL_ALIGNMENT_CENTER),
                      (a.paddingTop = 500),
                      i.addControl(a);
                    var l = new uf();
                    (l.text = "Environment Color"),
                      (l.color = "White"),
                      (l.height = "30px"),
                      a.addControl(l);
                    var c,
                      u = new vf();
                    (u.value = b.FromHexString("#000001")),
                      (u.height = "150px"),
                      (u.width = "150px"),
                      (u.horizontalAlignment = sf.HORIZONTAL_ALIGNMENT_CENTER),
                      a.addControl(u);
                    var h = r.scene.getMeshByID("diamond"),
                      d = r.scene.getMeshByID("Cloth"),
                      p = r.scene.getMeshByID("environment"),
                      _ = _h.CreateSphere("sphere", {
                        diameter: 2,
                      }),
                      m = new Zs("name", r.scene);
                    (_.material = m),
                      (_.position = h.position),
                      (_.visibility = 1e-5);
                    var g = new Dr("refraction", 512, r.scene, !0);
                    g.renderList.push(d),
                      g.renderList.push(p),
                      g.renderList.push(_),
                      (g.lodGenerationScale = 0.5),
                      r.scene.customRenderTargets.push(g),
                      (m.refractionTexture = g),
                      (m.linkRefractionWithTransparency = !0),
                      (m.indexOfRefraction = 1.3),
                      (m.alpha = 0),
                      (m.roughness = 0.05),
                      (m.metallic = 0);
                    var v = new qr("shadow", r.scene);
                    (v.opacityTexture = new mn("/shadow.png", r.scene, !0, !0)),
                      (v.diffuseColor = new b(0, 0, 0)),
                      (v.specularColor = new b(0, 0, 0)),
                      (r.scene.getMeshByID("shadow").material = v),
                      Nc.ParseFromFileAsync(
                        "diamondMaterialInner",
                        "/diamondInner.json",
                        r.scene
                      ).then(function (e) {
                        (c = e).needDepthPrePass = !0;
                        var t = r.scene.getMeshByID("diamondInner");
                        (t.alphaIndex = 1.6),
                          (t.material = c),
                          (t.parent = h),
                          (t.material.getBlockByName("DiamondColor").value =
                            b.FromHexString("#ef7c50")),
                          (t.material.getBlockByName(
                            "RefractionBlock"
                          ).texture = _.material.refractionTexture),
                          s.onValueChangedObservable.add(function (e) {
                            t.material.getBlockByName("DiamondColor").value = e;
                          });
                      }),
                      Nc.ParseFromFileAsync(
                        "diamondMaterialOuter",
                        "/diamondOuter.json",
                        r.scene
                      ).then(function (e) {
                        (c = e).needDepthPrePass = !0;
                        var t = r.scene.getMeshByID("diamondOuter");
                        (t.material = c),
                          (t.parent = h),
                          (t.material.getBlockByName("DiamondColor").value =
                            b.FromHexString("#ef7c50")),
                          (t.material.getBlockByName(
                            "RefractionBlock"
                          ).texture = _.material.refractionTexture),
                          s.onValueChangedObservable.add(function (e) {
                            t.material.getBlockByName("DiamondColor").value = e;
                          }),
                          n.addControl(s);
                      }),
                      Nc.ParseFromFileAsync(
                        "redCloth",
                        "/redCloth.json",
                        r.scene
                      ).then(function (e) {
                        (e.getBlockByName(
                          "PBRMetallicRoughness"
                        ).specularIntensity = 0),
                          (e.backFaceCulling = !1),
                          (r.scene.getMeshByID("Cloth").material = e),
                          u.onValueChangedObservable.add(function (t) {
                            (e.getBlockByName("baseColor").value = t),
                              (p.material.albedoColor = t);
                          });
                      });
                    var y = new xd("diamondPP", !1, r.scene, [
                      r.scene.activeCamera,
                    ]);
                    (y.samples = 8),
                      (y.chromaticAberrationEnabled = !0),
                      (y.chromaticAberration.aberrationAmount = 20),
                      (y.chromaticAberration.radialIntensity = 0.7),
                      (y.bloomEnabled = !0),
                      (y.bloomThreshold = 0),
                      (y.bloomWeight = 2),
                      (y.bloomKernel = 3),
                      (y.bloomScale = 1),
                      (y.imageProcessingEnabled = !0),
                      (y.imageProcessing.vignetteEnabled = !0),
                      (y.imageProcessing.vignetteWeight = 2),
                      (y.imageProcessing.vignetteCameraFov = 1.25),
                      r.scene.onBeforeRenderObservable.add(function () {
                        e.alpha += 0.001;
                      });
                  }),
                  [2]
                );
            }
          });
        }),
        new ((i = void 0) || (i = Promise))(function (r, o) {
          function s(e) {
            try {
              l(n.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              l(n.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function l(e) {
            var t;
            e.done
              ? r(e.value)
              : ((t = e.value),
                t instanceof i
                  ? t
                  : new i(function (e) {
                      e(t);
                    })).then(s, a);
          }
          l((n = n.apply(e, t || [])).next());
        })
      );
      var e, t, i, n;
    }),
    (e.Resources = qp),
    e
  );
})())(document.getElementById("renderCanvas"));
