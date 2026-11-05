import { useState, type ReactNode } from "react"
import PdvScreen from "./PdvScreen"
import RouteScreen, { type RouteClient } from "./RouteScreen"

type View = "cliente" | "vendedor"
type SellerStage = "rota" | "pdv" | "recomendacoes"
type IconName = "arrow" | "bag" | "bell" | "chevron" | "close" | "grid" | "heart" | "insight" | "profile" | "route" | "search" | "sparkles" | "store" | "trend"

type Product = {
  id: number
  sku: string
  suggestionType:
    | "Novo SKU"
    | "Reposição"
    | "Acompanhamento de aderência de novo SKU"
  suggestionReason: string
  name: string
  category: string
  flavor: string
  price: string
  score: number
  description: string
  reason: string
  salesTip: string
  color: string
  accent: string
  kind: "bottle" | "can"
  tag?: string
}

const products: Product[] = [
  {
    id: 1,
    sku: "FRK-001",
    suggestionType: "Reposição",
    suggestionReason:
      "Produto com alta recorrência no histórico e estoque estimado próximo do mínimo.",
    name: "Fruki Guaraná",
    category: "Refrigerante",
    flavor: "Guaraná • 2L",
    price: "R$ 8,49",
    score: 98,
    description:
      "O sabor clássico e refrescante que combina com todos os momentos.",
    reason:
      "Você costuma comprar bebidas para compartilhar nos finais de semana.",
    salesTip:
      "Destaque o tamanho família e o alto score com o histórico do cliente.",
    color: "#f7b500",
    accent: "#f15a24",
    kind: "bottle",
    tag: "Mais indicado",
  },
  {
    id: 2,
    sku: "FRK-002",
    suggestionType: "Reposição",
    suggestionReason:
      "Item presente nas últimas compras e com boa saída para acompanhar refeições.",
    name: "Água da Pedra",
    category: "Água mineral",
    flavor: "Com gás • 500ml",
    price: "R$ 2,99",
    score: 95,
    description:
      "Leve, equilibrada e naturalmente refrescante para acompanhar sua rotina.",
    reason:
      "Complementa as compras de almoço e aparece com frequência na sua cesta.",
    salesTip:
      "Sugira para acompanhar refeições e formar um mix de bebidas mais completo.",
    color: "#38b6c9",
    accent: "#0877b9",
    kind: "bottle",
  },
  {
    id: 3,
    sku: "FRK-003",
    suggestionType: "Novo SKU",
    suggestionReason:
      "O perfil do estabelecimento indica potencial para sabores cítricos em embalagens individuais.",
    name: "Fruki Citrus",
    category: "Refrigerante",
    flavor: "Cítrico • 350ml",
    price: "R$ 3,79",
    score: 92,
    description:
      "Um encontro vibrante de sabores cítricos em uma versão prática e gelada.",
    reason:
      "Seu perfil mostra preferência por sabores leves, cítricos e embalagens individuais.",
    salesTip:
      "Apresente como uma descoberta refrescante próxima aos sabores já preferidos.",
    color: "#b7d532",
    accent: "#087f4f",
    kind: "can",
  },
  {
    id: 4,
    sku: "FRK-004",
    suggestionType: "Acompanhamento de aderência de novo SKU",
    suggestionReason:
      "SKU incluído recentemente no mix e com sinais positivos de recompra.",
    name: "Fruki Laranja",
    category: "Refrigerante",
    flavor: "Laranja • 2L",
    price: "R$ 8,49",
    score: 89,
    description:
      "Sabor de laranja intenso, alegre e perfeito para dividir com a família.",
    reason:
      "Boa aderência ao seu consumo familiar e à preferência por sabores frutados.",
    salesTip:
      "Conecte com ocasiões em família e sugira junto a lanches de fim de semana.",
    color: "#ff8a24",
    accent: "#f04f24",
    kind: "bottle",
  },
  {
    id: 5,
    sku: "FRK-005",
    suggestionType: "Reposição",
    suggestionReason:
      "Volume de compras recente sugere necessidade de reposição para manter a disponibilidade.",
    name: "Fruki Cola",
    category: "Refrigerante",
    flavor: "Cola • 600ml",
    price: "R$ 5,49",
    score: 86,
    description:
      "Sabor marcante na medida certa, em uma embalagem ideal para levar.",
    reason:
      "Recomendado pelo equilíbrio entre praticidade, preço e preferências anteriores.",
    salesTip: "Reforce a conveniência da embalagem e o ótimo custo-benefício.",
    color: "#e74437",
    accent: "#991f2d",
    kind: "bottle",
  },
  {
    id: 6,
    sku: "FRK-006",
    suggestionType: "Novo SKU",
    suggestionReason:
      "O aumento da procura por opções sem açúcar cria uma oportunidade para ampliar o mix.",
    name: "Fruki Guaraná Zero",
    category: "Zero açúcar",
    flavor: "Guaraná • 350ml",
    price: "R$ 3,79",
    score: 83,
    description:
      "Todo o sabor do guaraná com zero açúcar e muita refrescância.",
    reason:
      "Alternativa alinhada ao interesse crescente por escolhas com menos açúcar.",
    salesTip:
      "Ofereça como opção leve sem abrir mão do sabor conhecido do guaraná.",
    color: "#205f49",
    accent: "#153f33",
    kind: "can",
  },
]

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 6 6 6-6 6" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    insight: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.1 1.2-1.2 2.5h-4.6c-.1-1.3-.4-1.9-1.2-2.5Z" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 0-6h2a3 3 0 0 0 3-3V8" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3Z" />
        <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
        <path d="m19 13 .6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6L19 13Z" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v10h16V10" />
        <path d="M3 4h18l-2 6H5L3 4Z" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-9" />
        <path d="M16 6h5v5" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Logo() {
  return (
    <div className="logo" aria-label="Fruki Recomenda">
      <span className="logo-mark">
        <img src="/assets/fruki-logo.png" alt="" />
      </span>
      <span className="logo-name">
        fruki<span>recomenda</span>
      </span>
    </div>
  )
}

function ProductVisual({
  product,
  compact = false,
}: {
  product: Product
  compact?: boolean
}) {
  return (
    <div
      className={`product-visual ${compact ? "product-visual--compact" : ""}`}
      style={
        {
          "--product-color": product.color,
          "--product-accent": product.accent,
        } as React.CSSProperties
      }
    >
      <img
        className="product-photo"
        src="/assets/fruki-product.png"
        alt={`Embalagem de ${product.name}`}
      />
      <div className="product-identifier">
        <span>{product.sku}</span>
        <strong>{product.name}</strong>
      </div>
    </div>
  )
}

function Header({
  view,
  setView,
}: {
  view: View
  setView: (view: View) => void
}) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Logo />
        <nav className="view-switcher" aria-label="Alternar área">
          <button
            className={view === "cliente" ? "active" : ""}
            onClick={() => setView("cliente")}
          >
            <Icon name="profile" size={17} /> Cliente
          </button>
          <button
            className={view === "vendedor" ? "active" : ""}
            onClick={() => setView("vendedor")}
          >
            <Icon name="store" size={17} /> Vendedor
          </button>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Notificações">
            <Icon name="bell" />
          </button>
          <button className="avatar" aria-label="Abrir perfil">
            {view === "cliente" ? "MC" : "AS"}
          </button>
        </div>
      </div>
    </header>
  )
}

function CustomerCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false)
  return (
    <article className="product-card">
      <div className="product-card__visual">
        {product.tag && <span className="tag">{product.tag}</span>}
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          aria-label={
            liked ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          onClick={() => setLiked(!liked)}
        >
          <Icon name="heart" size={18} />
        </button>
        <ProductVisual product={product} />
      </div>
      <div className="product-card__content">
        <span className="eyebrow">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="flavor">{product.flavor}</p>
        <p className="description">{product.description}</p>
        <div className="product-card__footer">
          <strong>{product.price}</strong>
          <button className="round-action" aria-label={`Ver ${product.name}`}>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}

function CustomerView() {
  return (
    <main>
      <section className="customer-hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <Icon name="sparkles" size={16} /> Seleção feita para você
          </div>
          <h1>
            Mariana, preparamos
            <br />
            <span>uma seleção especial</span> para você.
          </h1>
          <p>
            Selecionamos bebidas que combinam com o seu gosto e com os momentos
            que você mais curte.
          </p>
        </div>
        <div className="hero-art">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <img
            className="hero-fruki-logo"
            src="/assets/fruki-hero-logo.jpg"
            alt="Fruki"
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Feito para o seu gosto</span>
            <h2>Recomendados para você</h2>
            <p>6 escolhas baseadas nas suas preferências e compras recentes.</p>
          </div>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <CustomerCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </main>
  )
}

function getScoreChance(score: number) {
  if (score >= 95) return { label: "Alta chance", tone: "high" }
  if (score >= 90) return { label: "Boa chance", tone: "good" }
  return { label: "Boa opção", tone: "option" }
}

function SellerProduct({
  product,
  index,
}: {
  product: Product
  index: number
}) {
  const chance = getScoreChance(product.score)
  return (
    <article className="seller-product">
      <div className="seller-product__summary">
        <span className="rank">{String(index + 1).padStart(2, "0")}</span>
        <ProductVisual product={product} compact />
        <div className="seller-product__name">
          <span className="eyebrow">{product.category}</span>
          <h3>{product.name}</h3>
          <p>
            {product.flavor} <i /> {product.price}
          </p>
        </div>
        <div className="match-score">
          <div
            className={`score-ring score-ring--${chance.tone}`}
            style={
              { "--score": `${product.score * 3.6}deg` } as React.CSSProperties
            }
          >
            <span>{product.score}%</span>
          </div>
          <small>Score</small>
        </div>
        <span className={`status status--${chance.tone}`}>
          <i /> {chance.label}
        </span>
      </div>
      <div className="seller-suggestion">
        <div>
          <small>Tipo de sugestão</small>
          <strong>{product.suggestionType}</strong>
        </div>
        <div>
          <small>Motivo da sugestão</small>
          <p>{product.suggestionReason}</p>
        </div>
      </div>
    </article>
  )
}

function SellerView({
  onBack,
}: {
  onBack?: () => void
}) {
  return (
    <main className="seller-main">
      {onBack && (
        <button
          className="flow-back-button flow-back-button--chevron"
          onClick={onBack}
        >
          <Icon name="chevron" size={17} /> Voltar para o atendimento PDV
        </button>
      )}
      <section className="seller-topbar">
        <div>
          <span className="eyebrow">Painel de recomendações</span>
          <h1>Bom dia, André!</h1>
          <p>Veja as melhores oportunidades para cada cliente.</p>
        </div>
      </section>

      <section className="seller-workspace">
        <aside className="client-panel">
          <div className="client-panel__heading">
            <div>
              <span className="eyebrow">Cliente selecionada</span>
              <h2>Mercado Costa</h2>
            </div>
            <button className="more-button" aria-label="Mais opções">
              •••
            </button>
          </div>
          <div className="client-profile">
            <div className="client-avatar">MC</div>
            <div>
              <strong>Mariana Costa</strong>
              <span>Porto Alegre • RS</span>
            </div>
          </div>
          <div className="client-info">
            <div>
              <span>Segmento do cliente</span>
              <strong>Mercado</strong>
            </div>
            <div>
              <span>Ticket médio</span>
              <strong>R$ 86,40</strong>
            </div>
            <div>
              <span>Última compra</span>
              <strong>12 jun. 2025</strong>
            </div>
          </div>
        </aside>

        <div className="recommendation-panel">
          <div className="recommendation-heading">
            <div>
              <div className="title-line">
                <h2>Produtos recomendados</h2>
                <span>6 itens</span>
              </div>
              <p>Ordenados pela maior probabilidade de interesse.</p>
            </div>
            <div className="panel-actions">
              <button className="search-button" aria-label="Buscar">
                <Icon name="search" size={19} />
              </button>
              <button className="sort-button">
                Maior score <Icon name="chevron" size={16} />
              </button>
            </div>
          </div>
          <div className="seller-list">
            {products.map((product, index) => (
              <SellerProduct
                product={product}
                index={index}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [view, setView] = useState<View>("cliente")
  const [sellerStage, setSellerStage] = useState<SellerStage>("rota")
  const [selectedRouteClient, setSelectedRouteClient] =
    useState<RouteClient | null>(null)

  const selectView = (nextView: View) => {
    setView(nextView)
    if (nextView === "vendedor") {
      setSellerStage("rota")
      setSelectedRouteClient(null)
    }
  }

  return (
    <div className={`app app--${view}`}>
      <Header view={view} setView={selectView} />
      {view === "cliente" && <CustomerView />}
      {view === "vendedor" && sellerStage === "rota" && (
        <RouteScreen
          embedded
          onSelectClient={(client) => {
            setSelectedRouteClient(client)
            setSellerStage("pdv")
          }}
        />
      )}
      {view === "vendedor" && sellerStage === "pdv" && (
        <PdvScreen
          embedded
          client={selectedRouteClient ?? undefined}
          onBack={() => setSellerStage("rota")}
          onOpenRecommendations={() => setSellerStage("recomendacoes")}
        />
      )}
      {view === "vendedor" && sellerStage === "recomendacoes" && (
        <SellerView onBack={() => setSellerStage("pdv")} />
      )}
      {view === "cliente" && (
        <footer>
          <Logo />
          <p>Boas escolhas deixam a vida mais leve.</p>
          <span>© 2025 Fruki Recomenda</span>
        </footer>
      )}
    </div>
  )
}
