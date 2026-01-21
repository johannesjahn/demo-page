import { useState, useRef } from 'react';
import { ArrowLeft, Activity, Cpu, Wifi, Database } from 'lucide-react';

interface WidgetViewProps {
    onBack: () => void;
}

export function WidgetView({ onBack }: WidgetViewProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [activeSegment, setActiveSegment] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setRotation({ x: y * 15, y: -x * 15 });
    };

    return (
        <div
            className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in duration-2000"
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            >
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="text-sm font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                    Return to Base
                </span>
            </button>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            {/* Main Interactive Widget: The "Core" */}
            <div className="relative perspective-1000">
                <div
                    className="relative w-96 h-96 transition-transform duration-100 ease-out preserve-3d"
                    style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
                >
                    {/* Central Sphere */}
                    <div className="absolute inset-0 m-auto w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                    <div className="absolute inset-0 m-auto w-24 h-24 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center justify-center border border-cyan-300/30">
                        <Activity className="w-10 h-10 text-white animate-spin-slow" />
                    </div>

                    {/* Orbital Rings */}
                    {[1, 2, 3].map((ring, i) => (
                        <div
                            key={ring}
                            className="absolute inset-0 m-auto rounded-full border border-cyan-500/30 border-dashed"
                            style={{
                                width: `${180 + ring * 60}px`,
                                height: `${180 + ring * 60}px`,
                                transform: `rotateX(${ring * 45}deg) rotateY(${ring * 30}deg) rotateZ(${rotation.y * (i + 1)}deg)`,
                                animation: `spin ${10 + i * 5}s linear infinite reverse`
                            }}
                        />
                    ))}

                    {/* Floating Satellites (Interactive) */}
                    {[
                        { Icon: Cpu, label: "Processing", x: -120, y: -80, color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/50" },
                        { Icon: Wifi, label: "Uplink", x: 120, y: -80, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/50" },
                        { Icon: Database, label: "Storage", x: 0, y: 140, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/50" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`absolute w-32 p-3 rounded-xl backdrop-blur-md border ${item.border} ${item.bg} flex items-center gap-3 transform transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg`}
                            style={{
                                top: '50%',
                                left: '50%',
                                marginBottom: '-100px', // adjustment
                                transform: `translate(${item.x}px, ${item.y}px) translateZ(50px) rotateX(${-rotation.x}deg) rotateY(${-rotation.y}deg)`, // Billboard effect to face camera
                            }}
                            onMouseEnter={() => setActiveSegment(i)}
                            onMouseLeave={() => setActiveSegment(null)}
                        >
                            <div className={`p-2 rounded-lg bg-black/50 ${item.color}`}>
                                <item.Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`text-xs font-bold uppercase ${item.color}`}>{item.label}</div>
                                <div className="text-[10px] text-white/70">
                                    {activeSegment === i ? "Active" : "Standby"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Widget HUD Overlay */}
            <div className="absolute bottom-12 inset-x-0 flex justify-center gap-8 text-xs font-mono text-cyan-500/60 uppercase tracking-widest pointer-events-none">
                <div>SYS.ROT.X: {rotation.x.toFixed(2)}</div>
                <div className="h-4 w-px bg-cyan-900" />
                <div>SYS.ROT.Y: {rotation.y.toFixed(2)}</div>
                <div className="h-4 w-px bg-cyan-900" />
                <div>STATUS: ONLINE</div>
            </div>
        </div>
    );
}
