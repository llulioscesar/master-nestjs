import { compare, genSaltSync, hashSync } from 'bcrypt';

export class Password {
  value: string;

  constructor(value: string) {
    // Validar que el valor tenga una longitud mínima de 8 caracteres
    if (value.length < 8) {
      throw new Error('Password must have a length of at least 8 characters');
    }

    this.value = value;
  }

  async encrypt(): Promise<string> {
    const salt = await genSaltSync(12);
    return await hashSync(this.value, salt);
  }

  async compare(password: string): Promise<boolean> {
    return await compare(this.value, password);
  }
}
