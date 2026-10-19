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
  Phone,
} from "lucide-react";
import lunaImg from "@/assets/project-luna.jpg";
import noirImg from "@/assets/project-noir-cafe.jpg";
import mesaImg from "@/assets/project-mesa.jpg";
import fineDiningImg from "@/assets/fine-dining.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import cafeImg from "@/assets/cafe.jpg";

export type ProjectId = "luna" | "noir" | "mesa";

interface ConceptDemoModalProps {
  projectId: ProjectId | null;
  onClose: () => void;
  onSelectProject: (plan: string) => void;
}

export function ConceptDemoModal({ projectId, onClose, onSelectProject }: ConceptDemoModalProps) {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<string>("menu");
  const [bookingGuests, setBookingGuests] = useState("2 Guests");
  const [bookingTime, setBookingTime] = useState("7:30 PM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  const data = {
    luna: {
      name: "LUNA",
      badge: "Concept Project · Fine Dining & Contemporary Restaurant",
      city: "Soho, New York",
      tagline:
        "Intimate chiaroscuro lighting, custom dining typography, and seamless reservation integration.",
      heroImg: lunaImg,
      accentImg: fineDiningImg,
      hours: "Tuesday – Sunday: 5:00 PM – 11:30 PM",
      address: "142 Mercer Street, New York, NY 10012",
      phone: "+1 (212) 555-0194",
      tabs: ["Tasting Menu", "Cellar & Cocktails", "Atmosphere", "Table Booking"],
      recommendedPlan: "Signature ($500)",
      menuCategories: [
        {
          name: "First Course (Starters)",
          items: [
            {
              title: "Hokkaido Scallop Crudo",
              desc: "Smoked dashi, finger lime, pickled sea radish, shiso oil",
              price: "$28",
            },
            {
              title: "Charred Maitake & Bone Marrow",
              desc: "Black garlic emulsion, toasted brioche, cured yolk",
              price: "$24",
            },
            {
              title: "Stracciatella & Heirloom Persimmon",
              desc: "Wild thyme honey, crispy buckwheat, aged balsamico",
              price: "$22",
            },
          ],
        },
        {
          name: "Main Course (Mains)",
          items: [
            {
              title: "Dry-Aged Duck Breast",
              desc: "Spiced quince purée, fermented endive, duck jus with elderberry",
              price: "$48",
            },
            {
              title: "Wild Turbot in Fig Leaf",
              desc: "Charred leek velouté, sea coriander, chanterelle mushrooms",
              price: "$52",
            },
            {
              title: "A5 Miyazaki Wagyu Striploin",
              desc: "Smoked potato mousseline, charred alliums, périgord truffle",
              price: "$78",
            },
          ],
        },
        {
          name: "Dessert & Infusions",
          items: [
            {
              title: "Smoked Dark Chocolate Tart",
              desc: "Single-origin 72% cacao, smoked sea salt, roasted malt ice cream",
              price: "$18",
            },
            {
              title: "Yuzu & White Peach Sorbet",
              desc: "Shiso granita, puffed wild rice, elderflower crisp",
              price: "$16",
            },
          ],
        },
      ],
    },
    noir: {
      name: "NOIR",
      badge: "Concept Project · Specialty Coffee Shop & Slow Bar",
      city: "Queen Street West, Toronto",
      tagline:
        "Brushed silver espresso architecture, daily batch digital menus, and pour-over storytelling.",
      heroImg: noirImg,
      accentImg: coffeeImg,
      hours: "Monday – Friday: 7:00 AM – 5:00 PM | Sat – Sun: 8:00 AM – 6:00 PM",
      address: "842 Queen Street West, Toronto, ON M6J 1G3",
      phone: "+1 (416) 555-0182",
      tabs: ["Espresso & Pour-Over", "Pastries & Toast", "Beans by Origin", "Visit Bar"],
      recommendedPlan: "Essential ($200)",
      menuCategories: [
        {
          name: "Single-Origin Pour-Overs (Filter)",
          items: [
            {
              title: "Ethiopia Guji Uraga (Washed)",
              desc: "Jasmine blossom, candied bergamot, peach nectar, sparkling acidity",
              price: "$6.50",
            },
            {
              title: "Colombia Finca El Paraiso (Thermal Shock)",
              desc: "Wild strawberry compote, lemongrass, creamy white cocoa finish",
              price: "$7.50",
            },
            {
              title: "Kenya Nyeri Hill (Double Fermented)",
              desc: "Blackcurrant cordial, grapefruit zest, cane sugar sweetness",
              price: "$7.00",
            },
          ],
        },
        {
          name: "Espresso & Milk Bar",
          items: [
            {
              title: "Seasonal Espresso Double",
              desc: "Rotating single origin pulled on Synesso MVP",
              price: "$4.00",
            },
            {
              title: "Cortado / Piccolo (1:1 Ratio)",
              desc: "Velvety steamed microfoam, oat or organic whole milk",
              price: "$4.75",
            },
            {
              title: "Smoked Vanilla Cardamom Latte",
              desc: "House-steeped crushed green cardamom, raw bourbon vanilla",
              price: "$6.25",
            },
          ],
        },
        {
          name: "Bakery & Morning Provisions",
          items: [
            {
              title: "Nordic Cardamom Bun",
              desc: "Slow fermented sourdough enriched dough, crushed pearl sugar",
              price: "$5.50",
            },
            {
              title: "Matcha Sesame Kouign-Amann",
              desc: "Caramelized French butter pastry, Uji matcha glaze",
              price: "$6.00",
            },
          ],
        },
      ],
    },
    mesa: {
      name: "MESA",
      badge: "Concept Project · Contemporary Woodfire & Pacific Northwest",
      city: "Gastown, Vancouver",
      tagline:
        "Monolithic twilight Pacific views, multi-course woodfire presentations, and mobile table bookings.",
      heroImg: mesaImg,
      accentImg: cafeImg,
      hours: "Wednesday – Sunday: 5:00 PM – Midnight",
      address: "210 Water Street, Vancouver, BC V6B 1B5",
      phone: "+1 (604) 555-0128",
      tabs: ["Woodfire Dining", "Pacific Oyster Bar", "Natural Wines", "Table Booking"],
      recommendedPlan: "Experience ($800)",
      menuCategories: [
        {
          name: "Raw Bar & Coastal Starters",
          items: [
            {
              title: "Pacific Kusshi Oysters (Half Dozen)",
              desc: "Apple cider granita, pickled shallot, bull kelp mignonette",
              price: "$26",
            },
            {
              title: "Haida Gwaii Halibut Crudo",
              desc: "Sea buckthorn emulsion, charred kombu oil, toasted pine nuts",
              price: "$24",
            },
            {
              title: "Wood-Charred Spot Prawns",
              desc: "Smoked chili butter, grilled sourdough, Meyer lemon",
              price: "$28",
            },
          ],
        },
        {
          name: "From the Alder Woodfire Hearth",
          items: [
            {
              title: "Pacific King Salmon",
              desc: "Charred over western red cedar, birch glaze, braised sea greens",
              price: "$46",
            },
            {
              title: "45-Day Dry Aged Brant Lake Wagyu",
              desc: "Roasted marrow jus, smoked wild chanterelles, cipollini onions",
              price: "$68",
            },
            {
              title: "Charred King Oyster Mushrooms",
              desc: "Fermented garlic puree, pickled fiddleheads, pine needle smoke",
              price: "$32",
            },
          ],
        },
        {
          name: "Pacific Cellar & Cocktails",
          items: [
            {
              title: "Okanagan Valley Pet-Nat Natural Wine",
              desc: "Crisp elderflower, crisp pear, fine mineral finish",
              price: "$18 / gls",
            },
            {
              title: "Smoked Douglas Fir Negroni",
              desc: "Locally foraged cedar gin, sweet vermouth, smoked bitter orange",
              price: "$19",
            },
          ],
        },
      ],
    },
  }[projectId];

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-[#02050f]/95 backdrop-blur-2xl text-slate-100 overflow-y-auto">
      {/* Top Bar / Controls */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#04091a]/90 px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <span className="font-editorial text-lg md:text-xl font-light tracking-wide text-white">
            {data.name}
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
            {data.badge}
          </span>
        </div>

        {/* Viewport Switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs font-mono">
            <button
              onClick={() => setDeviceView("desktop")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
                deviceView === "desktop"
                  ? "bg-white text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
                deviceView === "mobile"
                  ? "bg-white text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectProject(data.recommendedPlan);
            }}
            className="metallic-btn-primary inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-md"
          >
            <span>Get A Site Like This</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={onClose}
            aria-label="Close demo"
            className="rounded-full border border-white/20 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Demo Container */}
      <div className="flex-1 p-3 sm:p-6 md:p-10 flex justify-center items-start">
        <div
          className={`w-full transition-all duration-300 ${
            deviceView === "mobile"
              ? "max-w-[420px] rounded-[36px] border-[6px] border-slate-700/80 shadow-2xl overflow-hidden bg-[#070e1f] my-4"
              : "max-w-5xl rounded-2xl border border-white/15 shadow-2xl overflow-hidden bg-[#070e1f]"
          }`}
        >
          {/* Simulated Browser Bar (Desktop only) */}
          {deviceView === "desktop" && (
            <div className="flex items-center justify-between border-b border-white/10 bg-[#050b18] px-4 py-2.5 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-6 py-0.5 text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400">https://</span>
                <span>{projectId}.restaurant-experience.seesites.com</span>
              </div>
              <span className="text-[10px] text-slate-500">Live Staging Preview</span>
            </div>
          )}

          {/* Restaurant Concept Website Header */}
          <header className="border-b border-white/10 bg-[#050b18]/80 px-5 py-4 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="font-editorial text-xl md:text-2xl font-light tracking-[0.1em] text-white">
                {data.name}
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {data.city}
              </span>
            </div>

            <nav className="flex items-center gap-3 md:gap-6 text-[11px] font-mono tracking-wider uppercase text-slate-300">
              {data.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab.toLowerCase().includes("book") ? "booking" : "menu");
                  }}
                  className={`hover:text-white transition-colors ${
                    (activeTab === "booking" && tab.toLowerCase().includes("book")) ||
                    (activeTab === "menu" && !tab.toLowerCase().includes("book"))
                      ? "text-white underline underline-offset-4"
                      : "text-slate-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </header>

          {/* Restaurant Concept Hero */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img src={data.heroImg} alt={data.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e1f] via-[#070e1f]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase">
                {data.city}
              </span>
              <h1 className="mt-1 font-editorial text-2xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.05em]">
                {data.name}
              </h1>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-200/90 font-light">
                {data.tagline}
              </p>
            </div>
          </div>

          {/* Restaurant Fast Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10 bg-[#050c1c] text-xs font-mono text-slate-300">
            <div className="p-3.5 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{data.hours}</span>
            </div>
            <div className="p-3.5 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{data.address}</span>
            </div>
            <div className="p-3.5 flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{data.phone}</span>
            </div>
          </div>

          {/* Interactive Content Body */}
          <div className="p-6 md:p-10 space-y-12">
            {activeTab === "booking" ? (
              /* Simulated Live Booking / Reservation Flow */
              <div className="max-w-xl mx-auto rounded-2xl border border-white/15 bg-[#091530] p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="font-editorial text-2xl font-light text-white uppercase tracking-wider">
                    Reserve a Table at {data.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    Instant online confirmation · Seamless dining experience
                  </p>
                </div>

                {bookingConfirmed ? (
                  <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                    <p className="text-base font-semibold text-white">Reservation Confirmed!</p>
                    <p className="text-xs text-slate-300">
                      Table reserved for <strong>{bookingGuests}</strong> at{" "}
                      <strong>{bookingTime}</strong>. Confirmation sent via SMS.
                    </p>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-4 text-xs font-mono text-emerald-300 hover:text-white underline underline-offset-4"
                    >
                      Book another table
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-400 mb-1.5">Guests</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["1 Guest", "2 Guests", "4 Guests", "6+ Guests"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setBookingGuests(g)}
                            className={`rounded-lg py-2 border text-center transition-colors ${
                              bookingGuests === g
                                ? "border-white bg-white text-slate-950 font-bold"
                                : "border-white/15 bg-white/5 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1.5">Seating Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["6:00 PM", "7:30 PM", "8:45 PM", "9:15 PM"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setBookingTime(t)}
                            className={`rounded-lg py-2 border text-center transition-colors ${
                              bookingTime === t
                                ? "border-white bg-white text-slate-950 font-bold"
                                : "border-white/15 bg-white/5 text-slate-300 hover:border-white/30"
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
                      className="metallic-btn-primary w-full py-3 rounded-full font-semibold text-slate-950 tracking-wider uppercase mt-4"
                    >
                      Complete Reservation ({bookingGuests} · {bookingTime})
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Interactive Menu Presentation */
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Digital Hospitality Experience
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                      Current Seasonal Offerings
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("booking")}
                    className="metallic-btn-ghost rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider"
                  >
                    Reserve Table →
                  </button>
                </div>

                <div className="space-y-10">
                  {data.menuCategories.map((cat) => (
                    <div key={cat.name} className="space-y-4">
                      <h3 className="font-editorial text-lg sm:text-xl font-light text-slate-200 uppercase tracking-wider border-b border-white/10 pb-2">
                        {cat.name}
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {cat.items.map((item) => (
                          <div
                            key={item.title}
                            className="rounded-xl border border-white/10 bg-[#050c1a]/60 p-4 hover:border-white/20 transition-colors"
                          >
                            <div className="flex items-baseline justify-between gap-2">
                              <h4 className="font-editorial text-base font-light text-white tracking-wide">
                                {item.title}
                              </h4>
                              <span className="font-mono text-xs font-semibold text-slate-200">
                                {item.price}
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs text-slate-400 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Concept Demo Footer Banner */}
          <div className="border-t border-white/15 bg-[#030713] p-6 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
              Like what you see in {data.name}? We create custom digital homes tailored to your
              restaurant.
            </span>
            <button
              onClick={() => {
                onClose();
                onSelectProject(data.recommendedPlan);
              }}
              className="metallic-btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider"
            >
              <span>Inquire About A Website for Your Venue</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
