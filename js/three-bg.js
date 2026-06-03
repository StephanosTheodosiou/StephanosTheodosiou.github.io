// ========== THREE.JS 3D BACKGROUND ==========
(function() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  // ---- Floating Particles ----
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 80;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x7c5cfc,
    size: 0.15,
    transparent: true,
    opacity: 0.6
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ---- Wireframe Torus Knot ----
  const torusGeo = new THREE.TorusKnotGeometry(8, 2.5, 120, 16);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x7c5cfc,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const torusKnot = new THREE.Mesh(torusGeo, torusMat);
  torusKnot.position.set(18, 0, -10);
  scene.add(torusKnot);

  // ---- Wireframe Icosahedron ----
  const icoGeo = new THREE.IcosahedronGeometry(5, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0xa98cff,
    wireframe: true,
    transparent: true,
    opacity: 0.06
  });
  const icosahedron = new THREE.Mesh(icoGeo, icoMat);
  icosahedron.position.set(-20, 8, -5);
  scene.add(icosahedron);

  // ---- Floating Ring ----
  const ringGeo = new THREE.TorusGeometry(6, 0.08, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x7c5cfc,
    transparent: true,
    opacity: 0.2
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(14, -6, -8);
  ring.rotation.x = Math.PI / 4;
  scene.add(ring);

  // ---- Second smaller Ring ----
  const ring2Geo = new THREE.TorusGeometry(3, 0.05, 8, 60);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xa98cff,
    transparent: true,
    opacity: 0.15
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.position.set(-14, -4, -6);
  ring2.rotation.y = Math.PI / 3;
  scene.add(ring2);

  // ---- Mouse Interaction ----
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ---- Resize Handler ----
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---- Animation Loop ----
  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);
    frame += 0.005;

    // Rotate objects
    torusKnot.rotation.x = frame * 0.4;
    torusKnot.rotation.y = frame * 0.3;

    icosahedron.rotation.x = frame * 0.3;
    icosahedron.rotation.y = frame * 0.5;

    ring.rotation.z = frame * 0.4;
    ring2.rotation.z = -frame * 0.3;

    particles.rotation.y = frame * 0.05;
    particles.rotation.x = frame * 0.02;

    // Subtle camera movement following mouse
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
})();