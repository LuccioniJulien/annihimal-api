export default interface IBase<T> {
  getAll(): Promise<Array<T>>;
  get(id:number): Promise<T>;
}
