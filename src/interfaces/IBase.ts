export default interface IBase<T> {
  get(): Promise<Array<T>>;
}
