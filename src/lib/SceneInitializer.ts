import {
  AbstractMesh,
  ArcRotateCamera,
  AssetsManager,
  Camera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  Material,
  MeshBuilder,
  PBRMaterial,
  PostProcess,
  RenderTargetTexture,
  Scene,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  ColorPicker,
  Control,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";

export class SceneInitializer {
  private canvas: HTMLCanvasElement;
  private scene: Scene;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    console.log(
      "%cMade with %c" +
        String.fromCharCode(10084) +
        "%c for BabylonJS\n%cby ClickON",
      "font-size:2rem; color:black; background:#404040; border-radius:4px 0 0 4px; padding-left:1rem",
      "font-size:2rem; color:#ff4000; background:#404040;",
      "font-size:2rem; color:black; background:#404040; border-radius:0 4px 4px 0; padding-right:1rem",
      "font-size:0.8rem; color:black; padding:0.5rem 0 0.5rem 0"
    );
    this.init();
  }

  private init() {
    const engine = new Engine(this.canvas, true);
    this.scene = new Scene(engine);
    this.fillScene().then(() => {
      engine.runRenderLoop(() => {
        this.scene.render();
      });
      window.addEventListener("resize", () => {
        engine.resize();
      });
    });
  }

  private async fillScene() {
    const arcCamera = new ArcRotateCamera(
      "arcCamera",
      7.199,
      1.574,
      6.4,
      new Vector3(0, 1, 0),
      this.scene
    );
    arcCamera.upperBetaLimit = 1.63;
    arcCamera.lowerBetaLimit = 0;
    arcCamera.upperRadiusLimit = 8.3;
    arcCamera.lowerRadiusLimit = 3.5;
    arcCamera.fov = 0.9;
    arcCamera.wheelPrecision = 32;
    arcCamera.attachControl(true);
    arcCamera.layerMask = 1;
    arcCamera.pinchPrecision = 0;

    const assetsManager = new AssetsManager(this.scene);
    const task = assetsManager.addMeshTask(
      "Load diamond Demo scene",
      undefined,
      "diamond.json"
    );

    await task.runTaskAsync(
      this.scene,
      () => {
        const sceneRoot = new TransformNode("DiamondSceneRoot", this.scene);
        task.loadedMeshes.forEach((mesh) => {
          mesh.parent = sceneRoot;
          mesh.layerMask = 1;
        });
        this.postLoadSetup(sceneRoot);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private postLoadSetup(sceneRoot: TransformNode) {
    this.scene.clearColor = new Color4(0, 0, 0, 1);
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 3, 0),
      this.scene
    );
    light.intensity = 3;
    const light2 = new HemisphericLight(
      "light2",
      new Vector3(0, 15, 0),
      this.scene
    );
    light2.intensity = 5;
    (
      this.scene.getMaterialByID("envMaterial") as PBRMaterial
    ).metallicF0Factor = 0;

    const uiCamera = new Camera(
      "uiCamera",
      new Vector3(0, 10000, 0),
      this.scene
    );
    uiCamera.layerMask = 2;
    this.scene.activeCameras = [arcCamera, uiCamera];

    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.layer.layerMask = 2;

    const verticalPanel = new StackPanel();
    verticalPanel.width = "200px";
    verticalPanel.isVertical = true;
    verticalPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    verticalPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(verticalPanel);

    const diamondColorLabel = new TextBlock();
    diamondColorLabel.text = "Diamond Color";
    diamondColorLabel.color = "White";
    diamondColorLabel.height = "30px";
    verticalPanel.addControl(diamondColorLabel);

    const diamondColorPicker = new ColorPicker();
    diamondColorPicker.value = Color3.FromHexString("#ef7c50");
    diamondColorPicker.height = "150px";
    diamondColorPicker.width = "150px";
    diamondColorPicker.horizontalAlignment =
      Control.HORIZONTAL_ALIGNMENT_CENTER;
    verticalPanel.addControl(diamondColorPicker);

    const environmentPanel = new StackPanel();
    environmentPanel.width = "200px";
    environmentPanel.isVertical = true;
    environmentPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    environmentPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    environmentPanel.paddingTop = 500;
    advancedTexture.addControl(environmentPanel);

    const environmentColorLabel = new TextBlock();
    environmentColorLabel.text = "Environment Color";
    environmentColorLabel.color = "White";
    environmentColorLabel.height = "30px";
    environmentPanel.addControl(environmentColorLabel);

    const environmentColorPicker = new ColorPicker();
    environmentColorPicker.value = Color3.FromHexString("#000001");
    environmentColorPicker.height = "150px";
    environmentColorPicker.width = "150px";
    environmentColorPicker.horizontalAlignment =
      Control.HORIZONTAL_ALIGNMENT_CENTER;
    environmentPanel.addControl(environmentColorPicker);

    const diamondMesh = this.scene.getMeshByID("diamond") as AbstractMesh;
    const clothMesh = this.scene.getMeshByID("Cloth") as AbstractMesh;
    const environmentMesh = this.scene.getMeshByID(
      "environment"
    ) as AbstractMesh;

    const sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2 },
      this.scene
    );
    const sphereMaterial = new PBRMaterial("name", this.scene);
    sphere.material = sphereMaterial;
    sphere.position.copyFrom(diamondMesh.position);
    sphere.visibility = 0.0001;

    const refractionRT = new RenderTargetTexture(
      "refraction",
      512,
      this.scene,
      true
    );
    refractionRT.renderList.push(clothMesh);
    refractionRT.renderList.push(environmentMesh);
    refractionRT.renderList.push(sphere);
    refractionRT.lodGenerationScale = 0.5;
    this.scene.customRenderTargets.push(refractionRT);
    sphereMaterial.refractionTexture = refractionRT;
    sphereMaterial.linkRefractionWithTransparency = true;
    sphereMaterial.indexOfRefraction = 1.3;
    sphereMaterial.alpha = 0;
    sphereMaterial.roughness = 0.05;
    sphereMaterial.metallic = 0;

    const shadowMaterial = new StandardMaterial("shadow", this.scene);
    shadowMaterial.opacityTexture = new Texture(
      "/shadow.png",
      this.scene,
      true,
      true
    );
    shadowMaterial.diffuseColor = new Color3(0, 0, 0);
    shadowMaterial.specularColor = new Color3(0, 0, 0);
    (this.scene.getMeshByID("shadow") as AbstractMesh).material =
      shadowMaterial;

    Material.ParseFromFileAsync(
      "diamondMaterialInner",
      "/diamondInner.json",
      this.scene
    ).then((material) => {
      material.needDepthPrePass = true;
      const diamondInnerMesh = this.scene.getMeshByID(
        "diamondInner"
      ) as AbstractMesh;
      diamondInnerMesh.alphaIndex = 1.6;
      diamondInnerMesh.material = material;
      diamondInnerMesh.parent = diamondMesh;
      (material as any).getBlockByName("DiamondColor").value =
        Color3.FromHexString("#ef7c50");
      (material as any).getBlockByName("RefractionBlock").texture =
        sphereMaterial.refractionTexture;
      diamondColorPicker.onValueChangedObservable.add((value) => {
        (material as any).getBlockByName("DiamondColor").value = value;
      });
    });

    Material.ParseFromFileAsync(
      "diamondMaterialOuter",
      "/diamondOuter.json",
      this.scene
    ).then((material) => {
      material.needDepthPrePass = true;
      const diamondOuterMesh = this.scene.getMeshByID(
        "diamondOuter"
      ) as AbstractMesh;
      diamondOuterMesh.material = material;
      diamondOuterMesh.parent = diamondMesh;
      (material as any).getBlockByName("DiamondColor").value =
        Color3.FromHexString("#ef7c50");
      (material as any).getBlockByName("RefractionBlock").texture =
        sphereMaterial.refractionTexture;
      diamondColorPicker.onValueChangedObservable.add((value) => {
        (material as any).getBlockByName("DiamondColor").value = value;
      });
      verticalPanel.addControl(diamondColorPicker);
    });

    Material.ParseFromFileAsync("redCloth", "/redCloth.json", this.scene).then(
      (material) => {
        (material as any).getBlockByName(
          "PBRMetallicRoughness"
        ).specularIntensity = 0;
        material.backFaceCulling = false;
        (this.scene.getMeshByID("Cloth") as AbstractMesh).material = material;
        environmentColorPicker.onValueChangedObservable.add((value) => {
          (material as any).getBlockByName("baseColor").value = value;
          (environmentMesh.material as any).albedoColor = value;
        });
      }
    );

    const diamondPostProcess = new PostProcess(
      "diamondPP",
      "diamondPP",
      [],
      [],
      1.0,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this.scene,
      false,
      [arcCamera]
    );
    diamondPostProcess.samples = 8;
    diamondPostProcess.chromaticAberrationEnabled = true;
    diamondPostProcess.chromaticAberration.aberrationAmount = 20;
    diamondPostProcess.chromaticAberration.radialIntensity = 0.7;
    diamondPostProcess.bloomEnabled = true;
    diamondPostProcess.bloomThreshold = 0;
    diamondPostProcess.bloomWeight = 2;
    diamondPostProcess.bloomKernel = 3;
    diamondPostProcess.bloomScale = 1;
    diamondPostProcess.imageProcessingEnabled = true;
    diamondPostProcess.imageProcessing.vignetteEnabled = true;
    diamondPostProcess.imageProcessing.vignetteWeight = 2;
    diamondPostProcess.imageProcessing.vignetteCameraFov = 1.25;

    this.scene.onBeforeRenderObservable.add(() => {
      arcCamera.alpha += 0.001;
    });
  }
}
