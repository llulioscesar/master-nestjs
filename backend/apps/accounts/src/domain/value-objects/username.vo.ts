export class Username {
  value: string;

  constructor(value: string) {
    // Validar que el valor tenga una longitud entre 4 y 16 caracteres
    if (value.length < 4 || value.length > 16) {
      throw new Error(
        'Username must have a length between 4 and 16 characters',
      );
    }

    // Validar que el valor contenga solo caracteres alfanuméricos y guiones bajos
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      throw new Error(
        'Username must contain only alphanumeric characters and underscores',
      );
    }

    this.value = value;
  }
}
