# Krishi Vikas Backend Setup

1. Create a MySQL database named `krishi_vikas`.
2. Copy `.env.example` to `.env` and update MySQL credentials and `JWT_SECRET`.
3. Run the SQL schema from `server/schema.sql`.
4. Start the backend with `npm run server`.

Example schema setup:

```powershell
mysql -u root -p krishi_vikas < server/schema.sql
```
