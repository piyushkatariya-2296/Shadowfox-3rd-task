import React from 'react';

export default function About() {
  const trainers = [
    {
      name: 'Marcus Vance',
      role: 'Director of Conditioning',
      credentials: 'B.S. Kinesiology • CSCS Certified',
      bio: 'Former Division I track athlete specializing in energy system development and barbell mechanics.',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Mobility & Vinyasa',
      bio: '500-hour E-RYT yoga master with 12 years teaching structural alignment and breathwork.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Reformer Pilates Lead',
      bio: 'Certified Stott Pilates instructor focusing on core rehabilitation and dynamic spring-resistance control.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'David Miller',
      role: 'Powerlifting Coach',
      bio: 'USA Powerlifting certified coach focused on kinematics, bar velocity, and progressive strength overload.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-brown-600 border-l-2 border-brown-600 pl-3 font-semibold">
          Our Story & Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-espresso-800 leading-tight">
          Designed for longevity. <br />
          <span className="text-brown-600 italic">Built around personal coaching.</span>
        </h1>
        <p className="text-espresso-700 text-base leading-relaxed">
          PulseFit Studio opened its doors in San Francisco in 2021 with a straightforward goal: eliminate the guesswork from group fitness by bringing physical therapy principles and athletic conditioning into every single class.
        </p>
      </div>

      {/* Facility & Studio Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="studio-panel p-8 rounded-xl space-y-3">
          <span className="text-[11px] font-mono uppercase text-brown-600 font-semibold">Studio A — Reformer & Turf Lab</span>
          <h3 className="text-2xl font-serif font-bold text-espresso-800">State-of-the-Art Equipment</h3>
          <p className="text-espresso-500 text-xs leading-relaxed">
            Equipped with Balanced Body Reformers, custom Rogue monster rigs, Concept2 ergs, and HEPA climate control for clean air circulation during high-intensity training.
          </p>
        </div>

        <div className="studio-panel p-8 rounded-xl space-y-3">
          <span className="text-[11px] font-mono uppercase text-sage-500 font-semibold">Studio B — Sanctuary & Mobility</span>
          <h3 className="text-2xl font-serif font-bold text-espresso-800">Intimate Small Groups</h3>
          <p className="text-espresso-500 text-xs leading-relaxed">
            Every session is capped at 10 to 12 participants so our coaches can provide individual form cues, tempo modifications, and personal exercise progressions.
          </p>
        </div>
      </div>

      {/* Master Coaches Grid */}
      <div>
        <div className="mb-10 border-b border-cream-border pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-brown-600 font-semibold">Instruction</span>
          <h2 className="text-3xl font-serif font-bold text-espresso-800 mt-1">Our Master Coaches</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t) => (
            <div key={t.name} className="studio-card rounded-xl overflow-hidden group">
              <div className="h-64 overflow-hidden bg-cream-surface">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-lg font-serif font-bold text-espresso-800">{t.name}</h4>
                <p className="text-xs font-semibold text-brown-600">{t.role}</p>
                <p className="text-espresso-500 text-xs leading-relaxed pt-2 border-t border-cream-border">
                  {t.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
