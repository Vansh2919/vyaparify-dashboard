import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import ProductThumb from "../components/ProductThumb.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { IconSearch, IconPlus, IconBox, IconTrash } from "../components/Icons.jsx";
import "../styles/products.css";

const CATEGORIES = ["All", "Men", "Women", "Unisex"];

export default function ProductListing() {
  const { products, deleteProduct } = useApp();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // 'loading' | 'error' | 'success'
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [couponOpen, setCouponOpen] = useState(true);
  const [couponCopied, setCouponCopied] = useState(false);

  const load = () => {
    setStatus("loading");
    setTimeout(() => setStatus("success"), 650);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  return (
    <div className="products-page">
      <div className="dashboard__header">
        <div>
          <h1>Products</h1>
          <p>{products.length} product{products.length !== 1 ? "s" : ""} in your catalog</p>
        </div>
        <button className="btn btn--primary" onClick={() => navigate("/products/new")}>
          <IconPlus /> Add product
        </button>
      </div>

      {couponOpen && (
        <div className="coupon-popup">
          <button className="coupon-popup__close" onClick={() => setCouponOpen(false)} aria-label="Close">×</button>
          <div className="coupon-popup__body">
            <div className="coupon-popup__left">
              <p className="coupon-popup__label">Merchant promo</p>
              <h3>Avail upto <span>₹200 OFF</span></h3>
              <p className="coupon-popup__sub">On your next 5 orders · Use code at checkout</p>
              <div className="coupon-popup__code">
                <code>VYAPAR200</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText("VYAPAR200");
                    setCouponCopied(true);
                    setTimeout(() => setCouponCopied(false), 2000);
                  }}
                >
                  {couponCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div className="coupon-popup__right">
              <span className="coupon-popup__badge">FLAT ₹200 OFF</span>
              <p>Share this with customers on your storefront</p>
            </div>
          </div>
        </div>
      )}

      <div className="products-toolbar">
        <div className="topbar__search" style={{ maxWidth: 340 }}>
          <IconSearch />
          <input
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chip-group">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? "chip--active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {status === "loading" ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="product-card" key={i}>
              <div className="skeleton" style={{ aspectRatio: "1", borderRadius: "10px 10px 0 0" }} />
              <div style={{ padding: 14 }}>
                <div className="skeleton" style={{ height: 14, width: "70%", borderRadius: 6, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 12, width: "40%", borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      ) : status === "error" ? (
        <div className="card card--flush">
          <ErrorState
            title="Couldn't load your products"
            description="There was a problem reaching the server. Check your connection and try again."
            onRetry={() => load(false)}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card card--flush">
          <EmptyState
            icon={IconBox}
            title={products.length === 0 ? "No products yet" : "No products match your search"}
            description={
              products.length === 0
                ? "Add your first product to start selling — customers will see it on your storefront right away."
                : "Try a different search term or clear your filters."
            }
            actionLabel={products.length === 0 ? "Add your first product" : undefined}
            onAction={() => navigate("/products/new")}
          />
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <div className="product-card" key={p.id}>
              <button className="product-card__thumb-btn" onClick={() => navigate(`/products/${p.id}`)}>
                {p.offer > 0 && (
                  <span className="product-card__offer">{p.offer}% OFF</span>
                )}
                <ProductThumb category={p.category} />
              </button>
              <div className="product-card__body">
                <div className="product-card__top">
                  <StatusBadge status={p.stock === 0 ? "out_of_stock" : p.status} />
                  <button
                    className="product-card__delete"
                    onClick={() => setConfirmDelete(p)}
                    aria-label={`Delete ${p.name}`}
                  >
                    <IconTrash />
                  </button>
                </div>
                <button className="product-card__name" onClick={() => navigate(`/products/${p.id}`)}>
                  {p.name}
                </button>
                <p className="product-card__category">{p.category}</p>
                <div className="product-card__foot">
                  <div className="product-card__price-wrap">
                    <span className="product-card__price">₹{p.price.toLocaleString("en-IN")}</span>
                    {p.mrp && p.mrp > p.price && (
                      <span className="product-card__mrp">₹{p.mrp.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                  <span className="product-card__stock">{p.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDelete && (
        <div className="modal-scrim" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete "{confirmDelete.name}"?</h3>
            <p>This will remove the product from your catalog and storefront. This can't be undone.</p>
            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn--danger" onClick={() => handleDelete(confirmDelete.id)}>Delete product</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
