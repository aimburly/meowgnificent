module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
  const key = process.env.SUPABASE_SERVICE_KEY;
  const base = process.env.SUPABASE_URL;
  try {
    // Get analytics data
    const today = new Date().toISOString().substring(0, 10);
    const [visits, todayVisits, pages] = await Promise.all([
      fetch(base + "/rest/v1/analytics?select=id&limit=1", { headers: { "apikey": key, "Authorization": "Bearer " + key, "Prefer": "count=exact" } }),
      fetch(base + "/rest/v1/analytics?select=id&visited_at=gte." + today + "T00:00:00Z&limit=1", { headers: { "apikey": key, "Authorization": "Bearer " + key, "Prefer": "count=exact" } }),
      fetch(base + "/rest/v1/analytics?select=page,count&group=page&order=count.desc&limit=5", { headers: { "apikey": key, "Authorization": "Bearer " + key } })
    ]);
    var total = parseInt(visits.headers.get("content-range")?.split("/")[1] || "0");
    var todayCount = parseInt(todayVisits.headers.get("content-range")?.split("/")[1] || "0");
    var topPages = [];
    try { topPages = await pages.json(); } catch(e) {}
    return res.status(200).json({ totalVisits: total, todayVisits: todayCount, topPages: topPages });
  } catch (e) {
    return res.status(200).json({ totalVisits: 0, todayVisits: 0, topPages: [] });
  }
};
