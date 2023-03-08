enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
}

export class Role {
  value: RoleType;

  constructor(value: string) {
    // Validar que el valor sea un tipo de rol válido
    if (!Object.values(RoleType).includes(value as RoleType)) {
      throw new Error('Invalid role');
    }

    this.value = value as RoleType;
  }
}
