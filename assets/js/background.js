
// assets/js/background.js


/* =========================================================
   assets/js/background.js
   Production-grade atmospheric analytical field
   ========================================================= */

(() => {
  
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
	renderer.setPixelRatio(1);
  } else {
	renderer.setPixelRatio(window.devicePixelRatio);
  }
  
  const mouseInfluence = isMobile ? 0.04 : 0.12;
  
  const container = document.getElementById("bg-canvas");

  if (!container || typeof THREE === "undefined") return;

  let scene, camera, renderer;
  let fieldMesh;
  let particles;
  let mouse = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };

  const clock = new THREE.Clock();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 7;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);
  
  /* =========================================================
     BACKGROUND FIELD
     ========================================================= */

  const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);

  const material = new THREE.ShaderMaterial({

    transparent: true,

    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }
    },

    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;

      void main() {

        vUv = uv;

        vec3 pos = position;

        float wave1 =
          sin(pos.x * 1.6 + uTime * 0.25) * 0.12;

        float wave2 =
          cos(pos.y * 2.0 + uTime * 0.18) * 0.12;

        float radial =
          sin(length(pos.xy) * 2.5 - uTime * 0.3) * 0.05;

        float mouseInfluence =
          distance(uv, uMouse) * -0.18;

        pos.z += wave1 + wave2 + radial + mouseInfluence;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(pos, 1.0);
      }
    `,

    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;

      float random(vec2 st) {
        return fract(
          sin(dot(st.xy, vec2(12.9898,78.233))) *
          43758.5453123
        );
      }

      void main() {

        vec2 uv = vUv;

        float noise =
          random(uv + uTime * 0.01);

        float glow =
          0.25 / length(uv - vec2(0.5));

        vec3 color = vec3(
          0.04,
          0.07,
          0.13
        );

        color += glow * 0.08;

        color += noise * 0.015;

        gl_FragColor = vec4(color, 0.92);
      }
    `
  });

  fieldMesh = new THREE.Mesh(geometry, material);

  scene.add(fieldMesh);

  /* =========================================================
     PARTICLE SIGNAL FIELD
     ========================================================= */

  const particleCount = 1800;

  const particleGeometry = new THREE.BufferGeometry();

  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {

    positions[i * 3] =
      (Math.random() - 0.5) * 18;

    positions[i * 3 + 1] =
      (Math.random() - 0.5) * 18;

    positions[i * 3 + 2] =
      (Math.random() - 0.5) * 5;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.015,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  /* =========================================================
     MOUSE
     ========================================================= */

  window.addEventListener("mousemove", (e) => {

    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1 - e.clientY / window.innerHeight;

  });

  /* =========================================================
     RESIZE
     ========================================================= */

  window.addEventListener("resize", () => {

    camera.aspect =
      window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  });

  /* =========================================================
     ANIMATION
     ========================================================= */

  function animate() {

    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    mouse.x += (targetMouse.x - mouse.x) * 0.035;
    mouse.y += (targetMouse.y - mouse.y) * 0.035;

    material.uniforms.uTime.value = elapsed;

    material.uniforms.uMouse.value.set(
      mouse.x,
      mouse.y
    );

    particles.rotation.z += 0.00025;
    particles.rotation.y += 0.00018;

    camera.position.x =
      (mouse.x - 0.5) * 0.3;

    camera.position.y =
      (mouse.y - 0.5) * 0.25;

    renderer.render(scene, camera);
  }

  animate();

})();