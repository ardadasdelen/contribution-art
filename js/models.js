// Procedural 3B model üreticileri + her ürün kartı için bağımsız Three.js sahnesi.
import * as THREE from "three";

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metalness ?? 0.05,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
  });
}

// --- Ortak parçalar -------------------------------------------------------
function plate(color = "#ffffff") {
  const g = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.55, 0.12, 48),
    mat(color, { roughness: 0.3 })
  );
  base.position.y = -0.06;
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.4, 0.06, 16, 48),
    mat("#e7e2d6", { roughness: 0.3 })
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.0;
  g.add(base, rim);
  return g;
}

function coaster(color = "#3a2b1f") {
  const c = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.05, 0.08, 40),
    mat(color, { roughness: 0.8 })
  );
  c.position.y = -0.04;
  return c;
}

function handle(color) {
  const h = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.07, 14, 30), mat(color));
  h.rotation.y = Math.PI / 2;
  return h;
}

// --- İçecek modelleri -----------------------------------------------------
function buildMug(item) {
  const g = new THREE.Group();
  g.add(coaster("#cdbfa6"));
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.62, 1.25, 40),
    mat("#f3efe6", { roughness: 0.25 })
  );
  body.position.y = 0.65;
  const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.66, 0.66, 0.12, 40),
    mat(item.color, { roughness: 0.2 })
  );
  liquid.position.y = 1.2;
  const foam = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    mat(item.accent, { roughness: 0.7 })
  );
  foam.position.y = 1.24;
  foam.scale.y = 0.35;
  const hd = handle("#f3efe6");
  hd.position.set(0.82, 0.65, 0);
  g.add(body, liquid, foam, hd);
  return g;
}

function buildCupSmall(item) {
  const g = new THREE.Group();
  g.add(plate("#f3efe6"));
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.42, 0.6, 36),
    mat("#ffffff", { roughness: 0.2 })
  );
  cup.position.y = 0.36;
  const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 0.1, 36),
    mat(item.color, { roughness: 0.2 })
  );
  liquid.position.y = 0.6;
  const hd = handle("#ffffff");
  hd.scale.set(0.7, 0.7, 0.7);
  hd.position.set(0.56, 0.36, 0);
  g.add(cup, liquid, hd);
  return g;
}

function buildTeaGlass(item) {
  const g = new THREE.Group();
  g.add(plate("#e9e4d8"));
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.32, 0.95, 36),
    mat("#dff0f5", { roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.4 })
  );
  glass.position.y = 0.55;
  const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.29, 0.82, 36),
    mat(item.color, { roughness: 0.15, transparent: true, opacity: 0.92 })
  );
  liquid.position.y = 0.52;
  g.add(glass, liquid);
  return g;
}

function buildTallGlass(item) {
  const g = new THREE.Group();
  g.add(coaster("#cdbfa6"));
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.5, 1.7, 40),
    mat("#eaf6fb", { roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.35 })
  );
  glass.position.y = 0.88;
  const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.46, 1.5, 40),
    mat(item.color, { roughness: 0.15, transparent: true, opacity: 0.95 })
  );
  liquid.position.y = 0.82;
  const straw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 2.1, 12),
    mat(item.accent, { roughness: 0.4 })
  );
  straw.position.set(0.22, 1.1, 0.1);
  straw.rotation.z = 0.22;
  g.add(glass, liquid, straw);
  return g;
}

// --- Tatlı modelleri ------------------------------------------------------
function buildCake(item) {
  const g = new THREE.Group();
  g.add(plate());
  // dilim: silindir wedge
  const slice = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.05, 0.85, 40, 1, false, 0, Math.PI / 2.4),
    mat(item.color, { roughness: 0.6 })
  );
  slice.position.y = 0.5;
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(1.06, 1.06, 0.14, 40, 1, false, 0, Math.PI / 2.4),
    mat(item.accent, { roughness: 0.5 })
  );
  top.position.y = 0.95;
  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), mat("#c01b3a"));
  cherry.position.set(0.3, 1.08, 0.3);
  g.add(slice, top, cherry);
  return g;
}

function buildSquare(item) {
  const g = new THREE.Group();
  g.add(plate());
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.7, 1.0),
    mat(item.color, { roughness: 0.6 })
  );
  body.position.y = 0.42;
  const layer = new THREE.Mesh(
    new THREE.BoxGeometry(1.32, 0.16, 1.02),
    mat(item.accent, { roughness: 0.5 })
  );
  layer.position.y = 0.82;
  const dust = new THREE.Mesh(
    new THREE.BoxGeometry(1.34, 0.04, 1.04),
    mat("#f3e9d6", { roughness: 0.8 })
  );
  dust.position.y = 0.91;
  g.add(body, layer, dust);
  return g;
}

function buildDiamond(item) {
  const g = new THREE.Group();
  g.add(plate());
  const piece = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.45, 1.0),
    mat(item.color, { roughness: 0.35, metalness: 0.15 })
  );
  piece.position.y = 0.32;
  piece.rotation.y = Math.PI / 4;
  const syrup = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.08, 1.0),
    mat(item.accent, { roughness: 0.2, metalness: 0.2 })
  );
  syrup.position.y = 0.56;
  syrup.rotation.y = Math.PI / 4;
  const nut = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), mat("#4f7a2a"));
  nut.position.set(0, 0.64, 0);
  nut.scale.set(1, 0.6, 1);
  g.add(piece, syrup, nut);
  return g;
}

function buildBowl(item) {
  const g = new THREE.Group();
  g.add(plate("#efe9dc"));
  const bowl = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 36, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    mat("#ffffff", { roughness: 0.25 })
  );
  bowl.position.y = 0.6;
  const pud = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, Math.PI / 2.2, Math.PI / 2),
    mat(item.color, { roughness: 0.55 })
  );
  pud.position.y = 0.62;
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.78, 0.06, 32),
    mat(item.accent, { roughness: 0.5 })
  );
  top.position.y = 0.62;
  g.add(bowl, pud, top);
  return g;
}

function buildTray(item) {
  const g = new THREE.Group();
  g.add(plate("#d9cdb6"));
  const tray = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.1, 0.4, 44),
    mat(item.color, { roughness: 0.55 })
  );
  tray.position.y = 0.28;
  const syrup = new THREE.Mesh(
    new THREE.CylinderGeometry(1.12, 1.12, 0.08, 44),
    mat(item.accent, { roughness: 0.3, metalness: 0.15 })
  );
  syrup.position.y = 0.5;
  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), mat("#4f7a2a"));
    const a = (i / 6) * Math.PI * 2;
    p.position.set(Math.cos(a) * 0.6, 0.56, Math.sin(a) * 0.6);
    g.add(p);
  }
  g.add(tray, syrup);
  return g;
}

function buildMound(item) {
  const g = new THREE.Group();
  g.add(plate());
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    mat(item.color, { roughness: 0.5 })
  );
  dome.position.y = 0.05;
  dome.scale.y = 1.1;
  // drizzle ringler
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.55 - i * 0.16, 0.04, 10, 30),
      mat(item.accent, { roughness: 0.3 })
    );
    r.rotation.x = Math.PI / 2;
    r.position.y = 0.2 + i * 0.22;
    g.add(r);
  }
  g.add(dome);
  return g;
}

function buildCupDessert(item) {
  const g = new THREE.Group();
  g.add(plate("#efe9dc"));
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.6, 1.3, 36),
    mat("#eef6f8", { roughness: 0.05, transparent: true, opacity: 0.35 })
  );
  glass.position.y = 0.68;
  const layers = ["#caa15a", item.color, item.accent];
  layers.forEach((c, i) => {
    const l = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.6, 0.34, 36),
      mat(c, { roughness: 0.5 })
    );
    l.position.y = 0.25 + i * 0.34;
    g.add(l);
  });
  const cream = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    mat("#fff7ec", { roughness: 0.6 })
  );
  cream.position.y = 1.3;
  cream.scale.y = 0.5;
  g.add(glass, cream);
  return g;
}

function buildWaffle(item) {
  const g = new THREE.Group();
  g.add(plate());
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.18, 1.1),
    mat(item.color, { roughness: 0.7 })
  );
  base.position.y = 0.18;
  g.add(base);
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      const bump = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.12, 0.24),
        mat(item.color, { roughness: 0.5 })
      );
      bump.position.set(x * 0.42, 0.3, z * 0.32);
      g.add(bump);
    }
  }
  const sauce = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.06, 0.8),
    mat(item.accent, { roughness: 0.25, metalness: 0.1 })
  );
  sauce.position.y = 0.4;
  const scoop = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16), mat("#fff2e0"));
  scoop.position.set(0.35, 0.6, 0);
  g.add(sauce, scoop);
  return g;
}

function buildCone(item) {
  const g = new THREE.Group();
  g.add(plate("#efe9dc"));
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.45, 1.1, 28),
    mat("#d39a4e", { roughness: 0.7 })
  );
  cone.position.y = 0.45;
  cone.rotation.x = Math.PI;
  const colors = [item.color, item.accent, "#f4c9d8"];
  colors.forEach((c, i) => {
    const scoop = new THREE.Mesh(new THREE.SphereGeometry(0.42 - i * 0.04, 24, 18), mat(c, { roughness: 0.5 }));
    scoop.position.y = 1.0 + i * 0.42;
    g.add(scoop);
  });
  g.add(cone);
  return g;
}

const BUILDERS = {
  // içecekler
  mug: buildMug,
  cup_small: buildCupSmall,
  tea_glass: buildTeaGlass,
  tall_glass: buildTallGlass,
  // tatlılar
  cake: buildCake,
  square: buildSquare,
  diamond: buildDiamond,
  bowl: buildBowl,
  tray: buildTray,
  mound: buildMound,
  cup_dessert: buildCupDessert,
  waffle: buildWaffle,
  cone: buildCone,
};

export function buildModel(item) {
  const builder = BUILDERS[item.shape] || buildMound;
  const model = builder(item);
  model.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return model;
}

// --- Sahne yöneticisi -----------------------------------------------------
export class ProductScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 1.6, 5.2);
    this.camera.lookAt(0, 0.8, 0);

    const amb = new THREE.AmbientLight(0xffffff, 0.75);
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    const rim = new THREE.DirectionalLight(0xffd9a0, 0.5);
    rim.position.set(-4, 3, -3);
    this.scene.add(amb, key, rim);

    // zemin (gölge yakalayıcı)
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3, 48),
      new THREE.ShadowMaterial({ opacity: 0.18 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.12;
    floor.receiveShadow = true;
    this.scene.add(floor);

    this.modelGroup = new THREE.Group();
    this.scene.add(this.modelGroup);

    this.spin = 0;
    this.enterT = 1;
    this._raf = null;
    this._resize();
    window.addEventListener("resize", () => this._resize());
  }

  _resize() {
    const w = this.canvas.clientWidth || 300;
    const h = this.canvas.clientHeight || 300;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setProduct(item) {
    this.modelGroup.clear();
    const model = buildModel(item);
    this.modelGroup.add(model);
    this.enterT = 0; // giriş animasyonunu tetikle
  }

  start() {
    const loop = (t) => {
      this._raf = requestAnimationFrame(loop);
      const time = t * 0.001;
      this.spin += 0.012;
      this.modelGroup.rotation.y = this.spin;
      this.modelGroup.position.y = Math.sin(time * 1.6) * 0.08;
      if (this.enterT < 1) {
        this.enterT = Math.min(1, this.enterT + 0.06);
        const e = 1 - Math.pow(1 - this.enterT, 3); // easeOutCubic
        this.modelGroup.scale.setScalar(0.2 + e * 0.8);
      }
      this.renderer.render(this.scene, this.camera);
    };
    this._raf = requestAnimationFrame(loop);
  }
}
