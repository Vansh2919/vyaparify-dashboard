import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import ProductForm from "../components/ProductForm.jsx";
import "../styles/product-form.css";

export default function AddProduct() {
  const { addProduct } = useApp();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleSubmit = (data) => {
    addProduct(data);
    setToast(data.status === "draft" ? "Saved as draft" : "Product published to your storefront");
    setTimeout(() => navigate("/products"), 900);
  };

  return (
    <div className="product-form-page">
      <div className="dashboard__header">
        <div>
          <h1>Add product</h1>
          <p>Fill in the details below — you can edit this anytime.</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} onCancel={() => navigate("/products")} submitLabel="Publish product" />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
