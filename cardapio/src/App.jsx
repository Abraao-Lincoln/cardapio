import React from "react";

// Componente único e simples para usar como src/App.jsx
// Projetado para Vite + React. Usa classes tailwind (opcional).
// Estrutura de dados abaixo — edite conforme desejar.

export default function App() {
  const format = (v) =>
    typeof v === "number" ? `R$ ${v.toFixed(2).replace('.', ',')}` : v;

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
        { name: "Cuscuz com carne de sol mussarela, requeijão e ovo", price: 15.0 },
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
        { name: "Sucos (laranja, maracujá, acerola, graviola, uva, caju, cajá e goiaba)", price: 7.0 },
        { name: "Água mineral", price: 3.0 },
        { name: "Água com gás", price: 4.0 },
        { name: "Refrigerante 1L", price: 10.0 },
        { name: "Refrigerante lata", price: 6.0 },
        { name: "RedBull", price: 14.0 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        <header className="px-6 py-6 border-b">
          <h1 className="text-3xl font-bold">Cardápio</h1>
          <p className="mt-1 text-sm text-gray-600">Escaneie o QR para visualizar no celular.</p>
        </header>

        <main className="p-6 space-y-6">
          {menu.map((section) => (
            <section key={section.id}>
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {section.note && <span className="text-sm text-gray-500">{section.note}</span>}
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.items.map((it, idx) => {
                  const price = it.price ?? section.defaultPrice ?? null;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="text-sm sm:text-base">{it.name}</div>
                      <div className="text-sm font-medium text-gray-700">
                        {price === null ? "—" : format(price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <footer className="text-xs text-gray-500">
            * Preços sujeitos à alteração. Para cervejas, consulte disponibilidade e valores.
          </footer>
        </main>
      </div>
    </div>
  );
}
