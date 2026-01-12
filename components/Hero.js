export default function Hero({ title, subtitle }) {
  const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO || '/hero.mp4';
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 hero-overlay flex items-center">
        <div className="max-w-6xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold">{title || 'Welcome'}</h1>
          <p className="mt-4 text-lg md:text-2xl">{subtitle || 'Shop the best activewear'}</p>
        </div>
      </div>
    </section>
  );
}
