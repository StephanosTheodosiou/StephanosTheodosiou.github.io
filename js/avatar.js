// ========== AVATAR - 3D Rotating Head ==========
(function () {
  const canvas = document.getElementById('avatar-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(340, 340);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5;

  // ---- Glow Ring ----
  const ringGeo = new THREE.TorusGeometry(1.85, 0.015, 8, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x7c5cfc,
    transparent: true,
    opacity: 0.6
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  scene.add(ring);

  const ring2Geo = new THREE.TorusGeometry(1.95, 0.008, 8, 120);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xa98cff,
    transparent: true,
    opacity: 0.3
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  scene.add(ring2);

  // ---- Avatar Group ----
  const avatarGroup = new THREE.Group();
  scene.add(avatarGroup);

  // Head
  const headGeo = new THREE.SphereGeometry(1, 32, 32);
  const headMat = new THREE.MeshBasicMaterial({
    color: 0x1a1a2e,
    transparent: true,
    opacity: 0.95
  });
  const head = new THREE.Mesh(headGeo, headMat);
  avatarGroup.add(head);

  // Head wireframe overlay
  const headWireGeo = new THREE.SphereGeometry(1.01, 16, 16);
  const headWireMat = new THREE.MeshBasicMaterial({
    color: 0x7c5cfc,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const headWire = new THREE.Mesh(headWireGeo, headWireMat);
  avatarGroup.add(headWire);

  // Hair - top cap
  const hairGeo = new THREE.SphereGeometry(1.02, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
  const hairMat = new THREE.MeshBasicMaterial({
    color: 0x2a1a4a,
    side: THREE.DoubleSide
  });
  const hair = new THREE.Mesh(hairGeo, hairMat);
  hair.position.y = 0.0;
  avatarGroup.add(hair);

  // Hair strands using boxes
  const hairStrandMat = new THREE.MeshBasicMaterial({ color: 0x3d2060 });
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const strandGeo = new THREE.BoxGeometry(0.08, 0.3, 0.08);
    const strand = new THREE.Mesh(strandGeo, hairStrandMat);
    strand.position.set(
      Math.cos(angle) * 0.7,
      1.1 + Math.random() * 0.15,
      Math.sin(angle) * 0.5
    );
    strand.rotation.z = (Math.random() - 0.5) * 0.4;
    avatarGroup.add(strand);
  }

  // Eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc });
  const eyeGlowMat = new THREE.MeshBasicMaterial({
    color: 0x7c5cfc,
    transparent: true,
    opacity: 0.3
  });

  function makeEye(x) {
    const eyeGroup = new THREE.Group();

    const eyeGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eyeGroup.add(eye);

    const pupilGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = 0.08;
    eyeGroup.add(pupil);

    const glowGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const glow = new THREE.Mesh(glowGeo, eyeGlowMat);
    eyeGroup.add(glow);

    eyeGroup.position.set(x, 0.1, 0.87);
    return eyeGroup;
  }

  avatarGroup.add(makeEye(-0.28));
  avatarGroup.add(makeEye(0.28));

  // Nose
  const noseGeo = new THREE.ConeGeometry(0.06, 0.18, 8);
  const noseMat = new THREE.MeshBasicMaterial({ color: 0x2a1a3a });
  const nose = new THREE.Mesh(noseGeo, noseMat);
  nose.position.set(0, -0.1, 0.92);
  nose.rotation.x = Math.PI / 2;
  avatarGroup.add(nose);

  // Mouth
  const mouthGeo = new THREE.TorusGeometry(0.18, 0.03, 8, 20, Math.PI);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0xa98cff });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -0.32, 0.88);
  mouth.rotation.z = Math.PI;
  avatarGroup.add(mouth);

  // Ears
  function makeEar(x) {
    const earGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const earMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e });
    const ear = new THREE.Mesh(earGeo, earMat);
    ear.position.set(x, 0, 0);
    ear.scale.set(0.5, 0.8, 0.5);
    return ear;
  }

  avatarGroup.add(makeEar(-1.0));
  avatarGroup.add(makeEar(1.0));

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.5, 16);
  const neckMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.y = -1.22;
  avatarGroup.add(neck);

  // Shoulders / Body
  const bodyGeo = new THREE.CylinderGeometry(0.85, 0.7, 0.6, 16);
  const bodyMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = -1.7;
  avatarGroup.add(body);

  // Shirt collar detail
  const collarGeo = new THREE.TorusGeometry(0.32, 0.06, 8, 20);
  const collarMat = new THREE.MeshBasicMaterial({ color: 0xa98cff });
  const collar = new THREE.Mesh(collarGeo, collarMat);
  collar.position.set(0, -1.42, 0.15);
  collar.rotation.x = Math.PI / 4;
  avatarGroup.add(collar);

  // Floating particles around avatar
  const auraCount = 30;
  const auraPositions = new Float32Array(auraCount * 3);
  for (let i = 0; i < auraCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 1.6 + Math.random() * 0.5;
    auraPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    auraPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    auraPositions[i * 3 + 2] = r * Math.cos(phi);
  }

  const auraGeo = new THREE.BufferGeometry();
  auraGeo.setAttribute('position', new THREE.BufferAttribute(auraPositions, 3));
  const auraMat = new THREE.PointsMaterial({
    color: 0x7c5cfc,
    size: 0.04,
    transparent: true,
    opacity: 0.7
  });
  const aura = new THREE.Points(auraGeo, auraMat);
  scene.add(aura);

  // ---- Mouse Interaction ----
  let targetX = 0;
  let targetY = 0;

  const avatarEl = document.querySelector('.hero-avatar');
  if (avatarEl) {
    avatarEl.addEventListener('mousemove', (e) => {
      const rect = avatarEl.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    });

    avatarEl.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });
  }

  // ---- Animation ----
  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);
    frame += 0.008;

    avatarGroup.rotation.y += (targetX - avatarGroup.rotation.y) * 0.08;
    avatarGroup.rotation.x += (targetY - avatarGroup.rotation.x) * 0.08;

    // Idle float
    avatarGroup.position.y = Math.sin(frame) * 0.04;

    // Rings rotate
    ring.rotation.y = frame * 0.5;
    ring.rotation.x = Math.sin(frame * 0.3) * 0.2;
    ring2.rotation.y = -frame * 0.3;
    ring2.rotation.z = frame * 0.2;

    // Aura rotate
    aura.rotation.y = frame * 0.2;

    renderer.render(scene, camera);
  }

  animate();
})();