import Express from "express";
import needle from "needle";

const app = Express();

app.use(Express.json());

app.use("/target", (req, res) => {
  res.json({
    message: "Hello from target",
    headers: req.headers,
    body: req.body,
  });
});

app.use("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(400).json({ error: "url is required" });
    return;
  }

  const response = await needle("get", url, req.body, { headers: req.headers });

  res.json({ response: response.body, from: "proxy" });
});

try {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} catch (error) {
  console.log("Error:", error);
}
