export class Email {
  value: string;

  constructor(value: string) {
    // Validar que el valor sea una dirección de correo electrónico válida
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
      throw new Error('Invalid email');
    }

    this.value = value;
  }
}
