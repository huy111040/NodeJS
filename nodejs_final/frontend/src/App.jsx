import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ customerName: "", phone: "", address: "" });

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Khong the tai danh sach san pham.");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Da xay ra loi.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const cartItems = useMemo(() => {
    return products
      .map((product) => ({
        ...product,
        quantity: cart[product._id] || 0
      }))
      .filter((item) => item.quantity > 0);
  }, [cart, products]);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  function addToCart(productId, stock) {
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current >= stock) return prev;
      return { ...prev, [productId]: current + 1 };
    });
  }

  function changeQuantity(productId, stock, nextQty) {
    setCart((prev) => {
      const safeQty = Math.max(0, Math.min(stock, nextQty));
      const copy = { ...prev };
      if (safeQty === 0) delete copy[productId];
      else copy[productId] = safeQty;
      return copy;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (cartItems.length === 0) {
      setError("Vui long them san pham vao gio.");
      return;
    }

    if (!form.customerName || !form.phone || !form.address) {
      setError("Vui long dien day du thong tin nhan hang.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        items: cartItems.map((item) => ({ productId: item._id, quantity: item.quantity }))
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Dat hang that bai.");

      setMessage(`Dat hang thanh cong. Ma don: ${data._id}`);
      setCart({});
      setForm({ customerName: "", phone: "", address: "" });

      // Refresh product list to get latest stock.
      const productsRes = await fetch(`${API_URL}/products`);
      const productsData = await productsRes.json();
      setProducts(productsData);
    } catch (err) {
      setError(err.message || "Da xay ra loi khi dat hang.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Mini Shop</h1>
        <p>Web ban hang nho voi React + Node + MongoDB</p>
      </header>

      {error && <p className="alert error">{error}</p>}
      {message && <p className="alert success">{message}</p>}

      <main className="layout">
        <section className="products">
          <h2>San pham</h2>
          {loading ? (
            <p>Dang tai...</p>
          ) : (
            <div className="grid">
              {products.map((product) => (
                <article className="card" key={product._id}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">{formatPrice(product.price)}</p>
                  <p>Ton kho: {product.stock}</p>
                  <button onClick={() => addToCart(product._id, product.stock)} disabled={product.stock < 1}>
                    Them vao gio
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="cart">
          <h2>Gio hang</h2>
          {cartItems.length === 0 && <p>Chua co san pham nao.</p>}
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div>
                <strong>{item.name}</strong>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="qty">
                <button onClick={() => changeQuantity(item._id, item.stock, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item._id, item.stock, item.quantity + 1)}>+</button>
              </div>
            </div>
          ))}

          <p className="total">Tong: {formatPrice(total)}</p>

          <form onSubmit={handleSubmit} className="order-form">
            <h3>Thong tin nhan hang</h3>
            <input
              type="text"
              placeholder="Ho ten"
              value={form.customerName}
              onChange={(e) => setForm((prev) => ({ ...prev, customerName: e.target.value }))}
            />
            <input
              type="text"
              placeholder="So dien thoai"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            />
            <textarea
              placeholder="Dia chi"
              rows="3"
              value={form.address}
              onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Dang xu ly..." : "Dat hang"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
