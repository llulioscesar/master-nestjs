export class Password {
  value: string;

  constructor(value: string) {
    // Validar que el valor tenga una longitud mínima de 8 caracteres
    if (value.length < 8) {
      throw new Error('Password must have a length of at least 8 characters');
    }

    this.value = value;
  }
}
