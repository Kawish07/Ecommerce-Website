import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const accentGradients = [
  'linear-gradient(135deg, #f97316 0%, #f43f5e 45%, #8b5cf6 100%)',
  'linear-gradient(135deg, #22d3ee 0%, #3b82f6 45%, #6366f1 100%)',
  'linear-gradient(135deg, #a3e635 0%, #22c55e 45%, #10b981 100%)',
  'linear-gradient(135deg, #facc15 0%, #fb923c 50%, #f43f5e 100%)',
];

export default function CollectionsIndex() {
  const collections = [
    {
      title: 'New In',
      slug: 'new-in',
      image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Statement pieces freshly dropped. Layered tech fabrics built for city heat.'
    },
    {
      title: 'Men',
      slug: 'men',
      image: 'https://images.pexels.com/photos/7629202/pexels-photo-7629202.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Athletic cuts, breathable mesh, and sharp tailoring for every session.'
    },
    {
      title: 'Women',
      slug: 'women',
      image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Power silhouettes with sculpt support and seamless comfort for motion.'
    },
    {
      title: 'Accessories',
      slug: 'accessories',
      image: 'https://images.pexels.com/photos/845801/pexels-photo-845801.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Utility-first add-ons: modular bags, sweatproof socks, and smart layers.'
    }
  ];

  const categories = [
    { name: 'T-Shirts', icon: 'fa-tshirt', link: '/collections/men/t-shirts' },
    { name: 'Hoodies', icon: 'fa-user-ninja', link: '/collections/men/hoodies-jackets' },
    { name: 'Leggings', icon: 'fa-running', link: '/collections/women/leggings' },
    { name: 'Sports Bras', icon: 'fa-heart', link: '/collections/women/sports-bras' },
    { name: 'Shorts', icon: 'fa-swimmer', link: '/collections/men/shorts' },
    { name: 'Jackets', icon: 'fa-wind', link: '/collections/women/jackets' },
    { name: 'Socks', icon: 'fa-socks', link: '/collections/accessories/all-socks' },
    { name: 'Bags', icon: 'fa-shopping-bag', link: '/collections/accessories/gym-bags' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(94,234,212,0.14),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.15),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(79,70,229,0.16),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.04)_100%)]" />

      <Header forceSolid={true} />

      {/* Hero Section */}
      <section className="relative z-10 mt-24 px-4 lg:px-8">
        <div className="max-w-[1600px] mx-auto rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 p-10 lg:p-14">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 rounded-full border border-white/10 bg-white/5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                2026 Collections
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Drop the ordinary. <span className="text-white/60">Dial up the heat.</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                Built for loud days and late nights. Breathable tech, sculpted silhouettes, and striking color play that hits every rep and every room.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/collections/new-in" className="px-5 py-3 rounded-full text-sm font-semibold bg-white text-black shadow-[0_18px_60px_-24px_rgba(255,255,255,0.45)] hover:-translate-y-0.5 transition-all duration-200">
                  Shop New Arrivals
                </Link>
                <Link href="/collections/women" className="px-5 py-3 rounded-full text-sm font-semibold border border-white/15 text-white/90 hover:text-white hover:border-white/35 transition-all duration-200">
                  View Women Edge
                </Link>
                <Link href="/collections/men" className="px-5 py-3 rounded-full text-sm font-semibold border border-white/15 text-white/90 hover:text-white hover:border-white/35 transition-all duration-200">
                  View Men Edge
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2"><span className="h-1.5 w-4 rounded-full bg-lime-400" /> Hyper-cool mesh & cloud fleece</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-4 rounded-full bg-sky-400" /> Free express shipping over Rs 1999</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-4 rounded-full bg-rose-400" /> 30-day easy returns</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.18),transparent_40%)] blur-3xl" />
              <div className="relative rounded-[22px] border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_25px_120px_-45px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_35%)] opacity-80" />
                <img
                  src="https://images.pexels.com/photos/6341460/pexels-photo-6341460.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Lookbook preview"
                  className="w-full h-full object-cover max-h-[520px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/60">Lookbook</p>
                      <p className="text-lg font-semibold">Monochrome Heat / SS26</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black">Swipe →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <main className="relative z-10 flex-1 max-w-[1600px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/60">Signature drops</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Collections with punchy color and motion</h2>
          </div>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-all duration-200">
            View All Products <i className="fas fa-arrow-right" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, idx) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="collection-card group"
              style={{ '--accent': accentGradients[idx % accentGradients.length] }}
            >
              <div className="card-inner">
                <div className="relative overflow-hidden rounded-[18px] bg-white/[0.03] ring-1 ring-white/5">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="collection-image"
                  />
                  <div className="image-sheen" />
                  <div className="image-noise" />

                  <div className="absolute top-4 left-4 flex gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                    <span className="pill">Fresh heat</span>
                    <span className="pill pill-muted">Motion ready</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h2 className="text-3xl font-bold mb-2 drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]">{collection.title}</h2>
                    <p className="text-base text-gray-200/90 mb-4 max-w-xl">{collection.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-white text-black shadow-[0_18px_60px_-32px_rgba(255,255,255,0.7)] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      Shop collection
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="status-dot" />
                    <span>Next-day dispatch</span>
                  </div>
                  <span className="font-semibold text-white/80 group-hover:text-white transition-colors">View lookbook →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16 rounded-[20px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">Quick picks</p>
              <h3 className="text-2xl font-bold">Dial straight into what you need</h3>
            </div>
            <span className="text-sm text-white/70">Hover for the glow — every tile is clickable.</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={cat.name}
                href={cat.link}
                className="category-tile group"
                style={{ '--accent': accentGradients[idx % accentGradients.length] }}
              >
                <div className="category-icon">
                  <i className={`fas ${cat.icon}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white mb-1">{cat.name}</p>
                  <span className="text-xs text-gray-400 group-hover:text-white/80 transition-colors">See lineup</span>
                </div>
                <div className="category-glow" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .collection-card {
          position: relative;
          border-radius: 22px;
          background: #0b0b10;
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
          transition: transform 0.5s ease, box-shadow 0.45s ease, border-color 0.35s ease;
          isolation: isolate;
        }
        .collection-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: var(--accent, linear-gradient(135deg, #22d3ee, #6366f1));
          opacity: 0;
          filter: blur(26px);
          transition: opacity 0.45s ease;
          z-index: 0;
        }
        .collection-card:hover {
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 28px 120px -60px rgba(0, 0, 0, 0.9), 0 28px 68px -64px rgba(59, 130, 246, 0.45);
          border-color: rgba(255, 255, 255, 0.12);
        }
        .collection-card:hover::before {
          opacity: 0.8;
        }
        .card-inner { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; }
        .collection-image {
          width: 100%;
          height: 420px;
          object-fit: cover;
          transition: transform 0.8s ease, filter 0.6s ease;
          filter: saturate(1.08);
        }
        .collection-card:hover .collection-image {
          transform: scale(1.07) rotate(-0.4deg);
          filter: saturate(1.2);
        }
        .image-sheen {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2), transparent 30%),
                      radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.16), transparent 32%),
                      linear-gradient(120deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
          mix-blend-mode: screen;
          opacity: 0.7;
          transition: opacity 0.4s ease;
        }
        .collection-card:hover .image-sheen { opacity: 1; }
        .image-noise {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0)),
                            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 3px);
          opacity: 0.35;
          pointer-events: none;
        }
        .pill {
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          letter-spacing: 0.14em;
        }
        .pill-muted { background: rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.8); }
        .status-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: linear-gradient(135deg, #34d399, #10b981);
          box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.12);
        }
        .category-tile {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 14px;
          border-radius: 14px;
          background: #0c0c12;
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
          transition: transform 0.28s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .category-tile::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: var(--accent, linear-gradient(135deg, #22d3ee, #6366f1));
          opacity: 0;
          filter: blur(16px);
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        .category-tile:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 60px -40px rgba(0, 0, 0, 0.9);
        }
        .category-tile:hover::before { opacity: 0.7; }
        .category-icon {
          position: relative;
          z-index: 1;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: white;
        }
        .category-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08), transparent 32%);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        .category-tile:hover .category-glow { opacity: 1; }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  };
}
