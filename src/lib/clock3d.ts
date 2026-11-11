// The app icon as a 3D object for the hero: an alarm clock whose hands make a
// check mark. Built from primitives (no model to download), so it weighs only
// what three.js does, and it is loaded lazily after the page is interactive.
//
// Coordinates come from the icon's 1024-px SVG (Tools/icon/light.svg in the
// app repo): the clock body is centred at (512, 572) with radius 284, so one
// unit here = 284 px there.
import {
  ACESFilmicToneMapping,
  CapsuleGeometry,
  CircleGeometry,
  Clock,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
  type Material,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const S = 284;
const toUnits = (x: number, y: number) => new Vector2((x - 512) / S, -(y - 572) / S);

function capsuleBetween(a: Vector2, b: Vector2, radius: number, material: Material, z = 0) {
  const length = a.distanceTo(b);
  const mesh = new Mesh(new CapsuleGeometry(radius, length, 8, 24), material);
  mesh.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, z);
  mesh.rotation.z = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2;
  return mesh;
}

function buildClock() {
  const white = new MeshPhysicalMaterial({ color: new Color('#fff6f0'), roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.25 });
  const face = new MeshStandardMaterial({ color: new Color('#fff1e6'), roughness: 0.75 });
  const coral = new MeshPhysicalMaterial({
    color: new Color('#ee4e1b'),
    roughness: 0.3,
    clearcoat: 0.8,
    emissive: new Color('#7a1d04'),
    emissiveIntensity: 0.35,
  });
  const tick = new MeshStandardMaterial({ color: new Color('#f6b896'), roughness: 0.6 });

  const clock = new Group();

  // Body: a short cylinder facing the camera, a rim and the face.
  const body = new Mesh(new CylinderGeometry(1, 1, 0.42, 96), white);
  body.rotation.x = Math.PI / 2;
  clock.add(body);
  const rim = new Mesh(new TorusGeometry(0.92, 0.075, 24, 128), white);
  rim.position.z = 0.215;
  clock.add(rim);
  const dial = new Mesh(new CircleGeometry(0.84, 96), face);
  dial.position.z = 0.212;
  clock.add(dial);

  // Hour marks at 12, 3, 6 and 9.
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const mark = new Mesh(new CapsuleGeometry(0.045, 0.09, 4, 12), tick);
    mark.position.set(Math.sin(angle) * 0.7, Math.cos(angle) * 0.7, 0.225);
    mark.rotation.z = -angle;
    clock.add(mark);
  }

  // The check-mark hands.
  const p1 = toUnits(410, 566);
  const p2 = toUnits(486, 642);
  const p3 = toUnits(640, 470);
  const r = 32 / S;
  clock.add(capsuleBetween(p1, p2, r, coral, 0.26));
  clock.add(capsuleBetween(p2, p3, r, coral, 0.26));

  // Bells: two domes tilted outwards, closed underneath.
  const domeGeo = new SphereGeometry(118 / S, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
  const capGeo = new CircleGeometry(118 / S, 48);
  for (const side of [-1, 1]) {
    const bell = new Group();
    const dome = new Mesh(domeGeo, white);
    const cap = new Mesh(capGeo, white);
    cap.rotation.x = Math.PI / 2;
    bell.add(dome, cap);
    const at = toUnits(side < 0 ? 318 : 706, 318);
    bell.position.set(at.x, at.y, -0.02);
    bell.rotation.z = -side * ((42 * Math.PI) / 180);
    clock.add(bell);
  }

  // Hammer knob between the bells.
  clock.add(capsuleBetween(toUnits(512, 300), toUnits(512, 262), 17 / S, white));
  const knob = new Mesh(new SphereGeometry(30 / S, 24, 16), white);
  const k = toUnits(512, 246);
  knob.position.set(k.x, k.y, 0);
  clock.add(knob);

  // Legs.
  clock.add(capsuleBetween(toUnits(372, 790), toUnits(322, 872), 28 / S, white));
  clock.add(capsuleBetween(toUnits(652, 790), toUnits(702, 872), 28 / S, white));

  // Centre the whole thing vertically (legs reach lower than the knob reaches up).
  clock.position.y = 0.02;
  return clock;
}

/** Expanding rings for the "ringing" moments. */
function buildRings(count: number) {
  return Array.from({ length: count }, () => {
    const mat = new MeshBasicMaterial({ color: new Color('#ff8a4c'), transparent: true, opacity: 0, depthWrite: false });
    const ring = new Mesh(new TorusGeometry(1.25, 0.022, 12, 160), mat);
    ring.position.z = -0.1;
    return ring;
  });
}

export function mountClock(root: HTMLElement, canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  scene.add(new HemisphereLight(new Color('#ffe4d2'), new Color('#2a1208'), 1.1));
  const key = new DirectionalLight(new Color('#ffffff'), 2.4);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rimLight = new PointLight(new Color('#ff5a1f'), 40, 12);
  rimLight.position.set(-3, -2.2, 1.5);
  scene.add(rimLight);

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 7.6);

  const pivot = new Group();
  const clock = buildClock();
  const rings = buildRings(3);
  pivot.add(clock, ...rings);
  scene.add(pivot);

  // Size to the element.
  const resize = () => {
    const { width, height } = root.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(root);

  // Pointer parallax, eased.
  const target = new Vector2();
  const current = new Vector2();
  window.addEventListener(
    'pointermove',
    (e) => target.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1),
    { passive: true },
  );

  // Ring every few seconds, and on tap.
  const RING_EVERY = 5;
  const RING_FOR = 1.3;
  let ringStart = 1.2 - RING_EVERY; // first ring shortly after it appears
  root.addEventListener('pointerdown', () => (ringStart = timer.getElapsedTime()));

  const timer = new Clock();
  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) renderer.setAnimationLoop(tick);
    else renderer.setAnimationLoop(null);
  }).observe(root);

  function tick() {
    const t = timer.getElapsedTime();
    if (t - ringStart > RING_EVERY) ringStart = t;
    const sinceRing = t - ringStart;
    const ringing = sinceRing >= 0 && sinceRing < RING_FOR;
    const envelope = ringing ? Math.sin((sinceRing / RING_FOR) * Math.PI) : 0;

    current.lerp(target, 0.06);
    pivot.rotation.y = Math.sin(t * 0.55) * 0.32 + current.x * 0.35;
    pivot.rotation.x = -0.1 + current.y * 0.18;
    pivot.position.y = Math.sin(t * 1.1) * 0.07;
    clock.rotation.z = Math.sin(t * 46) * 0.075 * envelope;

    rings.forEach((ring, i) => {
      const phase = ringing ? (sinceRing / RING_FOR + i / rings.length) % 1 : 1;
      const s = 1 + phase * 0.75;
      ring.scale.set(s, s, s);
      (ring.material as MeshBasicMaterial).opacity = ringing ? (1 - phase) * 0.55 * envelope : 0;
    });

    renderer.render(scene, camera);
  }

  if (visible) renderer.setAnimationLoop(tick);
  root.classList.add('live');
}
