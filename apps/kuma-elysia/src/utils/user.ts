import { UserRoles } from '@server/types/user';

const roleToPermissions: Record<UserRoles, number> = {
  Admin: 10000,
  Editor: 100,
  Viewer: 1,
};
export const checkRoles = (role: UserRoles, target: UserRoles) => {
  return roleToPermissions[role] >= roleToPermissions[target];
};
