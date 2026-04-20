export function ScoreBox({ title, score, color, desc }: any) {
    return (
        <div className="p-6 rounded-[24px] bg-white/5 border border-white/5 text-center">
            <div className={`text-4xl font-black mb-1 ${color}`}>{score}/10</div>
            <div className="text-[10px] font-black text-white/40 tracking-widest mb-2">{title}</div>
            <p className="text-[9px] text-gray-600 px-2 leading-tight">{desc}</p>
        </div>
    );
}
