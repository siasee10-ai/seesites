import { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Smartphone,
  Monitor,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Phone,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Coffee,
  Compass,
} from "lucide-react";
import auraImg from "@/assets/project-aura-salon.jpg";
import vaaniImg from "@/assets/project-vaani-boutique.jpg";
import aestheticaImg from "@/assets/project-aesthetica-clinic.jpg";
import studioImg from "@/assets/project-studio-interior.jpg";
import artisanImg from "@/assets/project-noir-cafe.jpg";

export type ProjectId = "aura" | "vaani" | "aesthetica" | "artisan" | "studio";

interface ConceptDemoModalProps {
  projectId: ProjectId | null;
  onClose: () => void;
  onSelectProject: (plan: string) => void;
}

export function ConceptDemoModal({ projectId, onClose, onSelectProject }: ConceptDemoModalProps) {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("11:30 AM");

  useEffect(() => {
    setActiveTab(0);
    setBookingConfirmed(false);
  }, [projectId]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (projectId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [projectId, onClose]);

  if (!projectId) return null;

  const dataMap = {
    aura: {
      name: "AURA LUXURY SALON",
      industry: "Beauty & Salons",
      badge: "Concept Project · Luxury Salon & Nail Lounge",
      city: "Bandra West, Mumbai",
      tagline:
        "Sleek dark-mode aesthetic, treatment price lists, stylist profiles, and seamless appointment booking.",
      heroImg: auraImg,
      recommendedPlan: "Signature — ₹19,999",
      tabs: [
        "Treatments & Services",
        "Salon Price Guide",
        "Stylists & Ambience",
        "Book Appointment",
      ],
      sections: [
        {
          title: "Signature Hair & Nail Rituals",
          items: [
            {
              name: "Balayage & Couture Gloss",
              desc: "Custom colour melt with organic bond builder & deep treatment",
              price: "₹6,500",
            },
            {
              name: "Japanese Gel Nail Artistry",
              desc: "Non-toxic structured gel with intricate hand-painted nail designs",
              price: "₹2,800",
            },
            {
              name: "Keratin Infusion Therapy",
              desc: "Formaldehyde-free smoothing ritual with argan oil nourishment",
              price: "₹5,200",
            },
            {
              name: "Hydra-Luxe Scalp Detox",
              desc: "Micro-mist exfoliation, lymphatic massage, and organic herbal rinse",
              price: "₹3,400",
            },
          ],
        },
        {
          title: "Complete Salon Menu Guide",
          items: [
            {
              name: "Precision Creative Haircut & Blowout",
              desc: "Senior master stylist consultation, wash & signature blow dry",
              price: "₹1,800",
            },
            {
              name: "Express Mani-Pedi Duo",
              desc: "Cuticle care, sea salt scrub, organic polish & paraffin wrap",
              price: "₹2,200",
            },
            {
              name: "Bridal Hair & Makeup Preview",
              desc: "Trial consultation, customized look curation & accessory setting",
              price: "₹8,500",
            },
            {
              name: "24K Gold Radiance Facial",
              desc: "Ultrasonic deep cleanse, pure gold sheet infusion, face lift massage",
              price: "₹4,900",
            },
          ],
        },
        {
          title: "Master Artists & Ambience",
          items: [
            {
              name: "Rhea Sen",
              desc: "Creative Director · 12 years editorial styling in Mumbai & London",
              price: "Senior Master",
            },
            {
              name: "Kunal Verma",
              desc: "Master Nail Artist · Certified Japanese nail art specialist",
              price: "Lead Tech",
            },
            {
              name: "Pooja Mehta",
              desc: "Senior Aesthetician · Skin therapy & holistic glow specialist",
              price: "Lead Therapist",
            },
          ],
        },
      ],
    },
    vaani: {
      name: "VAANI PRET & COUTURE",
      industry: "Fashion & Boutiques",
      badge: "Concept Project · Contemporary Indian Atelier",
      city: "Mehrauli, New Delhi",
      tagline:
        "Editorial digital storefront for modern Indian fashion, showcasing heritage handlooms with contemporary silhouettes.",
      heroImg: vaaniImg,
      recommendedPlan: "Signature — ₹19,999",
      tabs: [
        "Current Collection",
        "Heritage Textiles",
        "Editorial Lookbook",
        "Private Atelier Visit",
      ],
      sections: [
        {
          title: "The Autumn / Festive Edit",
          items: [
            {
              name: "Noor Chanderi Tissue Lehenga",
              desc: "Hand-embroidered zardozi work with scalloped raw silk blouse",
              price: "₹48,000",
            },
            {
              name: "Kashmiri Aari Silk Kurta Set",
              desc: "Pure mulberry silk with antique gold thread work and farshi salwar",
              price: "₹24,500",
            },
            {
              name: "Ivory Organza Overlay Jacket",
              desc: "Hand-cut mirror accents with handwoven banarasi tissue inner",
              price: "₹18,900",
            },
            {
              name: "Charcoal Structured Bandhgala",
              desc: "Italian wool blend tailored with handcrafted antique silver buttons",
              price: "₹32,000",
            },
          ],
        },
        {
          title: "Craft & Artisan Narrative",
          items: [
            {
              name: "Banaras Weaves",
              desc: "Direct collaboration with 4th-generation master weavers in Varanasi",
              price: "Pure Katan",
            },
            {
              name: "Chanderi Handloom",
              desc: "Featherweight cotton-silk spun by women artisans in Madhya Pradesh",
              price: "Zari Edge",
            },
            {
              name: "Zardozi & Dabka",
              desc: "Intricate metallic needlework preserved by Old Delhi craftspeople",
              price: "Handstitched",
            },
          ],
        },
        {
          title: "Boutique Experience & Press",
          items: [
            {
              name: "Bespoke Bridal Consultations",
              desc: "Private 90-minute design session with founder designer",
              price: "By Appointment",
            },
            {
              name: "Worldwide Doorstep Fitting",
              desc: "Personalized measurement verification for global NRI clients",
              price: "Express Logistics",
            },
            {
              name: "Sustainable Dye Program",
              desc: "100% AZO-free plant-based colors used in all signature collections",
              price: "Eco Certified",
            },
          ],
        },
      ],
    },
    aesthetica: {
      name: "AESTHETICA CLINIC",
      industry: "Healthcare & Clinics",
      badge: "Concept Project · Aesthetic Dental & Wellness",
      city: "Indiranagar, Bengaluru",
      tagline:
        "Clean, high-credibility healthcare website featuring treatment guides, doctor credentials, and convenient consultation enquiries.",
      heroImg: aestheticaImg,
      recommendedPlan: "Signature — ₹19,999",
      tabs: [
        "Treatments & Services",
        "Doctor Credentials",
        "Clinic Technology",
        "Book Consultation",
      ],
      sections: [
        {
          title: "Advanced Dental & Cosmetic Services",
          items: [
            {
              name: "Invisible Clear Aligners",
              desc: "AI-guided 3D smile planning with German biocompatible aligners",
              price: "Custom Quote",
            },
            {
              name: "Laser Teeth Whitening",
              desc: "Pain-free 45-minute clinic session brightening up to 6 shades",
              price: "₹8,500",
            },
            {
              name: "Single-Day Dental Implants",
              desc: "Guided surgical precision with lifetime warranty Swiss titanium implants",
              price: "Consultation",
            },
            {
              name: "Porcelain Ceramic Veneers",
              desc: "Ultra-thin hand-layered ceramics tailored to natural facial symmetry",
              price: "Per Tooth",
            },
          ],
        },
        {
          title: "Medical Faculty & Qualifications",
          items: [
            {
              name: "Dr. Arvind Rao, MDS",
              desc: "Consultant Prosthodontist & Implantologist · 16 years clinical excellence",
              price: "BDS, MDS (Oral Surg)",
            },
            {
              name: "Dr. Suniti Nair, BDS",
              desc: "Aesthetic Dentistry Fellow (Germany) · Certified Smile Architect",
              price: "Fellowship (Munich)",
            },
            {
              name: "Dr. Farhan Qureshi",
              desc: "Microscopic Endodontist · Pain-free laser root canal therapy",
              price: "MDS (Cons Dent)",
            },
          ],
        },
        {
          title: "Patient Care Standards",
          items: [
            {
              name: "Class-B Hospital Autoclave Sterilization",
              desc: "Strict 7-tier hygiene protocol surpassing international NABH standards",
              price: "100% Sterile",
            },
            {
              name: "Digital OPG & 3D Intraoral Scanning",
              desc: "No messy impression trays; instantaneous high-definition 3D rendering",
              price: "Low Radiation",
            },
            {
              name: "Transparent Pre-Treatment Estimates",
              desc: "Comprehensive cost transparency with zero unexpected post-op charges",
              price: "Fixed Pricing",
            },
          ],
        },
      ],
    },
    artisan: {
      name: "THE ARTISAN ROASTERS",
      industry: "Restaurants & Cafés",
      badge: "Concept Project · Specialty Coffee & Kitchen",
      city: "Kala Ghoda, Mumbai",
      tagline:
        "Atmospheric culinary layout featuring interactive digital menus, roastery origins, and table reservation simulator.",
      heroImg: artisanImg,
      recommendedPlan: "Essential — ₹9,999",
      tabs: ["Roast & Brew Menu", "Small Plates Kitchen", "Origin & Philosophy", "Reserve A Table"],
      sections: [
        {
          title: "Specialty Pour Overs & Cold Brews",
          items: [
            {
              name: "Ratnagiri Estate Washed Pour Over",
              desc: "Notes of jasmine, Meyer lemon, and wild mountain wildflower honey",
              price: "₹280",
            },
            {
              name: "Cascara Sparkling Cold Brew",
              desc: "Coffee cherry tea tonic infused with orange peel and fresh rosemary",
              price: "₹260",
            },
            {
              name: "Cortado on Oat M*lk",
              desc: "Double ristretto pull of our signature medium-roast Chikmagalur beans",
              price: "₹240",
            },
            {
              name: "Single-Origin Espresso Flight",
              desc: "Tasting duo of light roast washed vs honey processed micro-lots",
              price: "₹340",
            },
          ],
        },
        {
          title: "Sourdough & Artisanal Bakery",
          items: [
            {
              name: "Avocado & Stracciatella Tartine",
              desc: "House sourdough, crushed hass avo, cold pressed olive oil, micro greens",
              price: "₹420",
            },
            {
              name: "Truffled Wild Mushroom Toast",
              desc: "Thyme-sautéed shimeji, portobello, garlic emulsion on seeded rye",
              price: "₹460",
            },
            {
              name: "Sea Salt Dark Chocolate Cruffin",
              desc: "Flaky laminated pastry filled with single-origin Valrhona ganache",
              price: "₹240",
            },
          ],
        },
        {
          title: "Farm to Cup Provenance",
          items: [
            {
              name: "Direct Trade with Indian Estates",
              desc: "Sourcing strictly from altitude-rich micro-farms in Coorg & Araku Valley",
              price: "Ethical Trade",
            },
            {
              name: "In-House Loring Smart Roaster",
              desc: "Eco-friendly zero-emissions roasting calibrated for clean flavor clarity",
              price: "Batch Roasted",
            },
            {
              name: "Barista Training Academy",
              desc: "Weekend sensory coffee cupping and home brewing workshops",
              price: "Community First",
            },
          ],
        },
      ],
    },
    studio: {
      name: "STUDIO ELEMENT",
      industry: "Professional & Architecture",
      badge: "Concept Project · Architecture & Interiors",
      city: "Jubilee Hills, Hyderabad",
      tagline:
        "Minimalist, editorial architecture showcase highlighting residential case studies, materials, and consultation enquiry.",
      heroImg: studioImg,
      recommendedPlan: "Signature — ₹19,999",
      tabs: ["Selected Projects", "Material Palette", "Design Ethos", "Consultation"],
      sections: [
        {
          title: "Residential & Commercial Works",
          items: [
            {
              name: "The Concrete Pavilions (Jubilee Hills)",
              desc: "5,800 sq.ft brutalist private villa framed by courtyard water bodies",
              price: "Completed 2025",
            },
            {
              name: "Oasis Penthouse (Gachibowli)",
              desc: "Minimalist Japandi penthouse with custom teak joinery and limewash",
              price: "Completed 2024",
            },
            {
              name: "Artisans Workspace (Banjara Hills)",
              desc: "Creative studio and gallery space repurposed from heritage stone stable",
              price: "Completed 2025",
            },
          ],
        },
        {
          title: "Sustainable Material Selection",
          items: [
            {
              name: "Locally Sourced Basalt & Slate",
              desc: "Quarried naturally within Telangana to minimize transportation carbon",
              price: "Regional Stone",
            },
            {
              name: "Reclaimed Burmese Teak",
              desc: "Salvaged architectural timber restored by generational carpenters",
              price: "Circular Design",
            },
            {
              name: "Breathable Lime Plasters",
              desc: "Non-toxic thermal plaster walls reducing reliance on mechanical air cooling",
              price: "Passive Climate",
            },
          ],
        },
        {
          title: "Studio Credentials",
          items: [
            {
              name: "Principal Architect: Vikram Reddy",
              desc: "B.Arch (SPA Delhi), M.Arch (CEPT Ahmedabad) · Registered COA",
              price: "14 Yrs Practice",
            },
            {
              name: "Design Director: Tanya Kapoor",
              desc: "Interior Architecture Specialist (Pratt Institute, NY)",
              price: "Principal Interior",
            },
            {
              name: "Turnkey Project Execution",
              desc: "End-to-end site supervision, vendor management and timeline guarantee",
              price: "Full Lifecycle",
            },
          ],
        },
      ],
    },
  };

  const project = dataMap[projectId];
  const isBookingTab = activeTab === project.tabs.length - 1;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#060e22] text-slate-100 shadow-2xl custom-scrollbar flex flex-col">
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#060e22]/95 px-4 py-3 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              Interactive Concept Demo
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Toggle */}
            <div className="hidden sm:flex items-center rounded-lg border border-white/15 bg-white/5 p-1 text-xs font-mono text-slate-400">
              <button
                onClick={() => setDeviceView("desktop")}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] transition-colors ${
                  deviceView === "desktop"
                    ? "bg-white text-slate-950 font-bold"
                    : "hover:text-white"
                }`}
              >
                <Monitor className="h-3 w-3" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView("mobile")}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] transition-colors ${
                  deviceView === "mobile" ? "bg-white text-slate-950 font-bold" : "hover:text-white"
                }`}
              >
                <Smartphone className="h-3 w-3" />
                <span>Mobile</span>
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Close demo"
              className="rounded-full border border-white/20 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container with Simulated Viewport */}
        <div className="p-4 sm:p-8 flex justify-center">
          <div
            className={`w-full transition-all duration-300 ${
              deviceView === "mobile"
                ? "max-w-md border-4 border-slate-700 rounded-3xl p-4 bg-[#030714] shadow-2xl"
                : "max-w-4xl"
            }`}
          >
            {/* Concept Project Notice Banner */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5 text-xs font-mono text-emerald-300">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>{project.badge} · Custom Design Showcase by SeeSites</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                {project.city}
              </span>
            </div>

            {/* Visual Hero Mockup */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-black">
              <img
                src={project.heroImg}
                alt={project.name}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-[#030714]/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300">
                    {project.industry}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-4xl font-light text-white uppercase tracking-wider mt-0.5">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 max-w-xl font-light leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {project.tabs.map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(idx);
                    setBookingConfirmed(false);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider transition-all ${
                    activeTab === idx
                      ? "bg-white text-slate-950 font-bold shadow-md"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="mt-6">
              {!isBookingTab ? (
                <div>
                  <h4 className="font-editorial text-xl font-light text-white uppercase tracking-wide mb-4">
                    {project.sections[activeTab]?.title || project.tabs[activeTab]}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.sections[activeTab]?.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-medium text-sm text-white">{item.name}</h5>
                            <span className="text-xs font-mono text-emerald-400 shrink-0 font-semibold">
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-400 font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Interactive Booking / Enquiry Flow Simulator */
                <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center max-w-lg mx-auto">
                  {!bookingConfirmed ? (
                    <div>
                      <h4 className="font-editorial text-2xl font-light text-white uppercase tracking-wide">
                        Interactive Appointment & Enquiry Simulator
                      </h4>
                      <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                        Test how easy it is for prospective clients to reach your business directly
                        via WhatsApp or scheduled booking.
                      </p>

                      <div className="mt-5 space-y-3 text-left">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                            Select Service / Inquiry Type
                          </label>
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full rounded-lg border border-white/15 bg-[#030714] px-3 py-2 text-xs text-white"
                          >
                            <option value="Consultation">Initial Consultation & Evaluation</option>
                            <option value="Premium Service">Signature Experience Package</option>
                            <option value="General Enquiry">General Business Enquiry</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                            Preferred Time
                          </label>
                          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                            {["11:30 AM", "3:00 PM", "6:30 PM"].map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setSelectedTime(t)}
                                className={`rounded-lg py-2 border ${
                                  selectedTime === t
                                    ? "border-emerald-400 bg-emerald-500/20 text-white font-bold"
                                    : "border-white/10 text-slate-400 hover:text-white"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setBookingConfirmed(true)}
                          className="metallic-btn-primary w-full mt-2 rounded-full py-3 text-xs font-bold uppercase tracking-wider text-slate-950"
                        >
                          Simulate Booking Confirmation →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 mb-3">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h4 className="font-editorial text-2xl font-light text-white uppercase">
                        Simulation Successful!
                      </h4>
                      <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                        On your live custom website, this enquiry instantly routes to your official
                        email and sends a pre-filled WhatsApp message directly to your phone.
                      </p>
                      <button
                        type="button"
                        onClick={() => setBookingConfirmed(false)}
                        className="mt-4 text-xs font-mono text-slate-400 underline"
                      >
                        Reset Simulator
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Conversion Bar */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Tailored for Indian Businesses
                </span>
                <p className="text-xs text-slate-200">
                  Like this layout? We build bespoke websites starting at ₹9,999.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onSelectProject(project.recommendedPlan);
                }}
                className="metallic-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg"
              >
                <span>Get a Website Like This</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
