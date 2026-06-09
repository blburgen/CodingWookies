import { Pool, type QueryResult } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: true,
});

let db: {
  query: (text: string, params?: unknown[]) => Promise<QueryResult>;
  close: () => Promise<void>;
};

if (process.env.NODE_ENV === "development" && process.env.ENABLE_SQL_LOGGING === "true") {
  db = {
    async query(text: string, params?: unknown[]) {
      try {
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log("Executed query:", {
          text: text.replace(/\s+/g, " ").trim(),
          duration: `${duration}ms`,
          rows: res.rowCount,
        });
        return res;
      } catch (error) {
        console.error("Error in query:", {
          text: text.replace(/\s+/g, " ").trim(),
          error: (error as Error).message,
        });
        throw error;
      }
    },

    async close() {
      await pool.end();
    },
  };
} else {
  db = pool;
}

export const testConnection = async () => {
  try {
    const result = await db.query("SELECT NOW() as current_time");
    console.log(
      "Database connection successful:",
      (result.rows[0] as { current_time: string }).current_time,
    );
    return true;
  } catch (error) {
    console.error("Database connection failed:", (error as Error).message);
    throw error;
  }
};

export default db;
