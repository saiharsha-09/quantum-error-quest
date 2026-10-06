import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import "./App.css";

function OrbitalWorld() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.12;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial
          color="#0b0b0f"
          metalness={0.95}
          roughness={0.16}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.56, 64, 64]} />
        <meshBasicMaterial
          color="#8c2443"
          transparent
          opacity={0.045}
        />
      </mesh>

      {/* Main orbital rings */}
      {[1.9, 2.25, 2.6, 2.95].map((radius, i) => (
        <mesh
          key={i}
          rotation={[
            Math.PI / 2 + i * 0.28,
            i * 0.55,
            i * 0.2,
          ]}
        >
          <torusGeometry
            args={[
              radius,
              i === 1 ? 0.018 : 0.009,
              16,
              220,
            ]}
          />

          <meshBasicMaterial
            color={i === 1 ? "#8c2443" : "#ffffff"}
            transparent
            opacity={i === 1 ? 0.7 : 0.2}
          />
        </mesh>
      ))}

      {/* Orbital particles */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 2.05 + (i % 4) * 0.28;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2.7) * 0.55,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry
              args={[
                i % 5 === 0 ? 0.055 : 0.025,
                12,
                12,
              ]}
            />

            <meshBasicMaterial
              color={i % 5 === 0 ? "#8c2443" : "#ffffff"}
              transparent
              opacity={i % 5 === 0 ? 0.9 : 0.45}
            />
          </mesh>
        );
      })}

      {/* Large orbital nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;

        return (
          <mesh
            key={`node-${i}`}
            position={[
              Math.cos(angle) * 2.35,
              Math.sin(angle * 1.7) * 0.55,
              Math.sin(angle) * 2.35,
            ]}
          >
            <sphereGeometry args={[0.06, 20, 20]} />
            <meshBasicMaterial color="#8c2443" />
          </mesh>
        );
      })}
    </group>
  );
}

function App() {
  return (
    <div className="app">
      <Canvas
        className="worldCanvas"
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <pointLight
          position={[-4, 2, 4]}
          intensity={4}
          color="#8c2443"
        />

        <pointLight
          position={[4, -2, -3]}
          intensity={2}
          color="#ffffff"
        />

        <OrbitalWorld />

        <Environment preset="studio" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>

      <nav className="navbar">
        <div className="logo">VIZORA AI</div>

        <div className="navLinks">
          <a href="#explore">Explore</a>
          <a href="#features">Capabilities</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="heroEyebrow">
            AI POWERED ENGINEERING
          </div>

          <h1>
            See how <span>anything</span> is built.
          </h1>

          <p className="heroSubtitle">
            Explore machines, mechanisms and complex systems
            through interactive AI-powered 3D visualization.
          </p>

          <div className="searchBox">
            <input
              type="text"
              placeholder="What do you want to see built?"
            />

            <button className="searchButton">
              Visualize
            </button>
          </div>

          <div className="suggestions">
            <button className="suggestion">Car Engine</button>
            <button className="suggestion">Electric Motor</button>
            <button className="suggestion">Drone</button>
            <button className="suggestion">Gearbox</button>
          </div>
        </section>

        <section id="explore" className="orbitalSection">
          <div className="floatingLabel labelOne">
            COMPONENT ANALYSIS
          </div>

          <div className="floatingLabel labelTwo">
            AI MECHANISM
          </div>

          <div className="floatingLabel labelThree">
            3D ASSEMBLY
          </div>

          <div className="orbitalText">
            <div className="eyebrow">
              FROM CONCEPT TO MECHANISM
            </div>

            <h2>
              Understand <span>how it works.</span>
            </h2>
          </div>
        </section>

        <section id="features" className="features">
          <div className="featureCard">
            <div className="featureNumber">01</div>
            <h3>Explore</h3>
            <p>
              Inspect complex machines through interactive
              three-dimensional visualization.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureNumber">02</div>
            <h3>Disassemble</h3>
            <p>
              Break systems into individual components and
              understand how every part connects.
            </p>
          </div>

          <div className="featureCard">
            <div className="featureNumber">03</div>
            <h3>Understand</h3>
            <p>
              AI explains mechanisms, component relationships
              and the principles behind how things work.
            </p>
          </div>
        </section>
      </main>

      <footer id="about" className="footer">
        <strong>VIZORA AI</strong>
        <span>SEE HOW ANYTHING IS BUILT</span>
      </footer>
    </div>
  );
}

export default App;