export const store = {
  name: "The Brand Store",
  location: "Bairathi Colony, Indore, MP",
  status: "open",
  completion: 72,
  missingFields: ["Business hours", "GST number", "Cover banner"],
  phone: "+91 98765 43210",
  email: "hello@thebrandstore.in",
  gst: "",
  hours: "",
};

export const products = [
  { id: "p1", name: "Oversized Cotton Shirt", category: "Men", price: 1299, mrp: 1799, offer: 28, stock: 24, status: "active", image: "shirt" },
  { id: "p2", name: "Women's Wrap Dress", category: "Women", price: 1899, mrp: 2499, offer: 24, stock: 0, status: "out_of_stock", image: "dress" },
  { id: "p3", name: "Slim Fit Jeans", category: "Men", price: 1599, mrp: 1999, offer: 20, stock: 8, status: "active", image: "jeans" },
  { id: "p4", name: "Cargo Utility Pants", category: "Men", price: 1799, mrp: null, offer: 0, stock: 15, status: "active", image: "cargo" },
  { id: "p5", name: "Branded Polo Tee", category: "Men", price: 999, mrp: 1499, offer: 33, stock: 42, status: "active", image: "polo" },
  { id: "p6", name: "Women's Structured Top", category: "Women", price: 1099, mrp: 1599, offer: 31, stock: 3, status: "low_stock", image: "top" },
  { id: "p7", name: "Round Neck Tee", category: "Men", price: 699, mrp: 999, offer: 30, stock: 60, status: "active", image: "tee" },
  { id: "p8", name: "Denim Jacket", category: "Unisex", price: 2499, mrp: null, offer: 0, stock: 0, status: "draft", image: "jacket" },
];

export const orders = [
  { id: "ORD-2301", customer: "Aarav Mehta", phone: "98765 11101", items: 2, amount: 3198, status: "delivered", date: "2026-09-20", products: "Oversized Cotton Shirt ×2" },
  { id: "ORD-2300", customer: "Priya Sharma", phone: "98765 11102", items: 1, amount: 1899, status: "shipped", date: "2026-09-20", products: "Women's Wrap Dress ×1" },
  { id: "ORD-2299", customer: "Rohan Gupta", phone: "98765 11103", items: 3, amount: 2997, status: "pending", date: "2026-09-19", products: "Slim Fit Jeans ×1, Polo Tee ×2" },
  { id: "ORD-2298", customer: "Sneha Patil", phone: "98765 11104", items: 1, amount: 999, status: "delivered", date: "2026-09-19", products: "Branded Polo Tee ×1" },
  { id: "ORD-2297", customer: "Kabir Singh", phone: "98765 11105", items: 2, amount: 3398, status: "cancelled", date: "2026-09-18", products: "Cargo Pants ×1, Denim Jacket ×1" },
  { id: "ORD-2296", customer: "Ananya Reddy", phone: "98765 11106", items: 1, amount: 1099, status: "delivered", date: "2026-09-18", products: "Women's Structured Top ×1" },
  { id: "ORD-2295", customer: "Vikram Joshi", phone: "98765 11107", items: 4, amount: 4596, status: "shipped", date: "2026-09-17", products: "Round Neck Tee ×4" },
  { id: "ORD-2294", customer: "Meera Iyer", phone: "98765 11108", items: 2, amount: 2598, status: "pending", date: "2026-09-17", products: "Oversized Cotton Shirt ×2" },
];

export const customers = [
  { id: "c1", name: "Aarav Mehta", phone: "98765 11101", email: "aarav@email.com", orders: 5, spent: 12450, lastOrder: "2026-09-20", status: "active" },
  { id: "c2", name: "Priya Sharma", phone: "98765 11102", email: "priya@email.com", orders: 3, spent: 5670, lastOrder: "2026-09-20", status: "active" },
  { id: "c3", name: "Rohan Gupta", phone: "98765 11103", email: "rohan@email.com", orders: 8, spent: 18900, lastOrder: "2026-09-19", status: "active" },
  { id: "c4", name: "Sneha Patil", phone: "98765 11104", email: "sneha@email.com", orders: 2, spent: 2100, lastOrder: "2026-09-19", status: "active" },
  { id: "c5", name: "Kabir Singh", phone: "98765 11105", email: "kabir@email.com", orders: 1, spent: 3398, lastOrder: "2026-09-18", status: "inactive" },
  { id: "c6", name: "Ananya Reddy", phone: "98765 11106", email: "ananya@email.com", orders: 4, spent: 8900, lastOrder: "2026-09-18", status: "active" },
  { id: "c7", name: "Vikram Joshi", phone: "98765 11107", email: "vikram@email.com", orders: 6, spent: 11200, lastOrder: "2026-09-17", status: "active" },
  { id: "c8", name: "Meera Iyer", phone: "98765 11108", email: "meera@email.com", orders: 2, spent: 4200, lastOrder: "2026-09-17", status: "active" },
];

export const enquiries = [
  { id: "e1", name: "Rahul Verma", phone: "99887 66554", email: "rahul.v@email.com", message: "Do you have size L in the oversized shirt?", date: "2026-09-21", status: "new" },
  { id: "e2", name: "Neha Kapoor", phone: "98765 44332", email: "neha.k@email.com", message: "Can I get bulk order discount for 20 polo tees?", date: "2026-09-20", status: "replied" },
  { id: "e3", name: "Amit Desai", phone: "97654 32109", email: "amit.d@email.com", message: "Is the denim jacket available in black?", date: "2026-09-19", status: "new" },
  { id: "e4", name: "Pooja Nair", phone: "96543 21098", email: "pooja.n@email.com", message: "Store timing for weekend?", date: "2026-09-18", status: "closed" },
  { id: "e5", name: "Suresh Rao", phone: "95432 10987", email: "suresh.r@email.com", message: "Looking for wedding collection – any ethnic options?", date: "2026-09-17", status: "replied" },
];

export const salesTrend = [
  { label: "Mon", value: 4200 }, { label: "Tue", value: 5100 }, { label: "Wed", value: 3800 },
  { label: "Thu", value: 6400 }, { label: "Fri", value: 7200 }, { label: "Sat", value: 9100 },
  { label: "Sun", value: 6800 },
];

export const stats = {
  totalProducts: products.length,
  totalOrders: orders.length,
  totalCustomers: customers.length,
  totalSales: 42890,
  salesGrowth: 12.4,
  ordersGrowth: -3.2,
  customersGrowth: 8.1,
};

export const notifications = [
  { id: "n1", type: "order", text: "New order ORD-2301 received from Aarav Mehta", time: "12m ago", unread: true },
  { id: "n2", type: "stock", text: "\"Women's Structured Top\" is running low (3 left)", time: "1h ago", unread: true },
  { id: "n3", type: "stock", text: "\"Women's Wrap Dress\" is out of stock", time: "3h ago", unread: false },
  { id: "n4", type: "enquiry", text: "New enquiry from Rahul Verma", time: "5h ago", unread: true },
  { id: "n5", type: "system", text: "Your store profile is 72% complete", time: "1d ago", unread: false },
];

export const topProducts = [
  { name: "Branded Polo Tee", sold: 42, revenue: 41958 },
  { name: "Oversized Cotton Shirt", sold: 28, revenue: 36372 },
  { name: "Slim Fit Jeans", sold: 19, revenue: 30381 },
  { name: "Cargo Utility Pants", sold: 15, revenue: 26985 },
];

export const offlineStores = [
  { id: "s1", name: "Bairathi Colony", address: "Near Gurudwara Mandir Tower Square, Shop No 3", status: "open" },
  { id: "s2", name: "Vijay Nagar", address: "Scheme 54, PU4, Indore", status: "closed" },
];
