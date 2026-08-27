/* ═══════════════════════════════════════════════════════════
   three-scene.js — Authentic 3D WebGL Engine & Holographic Tesseract
   Muhammad Aga Putra | Frontend Software Engineer & System Architect
   ═══════════════════════════════════════════════════════════ */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web/build/player/lottie_light.js";

gsap.registerPlugin(ScrollTrigger);

export const initThreeEngine = () => {
  const canvas = document.getElementById("bg");
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const isPhone = window.innerWidth < 768;
  const isMobile = window.innerWidth < 1024;
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7.5);

  // Dynamic Camera LookAt Target Vector (with smooth lerp damping)
  const cameraTarget = new THREE.Vector3(0, 0, 0);
  const currentCameraTarget = new THREE.Vector3(0, 0, 0);

  // WebGLRenderer setup optimized for low battery impact and high FPS on mobile
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isPhone,
    powerPreference: "high-performance",
    precision: isPhone ? "mediump" : "highp",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isPhone ? 1.25 : (isMobile ? 1.5 : 1.75)));

  // Color Space & ACES Tone Mapping (Boosted Exposure for Radiant 3D Visuals)
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.30;

  // ─── RoomEnvironment & PMREMGenerator for PBR Reflections ───
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  pmremGenerator.dispose();

  // ─── Premium Deep Space Studio Lighting Rig ───
  const ambientLight = new THREE.AmbientLight(0x181e32, 1.3);
  scene.add(ambientLight);

  // Stellar Key Light (Bright sun rim light)
  const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.2);
  keyLight.position.set(-8, 10, 10);
  scene.add(keyLight);

  // Cosmic Crimson Main Fill Light
  const crimsonFillLight = new THREE.DirectionalLight(0xff1828, 2.6);
  crimsonFillLight.position.set(8, -4, 6);
  scene.add(crimsonFillLight);

  // Cool Starlight Galaxy Rim Light (Opposite deep blue/cyan space bounce)
  const crimsonBackLight = new THREE.DirectionalLight(0x3870ff, 2.0);
  crimsonBackLight.position.set(-4, -8, -8);
  scene.add(crimsonBackLight);

  // Orbiting Cosmic Star Accent
  const crimsonPointAccent = new THREE.PointLight(0xff2838, 2.5, 16, 1.2);
  crimsonPointAccent.position.set(2, 3, 3);
  scene.add(crimsonPointAccent);

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 1: MASTER 4D TESSERACT (Hero Artifact) ───
  // ═══════════════════════════════════════════════════════════
  const isPricingPage = typeof window !== "undefined" && window.location.pathname.includes("pricing");
  const tesseractGroup = new THREE.Group();
  tesseractGroup.position.set(
    isPricingPage ? (isMobile ? 0 : 3.2) : (isMobile ? 0 : 2.0),
    isPricingPage ? (isMobile ? 1.5 : -0.2) : (isMobile ? 1.1 : 0),
    isPricingPage ? (isMobile ? -1.6 : -1.4) : (isMobile ? -0.8 : 0.1)
  );
  if (isPricingPage) {
    tesseractGroup.scale.set(0.65, 0.65, 0.65);
  }
  scene.add(tesseractGroup);

  const modelWrapper = new THREE.Group();
  modelWrapper.rotation.set(0.45, 0.65, 0.15);
  tesseractGroup.add(modelWrapper);

  const redCoreLight = new THREE.PointLight(0xff2210, 3.6, 14, 1.2);
  redCoreLight.position.set(0, 0, 0);
  modelWrapper.add(redCoreLight);

  // Rotating Crimson God-Rays & Light Aura (Responsive on Mobile)
  const lightRaysGroup = new THREE.Group();
  tesseractGroup.add(lightRaysGroup);

  const createGodRaysTexture = () => {
    const canvasEl = document.createElement("canvas");
    canvasEl.width = 1024;
    canvasEl.height = 1024;
    const ctx = canvasEl.getContext("2d");
    const cx = 512;
    const cy = 512;

    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 512);
    coreGrad.addColorStop(0, "rgba(255, 60, 40, 0.85)");
    coreGrad.addColorStop(0.15, "rgba(255, 30, 20, 0.55)");
    coreGrad.addColorStop(0.4, "rgba(230, 20, 10, 0.22)");
    coreGrad.addColorStop(0.7, "rgba(180, 0, 0, 0.08)");
    coreGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    const numRays = 24;
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      const rayWidth = (i % 3 === 0 ? 0.08 : i % 2 === 0 ? 0.045 : 0.025) * Math.PI;
      const rayLength = 480 + ((i * 37) % 30);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rayLength);
      rayGrad.addColorStop(0, "rgba(255, 70, 50, 0.8)");
      rayGrad.addColorStop(0.2, "rgba(255, 35, 20, 0.45)");
      rayGrad.addColorStop(0.6, "rgba(220, 20, 10, 0.12)");
      rayGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, rayLength, -rayWidth / 2, rayWidth / 2);
      ctx.closePath();
      ctx.fillStyle = rayGrad;
      ctx.fill();
      ctx.restore();
    }

    const tex = new THREE.CanvasTexture(canvasEl);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  };

  const godRaysTexture = createGodRaysTexture();

  const rayMatFront = new THREE.MeshBasicMaterial({
    map: godRaysTexture,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const rayMatCross = new THREE.MeshBasicMaterial({
    map: godRaysTexture,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const planeGeom = new THREE.PlaneGeometry(isMobile ? 1.8 : 3.2, isMobile ? 1.8 : 3.2);
  const plane1 = new THREE.Mesh(planeGeom, rayMatFront);
  lightRaysGroup.add(plane1);

  const plane2 = new THREE.Mesh(planeGeom, rayMatCross);
  plane2.rotation.x = Math.PI * 0.25;
  plane2.rotation.y = Math.PI * 0.35;
  lightRaysGroup.add(plane2);

  const plane3 = new THREE.Mesh(planeGeom, rayMatCross);
  plane3.rotation.x = -Math.PI * 0.3;
  plane3.rotation.y = -Math.PI * 0.25;
  lightRaysGroup.add(plane3);

  // Large Orbital Celestial Halo Rings (Responsive on Mobile)
  const ringGeom = new THREE.TorusGeometry(isMobile ? 0.95 : 1.65, isMobile ? 0.010 : 0.015, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xff2010,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const orbitalRing = new THREE.Mesh(ringGeom, ringMat);
  orbitalRing.rotation.x = Math.PI * 0.4;
  lightRaysGroup.add(orbitalRing);

  // Inner Harmonic Halo Ring (Responsive on Mobile)
  const orbitalRing2Geom = new THREE.TorusGeometry(isMobile ? 0.75 : 1.30, isMobile ? 0.008 : 0.012, 16, 90);
  const orbitalRing2Mat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const orbitalRing2 = new THREE.Mesh(orbitalRing2Geom, orbitalRing2Mat);
  orbitalRing2.rotation.x = -Math.PI * 0.3;
  orbitalRing2.rotation.y = Math.PI * 0.25;
  lightRaysGroup.add(orbitalRing2);

  // ─── CLIENT-FRIENDLY SMOOTH PRELOADER TIMELINE ───
  let preloaderFinished = false;
  let modelLoaded = false;
  let texturesLoaded = false;
  let warmupExecuted = false;

  const preloaderEl = document.getElementById("web-preloader");
  const barEl = document.getElementById("preloader-bar");
  const percentEl = document.getElementById("preloader-percent");
  const statusEl = document.getElementById("preloader-status");
  const rocketCenter = document.getElementById("preloader-rocket-center");
  const lottieContainer = document.getElementById("lottie-rocket-container");
  const textGroup = document.getElementById("preloader-text-group");

  const isEn = (typeof document !== "undefined" && document.documentElement.getAttribute("lang") === "en");

  const PRELOADER_STAGES = isEn ? [
    { pct: 35, text: "Preparing visual experience & shaders..." },
    { pct: 70, text: "Loading projects & pipeline data..." },
    { pct: 92, text: "Finalizing 3D cosmic geometry..." },
    { pct: 100, text: "Ignition ready! Launching experience..." }
  ] : [
    { pct: 35, text: "Menyiapkan visual & shader 3D..." },
    { pct: 70, text: "Memuat karya & pipeline proyek..." },
    { pct: 92, text: "Menyempurnakan geometri interaktif..." },
    { pct: 100, text: "Siap meluncur! Membuka halaman..." }
  ];

  // Initialize High-End Lottie Rocket Animation (Frame-Synchronized to Progress Bar)
  let lottieAnim = null;
  if (lottieContainer) {
    try {
      lottieAnim = lottie.loadAnimation({
        container: lottieContainer,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/rocket.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
          progressiveLoad: false,
          hideOnTransparent: false
        }
      });
      lottieAnim.addEventListener("DOMLoaded", () => {
        const svg = lottieContainer.querySelector("svg");
        if (svg) {
          svg.style.overflow = "visible";
        }
      });
    } catch (err) {
      console.warn("Lottie loading notice:", err);
    }
  }

  // Idle hover oscillation for center rocket
  let floatTween = null;
  if (rocketCenter) {
    floatTween = gsap.to(rocketCenter, {
      y: -8,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  const progressTracker = { val: 0 };

  const updateDisplay = (val, text) => {
    const intVal = Math.min(100, Math.floor(val));
    if (barEl) barEl.style.width = `${intVal}%`;
    if (percentEl) percentEl.textContent = String(intVal).padStart(2, "0");
    if (statusEl && text) statusEl.textContent = text;
    if (lottieAnim && lottieAnim.totalFrames) {
      const targetFrame = (intVal / 100) * (lottieAnim.totalFrames - 1);
      lottieAnim.goToAndStop(targetFrame, true);
    }
  };

  const finishPreloader = () => {
    if (preloaderFinished) return;
    preloaderFinished = true;

    if (floatTween) floatTween.kill();
    const blastTl = gsap.timeline();

    // 1. Center rocket lift-off with smooth inertia acceleration
    if (rocketCenter) {
      blastTl.to(
        rocketCenter,
        {
          y: "-130vh",
          scale: 0.82,
          duration: 1.6,
          ease: "power2.in",
        },
        0
      );
    }

    // 2. Percentage and texts fade down smoothly
    if (textGroup) {
      blastTl.to(
        textGroup,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
        },
        0
      );
    }

    // 3. Black veil dissolves with pure silk elegance
    if (preloaderEl) {
      preloaderEl.style.pointerEvents = "none";
      gsap.to(preloaderEl, {
        opacity: 0,
        delay: 0.7,
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          preloaderEl.style.display = "none";
          if (lottieAnim) {
            try {
              lottieAnim.destroy();
            } catch (e) {}
            lottieAnim = null;
          }
          preloaderEl.remove();
        },
      });
    }
  };

  const preloaderTl = gsap.timeline({
    onComplete: () => {
      finishPreloader();
    }
  });

  preloaderTl
    .to(progressTracker, {
      val: PRELOADER_STAGES[0].pct,
      duration: 1.15,
      ease: "power1.out",
      onUpdate: () => updateDisplay(progressTracker.val, PRELOADER_STAGES[0].text),
    })
    .to(progressTracker, {
      val: PRELOADER_STAGES[1].pct,
      duration: 1.15,
      ease: "power1.inOut",
      onUpdate: () => updateDisplay(progressTracker.val, PRELOADER_STAGES[1].text),
    })
    .to(progressTracker, {
      val: PRELOADER_STAGES[2].pct,
      duration: 0.95,
      ease: "power1.inOut",
      onUpdate: () => updateDisplay(progressTracker.val, PRELOADER_STAGES[2].text),
    })
    .to(progressTracker, {
      val: 100,
      duration: 0.85,
      ease: "power2.out",
      onUpdate: () => updateDisplay(progressTracker.val, PRELOADER_STAGES[3].text),
    });

  const loadingManager = new THREE.LoadingManager(
    () => {
      modelLoaded = true;
      texturesLoaded = true;
    },
    (url, itemsLoaded, itemsTotal) => {
      // Progress handled gracefully in background
    },
    (url) => {
      console.warn("Loading notice on:", url);
    }
  );

  // Dynamic Texture Loading (TextureLoader - WebP Optimized with LoadingManager)
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorMap = textureLoader.load("/textures/box001.webp");
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.flipY = false;

  const bumpMap = textureLoader.load("/textures/brown_leather_disp_1k.webp");
  bumpMap.colorSpace = THREE.NoColorSpace;
  bumpMap.flipY = false;

  // 3. Deep GPU Warmup & Shader Pre-compilation
  const executeGPUWarmup = () => {
    if (warmupExecuted) return;
    warmupExecuted = true;
    try {
      if (renderer && renderer.initTexture) {
        if (colorMap && colorMap.image) renderer.initTexture(colorMap);
        if (bumpMap && bumpMap.image) renderer.initTexture(bumpMap);
      }

      if (renderer && scene && camera) {
        renderer.compile(scene, camera);
      }

      if (tesseractGroup) {
        const origTessPos = tesseractGroup.position.clone();
        const origTessScale = tesseractGroup.scale.clone();
        
        renderer.render(scene, camera);
        
        tesseractGroup.position.set(isMobile ? 0 : -2.0, 0, 0.1);
        renderer.render(scene, camera);

        tesseractGroup.position.copy(origTessPos);
        tesseractGroup.scale.copy(origTessScale);
        renderer.render(scene, camera);
      }

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    } catch (err) {
      console.warn("GPU warmup notice:", err);
    }
  };

  // Deep GPU warmup in background
  executeGPUWarmup();

  // Load /tesseract.glb with DRACOLoader & Dynamic Material Assignment
  let mixer = null;
  const dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

  const loader = new GLTFLoader(loadingManager);
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    "/tesseract.glb",
    (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const scale = isMobile ? 0.38 : 0.72;
      model.scale.set(scale, scale, scale);

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) {
            try {
              const creaseAngle = THREE.MathUtils.degToRad(35);
              child.geometry = toCreasedNormals(child.geometry, creaseAngle);
            } catch (err) {
              console.warn("toCreasedNormals warning on mesh:", child.name, err);
            }
          }

          if (child.material) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];

            materials.forEach((mat) => {
              if (
                mat.name === "box_out" ||
                (child.material && child.material.name === "box_out") ||
                child.name.toLowerCase().includes("box_out")
              ) {
                if (mat.color) {
                  mat.color.setHex(0xffffff);
                }

                mat.map = colorMap;
                mat.bumpMap = bumpMap;
                mat.bumpScale = 0.05;
                mat.needsUpdate = true;

                console.log("Tekstur dipasang pada:", child.name);
              } else if (
                mat.name === "box_in" || mat.name.toLowerCase().includes("inner") ||
                (child.material && child.material.name === "box_in") ||
                child.name.toLowerCase().includes("box_in")
              ) {
                if (mat.color) {
                  mat.color.setHex(0xff0028);
                }
                mat.emissive = new THREE.Color(0x3a0006);
                mat.emissiveIntensity = 0.6;
                mat.needsUpdate = true;
              }
            });
          }
        }
      });

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.timeScale = 0.85;
          action.play();
        });
      }

      modelWrapper.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading tesseract.glb:", error);
    }
  );

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 2: OBSIDIAN-CRIMSON POLYHEDRAL CRYSTAL ───
  // ═══════════════════════════════════════════════════════════
  const polyhedronGroup = new THREE.Group();
  polyhedronGroup.position.set(isMobile ? -1.2 : -2.5, isMobile ? -1.0 : -1.2, -1.8);
  polyhedronGroup.scale.set(isMobile ? 0.24 : 0.45, isMobile ? 0.24 : 0.45, isMobile ? 0.24 : 0.45);
  scene.add(polyhedronGroup);

  const polyGeom = new THREE.IcosahedronGeometry(0.85, 0);
  const polyMat = new THREE.MeshPhysicalMaterial({
    color: 0x181822,
    metalness: 0.88,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    flatShading: true,
  });
  const polyMesh = new THREE.Mesh(polyGeom, polyMat);
  polyhedronGroup.add(polyMesh);

  const wireGeom = new THREE.IcosahedronGeometry(0.88, 0);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const wireMesh = new THREE.Mesh(wireGeom, wireMat);
  polyhedronGroup.add(wireMesh);

  const polyLight = new THREE.PointLight(0xdc143c, 1.4, 5, 1.4);
  polyhedronGroup.add(polyLight);

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 3: CELESTIAL GYROSCOPIC QUANTUM RINGS ───
  // ═══════════════════════════════════════════════════════════
  const gyroRingsGroup = new THREE.Group();
  gyroRingsGroup.position.set(isMobile ? 1.2 : 2.4, isMobile ? 1.2 : 1.6, -2.2);
  gyroRingsGroup.scale.set(isMobile ? 0.22 : 0.36, isMobile ? 0.22 : 0.36, isMobile ? 0.22 : 0.36);
  scene.add(gyroRingsGroup);

  const ring1Geom = new THREE.TorusGeometry(0.85, 0.012, 16, 80);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x2b2d38,
    metalness: 0.95,
    roughness: 0.2,
  });
  const gyroRing1 = new THREE.Mesh(ring1Geom, ring1Mat);
  gyroRingsGroup.add(gyroRing1);

  const ring2Geom = new THREE.TorusGeometry(0.62, 0.01, 16, 70);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    transparent: true,
    opacity: 0.6,
  });
  const gyroRing2 = new THREE.Mesh(ring2Geom, ring2Mat);
  gyroRingsGroup.add(gyroRing2);

  const ring3Geom = new THREE.TorusGeometry(0.42, 0.008, 16, 60);
  const ring3Mat = new THREE.MeshBasicMaterial({
    color: 0xff3b19,
    transparent: true,
    opacity: 0.7,
    wireframe: true,
  });
  const gyroRing3 = new THREE.Mesh(ring3Geom, ring3Mat);
  gyroRingsGroup.add(gyroRing3);

  const coreDiamondGeom = new THREE.OctahedronGeometry(0.22, 0);
  const coreDiamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xff0028,
    emissive: 0x4a0008,
    metalness: 0.4,
    roughness: 0.1,
    transmission: 0.5,
    flatShading: true,
  });
  const coreDiamond = new THREE.Mesh(coreDiamondGeom, coreDiamondMat);
  gyroRingsGroup.add(coreDiamond);

    // Add volumetric space fog for realistic 3D depth
    scene.fog = new THREE.FogExp2(0x040509, 0.018);

  // ═══════════════════════════════════════════════════════════
  // ─── OBJECT 4: FLOATING DEEP-SPACE COSMIC CRYSTAL SHARDS ───
  // ═══════════════════════════════════════════════════════════
  const cosmicShardsGroup = new THREE.Group();
  scene.add(cosmicShardsGroup);

  const shardGeoms = [
    new THREE.OctahedronGeometry(0.20, 0),
    new THREE.TetrahedronGeometry(0.24, 0),
    new THREE.IcosahedronGeometry(0.18, 0),
    new THREE.DodecahedronGeometry(0.16, 0),
  ];

  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0x121420,
    emissive: 0x30050c,
    metalness: 0.92,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    flatShading: true,
  });

  const shardWireMat = new THREE.MeshBasicMaterial({
    color: 0xdc143c,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });

  const cosmicShards = [];
  const shardCount = isMobile ? 12 : 28;

  for (let i = 0; i < shardCount; i++) {
    const shardGroup = new THREE.Group();
    const geom = shardGeoms[i % shardGeoms.length];
    const solid = new THREE.Mesh(geom, shardMat);
    const wire = new THREE.Mesh(geom, shardWireMat);
    wire.scale.set(1.04, 1.04, 1.04);
    shardGroup.add(solid);
    shardGroup.add(wire);

    const spreadX = (Math.random() - 0.5) * (isMobile ? 12 : 24);
    const spreadY = (Math.random() - 0.5) * (isMobile ? 14 : 20);
    const spreadZ = -14 + Math.random() * 18;
    const s = 0.5 + Math.random() * 0.9;
    shardGroup.position.set(spreadX, spreadY, spreadZ);
    shardGroup.scale.set(s, s, s);

    shardGroup.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.025,
      rotSpeedZ: (Math.random() - 0.5) * 0.015,
      bobSpeed: 1.0 + Math.random() * 2.0,
      bobOffset: Math.random() * Math.PI * 2,
      initialY: spreadY,
    };

    cosmicShardsGroup.add(shardGroup);
    cosmicShards.push(shardGroup);
  }

  // ─── Multi-Layered Deep Cosmic Starfield & Floating Stardust ───
  // Star Texture Generator
  const createCosmicStarTexture = () => {
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 64;
    starCanvas.height = 64;
    const sCtx = starCanvas.getContext("2d");
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    sGrad.addColorStop(0.2, "rgba(255, 250, 240, 0.85)");
    sGrad.addColorStop(0.5, "rgba(240, 80, 80, 0.35)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const starTex = new THREE.CanvasTexture(starCanvas);
    starTex.generateMipmaps = true;
    return starTex;
  };
  const cosmicStarTex = createCosmicStarTexture();

  // Layer 1: 1,600 Distant Outer Space Stars with Realistic Spectrum
  const starCount = 1600;
  const starGeom = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const starSpectrum = [
    new THREE.Color(0xffffff), // Pure white
    new THREE.Color(0xdceaff), // Diamond blue
    new THREE.Color(0xffedd8), // Warm stellar gold
    new THREE.Color(0xff3b3b), // Crimson cosmic star
    new THREE.Color(0x7fb5ff), // Deep space sapphire
  ];

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const radius = 18 + Math.random() * 45;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    starPos[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starPos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPos[i3 + 2] = radius * Math.cos(phi);

    const c = starSpectrum[Math.floor(Math.random() * starSpectrum.length)];
    starColors[i3] = c.r;
    starColors[i3 + 1] = c.g;
    starColors[i3 + 2] = c.b;
  }

  starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: isMobile ? 0.12 : 0.16,
    map: cosmicStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const starField = new THREE.Points(starGeom, starMat);
  scene.add(starField);

  // Layer 2: 220 Floating Mid-Range Stardust Particles
  const particleCount = isMobile ? 120 : 220;
  const particleGeom = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePos[i] = (Math.random() - 0.5) * 26;
    particlePos[i + 1] = (Math.random() - 0.5) * 22;
    particlePos[i + 2] = (Math.random() - 0.5) * 18;
  }
  particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xff3b20,
    size: isMobile ? 0.05 : 0.07,
    map: cosmicStarTex,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);

  // Layer 3: Near-Field Cosmic Sparks (Floating close to camera for deep 3D stereoscopic perspective)
  const sparkCount = isMobile ? 35 : 75;
  const sparkGeom = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount * 3; i += 3) {
    sparkPos[i] = (Math.random() - 0.5) * 12;
    sparkPos[i + 1] = (Math.random() - 0.5) * 10;
    sparkPos[i + 2] = 1.8 + Math.random() * 4.2;
  }
  sparkGeom.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0xff4828,
    size: isMobile ? 0.045 : 0.07,
    map: cosmicStarTex,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const closeSparks = new THREE.Points(sparkGeom, sparkMat);
  scene.add(closeSparks);

  // ─── Theme Mode 3D Metamorphosis Engine (Dark / Light Atmospheric Sync) ───
  const updateThreeTheme = (theme, animate = true) => {
    const isLight = theme === "light";
    const targetFogColor = new THREE.Color(isLight ? 0xe2e8f2 : 0x040509);
    const targetAmbient = new THREE.Color(isLight ? 0xeef2f8 : 0x181e32);
    const targetAmbientIntensity = isLight ? 2.8 : 1.3;
    const targetKeyLight = new THREE.Color(isLight ? 0xffffff : 0xfff8f0);
    const targetKeyIntensity = isLight ? 3.8 : 3.2;
    const targetCrimsonFill = new THREE.Color(isLight ? 0xdc143c : 0xff1828);
    const targetFillIntensity = isLight ? 3.0 : 2.6;
    const targetBackLight = new THREE.Color(isLight ? 0x94a3b8 : 0x3870ff);
    const targetBackIntensity = isLight ? 1.8 : 2.0;
    const targetShardColor = new THREE.Color(isLight ? 0xe2e8f0 : 0x121420);
    const targetShardEmissive = new THREE.Color(isLight ? 0xffe4e8 : 0x30050c);
    const targetPolyColor = new THREE.Color(isLight ? 0xe8ecf2 : 0x181822);
    const targetRing1Color = new THREE.Color(isLight ? 0x94a3b8 : 0x2b2d38);

    if (!animate) {
      if (scene.fog) scene.fog.color.copy(targetFogColor);
      ambientLight.color.copy(targetAmbient);
      ambientLight.intensity = targetAmbientIntensity;
      keyLight.color.copy(targetKeyLight);
      keyLight.intensity = targetKeyIntensity;
      crimsonFillLight.color.copy(targetCrimsonFill);
      crimsonFillLight.intensity = targetFillIntensity;
      crimsonBackLight.color.copy(targetBackLight);
      crimsonBackLight.intensity = targetBackIntensity;
      shardMat.color.copy(targetShardColor);
      shardMat.emissive.copy(targetShardEmissive);
      polyMat.color.copy(targetPolyColor);
      ring1Mat.color.copy(targetRing1Color);
      return;
    }

    if (scene.fog) {
      gsap.to(scene.fog.color, {
        r: targetFogColor.r,
        g: targetFogColor.g,
        b: targetFogColor.b,
        duration: 0.85,
        ease: "power2.inOut",
      });
    }

    gsap.to(ambientLight.color, {
      r: targetAmbient.r,
      g: targetAmbient.g,
      b: targetAmbient.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(ambientLight, {
      intensity: targetAmbientIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(keyLight.color, {
      r: targetKeyLight.r,
      g: targetKeyLight.g,
      b: targetKeyLight.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(keyLight, {
      intensity: targetKeyIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(crimsonFillLight.color, {
      r: targetCrimsonFill.r,
      g: targetCrimsonFill.g,
      b: targetCrimsonFill.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(crimsonFillLight, {
      intensity: targetFillIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(crimsonBackLight.color, {
      r: targetBackLight.r,
      g: targetBackLight.g,
      b: targetBackLight.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(crimsonBackLight, {
      intensity: targetBackIntensity,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(shardMat.color, {
      r: targetShardColor.r,
      g: targetShardColor.g,
      b: targetShardColor.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.to(shardMat.emissive, {
      r: targetShardEmissive.r,
      g: targetShardEmissive.g,
      b: targetShardEmissive.b,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(polyMat.color, {
      r: targetPolyColor.r,
      g: targetPolyColor.g,
      b: targetPolyColor.b,
      duration: 0.85,
      ease: "power2.inOut",
    });

    gsap.to(ring1Mat.color, {
      r: targetRing1Color.r,
      g: targetRing1Color.g,
      b: targetRing1Color.b,
      duration: 0.85,
      ease: "power2.inOut",
    });
  };

  window.updateThreeTheme = updateThreeTheme;
  // Apply active theme immediately to WebGL scene
  const initialTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("aga_portfolio_theme") || "dark";
  updateThreeTheme(initialTheme, false);

  // ═══════════════════════════════════════════════════════════
  // 4. DYNAMIC 3D CAMERA PATH & CINEMATIC TIMELINE (5 Seamless Phases)
  // ═══════════════════════════════════════════════════════════
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
    },
  });

  // ─── Phase 1: Section 1 (Start) -> Section 2 (About) [0 to 1] ───
  // Dutch-Angle Orbital Sweep to Left Flank (giving stage for skill matrix on the right)
  scrollTl
    .to(
      tesseractGroup.position,
      { x: isMobile ? 0 : -1.85, y: isMobile ? 1.5 : 0.2, z: isMobile ? -0.8 : 0.3, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 1.6, y: Math.PI * 2.4, z: Math.PI * 0.5, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.34 : 0.70, y: isMobile ? 0.34 : 0.70, z: isMobile ? 0.34 : 0.70, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      camera.position,
      { x: isMobile ? 0 : -1.0, y: isMobile ? 0.1 : 0.25, z: isMobile ? 6.2 : 5.8, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      cameraTarget,
      { x: isMobile ? 0 : -0.5, y: 0.1, z: 0, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? 1.2 : 2.6, y: 1.1, z: -0.6, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.2, y: -1.2, z: -0.8, ease: "power2.inOut", duration: 1 },
      0
    )
    .to(
      crimsonPointAccent.position,
      { x: -1.5, y: 2.5, z: 3.5, ease: "power2.inOut", duration: 1 },
      0
    );

  // ─── Phase 2: Section 2 (About) -> Section 3 (Activity) [1 to 2] ───
  // Sweeping Crane Arc over to the Right Flank (Centering Halo behind Contribution Matrix)
  scrollTl
    .to(
      tesseractGroup.position,
      { x: isMobile ? 0 : 2.0, y: isMobile ? 1.4 : -0.15, z: isMobile ? -0.8 : -0.4, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 2.6, y: Math.PI * 3.2, z: Math.PI * 0.8, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.30 : 0.68, y: isMobile ? 0.30 : 0.68, z: isMobile ? 0.30 : 0.68, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      camera.position,
      { x: isMobile ? 0 : 1.2, y: isMobile ? 0 : -0.2, z: isMobile ? 6.2 : 5.8, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      cameraTarget,
      { x: isMobile ? 0 : 0.35, y: 0, z: 0, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.2 : -2.6, y: 1.3, z: -0.9, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      gyroRingsGroup.position,
      { x: 0, y: 0.2, z: -1.8, ease: "power2.inOut", duration: 1 },
      1
    )
    .to(
      crimsonPointAccent.position,
      { x: 2.2, y: -0.5, z: 3.0, ease: "power2.inOut", duration: 1 },
      1
    );

  // ─── Phase 3: Section 3 (Activity) -> Section 4 (Projects) [2 to 3] ───
  // Cinematic Elevation & Prominent Stature above the Showcase Grid
  scrollTl
    .to(
      tesseractGroup.position,
      { x: 0, y: isMobile ? 2.4 : 2.2, z: isMobile ? -1.0 : -0.8, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 3.6, y: Math.PI * 4.2, z: Math.PI * 1.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.30 : 0.68, y: isMobile ? 0.30 : 0.68, z: isMobile ? 0.30 : 0.68, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      camera.position,
      { x: 0, y: isMobile ? 1.5 : 1.8, z: isMobile ? 6.4 : 6.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      cameraTarget,
      { x: 0, y: 1.0, z: 0, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? 1.2 : 3.0, y: 2.4, z: -1.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? -1.2 : -3.0, y: 2.4, z: -1.2, ease: "power2.inOut", duration: 1 },
      2
    )
    .to(
      crimsonPointAccent.position,
      { x: 0, y: 3.0, z: 2.5, ease: "power2.inOut", duration: 1 },
      2
    );

  // ─── Phase 4: Section 4 (Projects) -> Section 5 (Pricing) [3 to 4] ───
  // Subtle elevated ambient framing for pricing configurator cards
  scrollTl
    .to(
      tesseractGroup.position,
      { x: isMobile ? 0 : 2.2, y: isMobile ? 2.0 : 0.4, z: isMobile ? -1.6 : -0.6, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 4.4, y: Math.PI * 5.0, z: Math.PI * 1.5, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.28 : 0.65, y: isMobile ? 0.28 : 0.65, z: isMobile ? 0.28 : 0.65, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      camera.position,
      { x: isMobile ? 0 : 0.8, y: 0, z: isMobile ? 6.2 : 5.8, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      cameraTarget,
      { x: isMobile ? 0 : 0.2, y: 0, z: 0, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.0 : -2.6, y: 0.8, z: -1.0, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.6, y: -0.6, z: -1.0, ease: "power2.inOut", duration: 1 },
      3
    )
    .to(
      crimsonPointAccent.position,
      { x: 1.8, y: 0.5, z: 2.8, ease: "power2.inOut", duration: 1 },
      3
    );

  // ─── Phase 5: Section 5 (Pricing) -> Section 6 (Contact) [4 to 5] ───
  // Spatial Plunge & Low-Angle Dolly In (Core light framing the Contact Call to Action)
  scrollTl
    .to(
      tesseractGroup.position,
      { x: 0, y: isMobile ? 1.0 : -0.1, z: isMobile ? -0.4 : 0.4, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 5.4, y: Math.PI * 6.2, z: Math.PI * 1.9, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.36 : 0.76, y: isMobile ? 0.36 : 0.76, z: isMobile ? 0.36 : 0.76, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      camera.position,
      { x: 0, y: -0.2, z: isMobile ? 6.0 : 5.6, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      cameraTarget,
      { x: 0, y: -0.15, z: 0, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.0 : -2.5, y: -0.2, z: -0.3, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.5, y: -0.2, z: -0.3, ease: "power2.inOut", duration: 1 },
      4
    )
    .to(
      crimsonPointAccent.position,
      { x: 0, y: 0, z: 2.8, ease: "power2.inOut", duration: 1 },
      4
    );

  // ─── Phase 6: Section 6 (Contact) -> Section 7 (Footer/Colophon) [5 to 6] ───
  // Panoramic Elevation
  scrollTl
    .to(
      tesseractGroup.position,
      { x: 0, y: isMobile ? -1.4 : -2.0, z: isMobile ? -1.6 : -1.4, ease: "power2.inOut", duration: 1 },
      5
    )
    .to(
      tesseractGroup.rotation,
      { x: Math.PI * 6.6, y: Math.PI * 7.4, z: Math.PI * 2.4, ease: "power2.inOut", duration: 1 },
      5
    )
    .to(
      tesseractGroup.scale,
      { x: isMobile ? 0.26 : 0.64, y: isMobile ? 0.26 : 0.64, z: isMobile ? 0.26 : 0.64, ease: "power2.inOut", duration: 1 },
      5
    )
    .to(
      camera.position,
      { x: 0, y: isMobile ? -1.0 : -1.5, z: isMobile ? 7.2 : 7.2, ease: "power2.inOut", duration: 1 },
      5
    )
    .to(
      cameraTarget,
      { x: 0, y: -1.0, z: 0, ease: "power2.inOut", duration: 1 },
      5
    )
    .to(
      polyhedronGroup.position,
      { x: isMobile ? -1.0 : -2.8, y: -2.4, z: -1.4, ease: "power2.inOut", duration: 1 },
      5
    )
    .to(
      gyroRingsGroup.position,
      { x: isMobile ? 1.0 : 2.8, y: -2.4, z: -1.4, ease: "power2.inOut", duration: 1 },
      5
    );

  // ─── Dynamic 3D Scene View Mode Handler ───
  window.update3DSceneForView = (viewName) => {
    tesseractGroup.visible = true;
    polyhedronGroup.visible = true;
    gyroRingsGroup.visible = true;
    particles.visible = true;

    if (viewName === "project") {
      gsap.to(tesseractGroup.position, {
        x: isMobile ? 0 : 2.4,
        y: isMobile ? 2.2 : 1.4,
        z: isMobile ? -2.2 : -1.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(tesseractGroup.scale, {
        x: isMobile ? 0.25 : 0.62,
        y: isMobile ? 0.25 : 0.62,
        z: isMobile ? 0.25 : 0.62,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: isMobile ? 6.4 : 6.0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(cameraTarget, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(polyhedronGroup.position, {
        x: isMobile ? -1.4 : -2.8,
        y: 1.5,
        z: -2.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(gyroRingsGroup.position, {
        x: isMobile ? 1.4 : 2.8,
        y: -1.2,
        z: -2.4,
        duration: 0.8,
        ease: "power2.out",
      });
    } else if (viewName === "all-projects") {
      gsap.to(tesseractGroup.position, {
        x: 0,
        y: isMobile ? 2.6 : 2.8,
        z: isMobile ? -2.0 : -1.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(tesseractGroup.scale, {
        x: isMobile ? 0.25 : 0.60,
        y: isMobile ? 0.25 : 0.60,
        z: isMobile ? 0.25 : 0.60,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(camera.position, {
        x: 0,
        y: 1.2,
        z: isMobile ? 6.8 : 6.4,
        duration: 0.8,
        ease: "power2.out",
      });
    } else if (viewName === "portfolio") {
      ScrollTrigger.refresh();
    }
  };

  // ─── Scroll-Driven Rotational Inertia Handler ───
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity += deltaY * 0.00035;
    },
    { passive: true }
  );

  // ─── Mouse Parallax Interaction (Throttled & Lightweight) ───
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  // Window Resize Handler
  const onResize = () => {
    const isMob = window.innerWidth < 1024;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMob ? 1.5 : 1.75));
  };
  window.addEventListener("resize", onResize);

  // ─── Render Loop (Rock-Solid 60/120fps Zero-GC) ───
  let lastTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const time = now / 1000;

    // Update GLTF animation mixer
    if (mixer) {
      mixer.update(delta);
    }

    // Decay scroll rotational velocity (inertia)
    scrollVelocity *= 0.92;

    // Continuous floating idle rotation
    modelWrapper.rotation.y += 0.004;
    modelWrapper.rotation.x += 0.002;
    modelWrapper.rotation.z = mouseX * 0.08;

    // Gentle floating bobbing on inner model wrapper (Zero conflict with GSAP scroll timeline!)
    modelWrapper.position.y = Math.sin(time * 1.8) * 0.035;

    const rayRotationSpeed = 0.0018 + scrollVelocity;
    lightRaysGroup.rotation.z += rayRotationSpeed;
    lightRaysGroup.rotation.y += rayRotationSpeed * 0.65;
    lightRaysGroup.rotation.x = Math.sin(time * 0.5) * 0.15;
    orbitalRing.rotation.z -= rayRotationSpeed * 1.5;
    if (typeof orbitalRing2 !== "undefined") {
      orbitalRing2.rotation.z += rayRotationSpeed * 1.2;
      orbitalRing2.rotation.x += 0.003;
    }

    // Breathing pulse for light intensity
    const pulse = Math.sin(time * 3.0) * 0.5 + 0.5;
    redCoreLight.intensity = 2.5 + pulse * 2.5;
    rayMatFront.opacity = 0.65 + pulse * 0.2;
    rayMatCross.opacity = 0.45 + pulse * 0.15;

    // Polyhedral Crystal Floating on inner meshes
    polyMesh.rotation.y += 0.007 + scrollVelocity * 0.5;
    polyMesh.rotation.x += 0.005;
    wireMesh.rotation.y -= 0.004;
    polyMesh.position.y = Math.sin(time * 1.6) * 0.03;

    // Gyroscopic Rings Multi-Axis Rotations
    gyroRing1.rotation.x += 0.008 + scrollVelocity * 0.8;
    gyroRing2.rotation.y -= 0.012 + scrollVelocity * 0.6;
    gyroRing3.rotation.z += 0.018;
    coreDiamond.rotation.y += 0.015;
    gyroRing1.position.y = Math.cos(time * 1.4) * 0.03;

    // Smooth Camera LookAt Damping (Silky 60/120fps)
    currentCameraTarget.lerp(cameraTarget, 0.06);
    camera.lookAt(currentCameraTarget.x, currentCameraTarget.y, currentCameraTarget.z);

    // ─── Multi-Layer 3D Optical Parallax Depth Shifts ───
    if (typeof starField !== "undefined") {
      starField.rotation.y = time * 0.003 + scrollVelocity * 0.15;
      starField.rotation.x = time * 0.001;
      starField.position.x = mouseX * -0.4;
      starField.position.y = -mouseY * -0.3;
    }
    if (typeof particles !== "undefined") {
      particles.rotation.y = time * 0.015 + scrollVelocity * 0.3;
      particles.rotation.x = Math.sin(time * 0.4) * 0.02;
      particles.position.x = mouseX * 0.6;
      particles.position.y = -mouseY * 0.45;
    }
    if (typeof closeSparks !== "undefined") {
      closeSparks.rotation.y = -time * 0.025;
      closeSparks.position.x = mouseX * 1.4;
      closeSparks.position.y = -mouseY * 1.1;
    }
    if (typeof cosmicShardsGroup !== "undefined") {
      cosmicShardsGroup.position.x = mouseX * 0.35;
      cosmicShardsGroup.position.y = -mouseY * 0.25;
      cosmicShardsGroup.rotation.y = time * 0.006 + scrollVelocity * 0.2;
    }

    // Animate individual tumbling 3D cosmic asteroids / crystal shards
    if (cosmicShards && cosmicShards.length) {
      cosmicShards.forEach((shard) => {
        shard.rotation.x += shard.userData.rotSpeedX;
        shard.rotation.y += shard.userData.rotSpeedY;
        shard.rotation.z += shard.userData.rotSpeedZ;
        shard.position.y = shard.userData.initialY + Math.sin(time * shard.userData.bobSpeed + shard.userData.bobOffset) * 0.25;
      });
    }

    renderer.render(scene, camera);
  };
  animate();
}
