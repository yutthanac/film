import * as THREE from "three";

/**
 * Shared PBR & Standard materials for the 3D Matcha Cake
 */
export function createCakeMaterials() {
  const matchaDarkMat = new THREE.MeshStandardMaterial({
    color: 0x4d753b,
    roughness: 0.65,
    metalness: 0.05,
  });

  const matchaLightMat = new THREE.MeshStandardMaterial({
    color: 0x679c52,
    roughness: 0.6,
    metalness: 0.05,
  });

  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.04,
  });

  const matchaGlazeMat = new THREE.MeshPhysicalMaterial({
    color: 0x3d632c,
    roughness: 0.15,
    transmission: 0.2,
    thickness: 0.6,
    clearcoat: 0.85,
    clearcoatRoughness: 0.1,
  });

  const goldStandMat = new THREE.MeshStandardMaterial({
    color: 0xe2c174,
    roughness: 0.28,
    metalness: 0.85,
  });

  const ceramicPlateMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.2,
    metalness: 0.08,
  });

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xc89b65,
    roughness: 0.8,
  });

  const strawberryMat = new THREE.MeshStandardMaterial({
    color: 0xd91d44,
    roughness: 0.32,
    metalness: 0.05,
  });

  const strawberryLeafMat = new THREE.MeshStandardMaterial({
    color: 0x16a34a,
    roughness: 0.5,
  });

  const blueberryMat = new THREE.MeshStandardMaterial({
    color: 0x313859,
    roughness: 0.35,
    metalness: 0.08,
  });

  const chocolateMat = new THREE.MeshStandardMaterial({
    color: 0x38221b,
    roughness: 0.3,
    metalness: 0.1,
  });

  const goldDustMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.2,
    metalness: 0.9,
  });

  // Candle 22: Elegant Warm Golden Wax with subtle sheen
  const candleMat = new THREE.MeshStandardMaterial({
    color: 0xffe082,
    roughness: 0.22,
    metalness: 0.45,
  });

  const candleCoreMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
  });

  const wickMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
  const flameCoreMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const flameBaseMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });

  return {
    matchaDarkMat,
    matchaLightMat,
    creamMat,
    matchaGlazeMat,
    goldStandMat,
    ceramicPlateMat,
    crustMat,
    strawberryMat,
    strawberryLeafMat,
    blueberryMat,
    chocolateMat,
    goldDustMat,
    candleMat,
    candleCoreMat,
    wickMat,
    flameMat,
    flameCoreMat,
    flameBaseMat,
  };
}

export type CakeMaterials = ReturnType<typeof createCakeMaterials>;

/**
 * 1. Gold Pedestal & Ceramic Plate
 */
export function buildCakePlate(group: THREE.Group, mat: CakeMaterials) {
  const standBase = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 0.25, 48), mat.goldStandMat);
  standBase.position.y = -0.8;
  standBase.receiveShadow = true;
  group.add(standBase);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.5, 32), mat.goldStandMat);
  stem.position.y = -0.45;
  group.add(stem);

  const plate = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.4, 0.18, 64), mat.ceramicPlateMat);
  plate.position.y = -0.15;
  plate.receiveShadow = true;
  group.add(plate);

  const plateRim = new THREE.Mesh(new THREE.TorusGeometry(3.55, 0.08, 16, 64), mat.goldStandMat);
  plateRim.rotation.x = Math.PI / 2;
  plateRim.position.y = -0.06;
  group.add(plateRim);
}

/**
 * 2. Bottom Tier: Graham Crust + Dark Matcha Sponge + Cream Layer + Puffs
 */
export function buildBottomTier(group: THREE.Group, mat: CakeMaterials) {
  const crust = new THREE.Mesh(new THREE.CylinderGeometry(2.82, 2.85, 0.2, 64), mat.crustMat);
  crust.position.y = 0.05;
  crust.receiveShadow = true;
  group.add(crust);

  const bottomTier = new THREE.Mesh(new THREE.CylinderGeometry(2.78, 2.78, 1.0, 64), mat.matchaDarkMat);
  bottomTier.position.y = 0.65;
  bottomTier.castShadow = true;
  bottomTier.receiveShadow = true;
  group.add(bottomTier);

  const middleCream = new THREE.Mesh(new THREE.CylinderGeometry(2.82, 2.82, 0.18, 64), mat.creamMat);
  middleCream.position.y = 1.22;
  group.add(middleCream);

  const bottomPuffCount = 14;
  const puffGeo = new THREE.SphereGeometry(0.14, 16, 16);
  puffGeo.scale(1, 0.8, 1);
  for (let i = 0; i < bottomPuffCount; i++) {
    const angle = (i / bottomPuffCount) * Math.PI * 2;
    const r = 2.76;
    const puff = new THREE.Mesh(puffGeo, mat.creamMat);
    puff.position.set(Math.cos(angle) * r, 1.25, Math.sin(angle) * r);
    group.add(puff);
  }
}

/**
 * 3. Top Tier: Light Matcha Sponge + Matcha Mirror Glaze + Delicate Rosettes
 */
export function buildTopTier(group: THREE.Group, mat: CakeMaterials) {
  const topTier = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 0.9, 64), mat.matchaLightMat);
  topTier.position.y = 1.75;
  topTier.castShadow = true;
  topTier.receiveShadow = true;
  group.add(topTier);

  const topGlaze = new THREE.Mesh(new THREE.CylinderGeometry(1.97, 1.97, 0.1, 64), mat.matchaGlazeMat);
  topGlaze.position.y = 2.22;
  topGlaze.castShadow = true;
  group.add(topGlaze);

  const topRimPuffCount = 10;
  const puffGeo = new THREE.SphereGeometry(0.12, 16, 16);
  puffGeo.scale(1, 0.7, 1);
  for (let i = 0; i < topRimPuffCount; i++) {
    const angle = (i / topRimPuffCount) * Math.PI * 2;
    const r = 1.88;
    const puff = new THREE.Mesh(puffGeo, mat.creamMat);
    puff.position.set(Math.cos(angle) * r, 2.26, Math.sin(angle) * r);
    group.add(puff);
  }
}

/**
 * 4. Toppings: Strawberries, Blueberries, Chocolate Sticks, Gold Flakes
 */
export function buildToppings(group: THREE.Group, mat: CakeMaterials) {
  const strawberryCount = 6;
  const creamSwirlGeo = new THREE.CylinderGeometry(0.04, 0.22, 0.22, 16);
  const strawberryGeo = new THREE.ConeGeometry(0.2, 0.38, 16);
  strawberryGeo.scale(1, 1, 0.85);
  const berryGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const leafGeo = new THREE.ConeGeometry(0.06, 0.14, 4);

  for (let i = 0; i < strawberryCount; i++) {
    const angle = (i / strawberryCount) * Math.PI * 2;
    const r = 1.32;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;

    // Cream base
    const creamSwirl = new THREE.Mesh(creamSwirlGeo, mat.creamMat);
    creamSwirl.position.set(x, 2.36, z);
    creamSwirl.castShadow = true;
    group.add(creamSwirl);

    // Strawberry
    const strawberry = new THREE.Mesh(strawberryGeo, mat.strawberryMat);
    strawberry.rotation.x = 0.2;
    strawberry.rotation.y = angle;
    strawberry.position.set(x, 2.62, z);
    strawberry.castShadow = true;
    group.add(strawberry);

    // Leaf crown
    const leavesGroup = new THREE.Group();
    leavesGroup.position.set(x, 2.45, z);
    for (let l = 0; l < 4; l++) {
      const leafAngle = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(leafGeo, mat.strawberryLeafMat);
      leaf.rotation.z = Math.PI / 3;
      leaf.rotation.y = leafAngle;
      leavesGroup.add(leaf);
    }
    group.add(leavesGroup);

    // Blueberry
    const bAngle = angle + 0.34;
    const bx = Math.cos(bAngle) * (r + 0.12);
    const bz = Math.sin(bAngle) * (r + 0.12);
    const blueberry = new THREE.Mesh(berryGeo, mat.blueberryMat);
    blueberry.position.set(bx, 2.35, bz);
    blueberry.castShadow = true;
    group.add(blueberry);
  }

  // Chocolate Pirouline sticks
  const stickGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 16);
  for (let j = 0; j < 2; j++) {
    const stick = new THREE.Mesh(stickGeo, mat.chocolateMat);
    stick.rotation.z = Math.PI / 4 + j * 0.15;
    stick.rotation.y = 0.85 + j * 0.5;
    stick.position.set(-0.45 + j * 0.2, 2.45, 0.2 - j * 0.25);
    stick.castShadow = true;
    group.add(stick);
  }

  // Edible Gold Flakes
  for (let k = 0; k < 14; k++) {
    const goldFlakeGeo = new THREE.CircleGeometry(0.04 + Math.random() * 0.04, 6);
    const flake = new THREE.Mesh(goldFlakeGeo, mat.goldDustMat);
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.4 + Math.random() * 0.8;
    flake.rotation.x = -Math.PI / 2;
    flake.position.set(Math.cos(angle) * radius, 2.272, Math.sin(angle) * radius);
    group.add(flake);
  }
}

/**
 * Helper to construct a sculpted 3D digit "2" candle
 */
function createDigit2Mesh(mat: CakeMaterials): THREE.Group {
  const digitGroup = new THREE.Group();

  // 1. Top Arch of 2 (Torus segment)
  const topArchGeo = new THREE.TorusGeometry(0.28, 0.08, 16, 24, Math.PI);
  const topArch = new THREE.Mesh(topArchGeo, mat.candleMat);
  topArch.rotation.z = -Math.PI / 2;
  topArch.position.set(0, 0.35, 0);
  topArch.castShadow = true;
  digitGroup.add(topArch);

  // 2. Diagonal stem of 2
  const diagGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.56, 16);
  const diag = new THREE.Mesh(diagGeo, mat.candleMat);
  diag.rotation.z = Math.PI / 4.4;
  diag.position.set(-0.06, 0.02, 0);
  diag.castShadow = true;
  digitGroup.add(diag);

  // 3. Bottom Horizontal Base of 2
  const baseGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.58, 16);
  const base = new THREE.Mesh(baseGeo, mat.candleMat);
  base.rotation.z = Math.PI / 2;
  base.position.set(0.04, -0.22, 0);
  base.castShadow = true;
  digitGroup.add(base);

  // Pick stand that pins into the cake
  const pinGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.3, 12);
  const pin = new THREE.Mesh(pinGeo, mat.goldDustMat);
  pin.position.set(0, -0.36, 0);
  digitGroup.add(pin);

  return digitGroup;
}

/**
 * 5. Number "22" Birthday Candles with individual wicks and flames
 */
export function buildCandle(group: THREE.Group, mat: CakeMaterials, isLit: boolean) {
  const candlesGroup = new THREE.Group();
  candlesGroup.position.set(0, 2.7, 0);
  group.add(candlesGroup);

  const flames: THREE.Mesh[] = [];

  // Two "2" candles: Left and Right
  const spacing = 0.42;

  [-spacing, spacing].forEach((xOffset) => {
    const digit2 = createDigit2Mesh(mat);
    digit2.position.set(xOffset, 0, 0);
    candlesGroup.add(digit2);

    // Wick on the top peak of the number 2
    const wickGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.12, 8);
    const wick = new THREE.Mesh(wickGeo, mat.wickMat);
    wick.position.set(xOffset, 0.68, 0);
    candlesGroup.add(wick);

    // Realistic Flame
    const flameGeo = new THREE.ConeGeometry(0.11, 0.32, 16);
    const flame = new THREE.Mesh(flameGeo, mat.flameMat);
    flame.position.set(xOffset, 0.86, 0);
    flame.visible = isLit;

    // Inner bright core
    const flameCore = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.2, 12), mat.flameCoreMat);
    flameCore.position.set(0, -0.03, 0);
    flame.add(flameCore);

    // Blue base
    const flameBase = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), mat.flameBaseMat);
    flameBase.position.set(0, -0.1, 0);
    flame.add(flameBase);

    candlesGroup.add(flame);
    flames.push(flame);
  });

  return flames;
}

/**
 * 6. Smoke Particle System for both candles
 */
export function buildSmokeParticles(group: THREE.Group, isLit: boolean) {
  const smokeCount = 40;
  const smokeGeo = new THREE.BufferGeometry();
  const smokePos = new Float32Array(smokeCount * 3);

  const spacing = 0.42;
  for (let i = 0; i < smokeCount * 3; i += 3) {
    const isLeft = (i / 3) % 2 === 0;
    const baseOffset = isLeft ? -spacing : spacing;

    smokePos[i] = baseOffset + (Math.random() - 0.5) * 0.15;
    smokePos[i + 1] = 3.4 + ((i / 3) / 2) * 0.05;
    smokePos[i + 2] = (Math.random() - 0.5) * 0.15;
  }

  smokeGeo.setAttribute("position", new THREE.BufferAttribute(smokePos, 3));
  const smokeMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 0.14,
    transparent: true,
    opacity: isLit ? 0 : 0.45,
  });
  const smokePoints = new THREE.Points(smokeGeo, smokeMat);
  group.add(smokePoints);
  return smokePoints;
}

/**
 * Recursive disposal helper to clean up Three.js scenes and prevent memory leaks
 */
export function disposeScene(node: THREE.Object3D) {
  node.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  });
}
