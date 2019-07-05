export function getString(obj: any): string {
  const name: string = new obj().constructor.name
    .split("")
    .map((x: string, i: number) => (i == 0 ? x.toLowerCase() : x))
    .join("");
  return name;
}
