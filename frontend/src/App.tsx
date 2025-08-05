import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import logo from './assets/clonelogo.png.jpg.png';

const accentGold = 'text-[#C9B037]';
const accentGoldBg = 'bg-[#C9B037]';

function getLogo() {
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env.VITEST) return '';
  // Use static import for runtime
  return logo;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-black flex flex-col">
        <Header />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="w-full bg-black border-b border-zinc-800 flex items-center justify-between px-4 md:px-12 py-3 sticky top-0 z-20">
      <Link to="/" className="flex items-center gap-2">
        <img src={getLogo()} alt="Clo'ne Logo" className="w-10 h-10 object-contain" />
        <span className="text-white text-xl font-bold tracking-widest">Clo'ne</span>
      </Link>
      <nav className="flex-1 flex justify-center gap-6">
        <NavLink to="/" className={({isActive}) => isActive ? `text-white font-semibold ${accentGold}` : 'text-white font-semibold hover:text-[#C9B037] transition'}>Home</NavLink>
        <NavLink to="/shop" className={({isActive}) => isActive ? `text-white font-semibold ${accentGold}` : 'text-white font-semibold hover:text-[#C9B037] transition'}>Shop</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? `text-white font-semibold ${accentGold}` : 'text-white font-semibold hover:text-[#C9B037] transition'}>About</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? `text-white font-semibold ${accentGold}` : 'text-white font-semibold hover:text-[#C9B037] transition'}>Contact</NavLink>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-white border border-[#C9B037] px-4 py-1 rounded hover:bg-[#C9B037] hover:text-black transition font-semibold">Sign in</button>
      </div>
    </header>
  );
}

function Home() {
  return (
    <div className="w-full flex flex-col items-center bg-black">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-20 bg-black">
        <img src={getLogo()} alt="Clo'ne Logo" className="w-24 h-24 md:w-32 md:h-32 mb-6" />
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-widest mb-2">Clo'ne</h1>
        <p className={`text-lg md:text-xl font-medium mb-4 ${accentGold}`}>experiencetheart</p>
        <p className="text-zinc-200 max-w-xl text-center mb-6">Discover the new era of luxury fashion. Clo'ne blends timeless elegance with modern artistry. Shop our exclusive collections and experience the heart of style.</p>
        <Link to="/shop" className={`px-8 py-3 rounded-full font-bold text-black ${accentGoldBg} hover:bg-white hover:text-[#C9B037] transition text-lg shadow-lg`}>Shop Now</Link>
      </section>
      {/* Featured Collections */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4">
        <h2 className={`text-2xl md:text-3xl font-bold text-white mb-8 text-center ${accentGold}`}>Featured Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <CollectionCard title="Women" img="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=thumb&w=400&q=80" />
          <CollectionCard title="Men" img="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=thumb&w=400&q=80" />
          <CollectionCard title="Accessories" img="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=thumb&w=400&q=80" />
          <CollectionCard title="New Arrivals" img="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=thumb&w=400&q=80" />
        </div>
      </section>
      {/* About Preview */}
      <section className="w-full max-w-4xl mx-auto py-12 px-4 text-center">
        <h3 className={`text-xl md:text-2xl font-bold mb-4 ${accentGold}`}>About Clo'ne</h3>
        <p className="text-zinc-200 text-lg mb-2">Clo'ne is more than a brand—it's an experience. Our collections are crafted for those who value authenticity, creativity, and the art of fashion. Join us and experiencetheart.</p>
        <Link to="/about" className="inline-block mt-4 text-[#C9B037] font-semibold underline hover:text-white transition">Learn more</Link>
      </section>
    </div>
  );
}

function CollectionCard({ title, img }: { title: string, img: string }) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer group">
      <img src={img} alt={title} className="w-full h-48 object-cover group-hover:opacity-80 transition" />
      <div className="p-4 flex flex-col items-center">
        <span className="text-white text-lg font-semibold mb-1">{title}</span>
        <button className={`mt-2 px-4 py-1 rounded-full text-black ${accentGoldBg} font-bold text-sm hover:bg-white hover:text-[#C9B037] transition`}>Explore</button>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-black text-white py-16">
      <h2 className={`text-3xl font-bold mb-4 ${accentGold}`}>Shop Clo'ne</h2>
      <p className="text-lg text-zinc-200 mb-8">Browse our exclusive collections and discover your next statement piece.</p>
      <div className="text-zinc-400">(Product grid coming soon...)</div>
    </div>
  );
}

function About() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-black text-white py-16 px-4">
      <h2 className={`text-3xl font-bold mb-4 ${accentGold}`}>About Clo'ne</h2>
      <p className="text-lg text-zinc-200 max-w-2xl text-center mb-4">Clo'ne is a luxury fashion house redefining modern elegance. Our philosophy is rooted in creativity, quality, and the belief that fashion is a form of art. Every piece is designed to inspire confidence and celebrate individuality.</p>
      <p className="text-base text-zinc-400 max-w-xl text-center">Slogan: <span className="text-white font-semibold">experiencetheart</span></p>
    </div>
  );
}

function Contact() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-black text-white py-16 px-4">
      <h2 className={`text-3xl font-bold mb-4 ${accentGold}`}>Contact Clo'ne</h2>
      <p className="text-lg text-zinc-200 mb-6">We'd love to hear from you. Reach out for collaborations, support, or just to say hello.</p>
      <form className="w-full max-w-md flex flex-col gap-4">
        <input className="px-4 py-2 rounded bg-zinc-800 text-white placeholder-zinc-400" placeholder="Your Name" />
        <input className="px-4 py-2 rounded bg-zinc-800 text-white placeholder-zinc-400" placeholder="Your Email" type="email" />
        <textarea className="px-4 py-2 rounded bg-zinc-800 text-white placeholder-zinc-400" placeholder="Your Message" rows={4} />
        <button className={`mt-2 px-4 py-2 rounded-full text-black ${accentGoldBg} font-bold text-lg hover:bg-white hover:text-[#C9B037] transition`}>Send</button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-black border-t border-zinc-800 py-6 flex flex-col items-center mt-8">
      <div className="text-zinc-400 text-sm mb-2">&copy; {new Date().getFullYear()} Clo'ne. All rights reserved.</div>
      <div className="text-white text-xs tracking-widest font-semibold">experiencetheart</div>
    </footer>
  );
}

export default App;
