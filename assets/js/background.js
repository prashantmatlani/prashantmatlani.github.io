
// assets/js/background.js

const container = document.getElementById("bg-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(12, 12, 128, 128);

const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
};

const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
            vUv = uv;

            vec3 pos = position;

            float wave1 = sin(pos.x * 2.5 + uTime * 0.5) * 0.15;
            float wave2 = cos(pos.y * 3.0 + uTime * 0.4) * 0.15;

            pos.z += wave1 + wave2;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;

        varying vec2 vUv;

        void main() {

            vec2 uv = vUv;

            vec2 mouse = uMouse;

            float dist = distance(uv, mouse);

            vec3 deepBlue = vec3(0.02, 0.03, 0.10);
            vec3 purple = vec3(0.10, 0.08, 0.24);
            vec3 electric = vec3(0.25, 0.32, 0.95);

            float pulse = sin(uTime * 0.25) * 0.5 + 0.5;

            vec3 color = mix(deepBlue, purple, uv.y + pulse * 0.1);

            color += electric * (0.08 / (dist + 0.25));

            float vignette = smoothstep(1.1, 0.2, distance(uv, vec2(0.5)));

            color *= vignette;

            gl_FragColor = vec4(color, 1.0);
        }
    `
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const mouse = {
    x: 0.5,
    y: 0.5
};

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX / window.innerWidth;
    mouse.y = 1 - e.clientY / window.innerHeight;
});

function animate() {

    requestAnimationFrame(animate);

    uniforms.uTime.value += 0.01;

    uniforms.uMouse.value.lerp(mouse, 0.05);

    mesh.rotation.z += 0.0004;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});