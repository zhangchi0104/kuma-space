-- This is an empty migration.
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA next_auth TO service_role;

-- -- Grant usage on the schema if not already granted
GRANT USAGE ON SCHEMA next_auth TO service_role;

-- -- Grant privileges on sequences if applicable
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA next_auth TO service_role;

-- -- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT USAGE, SELECT ON SEQUENCES TO service_role;
