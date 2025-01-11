export enum UserRole {
  Admin = 'Admin',
  Viewer = 'Viewer',
  Editor = 'Editor',
}

export type UserRoles = `${UserRole}`;

export type User = {
  role: UserRole;
  email: string;
};
