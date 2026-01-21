import { useState, useRef, useEffect } from 'react';
import { Zap, Globe, Shield } from 'lucide-react';

export function LandingView() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [title, setTitle] = useState('ANTIGRAVITY');
    const [description, setDescription] = useState('Redefining the digital frontier with immersive experiences.');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/data/file.json')
            .then(res => res.json())
            .then(data => {
                if (data.title) {
                    setTitle(data.title);
                }
                if (data.description) {
                    setDescription(data.description);
                }
            })
            .catch(err => console.error('Failed to load title:', err));

    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-cyan-500/30 font-sans">
            {/* Dynamic Background Gradient */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none transition-transform duration-75 ease-out"
                style={{
                    background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, #7c3aed, #000000 60%)`
                }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

            <main
                className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 perspective-1000"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                ref={containerRef}
            >
                <div
                    className="relative group cursor-pointer transition-transform duration-200 ease-out"
                    style={{
                        transform: `
              rotateX(${mousePos.y * -20}deg) 
              rotateY(${mousePos.x * 20}deg)
              scale(${isClicked ? 0.95 : 1})
            `
                    }}
                    onClick={handleClick}
                >
                    {/* Glowing Aura */}
                    <div className="absolute -inset-10 bg-linear-to-r from-cyan-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-500 animate-pulse" />

                    {/* Logo Container */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <img
                            src="/vite.svg"
                            alt="Antigravity Corp"
                            className={`w-40 h-40 md:w-48 md:h-48 object-contain transition-all duration-500 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)] ${isClicked ? 'scale-110 brightness-150' : 'group-hover:scale-105'}`}
                        />
                    </div>

                    {/* Floating Action Text */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-sm font-medium tracking-widest text-cyan-400 uppercase">Click to Initialize</span>
                    </div>
                </div>

                {/* Company Title */}
                <div className="mt-16 text-center space-y-4 relative">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 tracking-tighter">
                        {title}
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-xl tracking-wide max-w-lg mx-auto">
                        {description}
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
                    {[
                        { icon: Zap, title: "Lightning Fast", desc: "Optimized for extreme performance" },
                        { icon: Globe, title: "Global Scale", desc: "Deployed to the edge worldwide" },
                        { icon: Shield, title: "Secure Core", desc: "Enterprise-grade protection built-in" }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group/card">
                            <feature.icon className="w-8 h-8 text-cyan-500 mb-4 group-hover/card:scale-110 transition-transform" />
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-zinc-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
