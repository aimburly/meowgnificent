module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { page, referrer } = req.body || {};
  const url = process.env.SUPABASE_URL + "/rest/v1/analytics";
  const key = process.env.SUPABASE_SERVICE_KEY;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "apikey": key, "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ page: page || "/", referrer: referrer || "", visited_at: new Date().toISOString() })
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: true });
  }
};
