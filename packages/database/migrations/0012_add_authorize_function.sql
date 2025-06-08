-- Custom SQL migration file, put your code below! --
create or replace function public.authorize(
  requested_permission public."AppPermissions"
)
returns boolean as $$
declare
  bind_permissions int;
  user_role public."AppRoles";
begin
  -- Fetch user role once and store it to reduce number of calls
  select (auth.jwt() ->> 'user_role')::public."AppRoles" into user_role;
  select count(*)
  into bind_permissions
  from public.role_permissions
  where (role_permissions.permission = requested_permission
    and role_permissions.role = user_role)
    or (role_permissions.permission = 'all:all:all'
    and role_permissions.role = user_role);
  return bind_permissions > 0;
end;
$$ language plpgsql stable security definer set search_path = '';