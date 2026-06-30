module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { name, email, phone, address, city, state, zip, products, total, note } = req.body;
  const url = process.env.SUPABASE_URL + "/rest/v1/orders";
  const key = process.env.SUPABASE_SERVICE_KEY;
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "apikey": key, "Authorization": "Bearer " + key, "Content-Type": "application/json", "Prefer": "return=representation" },
      body: JSON.stringify({ name, email, phone, address, city, state, zip, products, total, note, status: "pending", created_at: new Date().toISOString() })
    });
    if (!r.ok) return res.status(500).json({ error: "DB error: " + r.status });
    const data = await r.json();
    return res.status(200).json({ success: true, orderId: data[0]?.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
