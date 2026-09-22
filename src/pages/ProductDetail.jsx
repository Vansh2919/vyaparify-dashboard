import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductThumb from "../components/ProductThumb.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { IconBox, IconAlert } from "../components/Icons.jsx";
import "../styles/product-form.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, updateProduct } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [id]);

  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="product-form-page">
        <div className="skeleton" style={{ height: 24, width: 200, borderRadius: 6, marginBottom: 24 }} />
        <div className="product-form__grid">
          <div className="card"><div className="skeleton" style={{ aspectRatio: "1", borderRadius: 10 }} /></div>
          <div className="card">
            {[60, 40, 80, 50].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 14, width: `${w}%`, borderRadius: 6, marginBottom: 16 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="card card--flush">
        <EmptyState
          icon={IconAlert}
          title="Product not found"
          description="This product may have been removed or the link is no longer valid."
          actionLabel="Back to products"
          onAction={() => navigate("/products")}
        />
      </div>
    );
  }

  const handleSubmit = (data) => {
    updateProduct(product.id, data);
    setEditing(false);
    setToast("Product updated");
    setTimeout(() => setToast(null), 2500);
  };

  if (editing) {
    return (
      <div className="product-form-page">
        <div className="dashboard__header">
          <div>
            <h1>Edit product</h1>
            <p>Update details for "{product.name}"</p>
          </div>
        </div>
        <ProductForm initial={product} onSubmit={handleSubmit} onCancel={() => setEditing(false)} submitLabel="Save changes" />
  
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card__head">
          <h3>Apply coupon code</h3>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 14 }}>
          Attach a promo code for this product. Customers can use it on your storefront checkout.
        </p>
        <div className="coupon-apply">
          <input
            type="text"
            placeholder="e.g. VYAPAR200"
            value={couponCode}
            onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg(null); }}
          />
          <button
            className="btn btn--primary"
            type="button"
            onClick={() => {
              if (!couponCode.trim()) {
                setCouponMsg({ type: "err", text: "Enter a coupon code" });
                return;
              }
              setCouponMsg({ type: "ok", text: `Coupon "${couponCode}" attached to this product` });
            }}
          >
            Apply
          </button>
        </div>
        {couponMsg && (
          <p style={{
            marginTop: 10, fontSize: 13, fontWeight: 600,
            color: couponMsg.type === "ok" ? "var(--teal)" : "var(--danger)"
          }}>
            {couponMsg.text}
          </p>
        )}
        <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--muted)" }}>
          Suggested: <button type="button" className="link-btn" onClick={() => setCouponCode("VYAPAR200")}>VYAPAR200</button>
          {" · "}
          <button type="button" className="link-btn" onClick={() => setCouponCode("FLAT100")}>FLAT100</button>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="dashboard__header">
        <div>
          <h1>{product.name}</h1>
          <p>Product ID: {product.id}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn--secondary" onClick={() => navigate("/products")}>Back</button>
          <button className="btn btn--primary" onClick={() => setEditing(true)}>Edit product</button>
        </div>
      </div>

      <div className="product-form__grid">
        <div className="card">
          <ProductThumb category={product.category} size="md" />
        </div>

        <div className="card">
          <div className="product-detail__row">
            <span>Status</span>
            <StatusBadge status={product.stock === 0 ? "out_of_stock" : product.status} />
          </div>
          <div className="product-detail__row">
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>
          <div className="product-detail__row">
            <span>Price</span>
            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          </div>
          <div className="product-detail__row">
            <span>Stock</span>
            <strong className={product.stock === 0 ? "text-danger" : product.stock <= 5 ? "text-amber" : ""}>
              {product.stock} units
            </strong>
          </div>
          <div className="product-detail__desc">
            <span>Description</span>
            <p>{product.description || "No description added yet — edit this product to add one for your customers."}</p>
          </div>
        </div>
      </div>


      <div className="card" style={{ marginTop: 20 }}>
        <div className="card__head">
          <h3>Apply coupon code</h3>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 14 }}>
          Attach a promo code for this product. Customers can use it on your storefront checkout.
        </p>
        <div className="coupon-apply">
          <input
            type="text"
            placeholder="e.g. VYAPAR200"
            value={couponCode}
            onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg(null); }}
          />
          <button
            className="btn btn--primary"
            type="button"
            onClick={() => {
              if (!couponCode.trim()) {
                setCouponMsg({ type: "err", text: "Enter a coupon code" });
                return;
              }
              setCouponMsg({ type: "ok", text: `Coupon "${couponCode}" attached to this product` });
            }}
          >
            Apply
          </button>
        </div>
        {couponMsg && (
          <p style={{
            marginTop: 10, fontSize: 13, fontWeight: 600,
            color: couponMsg.type === "ok" ? "var(--teal)" : "var(--danger)"
          }}>
            {couponMsg.text}
          </p>
        )}
        <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--muted)" }}>
          Suggested: <button type="button" className="link-btn" onClick={() => setCouponCode("VYAPAR200")}>VYAPAR200</button>
          {" · "}
          <button type="button" className="link-btn" onClick={() => setCouponCode("FLAT100")}>FLAT100</button>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
