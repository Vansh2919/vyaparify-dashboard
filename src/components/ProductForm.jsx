import { useState } from "react";
import { IconUpload } from "./Icons.jsx";
import ProductThumb from "./ProductThumb.jsx";

const emptyForm = { name: "", category: "Men", price: "", stock: "", description: "", status: "active" };

export default function ProductForm({ initial, onSubmit, onCancel, submitLabel = "Save product" }) {
  const [form, setForm] = useState({ ...emptyForm, ...initial });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(null); // null | 'draft' | 'publish'

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required.";
    if (!form.price || Number(form.price) <= 0) next.price = "Enter a valid price.";
    if (form.stock === "" || Number(form.stock) < 0) next.stock = "Enter a valid stock quantity.";
    if (!form.description.trim()) next.description = "Add a short description so customers know what they're buying.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (mode) => (e) => {
    e.preventDefault();
    if (mode === "publish" && !validate()) return;
    setSaving(mode);
    setTimeout(() => {
      setSaving(null);
      onSubmit({
        ...form,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        status: mode === "draft" ? "draft" : form.status === "draft" ? "active" : form.status,
      });
    }, 700);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit("publish")} noValidate>
      <div className="product-form__grid">
        <div className="card">
          <div className="card__head"><h3>Photo</h3></div>
          <div className="upload-box">
            <ProductThumb category={form.category} size="md" />
          </div>
          <button type="button" className="btn btn--secondary btn--full" style={{ marginTop: 12 }}>
            <IconUpload /> Upload image
          </button>
          <p className="hint" style={{ marginTop: 8 }}>PNG or JPG, up to 5MB. Square images work best.</p>
        </div>

        <div className="card">
          <div className="card__head"><h3>Product details</h3></div>

          <div className="field">
            <label htmlFor="name">Product name</label>
            <input
              id="name" type="text" placeholder="e.g. Oversized Cotton Shirt"
              value={form.name} onChange={(e) => update("name", e.target.value)}
              className={errors.name ? "has-error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category" value={form.category} onChange={(e) => update("category", e.target.value)}>
                <option>Men</option><option>Women</option><option>Unisex</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="stock">Stock quantity</label>
              <input
                id="stock" type="number" min="0" placeholder="0"
                value={form.stock} onChange={(e) => update("stock", e.target.value)}
                className={errors.stock ? "has-error" : ""}
              />
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="price">Price</label>
            <div className="input-prefix">
              <span>₹</span>
              <input
                id="price" type="number" min="0" placeholder="0.00"
                value={form.price} onChange={(e) => update("price", e.target.value)}
                className={errors.price ? "has-error" : ""}
              />
            </div>
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description" placeholder="Describe fabric, fit, and care instructions…"
              value={form.description} onChange={(e) => update("description", e.target.value)}
              className={errors.description ? "has-error" : ""}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
        </div>
      </div>

      <div className="product-form__actions">
        {onCancel && <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>}
        <button type="button" className="btn btn--secondary" onClick={handleSubmit("draft")} disabled={!!saving}>
          {saving === "draft" ? "Saving…" : "Save as draft"}
        </button>
        <button type="submit" className="btn btn--primary" disabled={!!saving}>
          {saving === "publish" ? "Publishing…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
