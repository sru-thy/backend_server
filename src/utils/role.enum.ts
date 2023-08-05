export enum Role {
    ADMIN="admin",
    HR="HR",
    USER="user",
    DEVELOPER ="developer"
}

export const userRoles = {
    superadmin: [Role.ADMIN],
    admin: [Role.HR, Role.ADMIN],
    user: [Role.HR, Role.ADMIN],
  };