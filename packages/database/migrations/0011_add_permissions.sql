-- Custom SQL migration file, put your code below! --
INSERT INTO "role_permissions" ("role", "permission") VALUES
('admin', 'all:all:all'),
('viewer', 'posts:all:read'),
('viewer', 'comments:all:read'),
('viewer', 'hitokoto:all:read'),
('viewer', 'moments:all:read'),
('viewer', 'posts:self:write'),
('viewer', 'comments:self:write');