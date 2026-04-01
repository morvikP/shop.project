import { useEffect, useState } from "react";
import { a } from "../services/axiosinstance";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    sizes: [],
    colors: [],
    rating: 0,
    isNew: false,
    categoryId: "",
    seasonId: ""
  });

  const fetchAll = async () => {
    const [p, c, s] = await Promise.all([
      a.get("/products"),
      a.get("/categories"),
      a.get("/seasons")
    ]);
    setProducts(p.data);
    setCategories(c.data);
    setSeasons(s.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleArrayInput = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value]
    }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setForm({ ...product });
  };

  const handleDelete = async (id) => {
    await a.delete(`/products/${id}`, {
      headers: { Authorization: "1963" }
    });
    fetchAll();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await a.patch(`/products/${editingProduct}`, form, {
        headers: { Authorization: "1963" }
      });
    } else {
      await a.post("/products", form, {
        headers: { Authorization: "1963" }
      });
    }
    setForm({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      sizes: [],
      colors: [],
      rating: 0,
      isNew: false,
      categoryId: "",
      seasonId: ""
    });
    setEditingProduct(null);
    fetchAll();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingProduct ? "Редактировать товар" : "Создать товар"}
      </h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
        <input name="title" placeholder="Name" value={form.title} onChange={handleInput} className="border p-2" />
        <textarea name="description" placeholder="Desription" value={form.description} onChange={handleInput} className="border p-2" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleInput} className="border p-2" />
        <input name="imageUrl" placeholder="URL" value={form.imageUrl} onChange={handleInput} className="border p-2" />

        <div>
          Размеры:
          {["S", "M", "L", "XL"].map((s) => (
            <label key={s} className="ml-2">
              <input
                type="checkbox"
                checked={form.sizes.includes(s)}
                onChange={() => handleArrayInput("sizes", s)}
              /> {s}
            </label>
          ))}
        </div>

        <div>
          Цвета:
          {["белый", "чёрный", "бежевый"].map((c) => (
            <label key={c} className="ml-2">
              <input
                type="checkbox"
                checked={form.colors.includes(c)}
                onChange={() => handleArrayInput("colors", c)}
              /> {c}
            </label>
          ))}
        </div>

        <input name="rating" type="number" step="0.1" placeholder="Рейтинг" value={form.rating} onChange={handleInput} className="border p-2" />

        <label>
          <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleInput} /> Новинка
        </label>

        <select name="categoryId" value={form.categoryId} onChange={handleInput} className="border p-2">
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>

        <select name="seasonId" value={form.seasonId} onChange={handleInput} className="border p-2">
          <option value="">Выберите сезон</option>
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>

        <button className="bg-black text-white p-2">
          {editingProduct ? "Сохранить изменения" : "Создать товар"}
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-bold mb-2">Список товаров</h2>
      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded flex justify-between">
            <div>
              <div className="font-bold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.description}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-blue-500">Редактировать</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
