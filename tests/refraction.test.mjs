import assert from 'node:assert/strict';
import test from 'node:test';
import { ArcRotateCamera, Mesh, NullEngine, Scene, Vector3 } from '@babylonjs/core';
import { createRefractionSetup } from '../src/scene/materials/loadMaterials.ts';

test('refraction renders the environment without sampling its own target', () => {
  const engine = new NullEngine();
  try {
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera('camera', 0, 1, 6, Vector3.Zero(), scene);
    const diamond = new Mesh('diamond', scene);
    const cloth = new Mesh('Cloth', scene);
    const environment = new Mesh('environment', scene);
    const { refractionTexture, sphereMaterial } = createRefractionSetup(
      scene, camera, diamond, cloth, environment,
    );

    assert.equal(sphereMaterial.refractionTexture, refractionTexture);
    assert.equal(refractionTexture.activeCamera, camera);
    assert.deepEqual(refractionTexture.renderList.map(mesh => mesh.id), ['Cloth', 'environment']);
    assert.ok(scene.customRenderTargets.includes(refractionTexture));
  } finally {
    engine.dispose();
  }
});
