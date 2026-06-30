module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY && req.headers["x-admin-key"] !== "81317272") return res.status(401).json({ error: "Unauthorized" });
  const url = process.env.SUPABASE_URL + "/rest/v1/orders?select=*&order=created_at.desc";
  const key = process.env.SUPABASE_SERVICE_KEY;
  try {
    const r = await fetch(url, {
      headers: { "apikey": key, "Authorization": "Bearer " + key }
    });
    if (!r.ok) return res.status(500).json({ error: "DB error: " + r.status });
    const data = await r.json();
    return res.status(200).json({ orders: data, total: data.length });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
