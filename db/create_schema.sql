create schema pettycash;

GRANT USAGE ON SCHEMA pettycash TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA pettycash TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA pettycash TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA pettycash TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA pettycash GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA pettycash GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA pettycash GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
