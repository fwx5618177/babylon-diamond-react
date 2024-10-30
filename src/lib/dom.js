选中的代码，实现了什么功能，是不是babylon.js 内置的方法？是不是在 babylon 里？下面代码里的 shader 都是 babylon 自带的吧？是不是 babylon 的方法实现，而不是调用


    
var xo = (function () {
  function e(e) {
    var t = this;
    (this.BJSINSPECTOR = this._getGlobalInspector()),
      (this._scene = e),
      this._scene.onDisposeObservable.add(function () {
        t._scene._debugLayer && t._scene._debugLayer.hide();
      });
  }
  return (
    Object.defineProperty(e.prototype, "onPropertyChangedObservable", {
      get: function () {
        return this.BJSINSPECTOR && this.BJSINSPECTOR.Inspector
          ? this.BJSINSPECTOR.Inspector.OnPropertyChangedObservable
          : (this._onPropertyChangedObservable ||
              (this._onPropertyChangedObservable = new o()),
            this._onPropertyChangedObservable);
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype._createInspector = function (e) {
      if (!this.isVisible()) {
        if (this._onPropertyChangedObservable) {
          for (
            var t = 0, i = this._onPropertyChangedObservable.observers;
            t < i.length;
            t++
          ) {
            var n = i[t];
            this.BJSINSPECTOR.Inspector.OnPropertyChangedObservable.add(n);
          }
          this._onPropertyChangedObservable.clear(),
            (this._onPropertyChangedObservable = void 0);
        }
        var r = A(
          {
            overlay: !1,
            showExplorer: !0,
            showInspector: !0,
            embedMode: !1,
            handleResize: !0,
            enablePopup: !0,
          },
          e
        );
        (this.BJSINSPECTOR = this.BJSINSPECTOR || this._getGlobalInspector()),
          this.BJSINSPECTOR.Inspector.Show(this._scene, r);
      }
    }),
    (e.prototype.select = function (e, t) {
      this.BJSINSPECTOR &&
        (t &&
          ("[object String]" == Object.prototype.toString.call(t)
            ? this.BJSINSPECTOR.Inspector.MarkLineContainerTitleForHighlighting(
                t
              )
            : this.BJSINSPECTOR.Inspector.MarkMultipleLineContainerTitlesForHighlighting(
                t
              )),
        this.BJSINSPECTOR.Inspector.OnSelectionChangeObservable.notifyObservers(
          e
        ));
    }),
    (e.prototype._getGlobalInspector = function () {
      return "undefined" != typeof INSPECTOR
        ? INSPECTOR
        : "undefined" != typeof BABYLON && void 0 !== BABYLON.Inspector
          ? BABYLON
          : void 0;
    }),
    (e.prototype.isVisible = function () {
      return this.BJSINSPECTOR && this.BJSINSPECTOR.Inspector.IsVisible;
    }),
    (e.prototype.hide = function () {
      this.BJSINSPECTOR && this.BJSINSPECTOR.Inspector.Hide();
    }),
    (e.prototype.setAsActiveScene = function () {
      this.BJSINSPECTOR &&
        this.BJSINSPECTOR.Inspector._SetNewScene(this._scene);
    }),
    (e.prototype.show = function (t) {
      var i = this;
      return new Promise(function (n, r) {
        if (void 0 === i.BJSINSPECTOR) {
          var o = t && t.inspectorURL ? t.inspectorURL : e.InspectorURL;
          yt.LoadScript(o, function () {
            i._createInspector(t), n(i);
          });
        } else i._createInspector(t), n(i);
      });
    }),
    (e.InspectorURL =
      "https://unpkg.com/babylonjs-inspector@" +
      It.Version +
      "/babylon.inspector.bundle.js"),
    e
  );
})();
(Nt.CreateBox = function (e) {
  var t,
    i = [
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12,
      14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
    ],
    n = [
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
      -1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
      -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      0, 0, -1, 0,
    ],
    r = [],
    o = e.width || e.size || 1,
    s = e.height || e.size || 1,
    a = e.depth || e.size || 1,
    l = e.wrap || !1,
    c = void 0 === e.topBaseAt ? 1 : e.topBaseAt,
    u = void 0 === e.bottomBaseAt ? 0 : e.bottomBaseAt,
    h = [2, 0, 3, 1][(c = (c + 4) % 4)],
    d = [2, 0, 1, 3][(u = (u + 4) % 4)],
    p = [
      1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1,
      1, -1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1,
      -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
      1, -1, -1, -1, -1, -1, -1, -1, 1,
    ];
  if (l) {
    (i = [
      2, 3, 0, 2, 0, 1, 4, 5, 6, 4, 6, 7, 9, 10, 11, 9, 11, 8, 12, 14, 15, 12,
      13, 14,
    ]),
      (p = [
        -1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1,
        -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1,
        1, 1, -1, -1, 1, -1, -1, -1,
      ]);
    for (
      var f = [
          [1, 1, 1],
          [-1, 1, 1],
          [-1, 1, -1],
          [1, 1, -1],
        ],
        m = [
          [-1, -1, 1],
          [1, -1, 1],
          [1, -1, -1],
          [-1, -1, -1],
        ],
        g = [17, 18, 19, 16],
        v = [22, 23, 20, 21];
      h > 0;

    )
      f.unshift(f.pop()), g.unshift(g.pop()), h--;
    for (; d > 0; ) m.unshift(m.pop()), v.unshift(v.pop()), d--;
    (f = f.flat()),
      (m = m.flat()),
      (p = p.concat(f).concat(m)),
      i.push(g[0], g[2], g[3], g[0], g[1], g[2]),
      i.push(v[0], v[2], v[3], v[0], v[1], v[2]);
  }
  var y = [o / 2, s / 2, a / 2];
  t = p.reduce(function (e, t, i) {
    return e.concat(t * y[i % 3]);
  }, []);
  for (
    var b = 0 === e.sideOrientation ? 0 : e.sideOrientation || Nt.DEFAULTSIDE,
      S = e.faceUV || new Array(6),
      C = e.faceColors,
      x = [],
      E = 0;
    E < 6;
    E++
  )
    void 0 === S[E] && (S[E] = new _(0, 0, 1, 1)),
      C && void 0 === C[E] && (C[E] = new T(1, 1, 1, 1));
  for (var P = 0; P < 6; P++)
    if (
      (r.push(S[P].z, S[P].w),
      r.push(S[P].x, S[P].w),
      r.push(S[P].x, S[P].y),
      r.push(S[P].z, S[P].y),
      C)
    )
      for (var A = 0; A < 4; A++) x.push(C[P].r, C[P].g, C[P].b, C[P].a);
  Nt._ComputeSides(b, t, i, n, r, e.frontUVs, e.backUVs);
  var R = new Nt();
  if (((R.indices = i), (R.positions = t), (R.normals = n), (R.uvs = r), C)) {
    var M = b === Nt.DOUBLESIDE ? x.concat(x) : x;
    R.colors = M;
  }
  return R;
}),
  (Qi.CreateBox = function (e, t, i, n, r) {
    void 0 === i && (i = null);
    var o = {
      size: t,
      sideOrientation: r,
      updatable: n,
    };
    return Eo.CreateBox(e, o, i);
  });
var Eo = (function () {
  function e() {}
  return (
    (e.CreateBox = function (e, t, i) {
      void 0 === i && (i = null);
      var n = new Qi(e, i);
      return (
        (t.sideOrientation = Qi._GetDefaultSideOrientation(
          t.sideOrientation
        )),
        (n._originalBuilderSideOrientation = t.sideOrientation),
        Nt.CreateBox(t).applyToMesh(n, t.updatable),
        n
      );
    }),
    e
  );
})();
(Nt.CreateSphere = function (e) {
  for (
    var t = e.segments || 32,
      i = e.diameterX || e.diameter || 1,
      n = e.diameterY || e.diameter || 1,
      r = e.diameterZ || e.diameter || 1,
      o = e.arc && (e.arc <= 0 || e.arc > 1) ? 1 : e.arc || 1,
      s = e.slice && e.slice <= 0 ? 1 : e.slice || 1,
      a = 0 === e.sideOrientation ? 0 : e.sideOrientation || Nt.DEFAULTSIDE,
      l = !!e.dedupTopBottomIndices,
      c = new f(i / 2, n / 2, r / 2),
      u = 2 + t,
      h = 2 * u,
      d = [],
      p = [],
      _ = [],
      m = [],
      v = 0;
    v <= u;
    v++
  ) {
    for (var y = v / u, b = y * Math.PI * s, T = 0; T <= h; T++) {
      var S = T / h,
        C = S * Math.PI * 2 * o,
        x = g.RotationZ(-b),
        E = g.RotationY(C),
        P = f.TransformCoordinates(f.Up(), x),
        A = f.TransformCoordinates(P, E),
        R = A.multiply(c),
        M = A.divide(c).normalize();
      p.push(R.x, R.y, R.z), _.push(M.x, M.y, M.z), m.push(S, y);
    }
    if (v > 0)
      for (var O = p.length / 3, I = O - 2 * (h + 1); I + h + 2 < O; I++)
        l
          ? (v > 1 && (d.push(I), d.push(I + 1), d.push(I + h + 1)),
            (v < u || s < 1) &&
              (d.push(I + h + 1), d.push(I + 1), d.push(I + h + 2)))
          : (d.push(I),
            d.push(I + 1),
            d.push(I + h + 1),
            d.push(I + h + 1),
            d.push(I + 1),
            d.push(I + h + 2));
  }
  Nt._ComputeSides(a, p, d, _, m, e.frontUVs, e.backUVs);
  var D = new Nt();
  return (D.indices = d), (D.positions = p), (D.normals = _), (D.uvs = m), D;
}),
  (Qi.CreateSphere = function (e, t, i, n, r, o) {
    var s = {
      segments: t,
      diameterX: i,
      diameterY: i,
      diameterZ: i,
      sideOrientation: o,
      updatable: r,
    };
    return Po.CreateSphere(e, s, n);
  });
var Po = (function () {
    function e() {}
    return (
      (e.CreateSphere = function (e, t, i) {
        void 0 === i && (i = null);
        var n = new Qi(e, i);
        return (
          (t.sideOrientation = Qi._GetDefaultSideOrientation(
            t.sideOrientation
          )),
          (n._originalBuilderSideOrientation = t.sideOrientation),
          Nt.CreateSphere(t).applyToMesh(n, t.updatable),
          n
        );
      }),
      e
    );
  })(),
  Ao = (function () {
    function e(e, t) {
      (this.type = e),
        (this.jointData = t),
        (t.nativeParams = t.nativeParams || {});
    }
    return (
      Object.defineProperty(e.prototype, "physicsJoint", {
        get: function () {
          return this._physicsJoint;
        },
        set: function (e) {
          this._physicsJoint, (this._physicsJoint = e);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "physicsPlugin", {
        set: function (e) {
          this._physicsPlugin = e;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.executeNativeFunction = function (e) {
        e(this._physicsPlugin.world, this._physicsJoint);
      }),
      (e.DistanceJoint = 0),
      (e.HingeJoint = 1),
      (e.BallAndSocketJoint = 2),
      (e.WheelJoint = 3),
      (e.SliderJoint = 4),
      (e.PrismaticJoint = 5),
      (e.UniversalJoint = 6),
      (e.Hinge2Joint = e.WheelJoint),
      (e.PointToPointJoint = 8),
      (e.SpringJoint = 9),
      (e.LockJoint = 10),
      e
    );
  })(),
  Ro =
    ((function (e) {
      function t(t) {
        return e.call(this, Ao.DistanceJoint, t) || this;
      }
      P(t, e),
        (t.prototype.updateDistance = function (e, t) {
          this._physicsPlugin.updateDistanceJoint(this, e, t);
        });
    })(Ao),
    (function (e) {
      function t(t, i) {
        return e.call(this, t, i) || this;
      }
      return (
        P(t, e),
        (t.prototype.setMotor = function (e, t) {
          this._physicsPlugin.setMotor(this, e || 0, t);
        }),
        (t.prototype.setLimit = function (e, t) {
          this._physicsPlugin.setLimit(this, e, t);
        }),
        t
      );
    })(Ao));
(function (e) {
  function t(t) {
    return e.call(this, Ao.HingeJoint, t) || this;
  }
  P(t, e),
    (t.prototype.setMotor = function (e, t) {
      this._physicsPlugin.setMotor(this, e || 0, t);
    }),
    (t.prototype.setLimit = function (e, t) {
      this._physicsPlugin.setLimit(this, e, t);
    });
})(Ro),
  (function (e) {
    function t(t) {
      return e.call(this, Ao.Hinge2Joint, t) || this;
    }
    P(t, e),
      (t.prototype.setMotor = function (e, t, i) {
        void 0 === i && (i = 0),
          this._physicsPlugin.setMotor(this, e || 0, t, i);
      }),
      (t.prototype.setLimit = function (e, t, i) {
        void 0 === i && (i = 0), this._physicsPlugin.setLimit(this, e, t, i);
      });
  })(Ro),
  (Qi._PhysicsImpostorParser = function (e, t, i) {
    return new Mo(
      t,
      i.physicsImpostor,
      {
        mass: i.physicsMass,
        friction: i.physicsFriction,
        restitution: i.physicsRestitution,
      },
      e
    );
  });
var Mo = (function () {
  function e(e, t, i, n) {
    var r = this;
    void 0 === i &&
      (i = {
        mass: 0,
      }),
      (this.object = e),
      (this.type = t),
      (this._options = i),
      (this._scene = n),
      (this._pluginData = {}),
      (this._bodyUpdateRequired = !1),
      (this._onBeforePhysicsStepCallbacks = new Array()),
      (this._onAfterPhysicsStepCallbacks = new Array()),
      (this._onPhysicsCollideCallbacks = []),
      (this._deltaPosition = f.Zero()),
      (this._isDisposed = !1),
      (this.soft = !1),
      (this.segments = 0),
      (this._tmpQuat = new m()),
      (this._tmpQuat2 = new m()),
      (this.beforeStep = function () {
        r._physicsEngine &&
          (r.object.translate(r._deltaPosition, -1),
          r._deltaRotationConjugated &&
            r.object.rotationQuaternion &&
            r.object.rotationQuaternion.multiplyToRef(
              r._deltaRotationConjugated,
              r.object.rotationQuaternion
            ),
          r.object.computeWorldMatrix(!1),
          r.object.parent && r.object.rotationQuaternion
            ? (r.getParentsRotation(),
              r._tmpQuat.multiplyToRef(
                r.object.rotationQuaternion,
                r._tmpQuat
              ))
            : r._tmpQuat.copyFrom(r.object.rotationQuaternion || new m()),
          r._options.disableBidirectionalTransformation ||
            (r.object.rotationQuaternion &&
              r._physicsEngine
                .getPhysicsPlugin()
                .setPhysicsBodyTransformation(
                  r,
                  r.object.getAbsolutePosition(),
                  r._tmpQuat
                )),
          r._onBeforePhysicsStepCallbacks.forEach(function (e) {
            e(r);
          }));
      }),
      (this.afterStep = function () {
        r._physicsEngine &&
          (r._onAfterPhysicsStepCallbacks.forEach(function (e) {
            e(r);
          }),
          r._physicsEngine
            .getPhysicsPlugin()
            .setTransformationFromPhysicsBody(r),
          r.object.parent &&
            r.object.rotationQuaternion &&
            (r.getParentsRotation(),
            r._tmpQuat.conjugateInPlace(),
            r._tmpQuat.multiplyToRef(
              r.object.rotationQuaternion,
              r.object.rotationQuaternion
            )),
          r.object.setAbsolutePosition(r.object.position),
          r._deltaRotation &&
            r.object.rotationQuaternion &&
            r.object.rotationQuaternion.multiplyToRef(
              r._deltaRotation,
              r.object.rotationQuaternion
            ),
          r.object.translate(r._deltaPosition, 1));
      }),
      (this.onCollideEvent = null),
      (this.onCollide = function (e) {
        if (
          (r._onPhysicsCollideCallbacks.length || r.onCollideEvent) &&
          r._physicsEngine
        ) {
          var t = r._physicsEngine.getImpostorWithPhysicsBody(e.body);
          t &&
            (r.onCollideEvent && r.onCollideEvent(r, t),
            r._onPhysicsCollideCallbacks
              .filter(function (e) {
                return -1 !== e.otherImpostors.indexOf(t);
              })
              .forEach(function (i) {
                i.callback(r, t, e.point);
              }));
        }
      }),
      this.object
        ? (this.object.parent &&
            0 !== i.mass &&
            F.Warn(
              "A physics impostor has been created for an object which has a parent. Babylon physics currently works in local space so unexpected issues may occur."
            ),
          !this._scene && e.getScene && (this._scene = e.getScene()),
          this._scene &&
            (this.type > 100 && (this.soft = !0),
            (this._physicsEngine = this._scene.getPhysicsEngine()),
            this._physicsEngine
              ? (this.object.rotationQuaternion ||
                  (this.object.rotation
                    ? (this.object.rotationQuaternion =
                        m.RotationYawPitchRoll(
                          this.object.rotation.y,
                          this.object.rotation.x,
                          this.object.rotation.z
                        ))
                    : (this.object.rotationQuaternion = new m())),
                (this._options.mass = void 0 === i.mass ? 0 : i.mass),
                (this._options.friction =
                  void 0 === i.friction ? 0.2 : i.friction),
                (this._options.restitution =
                  void 0 === i.restitution ? 0.2 : i.restitution),
                this.soft &&
                  ((this._options.mass =
                    this._options.mass > 0 ? this._options.mass : 1),
                  (this._options.pressure =
                    void 0 === i.pressure ? 200 : i.pressure),
                  (this._options.stiffness =
                    void 0 === i.stiffness ? 1 : i.stiffness),
                  (this._options.velocityIterations =
                    void 0 === i.velocityIterations
                      ? 20
                      : i.velocityIterations),
                  (this._options.positionIterations =
                    void 0 === i.positionIterations
                      ? 20
                      : i.positionIterations),
                  (this._options.fixedPoints =
                    void 0 === i.fixedPoints ? 0 : i.fixedPoints),
                  (this._options.margin = void 0 === i.margin ? 0 : i.margin),
                  (this._options.damping =
                    void 0 === i.damping ? 0 : i.damping),
                  (this._options.path = void 0 === i.path ? null : i.path),
                  (this._options.shape =
                    void 0 === i.shape ? null : i.shape)),
                (this._joints = []),
                !this.object.parent || this._options.ignoreParent
                  ? this._init()
                  : this.object.parent.physicsImpostor &&
                    F.Warn(
                      "You must affect impostors to children before affecting impostor to parent."
                    ))
              : F.Error(
                  "Physics not enabled. Please use scene.enablePhysics(...) before creating impostors."
                )))
        : F.Error("No object was provided. A physics object is obligatory");
  }
  return (
    Object.defineProperty(e.prototype, "isDisposed", {
      get: function () {
        return this._isDisposed;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "mass", {
      get: function () {
        return this._physicsEngine
          ? this._physicsEngine.getPhysicsPlugin().getBodyMass(this)
          : 0;
      },
      set: function (e) {
        this.setMass(e);
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "friction", {
      get: function () {
        return this._physicsEngine
          ? this._physicsEngine.getPhysicsPlugin().getBodyFriction(this)
          : 0;
      },
      set: function (e) {
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().setBodyFriction(this, e);
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "restitution", {
      get: function () {
        return this._physicsEngine
          ? this._physicsEngine.getPhysicsPlugin().getBodyRestitution(this)
          : 0;
      },
      set: function (e) {
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().setBodyRestitution(this, e);
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "pressure", {
      get: function () {
        if (!this._physicsEngine) return 0;
        var e = this._physicsEngine.getPhysicsPlugin();
        return e.setBodyPressure ? e.getBodyPressure(this) : 0;
      },
      set: function (e) {
        if (this._physicsEngine) {
          var t = this._physicsEngine.getPhysicsPlugin();
          t.setBodyPressure && t.setBodyPressure(this, e);
        }
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "stiffness", {
      get: function () {
        if (!this._physicsEngine) return 0;
        var e = this._physicsEngine.getPhysicsPlugin();
        return e.getBodyStiffness ? e.getBodyStiffness(this) : 0;
      },
      set: function (e) {
        if (this._physicsEngine) {
          var t = this._physicsEngine.getPhysicsPlugin();
          t.setBodyStiffness && t.setBodyStiffness(this, e);
        }
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "velocityIterations", {
      get: function () {
        if (!this._physicsEngine) return 0;
        var e = this._physicsEngine.getPhysicsPlugin();
        return e.getBodyVelocityIterations
          ? e.getBodyVelocityIterations(this)
          : 0;
      },
      set: function (e) {
        if (this._physicsEngine) {
          var t = this._physicsEngine.getPhysicsPlugin();
          t.setBodyVelocityIterations && t.setBodyVelocityIterations(this, e);
        }
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "positionIterations", {
      get: function () {
        if (!this._physicsEngine) return 0;
        var e = this._physicsEngine.getPhysicsPlugin();
        return e.getBodyPositionIterations
          ? e.getBodyPositionIterations(this)
          : 0;
      },
      set: function (e) {
        if (this._physicsEngine) {
          var t = this._physicsEngine.getPhysicsPlugin();
          t.setBodyPositionIterations && t.setBodyPositionIterations(this, e);
        }
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype._init = function () {
      this._physicsEngine &&
        (this._physicsEngine.removeImpostor(this),
        (this.physicsBody = null),
        (this._parent = this._parent || this._getPhysicsParent()),
        this._isDisposed ||
          (this.parent && !this._options.ignoreParent) ||
          this._physicsEngine.addImpostor(this));
    }),
    (e.prototype._getPhysicsParent = function () {
      return this.object.parent instanceof Yt
        ? this.object.parent.physicsImpostor
        : null;
    }),
    (e.prototype.isBodyInitRequired = function () {
      return (
        this._bodyUpdateRequired || (!this._physicsBody && !this._parent)
      );
    }),
    (e.prototype.setScalingUpdated = function () {
      this.forceUpdate();
    }),
    (e.prototype.forceUpdate = function () {
      this._init(),
        this.parent &&
          !this._options.ignoreParent &&
          this.parent.forceUpdate();
    }),
    Object.defineProperty(e.prototype, "physicsBody", {
      get: function () {
        return this._parent && !this._options.ignoreParent
          ? this._parent.physicsBody
          : this._physicsBody;
      },
      set: function (e) {
        this._physicsBody &&
          this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().removePhysicsBody(this),
          (this._physicsBody = e),
          this.resetUpdateFlags();
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "parent", {
      get: function () {
        return !this._options.ignoreParent && this._parent
          ? this._parent
          : null;
      },
      set: function (e) {
        this._parent = e;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.resetUpdateFlags = function () {
      this._bodyUpdateRequired = !1;
    }),
    (e.prototype.getObjectExtendSize = function () {
      if (this.object.getBoundingInfo) {
        var t = this.object.rotationQuaternion,
          i = this.object.scaling.clone();
        this.object.rotationQuaternion = e.IDENTITY_QUATERNION;
        var n =
          this.object.computeWorldMatrix &&
          this.object.computeWorldMatrix(!0);
        n && n.decompose(i, void 0, void 0);
        var r = this.object
          .getBoundingInfo()
          .boundingBox.extendSize.scale(2)
          .multiplyInPlace(i);
        return (
          (this.object.rotationQuaternion = t),
          this.object.computeWorldMatrix &&
            this.object.computeWorldMatrix(!0),
          r
        );
      }
      return e.DEFAULT_OBJECT_SIZE;
    }),
    (e.prototype.getObjectCenter = function () {
      return this.object.getBoundingInfo
        ? this.object.getBoundingInfo().boundingBox.centerWorld
        : this.object.position;
    }),
    (e.prototype.getParam = function (e) {
      return this._options[e];
    }),
    (e.prototype.setParam = function (e, t) {
      (this._options[e] = t), (this._bodyUpdateRequired = !0);
    }),
    (e.prototype.setMass = function (e) {
      this.getParam("mass") !== e && this.setParam("mass", e),
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().setBodyMass(this, e);
    }),
    (e.prototype.getLinearVelocity = function () {
      return this._physicsEngine
        ? this._physicsEngine.getPhysicsPlugin().getLinearVelocity(this)
        : f.Zero();
    }),
    (e.prototype.setLinearVelocity = function (e) {
      this._physicsEngine &&
        this._physicsEngine.getPhysicsPlugin().setLinearVelocity(this, e);
    }),
    (e.prototype.getAngularVelocity = function () {
      return this._physicsEngine
        ? this._physicsEngine.getPhysicsPlugin().getAngularVelocity(this)
        : f.Zero();
    }),
    (e.prototype.setAngularVelocity = function (e) {
      this._physicsEngine &&
        this._physicsEngine.getPhysicsPlugin().setAngularVelocity(this, e);
    }),
    (e.prototype.executeNativeFunction = function (e) {
      this._physicsEngine &&
        e(this._physicsEngine.getPhysicsPlugin().world, this.physicsBody);
    }),
    (e.prototype.registerBeforePhysicsStep = function (e) {
      this._onBeforePhysicsStepCallbacks.push(e);
    }),
    (e.prototype.unregisterBeforePhysicsStep = function (e) {
      var t = this._onBeforePhysicsStepCallbacks.indexOf(e);
      t > -1
        ? this._onBeforePhysicsStepCallbacks.splice(t, 1)
        : F.Warn("Function to remove was not found");
    }),
    (e.prototype.registerAfterPhysicsStep = function (e) {
      this._onAfterPhysicsStepCallbacks.push(e);
    }),
    (e.prototype.unregisterAfterPhysicsStep = function (e) {
      var t = this._onAfterPhysicsStepCallbacks.indexOf(e);
      t > -1
        ? this._onAfterPhysicsStepCallbacks.splice(t, 1)
        : F.Warn("Function to remove was not found");
    }),
    (e.prototype.registerOnPhysicsCollide = function (e, t) {
      var i = e instanceof Array ? e : [e];
      this._onPhysicsCollideCallbacks.push({
        callback: t,
        otherImpostors: i,
      });
    }),
    (e.prototype.unregisterOnPhysicsCollide = function (e, t) {
      var i = e instanceof Array ? e : [e],
        n = -1;
      this._onPhysicsCollideCallbacks.some(function (e, r) {
        if (e.callback === t && e.otherImpostors.length === i.length) {
          var o = e.otherImpostors.every(function (e) {
            return i.indexOf(e) > -1;
          });
          return o && (n = r), o;
        }
        return !1;
      })
        ? this._onPhysicsCollideCallbacks.splice(n, 1)
        : F.Warn("Function to remove was not found");
    }),
    (e.prototype.getParentsRotation = function () {
      var e = this.object.parent;
      for (this._tmpQuat.copyFromFloats(0, 0, 0, 1); e; )
        e.rotationQuaternion
          ? this._tmpQuat2.copyFrom(e.rotationQuaternion)
          : m.RotationYawPitchRollToRef(
              e.rotation.y,
              e.rotation.x,
              e.rotation.z,
              this._tmpQuat2
            ),
          this._tmpQuat.multiplyToRef(this._tmpQuat2, this._tmpQuat),
          (e = e.parent);
      return this._tmpQuat;
    }),
    (e.prototype.applyForce = function (e, t) {
      return (
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().applyForce(this, e, t),
        this
      );
    }),
    (e.prototype.applyImpulse = function (e, t) {
      return (
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().applyImpulse(this, e, t),
        this
      );
    }),
    (e.prototype.createJoint = function (e, t, i) {
      var n = new Ao(t, i);
      return this.addJoint(e, n), this;
    }),
    (e.prototype.addJoint = function (e, t) {
      return (
        this._joints.push({
          otherImpostor: e,
          joint: t,
        }),
        this._physicsEngine && this._physicsEngine.addJoint(this, e, t),
        this
      );
    }),
    (e.prototype.addAnchor = function (e, t, i, n, r) {
      if (!this._physicsEngine) return this;
      var o = this._physicsEngine.getPhysicsPlugin();
      return o.appendAnchor
        ? (this._physicsEngine && o.appendAnchor(this, e, t, i, n, r), this)
        : this;
    }),
    (e.prototype.addHook = function (e, t, i, n) {
      if (!this._physicsEngine) return this;
      var r = this._physicsEngine.getPhysicsPlugin();
      return r.appendAnchor
        ? (this._physicsEngine && r.appendHook(this, e, t, i, n), this)
        : this;
    }),
    (e.prototype.sleep = function () {
      return (
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().sleepBody(this),
        this
      );
    }),
    (e.prototype.wakeUp = function () {
      return (
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().wakeUpBody(this),
        this
      );
    }),
    (e.prototype.clone = function (t) {
      return t ? new e(t, this.type, this._options, this._scene) : null;
    }),
    (e.prototype.dispose = function () {
      var e = this;
      this._physicsEngine &&
        (this._joints.forEach(function (t) {
          e._physicsEngine &&
            e._physicsEngine.removeJoint(e, t.otherImpostor, t.joint);
        }),
        this._physicsEngine.removeImpostor(this),
        this.parent && this.parent.forceUpdate(),
        (this._isDisposed = !0));
    }),
    (e.prototype.setDeltaPosition = function (e) {
      this._deltaPosition.copyFrom(e);
    }),
    (e.prototype.setDeltaRotation = function (e) {
      this._deltaRotation || (this._deltaRotation = new m()),
        this._deltaRotation.copyFrom(e),
        (this._deltaRotationConjugated = this._deltaRotation.conjugate());
    }),
    (e.prototype.getBoxSizeToRef = function (e) {
      return (
        this._physicsEngine &&
          this._physicsEngine.getPhysicsPlugin().getBoxSizeToRef(this, e),
        this
      );
    }),
    (e.prototype.getRadius = function () {
      return this._physicsEngine
        ? this._physicsEngine.getPhysicsPlugin().getRadius(this)
        : 0;
    }),
    (e.prototype.syncBoneWithImpostor = function (t, i, n, r, o) {
      var s = e._tmpVecs[0],
        a = this.object;
      if (a.rotationQuaternion)
        if (o) {
          var l = e._tmpQuat;
          a.rotationQuaternion.multiplyToRef(o, l),
            t.setRotationQuaternion(l, Tt.WORLD, i);
        } else t.setRotationQuaternion(a.rotationQuaternion, Tt.WORLD, i);
      (s.x = 0),
        (s.y = 0),
        (s.z = 0),
        n &&
          ((s.x = n.x),
          (s.y = n.y),
          (s.z = n.z),
          t.getDirectionToRef(s, i, s),
          null == r && (r = n.length()),
          (s.x *= r),
          (s.y *= r),
          (s.z *= r)),
        t.getParent()
          ? (s.addInPlace(a.getAbsolutePosition()),
            t.setAbsolutePosition(s, i))
          : (i.setAbsolutePosition(a.getAbsolutePosition()),
            (i.position.x -= s.x),
            (i.position.y -= s.y),
            (i.position.z -= s.z));
    }),
    (e.prototype.syncImpostorWithBone = function (t, i, n, r, o, s) {
      var a = this.object;
      if (a.rotationQuaternion)
        if (o) {
          var l = e._tmpQuat;
          t.getRotationQuaternionToRef(Tt.WORLD, i, l),
            l.multiplyToRef(o, a.rotationQuaternion);
        } else
          t.getRotationQuaternionToRef(Tt.WORLD, i, a.rotationQuaternion);
      var c = e._tmpVecs[0],
        u = e._tmpVecs[1];
      s || (((s = e._tmpVecs[2]).x = 0), (s.y = 1), (s.z = 0)),
        t.getDirectionToRef(s, i, u),
        t.getAbsolutePositionToRef(i, c),
        null == r && n && (r = n.length()),
        null != r && ((c.x += u.x * r), (c.y += u.y * r), (c.z += u.z * r)),
        a.setAbsolutePosition(c);
    }),
    (e.DEFAULT_OBJECT_SIZE = new f(1, 1, 1)),
    (e.IDENTITY_QUATERNION = m.Identity()),
    (e._tmpVecs = u.BuildArray(3, f.Zero)),
    (e._tmpQuat = m.Identity()),
    (e.NoImpostor = 0),
    (e.SphereImpostor = 1),
    (e.BoxImpostor = 2),
    (e.PlaneImpostor = 3),
    (e.MeshImpostor = 4),
    (e.CapsuleImpostor = 6),
    (e.CylinderImpostor = 7),
    (e.ParticleImpostor = 8),
    (e.HeightmapImpostor = 9),
    (e.ConvexHullImpostor = 10),
    (e.CustomImpostor = 100),
    (e.RopeImpostor = 101),
    (e.ClothImpostor = 102),
    (e.SoftbodyImpostor = 103),
    e
  );
})();
!(function () {
  function e(e) {
    (this._impostors = []),
      (this._meshes = []),
      (this._numMeshes = 0),
      (this._debugMeshMeshes = new Array()),
      (this._scene = e || j.LastCreatedScene);
    var t = this._scene.getPhysicsEngine();
    t && (this._physicsEnginePlugin = t.getPhysicsPlugin()),
      (this._utilityLayer = new To(this._scene, !1)),
      (this._utilityLayer.pickUtilitySceneFirst = !1),
      (this._utilityLayer.utilityLayerScene.autoClearDepthAndStencil = !0);
  }
  (e.prototype._updateDebugMeshes = function () {
    for (var e = this._physicsEnginePlugin, t = 0; t < this._numMeshes; t++) {
      var i = this._impostors[t];
      if (i)
        if (i.isDisposed) this.hideImpostor(this._impostors[t--]);
        else {
          if (i.type === Mo.MeshImpostor) continue;
          var n = this._meshes[t];
          n && e && e.syncMeshWithImpostor(n, i);
        }
    }
  }),
    (e.prototype.showImpostor = function (e, t) {
      if (!this._scene) return null;
      for (var i = 0; i < this._numMeshes; i++)
        if (this._impostors[i] == e) return null;
      var n = this._getDebugMesh(e, t);
      return (
        n &&
          ((this._impostors[this._numMeshes] = e),
          (this._meshes[this._numMeshes] = n),
          0 === this._numMeshes &&
            ((this._renderFunction = this._updateDebugMeshes.bind(this)),
            this._scene.registerBeforeRender(this._renderFunction)),
          this._numMeshes++),
        n
      );
    }),
    (e.prototype.hideImpostor = function (e) {
      if (e && this._scene && this._utilityLayer) {
        for (
          var t = !1, i = this._utilityLayer.utilityLayerScene, n = 0;
          n < this._numMeshes;
          n++
        )
          if (this._impostors[n] == e) {
            var r = this._meshes[n];
            if (!r) continue;
            i.removeMesh(r), r.dispose();
            var o = this._debugMeshMeshes.indexOf(r);
            o > -1 && this._debugMeshMeshes.splice(o, 1),
              this._numMeshes--,
              this._numMeshes > 0
                ? ((this._meshes[n] = this._meshes[this._numMeshes]),
                  (this._impostors[n] = this._impostors[this._numMeshes]),
                  (this._meshes[this._numMeshes] = null),
                  (this._impostors[this._numMeshes] = null))
                : ((this._meshes[0] = null), (this._impostors[0] = null)),
              (t = !0);
            break;
          }
        t &&
          0 === this._numMeshes &&
          this._scene.unregisterBeforeRender(this._renderFunction);
      }
    }),
    (e.prototype._getDebugMaterial = function (e) {
      return (
        this._debugMaterial ||
          ((this._debugMaterial = new qr("", e)),
          (this._debugMaterial.wireframe = !0),
          (this._debugMaterial.emissiveColor = b.White()),
          (this._debugMaterial.disableLighting = !0)),
        this._debugMaterial
      );
    }),
    (e.prototype._getDebugBoxMesh = function (e) {
      return (
        this._debugBoxMesh ||
          ((this._debugBoxMesh = Eo.CreateBox(
            "physicsBodyBoxViewMesh",
            {
              size: 1,
            },
            e
          )),
          (this._debugBoxMesh.rotationQuaternion = m.Identity()),
          (this._debugBoxMesh.material = this._getDebugMaterial(e)),
          this._debugBoxMesh.setEnabled(!1)),
        this._debugBoxMesh.createInstance("physicsBodyBoxViewInstance")
      );
    }),
    (e.prototype._getDebugSphereMesh = function (e) {
      return (
        this._debugSphereMesh ||
          ((this._debugSphereMesh = Po.CreateSphere(
            "physicsBodySphereViewMesh",
            {
              diameter: 1,
            },
            e
          )),
          (this._debugSphereMesh.rotationQuaternion = m.Identity()),
          (this._debugSphereMesh.material = this._getDebugMaterial(e)),
          this._debugSphereMesh.setEnabled(!1)),
        this._debugSphereMesh.createInstance("physicsBodyBoxViewInstance")
      );
    }),
    (e.prototype._getDebugCylinderMesh = function (e) {
      return (
        this._debugCylinderMesh ||
          ((this._debugCylinderMesh = ro.CreateCylinder(
            "physicsBodyCylinderViewMesh",
            {
              diameterTop: 1,
              diameterBottom: 1,
              height: 1,
            },
            e
          )),
          (this._debugCylinderMesh.rotationQuaternion = m.Identity()),
          (this._debugCylinderMesh.material = this._getDebugMaterial(e)),
          this._debugCylinderMesh.setEnabled(!1)),
        this._debugCylinderMesh.createInstance("physicsBodyBoxViewInstance")
      );
    }),
    (e.prototype._getDebugMeshMesh = function (e, t) {
      var i = new Qi(e.name, t, null, e);
      return (
        (i.position = f.Zero()),
        i.setParent(e),
        (i.material = this._getDebugMaterial(t)),
        this._debugMeshMeshes.push(i),
        i
      );
    }),
    (e.prototype._getDebugMesh = function (e, t) {
      var i = this;
      if (!this._utilityLayer) return null;
      if (t && t.parent && t.parent.physicsImpostor) return null;
      var n = null,
        r = this._utilityLayer.utilityLayerScene;
      switch (e.type) {
        case Mo.BoxImpostor:
          (n = this._getDebugBoxMesh(r)), e.getBoxSizeToRef(n.scaling);
          break;
        case Mo.SphereImpostor:
          n = this._getDebugSphereMesh(r);
          var o = e.getRadius();
          (n.scaling.x = 2 * o), (n.scaling.y = 2 * o), (n.scaling.z = 2 * o);
          break;
        case Mo.MeshImpostor:
          t && (n = this._getDebugMeshMesh(t, r));
          break;
        case Mo.NoImpostor:
          t &&
            t
              .getChildMeshes()
              .filter(function (e) {
                return e.physicsImpostor ? 1 : 0;
              })
              .forEach(function (e) {
                i._getDebugBoxMesh(r).parent = e;
              });
          break;
        case Mo.CylinderImpostor:
          n = this._getDebugCylinderMesh(r);
          var s = e.object.getBoundingInfo();
          (n.scaling.x = s.boundingBox.maximum.x - s.boundingBox.minimum.x),
            (n.scaling.y = s.boundingBox.maximum.y - s.boundingBox.minimum.y),
            (n.scaling.z = s.boundingBox.maximum.z - s.boundingBox.minimum.z);
      }
      return n;
    }),
    (e.prototype.dispose = function () {
      for (var e = this._numMeshes, t = 0; t < e; t++)
        this.hideImpostor(this._impostors[0]);
      this._debugBoxMesh && this._debugBoxMesh.dispose(),
        this._debugSphereMesh && this._debugSphereMesh.dispose(),
        this._debugCylinderMesh && this._debugCylinderMesh.dispose(),
        this._debugMaterial && this._debugMaterial.dispose(),
        (this._impostors.length = 0),
        (this._scene = null),
        (this._physicsEnginePlugin = null),
        this._utilityLayer &&
          (this._utilityLayer.dispose(), (this._utilityLayer = null));
    });
})(),
  (Qi._instancedMeshFactory = function (e, t) {
    var i = new Oo(e, t);
    if (t.instancedBuffers)
      for (var n in ((i.instancedBuffers = {}), t.instancedBuffers))
        i.instancedBuffers[n] = t.instancedBuffers[n];
    return i;
  });
var Oo = (function (e) {
  function t(t, i) {
    var n = e.call(this, t, i.getScene()) || this;
    (n._indexInSourceMeshInstanceArray = -1),
      i.addInstance(n),
      (n._sourceMesh = i),
      (n._unIndexed = i._unIndexed),
      n.position.copyFrom(i.position),
      n.rotation.copyFrom(i.rotation),
      n.scaling.copyFrom(i.scaling),
      i.rotationQuaternion &&
        (n.rotationQuaternion = i.rotationQuaternion.clone()),
      (n.animations = yt.Slice(i.animations));
    for (var r = 0, o = i.getAnimationRanges(); r < o.length; r++) {
      var s = o[r];
      null != s && n.createAnimationRange(s.name, s.from, s.to);
    }
    return (
      (n.infiniteDistance = i.infiniteDistance),
      n.setPivotMatrix(i.getPivotMatrix()),
      n.refreshBoundingInfo(),
      n._syncSubMeshes(),
      n
    );
  }
  return (
    P(t, e),
    (t.prototype.getClassName = function () {
      return "InstancedMesh";
    }),
    Object.defineProperty(t.prototype, "lightSources", {
      get: function () {
        return this._sourceMesh._lightSources;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype._resyncLightSources = function () {}),
    (t.prototype._resyncLightSource = function (e) {}),
    (t.prototype._removeLightSource = function (e, t) {}),
    Object.defineProperty(t.prototype, "receiveShadows", {
      get: function () {
        return this._sourceMesh.receiveShadows;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "material", {
      get: function () {
        return this._sourceMesh.material;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "visibility", {
      get: function () {
        return this._sourceMesh.visibility;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "skeleton", {
      get: function () {
        return this._sourceMesh.skeleton;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "renderingGroupId", {
      get: function () {
        return this._sourceMesh.renderingGroupId;
      },
      set: function (e) {
        this._sourceMesh &&
          e !== this._sourceMesh.renderingGroupId &&
          F.Warn(
            "Note - setting renderingGroupId of an instanced mesh has no effect on the scene"
          );
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.getTotalVertices = function () {
      return this._sourceMesh ? this._sourceMesh.getTotalVertices() : 0;
    }),
    (t.prototype.getTotalIndices = function () {
      return this._sourceMesh.getTotalIndices();
    }),
    Object.defineProperty(t.prototype, "sourceMesh", {
      get: function () {
        return this._sourceMesh;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.createInstance = function (e) {
      return this._sourceMesh.createInstance(e);
    }),
    (t.prototype.isReady = function (e) {
      return void 0 === e && (e = !1), this._sourceMesh.isReady(e, !0);
    }),
    (t.prototype.getVerticesData = function (e, t) {
      return this._sourceMesh.getVerticesData(e, t);
    }),
    (t.prototype.setVerticesData = function (e, t, i, n) {
      return (
        this.sourceMesh && this.sourceMesh.setVerticesData(e, t, i, n),
        this.sourceMesh
      );
    }),
    (t.prototype.updateVerticesData = function (e, t, i, n) {
      return (
        this.sourceMesh && this.sourceMesh.updateVerticesData(e, t, i, n),
        this.sourceMesh
      );
    }),
    (t.prototype.setIndices = function (e, t) {
      return (
        void 0 === t && (t = null),
        this.sourceMesh && this.sourceMesh.setIndices(e, t),
        this.sourceMesh
      );
    }),
    (t.prototype.isVerticesDataPresent = function (e) {
      return this._sourceMesh.isVerticesDataPresent(e);
    }),
    (t.prototype.getIndices = function () {
      return this._sourceMesh.getIndices();
    }),
    Object.defineProperty(t.prototype, "_positions", {
      get: function () {
        return this._sourceMesh._positions;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.refreshBoundingInfo = function (e) {
      if (
        (void 0 === e && (e = !1),
        this._boundingInfo && this._boundingInfo.isLocked)
      )
        return this;
      var t = this._sourceMesh.geometry
        ? this._sourceMesh.geometry.boundingBias
        : null;
      return (
        this._refreshBoundingInfo(this._sourceMesh._getPositionData(e), t),
        this
      );
    }),
    (t.prototype._preActivate = function () {
      return this._currentLOD && this._currentLOD._preActivate(), this;
    }),
    (t.prototype._activate = function (e, t) {
      if (
        (this._sourceMesh.subMeshes ||
          F.Warn(
            "Instances should only be created for meshes with geometry."
          ),
        this._currentLOD)
      ) {
        if (
          this._currentLOD._getWorldMatrixDeterminant() > 0 !=
          this._getWorldMatrixDeterminant() > 0
        )
          return (
            (this._internalAbstractMeshDataInfo._actAsRegularMesh = !0), !0
          );
        if (
          ((this._internalAbstractMeshDataInfo._actAsRegularMesh = !1),
          this._currentLOD._registerInstanceForRenderId(this, e),
          t)
        ) {
          if (
            !this._currentLOD._internalAbstractMeshDataInfo
              ._isActiveIntermediate
          )
            return (
              (this._currentLOD._internalAbstractMeshDataInfo._onlyForInstancesIntermediate =
                !0),
              !0
            );
        } else if (!this._currentLOD._internalAbstractMeshDataInfo._isActive)
          return (
            (this._currentLOD._internalAbstractMeshDataInfo._onlyForInstances =
              !0),
            !0
          );
      }
      return !1;
    }),
    (t.prototype._postActivate = function () {
      this._sourceMesh.edgesShareWithInstances &&
      this._sourceMesh._edgesRenderer &&
      this._sourceMesh._edgesRenderer.isEnabled &&
      this._sourceMesh._renderingGroup
        ? (this._sourceMesh._renderingGroup._edgesRenderers.pushNoDuplicate(
            this._sourceMesh._edgesRenderer
          ),
          this._sourceMesh._edgesRenderer.customInstances.push(
            this.getWorldMatrix()
          ))
        : this._edgesRenderer &&
          this._edgesRenderer.isEnabled &&
          this._sourceMesh._renderingGroup &&
          this._sourceMesh._renderingGroup._edgesRenderers.push(
            this._edgesRenderer
          );
    }),
    (t.prototype.getWorldMatrix = function () {
      if (
        this._currentLOD &&
        this._currentLOD.billboardMode !== At.BILLBOARDMODE_NONE &&
        this._currentLOD._masterMesh !== this
      ) {
        var t = this._currentLOD._masterMesh;
        return (
          (this._currentLOD._masterMesh = this),
          y.Vector3[7].copyFrom(this._currentLOD.position),
          this._currentLOD.position.set(0, 0, 0),
          y.Matrix[0].copyFrom(this._currentLOD.computeWorldMatrix(!0)),
          this._currentLOD.position.copyFrom(y.Vector3[7]),
          (this._currentLOD._masterMesh = t),
          y.Matrix[0]
        );
      }
      return e.prototype.getWorldMatrix.call(this);
    }),
    Object.defineProperty(t.prototype, "isAnInstance", {
      get: function () {
        return !0;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.getLOD = function (e) {
      if (!e) return this;
      var t = this.getBoundingInfo();
      return (
        (this._currentLOD = this.sourceMesh.getLOD(e, t.boundingSphere)),
        this._currentLOD === this.sourceMesh
          ? this.sourceMesh
          : this._currentLOD
      );
    }),
    (t.prototype._preActivateForIntermediateRendering = function (e) {
      return this.sourceMesh._preActivateForIntermediateRendering(e);
    }),
    (t.prototype._syncSubMeshes = function () {
      if ((this.releaseSubMeshes(), this._sourceMesh.subMeshes))
        for (var e = 0; e < this._sourceMesh.subMeshes.length; e++)
          this._sourceMesh.subMeshes[e].clone(this, this._sourceMesh);
      return this;
    }),
    (t.prototype._generatePointsArray = function () {
      return this._sourceMesh._generatePointsArray();
    }),
    (t.prototype._updateBoundingInfo = function () {
      var e = this;
      return (
        this._boundingInfo
          ? this._boundingInfo.update(e.worldMatrixFromCache)
          : (this._boundingInfo = new Gt(
              this.absolutePosition,
              this.absolutePosition,
              e.worldMatrixFromCache
            )),
        this._updateSubMeshesBoundingInfo(e.worldMatrixFromCache),
        this
      );
    }),
    (t.prototype.clone = function (e, t, i) {
      void 0 === t && (t = null);
      var n = this._sourceMesh.createInstance(e);
      if (
        (K.DeepCopy(
          this,
          n,
          [
            "name",
            "subMeshes",
            "uniqueId",
            "parent",
            "lightSources",
            "receiveShadows",
            "material",
            "visibility",
            "skeleton",
            "sourceMesh",
            "isAnInstance",
            "facetNb",
            "isFacetDataEnabled",
            "isBlocked",
            "useBones",
            "hasInstances",
            "collider",
            "edgesRenderer",
            "forward",
            "up",
            "right",
            "absolutePosition",
            "absoluteScaling",
            "absoluteRotationQuaternion",
            "isWorldMatrixFrozen",
            "nonUniformScaling",
            "behaviors",
            "worldMatrixFromCache",
            "hasThinInstances",
          ],
          []
        ),
        this.refreshBoundingInfo(),
        t && (n.parent = t),
        !i)
      )
        for (var r = 0; r < this.getScene().meshes.length; r++) {
          var o = this.getScene().meshes[r];
          o.parent === this && o.clone(o.name, n);
        }
      return n.computeWorldMatrix(!0), n;
    }),
    (t.prototype.dispose = function (t, i) {
      void 0 === i && (i = !1),
        this._sourceMesh.removeInstance(this),
        e.prototype.dispose.call(this, t, i);
    }),
    t
  );
})(Yt);
(Qi.prototype.edgesShareWithInstances = !1),
  (Qi.prototype.registerInstancedBuffer = function (e, t) {
    if ((this.removeVerticesData(e), !this.instancedBuffers)) {
      this.instancedBuffers = {};
      for (var i = 0, n = this.instances; i < n.length; i++)
        n[i].instancedBuffers = {};
      this._userInstancedBuffersStorage = {
        data: {},
        vertexBuffers: {},
        strides: {},
        sizes: {},
      };
    }
    (this.instancedBuffers[e] = null),
      (this._userInstancedBuffersStorage.strides[e] = t),
      (this._userInstancedBuffersStorage.sizes[e] = 32 * t),
      (this._userInstancedBuffersStorage.data[e] = new Float32Array(
        this._userInstancedBuffersStorage.sizes[e]
      )),
      (this._userInstancedBuffersStorage.vertexBuffers[e] = new wt(
        this.getEngine(),
        this._userInstancedBuffersStorage.data[e],
        e,
        !0,
        !1,
        t,
        !0
      )),
      this.setVerticesBuffer(
        this._userInstancedBuffersStorage.vertexBuffers[e]
      );
    for (var r = 0, o = this.instances; r < o.length; r++)
      o[r].instancedBuffers[e] = null;
  }),
  (Qi.prototype._processInstancedBuffers = function (e, t) {
    var i = e.length;
    for (var n in this.instancedBuffers) {
      for (
        var r = this._userInstancedBuffersStorage.sizes[n],
          o = this._userInstancedBuffersStorage.strides[n],
          s = (i + 1) * o;
        r < s;

      )
        r *= 2;
      this._userInstancedBuffersStorage.data[n].length != r &&
        ((this._userInstancedBuffersStorage.data[n] = new Float32Array(r)),
        (this._userInstancedBuffersStorage.sizes[n] = r),
        this._userInstancedBuffersStorage.vertexBuffers[n] &&
          (this._userInstancedBuffersStorage.vertexBuffers[n].dispose(),
          (this._userInstancedBuffersStorage.vertexBuffers[n] = null)));
      var a = this._userInstancedBuffersStorage.data[n],
        l = 0;
      t &&
        ((u = this.instancedBuffers[n]).toArray
          ? u.toArray(a, l)
          : u.copyToArray(a, l),
        (l += o));
      for (var c = 0; c < i; c++) {
        var u;
        (u = e[c].instancedBuffers[n]).toArray
          ? u.toArray(a, l)
          : u.copyToArray(a, l),
          (l += o);
      }
      this._userInstancedBuffersStorage.vertexBuffers[n]
        ? this._userInstancedBuffersStorage.vertexBuffers[n].updateDirectly(
            a,
            0
          )
        : ((this._userInstancedBuffersStorage.vertexBuffers[n] = new wt(
            this.getEngine(),
            this._userInstancedBuffersStorage.data[n],
            n,
            !0,
            !1,
            o,
            !0
          )),
          this.setVerticesBuffer(
            this._userInstancedBuffersStorage.vertexBuffers[n]
          ));
    }
  }),
  (Qi.prototype._disposeInstanceSpecificData = function () {
    for (
      this._instanceDataStorage.instancesBuffer &&
      (this._instanceDataStorage.instancesBuffer.dispose(),
      (this._instanceDataStorage.instancesBuffer = null));
      this.instances.length;

    )
      this.instances[0].dispose();
    for (var e in this.instancedBuffers)
      this._userInstancedBuffersStorage.vertexBuffers[e] &&
        this._userInstancedBuffersStorage.vertexBuffers[e].dispose();
    this.instancedBuffers = {};
  });