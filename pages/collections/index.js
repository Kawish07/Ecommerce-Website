import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CollectionsIndex() {
  const collections = [
    {
      title: 'New In',
      slug: 'new-in',
      image: 'https://images.pexels.com/photos/5325898/pexels-photo-5325898.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Discover the latest arrivals in our collection'
    },
    {
      title: 'Men',
      slug: 'men',
      image: 'https://images.pexels.com/photos/7629202/pexels-photo-7629202.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium athletic wear designed for men'
    },
    {
      title: 'Women',
      slug: 'women',
      image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-performance activewear for women'
    },
    {
      title: 'Accessories',
      slug: 'accessories',
      image: 'https://images.pexels.com/photos/845801/pexels-photo-845801.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete your workout with our accessories'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header forceSolid={true} />
      
      {/* Hero Section */}
      <div className="mt-24 bg-gradient-to-r from-black to-gray-800 text-white py-24">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-6">Our Collections</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Explore our curated collections of premium athletic wear. From cutting-edge performance gear to everyday essentials.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <main className="flex-1 max-w-[1600px] mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-[500px]">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-4xl font-bold mb-3">{collection.title}</h2>
                  <p className="text-lg opacity-90 mb-4">{collection.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-black px-6 py-3 rounded-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Shop Collection
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'T-Shirts', icon: 'fa-tshirt', link: '/collections/men/t-shirts' },
              { name: 'Hoodies', icon: 'fa-user-ninja', link: '/collections/men/hoodies-jackets' },
              { name: 'Leggings', icon: 'fa-running', link: '/collections/women/leggings' },
              { name: 'Sports Bras', icon: 'fa-heart', link: '/collections/women/sports-bras' },
              { name: 'Shorts', icon: 'fa-swimmer', link: '/collections/men/shorts' },
              { name: 'Jackets', icon: 'fa-wind', link: '/collections/women/jackets' },
              { name: 'Socks', icon: 'fa-socks', link: '/collections/accessories/all-socks' },
              { name: 'Bags', icon: 'fa-shopping-bag', link: '/collections/accessories/gym-bags' }
            ].map((cat) => (
              <Link 
                key={cat.name}
                href={cat.link}
                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-all text-center group"
              >
                <i className={`fas ${cat.icon} text-4xl text-gray-700 group-hover:text-black transition-colors mb-4`}></i>
                <h3 className="font-semibold text-gray-800 group-hover:text-black">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600, // ISR: Revalidate every hour (3600 seconds)
  };
}
