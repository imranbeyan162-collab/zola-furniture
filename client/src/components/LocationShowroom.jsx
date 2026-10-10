import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export default function LocationShowroom() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          subject: subject.trim() || 'General Customer Inquiry',
          message: message.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSentSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Could not send message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="location-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a24a]/15 text-[#c9a24a] text-xs font-bold uppercase tracking-wider border border-[#c9a24a]/30 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Showroom & Workshop</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading uppercase">
            VISIT ZOLA FURNITURE PLC
          </h2>
          <p className="text-xs sm:text-sm text-[#a69c8f] max-w-xl mx-auto mt-2">
            Experience our furniture quality in person. Touch fabric swatches, test seat firmness, and consult with our master woodworkers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Location & Contact Information Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="luxury-card p-6 sm:p-7">
              <h3 className="text-lg font-bold text-white font-heading uppercase mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c9a24a]" />
                Showroom & Factory Headquarters
              </h3>

              <div className="space-y-4 text-xs text-[#cfc7bc]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c9a24a] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Addis Ababa, Ethiopia</span>
                    <span className="text-[#96897b]">Bole Sub-City / Workshop Line (Main Showroom)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c9a24a] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Tap-to-Call Contact Lines:</span>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <a href="tel:0935745559" className="text-[#c9a24a] hover:underline font-bold">
                        0935 745 559
                      </a>
                      <span className="text-[#685c4f]">•</span>
                      <a href="tel:0962049696" className="text-[#c9a24a] hover:underline font-bold">
                        0962 049 696
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c9a24a] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Workshop Hours:</span>
                    <span className="text-[#96897b]">Monday – Saturday: 8:30 AM – 7:30 PM</span>
                    <span className="text-[#96897b] block">Sunday: 10:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* TikTok Profile Card */}
              <div className="mt-6 pt-5 border-t border-[#3a2e25]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/01-zola-tiktok-profile.png" 
                      alt="Zola Furniture TikTok Profile" 
                      className="w-11 h-11 rounded-full object-cover border border-[#c9a24a]/50"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">TikTok Official</span>
                      <span className="text-[11px] text-[#c9a24a]">@dagim.fikre.falah</span>
                      <span className="text-[10px] text-[#8e8172] block">3,200+ followers</span>
                    </div>
                  </div>

                  <a 
                    href="https://www.tiktok.com/@dagim.fikre.falah" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#292019] hover:bg-[#382d24] text-[#c9a24a] border border-[#44382f] transition-colors"
                    title="Open TikTok Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Interactive Map Visual Tile */}
            <div className="luxury-card p-4 overflow-hidden relative group">
              <div className="h-48 rounded-2xl bg-[#1a1512] border border-[#3b3026] relative overflow-hidden flex items-center justify-center">
                {/* Simulated Stylized Dark Map */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#c9a24a_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative text-center z-10 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9a24a] text-black font-bold mx-auto flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-xs font-bold text-white block mt-2 font-heading">
                    ZOLA FURNITURE SHOWROOM
                  </span>
                  <span className="text-[10px] text-[#a69c8f]">
                    Addis Ababa, Ethiopia (GPS Coordinates 9.0105° N, 38.7612° E)
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Contact & Custom Commission Form */}
          <div className="lg:col-span-7">
            <div className="luxury-card p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white font-heading uppercase mb-2">
                Send a Message or Project Brief
              </h3>
              <p className="text-xs text-[#a69c8f] mb-6">
                Have a commercial inquiry, custom residential package, or question? Send us a message and our design team will respond within 24 hours.
              </p>

              {sentSuccess ? (
                <div className="p-6 rounded-2xl bg-[#1d1713] border border-[#c9a24a]/40 text-center animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#c9a24a] mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white uppercase font-heading">
                    Message Delivered
                  </h4>
                  <p className="text-xs text-[#b8ad9e] mt-1">
                    Thank you! Your message has been saved in our customer communication center.
                  </p>
                  <button
                    onClick={() => setSentSuccess(false)}
                    className="mt-4 text-xs text-[#c9a24a] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Yonas Alemu"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0911 223 344"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yonas@company.et"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Residential Living Room Furnishing"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the pieces you are interested in, space requirements, or delivery schedule..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Zola Team</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
