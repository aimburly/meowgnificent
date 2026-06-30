import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  try {
    const { name, email, phone, address, city, state, zip, products, total, note } = req.body;
    const { data, error } = await supabase.from("orders").insert([
      { name, email, phone, address, city, state, zip, products, total, note, status: "pending", created_at: new Date().toISOString() }
    ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, orderId: data?.[0]?.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
