import { useRef, useState } from "react";
import "./CMUsedPrototype.css";

const screens = {
  discover: ["Discovery", "Discovery feed"],
  login: ["Sign in", "Log in"],
  interests: ["Buying / selling", "Onboarding (buyer-seller)"],
  categories: ["Choose interests", "Onboarding (categories)"],
  media: ["Social profile", "Onboarding (Media)"],
  policy: ["Community policy", "Onboarding (policy)"],
  search: ["Search", "Search"],
  results: ["Search results", "Search Result - no filters"],
  filters: ["Filtered results", "Search Result - with filters"],
  product: ["Product details", "Product Detail-1"],
  review: ["Review", "Product Detail"],
  contact: ["Contact seller", "Contact Seller Pop-up"],
  messages: ["Messages", "Message inbox (messages)"],
  profile: ["Seller profile", "Seller Profile"],
  active: ["Active listings", "Seller Profile (Active listing"],
  previous: ["Previous listings", "Seller Profile (Previous Listing"],
  wishlist: ["Wishlist", "Seller Profile Wishlist"],
  listing: ["Create a listing", "Listing - 12"],
} as const;
type Screen = keyof typeof screens;
const screenDescriptions: Record<Screen, string> = {
  discover: "Explore recent listings and find your next campus essential.",
  login: "A marketplace just for Carnegie Mellon. Sign in to get started.",
  interests: "Choose whether you want to buy, sell, or do a little of both.",
  categories: "Personalize your feed with the categories you care about.",
  media: "Add your social profiles so your campus community can connect with you.",
  policy: "Review the community agreement before entering the marketplace.",
  search: "Search for secondhand finds across campus.",
  results: "Browse matching listings and open an item to take a closer look.",
  filters: "Narrow your search by price, category, and condition.",
  product: "Take a closer look at the item, save it, or contact the seller.",
  review: "See what other students have shared about their experience.",
  contact: "Start a conversation with the seller about an item you love.",
  messages: "Keep the conversation going and coordinate your campus pickup.",
  profile: "Get to know the seller and explore their listings and wishlist.",
  active: "See what this seller currently has available.",
  previous: "Explore the seller's previous listings and sold items.",
  wishlist: "Come back to your saved finds and contact their sellers.",
  listing: "Give your items a second life. Add the details and preview your listing.",
};
type Hotspot = { label: string; to?: Screen; action?: () => void; x: number; y: number; w: number; h: number };

export default function CMUsedPrototype({ fullPage = false }: { fullPage?: boolean }) {
  const [screen, setScreen] = useState<Screen>("login");
  const [history, setHistory] = useState<Screen[]>([]);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState("");
  const [listingForm, setListingForm] = useState(false);
  const [listing, setListing] = useState({ name: "", price: "", category: "Furniture", description: "" });
  const [preview, setPreview] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const go = (next: Screen) => {
    if (next !== screen) setHistory(previous => [...previous, screen]);
    setScreen(next); setNotice(""); setSelection(""); setListingForm(false);
    viewport.current?.scrollTo({ top: 0 });
  };
  const back = () => {
    const previous = history[history.length - 1];
    if (previous) { setHistory(history.slice(0, -1)); setScreen(previous); setNotice(""); viewport.current?.scrollTo({ top: 0 }); }
  };
  const save = () => { setSaved(!saved); setNotice(saved ? "Removed from your demo wishlist." : "Saved to your demo wishlist."); };
  const hotspots: Hotspot[] = [];
  const add = (label: string, to: Screen, x: number, y: number, w: number, h: number) => hotspots.push({ label, to, x, y, w, h });
  const onboarding = ["login", "interests", "categories", "media", "policy"].includes(screen);
  if (!onboarding) {
    add("Back to discovery", "discover", 1, 0, 22, 5);
    add("Search listings", "search", 28, 0, 48, 5);
    add("Create a listing", "listing", 83, 0, 9, 5);
    add("View your profile", "profile", 93, 0, 7, 5);
  }
  if (screen === "discover") {
    add("Browse categories", "results", 1, 4, 60, 2.5);
    add("Shop clothing", "results", 0, 6.5, 49, 18);
    add("Shop furniture", "results", 49, 6.5, 51, 18);
    for (let i = 0; i < 4; i++) {
      add("Open listing " + (i + 1), "product", 6.3 + i * 25, 31.5, 21, 16.5);
      add("Contact seller " + (i + 1), "contact", 7 + i * 25, 48.2, 16.5, 2.2);
    }
    add("Browse under $20", "filters", 6, 55, 41, 9);
    add("Browse trending", "results", 52, 55, 41, 9);
    add("Open recently viewed listing", "product", 6, 71, 88, 19);
  }
  if (screen === "login") add("Demo sign in (no CMU authentication)", "interests", 3.7, 48.5, 39.5, 7.5);
  if (screen === "interests") {
    ["Selling", "Buying", "Both"].forEach((label, i) => hotspots.push({ label, x: 15 + i * 24.4, y: 37.3, w: 21.2, h: 32.5, action: () => setSelection(label) }));
    add("Next: categories", "categories", 15, 72, 70, 4.5);
  }
  if (screen === "categories") {
    ["Clothing", "Furniture", "Electronics", "Bikes/Scooters", "Storage/Organizers", "Appliances"].forEach((label, i) => hotspots.push({ label, x: 15 + (i % 3) * 24, y: 37.3 + Math.floor(i / 3) * 16.4, w: 22, h: 14, action: () => setSelection(label) }));
    add("Next: social profile", "media", 15, 70, 70, 4.5);
  }
  if (screen === "media") add("Next: community policy", "policy", 33, 70.8, 34, 4.5);
  if (screen === "policy") add("Complete demo onboarding", "discover", 31, 63.5, 39, 4);
  if (screen === "search") add("Show search results", "results", 25, 8, 60, 35);
  if (screen === "results" || screen === "filters") {
    add(screen === "results" ? "Show filters" : "Hide filters", screen === "results" ? "filters" : "results", screen === "results" ? 6 : 25, screen === "results" ? 20 : 16.5, 12, 3);
    add("Open a listing", "product", screen === "filters" ? 27 : 6, 26, screen === "filters" ? 65 : 88, 24);
    add("Contact a seller", "contact", 6, 51, 88, 4);
  }
  if (screen === "product") {
    add("Back to results", "results", 5, 10, 15, 5);
    add("Contact seller", "contact", 53, 38, 25, 3);
    hotspots.push({ label: saved ? "Unsave item" : "Save item", x: 79, y: 38, w: 3.5, h: 3, action: save });
    add("Read review", "review", 5, 70, 29, 14);
  }
  if (screen === "review") add("Close review", "product", 70, 34, 4, 5);
  if (screen === "contact") add("Close contact form", "product", 70, 29, 4, 5);
  if (screen === "profile" || screen === "wishlist") {
    add("Active listings", "active", 36.7, 20, 14.6, 3);
    add("Wishlist", "wishlist", 51.4, 20, 14.6, 3);
    add("View orders", "profile", 66.1, 20, 14.6, 3);
    add("Open seller listing", "product", 38, 35, 55, 10);
    if (screen === "wishlist") add("Contact seller", "contact", 52, 45, 13, 2.3);
  }
  if (screen === "active" || screen === "previous") {
    add("Active listings", "active", 34.5, 22, 29, 3.5);
    add("Previous listings", "previous", 64, 22, 29, 3.5);
    add("Open seller listing", "product", 36, 30.5, 55, 15);
    add("Message this seller", "messages", 9.3, 65.3, 18.3, 2.5);
  }
  if (screen === "listing") hotspots.push({ label: "Fill out demo listing", x: 11, y: 20, w: 78, h: 64, action: () => { setListingForm(true); setPreview(false); } });
  const send = () => { if (!draft.trim()) return; setMessages(previous => [...previous, draft.trim()]); setDraft(""); go("messages"); setNotice("Demo message added. Nothing was sent to a real seller."); };
  return <section className={`cmu-prototype ${fullPage ? "cmu-full" : ""}`} aria-label="CMUsed interactive prototype">
    <div className="cmu-toolbar">
      <div className="cmu-context" aria-live="polite" aria-atomic="true">
        <strong>{screens[screen][0]}</strong>
        <p className="cmu-sr">{screenDescriptions[screen]}</p>
      </div>
      <div className="cmu-tools">
        <button type="button" onClick={back} disabled={!history.length}>← Back</button>
        <button type="button" onClick={() => { go("login"); setHistory([]); }}>Restart</button>
        {!fullPage && <a href={`${import.meta.env.BASE_URL}cmused.html`} target="_blank" rel="noreferrer">Open full screen ↗</a>}
      </div>
    </div>
    <div className="cmu-viewport" ref={viewport} tabIndex={0} aria-label={`${screens[screen][0]} screen; scroll to explore`}>
      <div className="cmu-canvas" key={screen}>
        <img src={`${import.meta.env.BASE_URL}cmused/${encodeURIComponent(screens[screen][1])}.jpg`} alt={`CMUsed ${screens[screen][0]} design exported from Figma`} />
        {hotspots.map((spot, i) => <button type="button" className="cmu-hotspot" key={i} aria-label={spot.label} style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${Math.min(spot.w, 100 - spot.x)}%`, height: `${spot.h}%` }} onClick={() => spot.action ? spot.action() : spot.to && go(spot.to)} />)}
      </div>
    </div>
    {selection && <p className="cmu-feedback" role="status">Selected: {selection}. Choose Next to continue.</p>}
    {screen === "search" && <form className="cmu-form" onSubmit={e => { e.preventDefault(); go("results"); setNotice(`Showing the supplied sample results${search ? ` for “${search}”` : ""}.`); }}><label>Search the demo<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try big sofa" /></label><button type="submit">Search</button></form>}
    {(screen === "contact" || screen === "messages") && <div className="cmu-chat">
      <div aria-live="polite">{messages.map((message, i) => <p key={i} className="cmu-message">{message}</p>)}</div>
      <form className="cmu-form" onSubmit={e => { e.preventDefault(); send(); }}><label>Message seller<input required value={draft} onChange={e => setDraft(e.target.value)} placeholder="Hi! Is this still available?" /></label><button type="submit">Send demo message</button></form>
    </div>}
    {screen === "listing" && !listingForm && <button className="cmu-start" type="button" onClick={() => { setListingForm(true); setPreview(false); }}>Try creating a listing</button>}
    {screen === "listing" && listingForm && <form className="cmu-listing" onSubmit={e => { e.preventDefault(); if (!preview) setPreview(true); else { setListingForm(false); setNotice(`“${listing.name}” published in this demo session. No real listing was created.`); } }}>
      <h3>{preview ? "Preview your listing" : "Create a demo listing"}</h3>
      {preview ? <p>{listing.name} · ${Number(listing.price).toFixed(2)} · {listing.category}<br />{listing.description}</p> : <>
        <label>Item name<input required value={listing.name} onChange={e => setListing({ ...listing, name: e.target.value })} /></label>
        <label>Price ($)<input type="number" min="0" step="0.01" required value={listing.price} onChange={e => setListing({ ...listing, price: e.target.value })} /></label>
        <label>Category<select value={listing.category} onChange={e => setListing({ ...listing, category: e.target.value })}>{["Furniture", "Clothing", "Electronics", "Scooter/Bikes", "Storage/Organizers"].map(category => <option key={category}>{category}</option>)}</select></label>
        <label>Description<textarea required value={listing.description} onChange={e => setListing({ ...listing, description: e.target.value })} /></label>
      </>}
      {preview && <button type="button" onClick={() => setPreview(false)}>Edit</button>}<button type="submit">{preview ? "Publish demo listing" : "Preview listing"}</button>
    </form>}
    {notice && <p className="cmu-feedback" role="status">{notice}</p>}
  </section>;
}
