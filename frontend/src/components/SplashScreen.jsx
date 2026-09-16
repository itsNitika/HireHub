function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-3 w-3 rounded-full bg-white animate-ping" />
        <div className="absolute right-20 top-24 h-2 w-2 rounded-full bg-white animate-ping [animation-delay:0.5s]" />
        <div className="absolute bottom-20 left-20 h-4 w-4 rounded-full bg-white animate-ping [animation-delay:1s]" />
        <div className="absolute bottom-32 right-28 h-3 w-3 rounded-full bg-white animate-ping [animation-delay:1.3s]" />
      </div>

      <div className="relative text-center px-6">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/15 shadow-2xl backdrop-blur-md animate-bounce">
          <span className="text-7xl drop-shadow-lg">🚀</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white animate-pulse">
          HireHub
        </h1>

        <p className="mt-4 text-sm md:text-base uppercase tracking-[0.45em] text-white/80">
          Placement Portal
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;