import React from 'react';
import { 
  Home, 
  Info, 
  MapPin, 
  Armchair, 
  Wrench, 
  PhoneCall, 
  Compass, 
  FileText, 
  Globe 
} from 'lucide-react';

export default function CategoriesInfoGrid({ 
  onTileClick, 
  onNavigateSection 
}) {
  const tiles = [
    {
      id: 'home_design',
      title: 'HOME DESIGN',
      icon: Home,
      action: () => onTileClick({
        title: 'Home Interior Furnishings',
        subtitle: 'Living Rooms, Dining Suites & Master Suites',
        content: 'From modular sectionals to handcrafted dining ensembles, Zola Furniture designs each piece to complement contemporary Addis Ababa residential architecture. We offer in-home dimension taking and custom fabric swatches.'
      })
    },
    {
      id: 'info_product',
      title: 'INFORMATION PRODUCT',
      icon: Info,
      action: () => onTileClick({
        title: 'Furniture Specifications & Sourcing',
        subtitle: 'Kiln-Dried Hardwoods & High-Density Foam',
        content: 'Our structural frames are constructed from high-grade Ethiopian hardwoods (Wanza, Tid, and selected treated Oak). Cushions are built with 35kg/m³ high-resilience foam wrapped in stain-guarded velvet or top-grain leather.'
      })
    },
    {
      id: 'location_store',
      title: 'LOCATION STORE',
      icon: MapPin,
      action: () => onNavigateSection('location')
    },
    {
      id: 'furniture_design',
      title: 'FURNITURE DESIGN',
      icon: Armchair,
      action: () => onTileClick({
        title: 'Bespoke Custom Furniture Studio',
        subtitle: 'Made-to-Measure Architectural Furniture',
        content: 'Have a specific design, Pinterest mockup, or architectural floor plan? Our master woodworkers and master upholsterers manufacture bespoke units built to your exact spatial tolerances.'
      })
    },
    {
      id: 'maintenance',
      title: 'MAINTENANCE',
      icon: Wrench,
      action: () => onTileClick({
        title: 'Furniture Care & Lifetime Maintenance',
        subtitle: 'Annual Servicing, Re-Upholstery & Conditioning',
        content: 'Zola Furniture PLC stands behind every build. We provide seasonal timber conditioning, velvet steam rejuvenation, structural joint tightening, and full re-upholstery services.'
      })
    },
    {
      id: 'customer_services',
      title: 'CUSTOMER SERVICES',
      icon: PhoneCall,
      action: () => onNavigateSection('contact')
    },
    {
      id: 'interior_design',
      title: 'INTERIOR DESIGN',
      icon: Compass,
      action: () => onTileClick({
        title: 'Commercial & Hospitality Furnishing',
        subtitle: 'Hotels, Cafes, Lounges & Corporate Offices',
        content: 'We furnish high-traffic commercial spaces throughout Ethiopia. Bulk discounts, flame-retardant commercial-grade fabrics, and heavy-duty steel & hardwood joinery guaranteed.'
      })
    },
    {
      id: 'administration',
      title: 'ADMINISTRATION',
      icon: FileText,
      action: () => onNavigateSection('admin')
    },
    {
      id: 'blog',
      title: 'BLOG',
      icon: Globe,
      action: () => onNavigateSection('blog')
    },
  ];

  return (
    <section className="py-12 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading matching reference */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-widest font-heading uppercase">
            CATEGORIES & INFORMATION
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24a] mx-auto mt-2 rounded-full" />
        </div>

        {/* 3-Column Square Grid matching reference screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                onClick={tile.action}
                className="info-tile p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-left group transition-all"
              >
                {/* Icon Squircle Frame */}
                <div className="w-12 h-12 rounded-2xl bg-[#1b1613] border border-[#c9a24a]/25 flex items-center justify-center shrink-0 group-hover:border-[#c9a24a] group-hover:scale-105 transition-all shadow-inner">
                  <Icon className="w-5 h-5 text-[#c9a24a] group-hover:text-white transition-colors" />
                </div>

                {/* Text Label */}
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#e8e1d5] group-hover:text-[#c9a24a] transition-colors uppercase leading-tight font-heading">
                    {tile.title}
                  </span>
                  <span className="text-[9px] text-[#8e8172] hidden sm:block mt-0.5">
                    Click to view
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
