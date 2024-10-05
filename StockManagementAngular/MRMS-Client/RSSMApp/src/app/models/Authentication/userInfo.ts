export interface UserInfo {
    roleId?: number,
    userId?: number
}

export interface RoleDto {
    roleId: number,
    roleName: string
}



export class PasswordDto {
    constructor(
        public password: string,
      ) { }
}

