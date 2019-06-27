export default class ErrorRequest extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}
