import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SafeIcon from './components/SafeIcon';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// SafeIcon wrapper component inline
const Icon = ({ name, size = 24, className = '' }) => {
  return <SafeIcon name={name} size={size} className={className} />;
};

// Navigation Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'News', href: '#news' },
    { name: 'Tournaments', href: '#tournaments' },
    { name: 'Teams', href: '#teams' },
    { name: 'Players', href: '#players' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-orange-500/20' : 'bg-transparent'}`}>
      <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <Icon name="crosshair" className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              CS<span className="text-orange-500">:</span>GO
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-orange-500 font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold px-6 py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2">
              <Icon name="play" className="w-4 h-4" />
              Watch Live
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "x" : "menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block py-3 text-gray-300 hover:text-orange-500 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                <Icon name="play" className="w-4 h-4" />
                Watch Live
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80" 
          alt="CS:GO Gaming" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Major Championship Live</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
            COUNTER<span className="csgo-text-gradient">STRIKE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-4 font-medium">
            Global Offensive
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            The world's premier competitive first-person shooter. Join millions of players in the ultimate test of skill, strategy, and teamwork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/25"
            >
              <Icon name="trophy" className="w-5 h-5" />
              View Tournaments
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3"
            >
              <Icon name="users" className="w-5 h-5" />
              Explore Teams
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: '35M+', label: 'Monthly Players' },
              { value: '$100M+', label: 'Prize Pools' },
              { value: '500+', label: 'Pro Teams' },
              { value: '100+', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500"
      >
        <Icon name="chevron-down" className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

// Latest News Section
const LatestNews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const news = [
    {
      id: 1,
      title: "PGL Major Copenhagen 2024: Complete Guide",
      excerpt: "Everything you need to know about the first CS2 Major, including schedule, teams, and prize pool distribution.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      category: "Major",
      date: "2 hours ago",
      icon: "trophy"
    },
    {
      id: 2,
      title: "s1mple Returns: NAVI's New Roster Revealed",
      excerpt: "The Ukrainian superstar is back in action as Natus Vincere announces their updated lineup for the upcoming season.",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
      category: "Roster",
      date: "5 hours ago",
      icon: "users"
    },
    {
      id: 3,
      title: "New Map Pool Changes for 2024 Season",
      excerpt: "Valve announces significant changes to the competitive map pool, including the removal of Mirage and addition of de_ancient.",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
      category: "Update",
      date: "1 day ago",
      icon: "map"
    }
  ];

  return (
    <section id="news" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, orange 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Latest Updates</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4">
            Gaming <span className="csgo-text-gradient">News</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl">
            Stay updated with the latest Counter-Strike news, roster changes, and tournament announcements.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Icon name="clock" className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <button className="flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <Icon name="arrow-right" className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <button className="bg-white/5 hover:bg-white/10 border border-gray-700 hover:border-orange-500/50 text-white font-semibold px-8 py-3 rounded-xl transition-all flex items-center gap-2 mx-auto">
            View All News
            <Icon name="newspaper" className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Tournaments Section
const Tournaments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tournaments = [
    {
      name: "PGL Major Copenhagen 2024",
      prize: "$1,250,000",
      location: "Copenhagen, Denmark",
      date: "Mar 17 - 31, 2024",
      status: "Live",
      teams: 24,
      icon: "crown"
    },
    {
      name: "IEM Katowice 2024",
      prize: "$1,000,000",
      location: "Katowice, Poland",
      date: "Jan 31 - Feb 11, 2024",
      status: "Completed",
      teams: 24,
      icon: "trophy"
    },
    {
      name: "BLAST Premier World Final",
      prize: "$1,000,000",
      location: "Abu Dhabi, UAE",
      date: "Dec 13 - 17, 2023",
      status: "Completed",
      teams: 8,
      icon: "medal"
    },
    {
      name: "ESL Pro League Season 19",
      prize: "$750,000",
      location: "Online / Malta",
      date: "Apr 23 - May 12, 2024",
      status: "Upcoming",
      teams: 32,
      icon: "shield"
    }
  ];

  return (
    <section id="tournaments" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Competitive Scene</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4">
            Major <span className="csgo-text-gradient">Tournaments</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl">
            Follow the biggest CS:GO competitions with millions in prize pools and the world's best teams competing.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {tournaments.map((tournament, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800 hover:border-orange-500/30 transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/50 transition-colors">
                    <Icon name={tournament.icon} className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                        {tournament.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        tournament.status === 'Live' ? 'bg-red-500/20 text-red-500 animate-pulse' :
                        tournament.status === 'Upcoming' ? 'bg-green-500/20 text-green-500' :
                        'bg-gray-700 text-gray-400'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Icon name="map-pin" className="w-4 h-4" />
                        {tournament.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="calendar" className="w-4 h-4" />
                        {tournament.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-black text-orange-500">{tournament.prize}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Prize Pool</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{tournament.teams}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Teams</div>
                  </div>
                  <button className="bg-white/5 hover:bg-orange-500 hover:text-black text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
                    Details
                    <Icon name="chevron-right" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Teams Section
const Teams = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teams = [
    { name: "Natus Vincere", rank: 1, region: "Europe", players: ["s1mple", "b1t", "jL", "iM", "AleksiB"], logo: "crown", color: "from-yellow-500 to-yellow-600" },
    { name: "FaZe Clan", rank: 2, region: "Europe", players: ["karrigan", "rain", "ropz", "broky", "frozen"], logo: "zap", color: "from-red-500 to-red-600" },
    { name: "G2 Esports", rank: 3, region: "Europe", players: ["HooXi", "NiKo", "m0NESY", "huNter-", "nexa"], logo: "sword", color: "from-black to-gray-800" },
    { name: "Team Vitality", rank: 4, region: "Europe", players: ["apEX", "ZywOo", "Spinx", "flameZ", "mezii"], logo: "flame", color: "from-yellow-400 to-orange-500" },
    { name: "MOUZ", rank: 5, region: "Europe", players: ["siuhy", "Jimpphat", "torzsi", "xertioN", "Brollan"], logo: "mouse", color: "from-red-600 to-red-700" },
    { name: "Team Spirit", rank: 6, region: "CIS", players: ["chopper", "sh1ro", "zont1x", "magixx", "donk"], logo: "ghost", color: "from-green-500 to-emerald-600" },
  ];

  return (
    <section id="teams" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Pro Scene</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4">
            Top <span className="csgo-text-gradient">Teams</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl">
            The elite organizations competing at the highest level of Counter-Strike.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teams.map((team, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-orange-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${team.color} flex items-center justify-center shadow-lg`}>
                  <Icon name={team.logo} className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-gray-700">#{team.rank}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">World Rank</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                {team.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Icon name="globe" className="w-4 h-4" />
                {team.region}
              </div>
              
              <div className="border-t border-gray-800 pt-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Roster</div>
                <div className="flex flex-wrap gap-2">
                  {team.players.map((player, pIndex) => (
                    <span key={pIndex} className="bg-white/5 text-gray-300 px-3 py-1 rounded-lg text-sm font-medium">
                      {player}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Players Section
const Players = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const players = [
    { name: "s1mple", realName: "Oleksandr Kostyliev", team: "NAVI", nationality: "Ukraine", role: "AWPer", rating: 1.35, image: "target" },
    { name: "ZywOo", realName: "Mathieu Herbaut", team: "Vitality", nationality: "France", role: "AWPer", rating: 1.32, image: "crosshair" },
    { name: "m0NESY", realName: "Ilya Osipov", team: "G2", nationality: "Russia", role: "AWPer", rating: 1.28, image: "zap" },
    { name: "NiKo", realName: "Nikola Kovač", team: "G2", nationality: "Bosnia", role: "Rifler", rating: 1.25, image: "swords" },
    { name: "ropz", realName: "Robin Kool", team: "FaZe", nationality: "Estonia", role: "Rifler", rating: 1.22, image: "user" },
    { name: "donk", realName: "Danil Kryshkovets", team: "Spirit", nationality: "Russia", role: "Rifler", rating: 1.30, image: "flame" },
  ];

  return (
    <section id="players" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Star Power</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4">
            Pro <span className="csgo-text-gradient">Players</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl">
            The individual talents that define the competitive landscape of Counter-Strike.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {players.map((player, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border-2 border-orange-500/30 group-hover:border-orange-500 transition-colors">
                    <Icon name={player.image} className="w-10 h-10 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{player.realName}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-orange-500 font-bold text-lg">{player.rating}</div>
                    <div className="text-gray-500 text-xs uppercase">Rating</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-white font-bold text-lg">{player.role}</div>
                    <div className="text-gray-500 text-xs uppercase">Role</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-white font-bold text-lg">{player.team}</div>
                    <div className="text-gray-500 text-xs uppercase">Team</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Icon name="flag" className="w-4 h-4" />
                    {player.nationality}
                  </div>
                  <button className="text-orange-500 hover:text-orange-400 font-semibold text-sm flex items-center gap-1 transition-colors">
                    View Stats
                    <Icon name="arrow-right" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Icon name="crosshair" className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                CS<span className="text-orange-500">:</span>GO
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Your ultimate destination for Counter-Strike news, tournaments, teams, and player statistics. Stay connected with the competitive scene.
            </p>
            <div className="flex gap-4">
              {['twitter', 'youtube', 'twitch', 'instagram'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-900 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors group">
                  <Icon name={social} className="w-5 h-5 text-gray-400 group-hover:text-black" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['News', 'Tournaments', 'Teams', 'Players', 'Rankings'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Advertise'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2024 CS:GO Pro. All rights reserved. Not affiliated with Valve Corporation.
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Icon name="heart" className="w-4 h-4 text-red-500" />
            <span>for the CS community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <LatestNews />
      <Tournaments />
      <Teams />
      <Players />
      <Footer />
    </div>
  );
}

export default App;