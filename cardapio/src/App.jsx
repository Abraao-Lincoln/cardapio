import React, { useState } from "react";
import "./App.css";
import logo from './images/bardoduda.jpg';

// Componente único e simples para usar como src/App.jsx
// Projetado para Vite + React. Usa classes tailwind (opcional).
// Estrutura de dados abaixo — edite conforme desejar.

export default function App() {
  const [openSet] = useState(() => new Set());
  const [, setToggle] = useState(0);
  const [query, setQuery] = useState("");
  const [openItems] = useState(() => new Set());
  const [, setOpenItemsToggle] = useState(0);

  const toggleSection = (id) => {
    // use Set to track opened sections (create new Set to trigger updates)
    const s = new Set(openSet);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    // mutate local Set and force state change to rerender
    // (we rely on openSet reference changed by assignment below)
    // To keep it simple, reassign the Set on the component instance
    // eslint-disable-next-line no-param-reassign
    openSet.clear();
    s.forEach((v) => openSet.add(v));
    setToggle((n) => n + 1);
  };
  const toggleItem = (key) => {
    const s = new Set(openItems);
    if (s.has(key)) s.delete(key);
    else s.add(key);
    openItems.clear();
    s.forEach((v) => openItems.add(v));
    setOpenItemsToggle((n) => n + 1);
  };
  const format = (v) =>
    typeof v === "number" ? `R$ ${v.toFixed(2).replace(".", ",")}` : v;

  // Extract structured variant prices (dose/lata/garrafa) from item data or from textual annotations in the name.
  const parseVariants = (item) => {
    const srcName = (item.name || "").trim();
    let displayName = srcName;
    let dose =
      item.dose != null ? item.dose : item.price != null ? item.price : null;
    let lata = item.lata != null ? item.lata : null;
    let garrafa = item.garrafa != null ? item.garrafa : null;

    // Look for `lata` and `garrafa` prices inside the name text like "— lata 13,00" or "lata 13,00"
    const re = /(?:lata|garrafa)\s*[:\-–—]?\s*([0-9]+(?:[,\.][0-9]{2})?)/gi;
    let m;
    while ((m = re.exec(srcName)) !== null) {
      const whole = m[0];
      const priceText = m[1];
      const normalized = parseFloat(priceText.replace(",", "."));
      if (/lata/i.test(whole)) lata = normalized;
      if (/garrafa/i.test(whole)) garrafa = normalized;
    }

    // Remove parenthetical '(dose)' markers and explicit price clauses from display name
    displayName = displayName.replace(/\(dose\)/i, "");
    displayName = displayName.replace(/\s*[—–-].*$/g, "");
    displayName = displayName.replace(/\s+\b(lata|garrafa)\b[^\s]*/gi, "");
    displayName = displayName.replace(/\s+—\s*/g, " ");
    displayName = displayName.trim();

    return { displayName, dose, lata, garrafa };
  };

  // Parse flavor list from names like "Sucos (laranja, maracujá, acerola)"
  const parseFlavors = (item) => {
    const src = (item.name || "").trim();
    const m = src.match(/\(([^)]+)\)/);
    if (!m) return { title: src, flavors: null };
    const flavors = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const title = src.replace(/\s*\([^)]+\)/, "").trim();
    return { title, flavors };
  };
  const menu = [
    {
      id: "espetos",
      title: "Espetos",
      note: "Espetos: R$ 7,00 (exceto Camarão R$ 8,00)",
      items: [
        { name: "Carne" },
        { name: "Carne com bacon" },
        { name: "Cupim" },
        { name: "Charque" },
        { name: "Asa" },
        { name: "Queijo" },
        { name: "Queijo com melado de cana" },
        { name: "Frango" },
        { name: "Frango com bacon" },
        { name: "Coração de galinha" },
        { name: "Calabresa" },
        { name: "Língua de boi" },
        { name: "Costelinha de porco" },
        { name: "Tripa de porco" },
        { name: "Pão de alho" },
        { name: "Camarão", price: 8.0 },
      ],
      defaultPrice: 7.0,
    },

    {
      id: "caldos",
      title: "Caldos 500ml",
      items: [
        { name: "Sururu", price: 20.0 },
        { name: "Dobradinha", price: 20.0 },
        { name: "Camarão", price: 20.0 },
      ],
    },

    {
      id: "salgados",
      title: "Salgados",
      items: [{ name: "Coxinha", price: 7.0 }],
    },

    {
      id: "petiscos",
      title: "Petiscos",
      items: [
        { name: "Macaxeira cozida", price: 15.9 },
        { name: "Macaxeira frita", price: 17.9 },
        { name: "Batata frita", price: 20.9 },
        { name: "Queijo coalho à milanesa", price: 20.9 },
        { name: "Calabresa com fritas", price: 37.9 },
        { name: "Frango crocante com fritas", price: 46.9 },
        { name: "Camarão com fritas", price: 55.9 },
        { name: "Carne de sol com fritas ou macaxeira", price: 52.9 },
        { name: "Carne de sol com fritas e macaxeira", price: 57.9 },
        { name: "Filé com fritas ou macaxeira", price: 57.9 },
      ],
    },

    {
      id: "jantas",
      title: "Jantas",
      items: [
        { name: "Cuscuz com guisado", price: 20.0 },
        { name: "Cuscuz com picado de carneiro", price: 20.0 },
        {
          name: "Cuscuz com carne de sol mussarela, requeijão e ovo",
          price: 15.0,
        },
        { name: "Cuscuz com carne de sol requeijão e mussarela", price: 13.0 },
        { name: "Cuscuz molhado no leite de coco", price: 4.5 },
        { name: "Pão francês com guisado", price: 8.0 },
        { name: "Sopa de feijão", price: 10.0 },
        { name: "Sopa de carne", price: 10.0 },
        { name: "Tapioca na manteiga ou leite de coco", price: 5.0 },
        { name: "Tapioca com frango e queijo", price: 10.0 },
        { name: "Tapioca com carne e queijo", price: 11.0 },
        { name: "Tapioca carne, ovo e queijo", price: 13.0 },
      ],
    },

    {
      id: "cervejas",
      title: "Cervejas",
      note: "Clientes devem buscar disponibilidade e valores",
      items: [
        { name: "Cerveja 600ml" },
        { name: "Cerveja longneck" },
        { name: "Cerveja lata" },
        { name: "Cerveja litrinho" },
        { name: "Cerveja 0% álcool" },
      ],
    },

    {
      id: "destilados",
      title: "Destilados (Dose)",
      items: [
        { name: "Campari", price: 8.0 },
        { name: "Vodka Slova", price: 4.0 },
        { name: "Vodka Smirnoff", price: 6.0 },
        { name: "Whisky Old Parr", price: 15.0 },
        { name: "Johnnie Walker", price: 13.0 },
        { name: "Black and White", price: 10.0 },
        { name: "Conhaque", price: 4.0 },
        { name: "Montilla", price: 6.0 },
      ],
    },

    {
      id: "cachacas",
      title: "Cachaças",
      items: [
        { name: "51 (dose)", price: 3.0 },
        { name: "Cabaré (dose)", price: 6.0 },
        { name: "Seleta (dose)", price: 7.5 },
        { name: "Samanaú (dose)", price: 6.0 },
        { name: "São João (dose)", price: 3.0 },
        { name: "Ypióca (dose) — lata 13,00", price: 3.0 },
        { name: "Pitú (dose) — lata 12,00", price: 3.0 },
        { name: "Pitú limão — lata 12,00", price: 3.0 },
        { name: "Pitú mel — lata 12,00", price: 3.0 },
        { name: "Carang prata (dose) — lata 12,00", price: 3.0 },
        { name: "Carang ouro (dose) — lata 12,00", price: 3.0 },
        { name: "Matuta (dose) — lata 15,00 — garrafa 22,00", price: 6.0 },
      ],
    },

    {
      id: "caipirinhas",
      title: "Caipirinhas",
      items: [
        { name: "Caipirinha", price: 8.0 },
        { name: "Caipirosca", price: 10.0 },
      ],
    },

    {
      id: "diversos",
      title: "Diversos",
      items: [
        {
          name: "Sucos (laranja, maracujá, acerola, graviola, uva, caju, cajá e goiaba)",
          price: 7.0,
        },
        { name: "Água mineral", price: 3.0 },
        { name: "Água com gás", price: 4.0 },
        { name: "Refrigerante 1L", price: 10.0 },
        { name: "Refrigerante lata", price: 6.0 },
        { name: "RedBull", price: 14.0 },
      ],
    },
  ];

  return (
    <div className="mobile-root">
      <div className="mobile-card">
        <header className="m-header">
          <img src={logo} className="brand-img" alt="Bar do Duda logo" />
          <div className="brand-text">
            <h1>Cardápio Bar do Duda</h1>
          </div>
        </header>

        <div className="search-bar" style={{ marginBottom: 10 }}>
          <div className="search-icon">🔎</div>
          <input
            className="search-input"
            placeholder="Buscar item ou categoria..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="sections">
          {menu
            .map((section) => ({
              ...section,
              items: section.items.filter((it) =>
                (it.name || "")
                  .toLowerCase()
                  .includes(query.trim().toLowerCase())
              ),
            }))
            .filter((s) => s.items.length > 0 || query.trim() === "")
            .map((section) => {
              const icons = {
                espetos: "🍢",
                caldos: "🍲",
                salgados: "🥟",
                petiscos: "🍟",
                jantas: "🍽️",
                cervejas: "🍺",
                destilados: "🥃",
                cachacas: "🥃",
                caipirinhas: "🍸",
                diversos: "🧃",
              };
              const isOpen = openSet.has(section.id) || query.trim() !== "";
              return (
                <article key={section.id} className="section">
                  <div
                    className="section-head"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="section-left">
                      <div className="section-icon">
                        {icons[section.id] || "📦"}
                      </div>
                      <div>
                        <div className="section-title">{section.title}</div>
                        {section.note && (
                          <div className="section-note">{section.note}</div>
                        )}
                      </div>
                    </div>
                    <div className="chev">{isOpen ? "▾" : "▸"}</div>
                  </div>

                  {isOpen && (
                    <div className="items">
                      {section.items.map((it, idx) => {
                        const itemKey = `${section.id}__${idx}`;
                        const itemOpen = openItems.has(itemKey);
                        // Special compact rendering for cachaças
                        if (section.id === "cachacas") {
                          const { displayName, dose, lata, garrafa } =
                            parseVariants(it);
                          const primary =
                            dose != null
                              ? `Dose ${format(dose)}`
                              : it.price
                              ? format(it.price)
                              : "—";
                          return (
                            <div key={idx}>
                              <div className="item" style={{ paddingRight: 8 }}>
                                <div className="name">
                                  {displayName || it.name}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                  }}
                                >
                                  <div
                                    className="price"
                                    style={{ minWidth: 74, textAlign: "right" }}
                                  >
                                    {primary}
                                  </div>
                                  <button
                                    type="button"
                                    className="toggle-btn"
                                    aria-label={
                                      itemOpen
                                        ? "Fechar opções"
                                        : "Abrir opções"
                                    }
                                    aria-pressed={itemOpen}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(itemKey);
                                    }}
                                  >
                                    {itemOpen ? "−" : "+"}
                                  </button>
                                </div>
                              </div>
                              {itemOpen && (
                                <div
                                  className="item-variants"
                                  style={{
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    paddingBottom: 6,
                                  }}
                                >
                                  {dose != null && (
                                    <div className="price-pill">
                                      Dose — {format(dose)}
                                    </div>
                                  )}
                                  {lata != null && (
                                    <div className="price-pill">
                                      Lata — {format(lata)}
                                    </div>
                                  )}
                                  {garrafa != null && (
                                    <div className="price-pill">
                                      Garrafa — {format(garrafa)}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }

                        // Special rendering for Sucos inside `diversos` — extract flavors and provide a toggle
                        if (section.id === "diversos") {
                          const { title, flavors } = parseFlavors(it);
                          const primary =
                            it.price != null ? format(it.price) : "—";
                          // If no flavors, render as normal
                          if (!flavors || flavors.length === 0) {
                            return (
                              <div key={idx} className="item">
                                <div className="name">{it.name}</div>
                                <div className="price">{primary}</div>
                              </div>
                            );
                          }

                          return (
                            <div key={idx}>
                              <div className="item" style={{ paddingRight: 8 }}>
                                <div className="name">{title}</div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                  }}
                                >
                                  <div
                                    className="price"
                                    style={{ minWidth: 74, textAlign: "right" }}
                                  >
                                    {primary}
                                  </div>
                                  <button
                                    type="button"
                                    className="toggle-btn"
                                    aria-label={
                                      itemOpen
                                        ? "Fechar opções"
                                        : "Abrir opções"
                                    }
                                    aria-pressed={itemOpen}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(itemKey);
                                    }}
                                  >
                                    {itemOpen ? "−" : "+"}
                                  </button>
                                </div>
                              </div>
                              {itemOpen && (
                                <div
                                  className="item-variants"
                                  style={{
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    paddingBottom: 6,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 6,
                                  }}
                                >
                                  {flavors.map((f, i) => (
                                    <div key={i} className="flavor-pill">
                                      {f}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div key={idx} className="item">
                            <div className="name">{it.name}</div>
                            <div className="price">
                              {it.price ?? section.defaultPrice
                                ? format(it.price ?? section.defaultPrice)
                                : "—"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
        </div>

        <div className="mobile-footer">
          * Preços sujeitos à alteração. Para cervejas, consulte disponibilidade
          e valores.
        </div>
      </div>
    </div>
  );
}
