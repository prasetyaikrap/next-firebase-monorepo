import createApp from "./app";

declare module "express-serve-static-core" {
  interface Request {
    credentials: {
      userId: string;
      clientId: string;
    };
  }
}

const startServer = async () => {
  const app = await createApp();

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
