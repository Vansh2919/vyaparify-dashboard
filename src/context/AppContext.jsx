import { createContext, useContext, useState } from "react";
import { products as initialProducts, store as initialStore } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [storeInfo, setStoreInfo] = useState(initialStore);

  const login = () => setIsAuthed(true);
  const logout = () => setIsAuthed(false);
  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  const addProduct = (product) => {
    setProducts((prev) => [{ ...product, id: `p${Date.now()}` }, ...prev]);
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStoreStatus = () => {
    setStoreInfo((prev) => ({ ...prev, status: prev.status === "open" ? "closed" : "open" }));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthed, login, logout,
        sidebarOpen, toggleSidebar, closeSidebar,
        products, addProduct, updateProduct, deleteProduct,
        storeInfo, toggleStoreStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
