'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import {
  Mail,
  Lock,
  ShieldCheck,
  Building2,
  KeyRound,
  Fingerprint
} from 'lucide-react';
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';


// --- THREE.JS IMPORTS ---
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMainContext } from '@/context/MainContext';
import { useRouter } from 'next/navigation';

// ==========================================
// 3D COMPONENTS FOR BACKGROUND ANIMATION
// ==========================================

// 1. Financial Growth Bars (Animated 3D Graph)
const FinancialGraph = () => {
  const groupRef = useRef();

  // Create 7 bars for the graph
  const bars = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => ({
      x: i * 1.2 - 3.6, // Center the graph
      targetHeight: Math.random() * 3 + 1, // Random height between 1 and 4
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    groupRef.current.children.forEach((mesh, i) => {
      // Animate the scale to simulate live fluctuating financial data
      const dynamicHeight = bars[i].targetHeight + Math.sin(time * bars[i].speed * 100) * 0.5;
      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, Math.max(0.1, dynamicHeight), 0.1);
      // Keep the base of the bars grounded
      mesh.position.y = mesh.scale.y / 2 - 2.5; 
    });
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0.4, 0]}>
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial color={i === 6 ? "#06b6d4" : "#1e3a8a"} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

// 2. Digital Money / Data Drops (Falling Particles)
const MoneyParticles = () => {
  const pointsRef = useRef();
  
  const particleCount = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;     // x
      pos[i * 3 + 1] = Math.random() * 10 + 5;     // y (start high)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return pos;
  }, [particleCount]);

  useFrame(() => {
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      // Drop the particles downwards
      positionsArray[i * 3 + 1] -= 0.05;
      
      // Reset position to top if they fall below the screen
      if (positionsArray[i * 3 + 1] < -5) {
        positionsArray[i * 3 + 1] = 10;
        positionsArray[i * 3] = (Math.random() - 0.5) * 15;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color="#22d3ee" // Cyan color matching the theme
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ==========================================
// MAIN LOGIN PAGE COMPONENT
// ==========================================

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const {fetchUserProfile} = useMainContext()
  const router = useRouter()
  const [states, setStates] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

 const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!states.email || !states.password) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    setLoading(true);

    const response = await axiosClient.post('/auth/login', {
      email: states.email.trim().toLowerCase(),
      password: states.password.trim(),
    });

    const data = response.data;

    toast.success(data.msg || "Logged in successfully!");

    // ✅ FIXED LINE
    localStorage.setItem("token", data.token);
    console.log(response.data);

     await fetchUserProfile();

     router.push("/")

  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    toast.error(error?.response?.data?.msg || error?.message);

  } finally {
    setLoading(false);
  }
};
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 sm:p-6 antialiased">
      <div className="w-full max-w-6xl grid lg:grid-cols-12 overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_0_80px_rgba(6,182,212,0.1)] bg-slate-900/20 backdrop-blur-md">
        
        {/* LEFT SIDE - BRANDING, SECURITY & 3D ANIMATION */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between overflow-hidden border-r border-white/5 bg-slate-950">
          
          {/* THREE.JS CANVAS (Background Layer) */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <pointLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
              <FinancialGraph />
              <MoneyParticles />
            </Canvas>
          </div>

          {/* Overlay Gradient to blend 3D with text */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-950/60 via-slate-950/40 to-slate-950/90 pointer-events-none"></div>

          {/* Left Side Content (Z-10 so it sits above the 3D canvas) */}
          <div className="relative z-10 flex flex-col h-full justify-between px-12 py-14">
            
            {/* Top Brand Logo Section */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 flex items-center justify-center border border-cyan-500/30 shadow-inner backdrop-blur-md">
                <Building2 size={24} className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                  Pak Banking
                </h2>
                <p className="text-cyan-400/90 text-xs font-semibold uppercase tracking-wider">
                  Secure Digital Banking
                </p>
              </div>
            </div>

            {/* Center Main Heading */}
            <div className="my-auto py-12">
              <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.15] mb-6 tracking-tight drop-shadow-lg">
                Welcome Back to
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Your Secure Portal
                </span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed max-w-sm drop-shadow-md font-medium">
                Sign in to manage your balances, monitor live transactions, and execute encrypted lightning-fast payments safely.
              </p>
            </div>

            {/* Bottom Trust Indicators */}
            <div className="space-y-5 border-t border-white/10 pt-8">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors group-hover:border-cyan-500/50">
                  <ShieldCheck size={20} className="text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold tracking-wide drop-shadow-md">Multi-Factor Guard</h3>
                  <p className="text-slate-300 text-xs font-medium">State-of-the-art security layers</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors group-hover:border-cyan-500/50">
                  <KeyRound size={20} className="text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold tracking-wide drop-shadow-md">Live Sync Trading</h3>
                  <p className="text-slate-300 text-xs font-medium">Real-time dynamic market data</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors group-hover:border-cyan-500/50">
                  <Fingerprint size={20} className="text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold tracking-wide drop-shadow-md">Biometric Integration</h3>
                  <p className="text-slate-300 text-xs font-medium">Maximum mobile-first protection</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="lg:col-span-7 bg-slate-950/50 backdrop-blur-2xl p-8 sm:p-12 xl:p-16 flex flex-col justify-center relative border-l border-white/5">
          {/* Subtle Mobile Only ambient orb */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 blur-[120px] rounded-full lg:hidden pointer-events-none"></div>
          
          <form onSubmit={onSubmitHandler} className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Account Login
              </h2>
              <p className="text-slate-400 mt-2.5 text-sm sm:text-base">
                Securely sign into your digital dashboard
              </p>
            </div>

            <div className="space-y-5">
              {/* Email Input Field */}
              <div>
                <div className="relative group">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={states.email}
                    onChange={onChangeHandler}
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400/80 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/40"
                    required
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div>
                <div className="relative group">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-400"
                  />
                  <input
                    type="password"
                    name="password"
                    value={states.password}
                    onChange={onChangeHandler}
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400/80 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/40"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">
                Forgot Password?
              </div>

              {/* Submit Action Button Wrapper */}
              <div className="pt-2">
                <CustomAuthButton
                  isLoading={loading}
                  text={"Secure Login"}
                  type="submit"
                />
              </div>

              {/* Navigation Link to Register */}
              <div className="text-center text-sm text-slate-400 pt-2">
                Don't have an account?{" "}
                <Link 
                  href="/register" 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold tracking-wide transition-colors duration-200 underline-offset-4 hover:underline ml-1"
                >
                  Register Now
                </Link>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;