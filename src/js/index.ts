export function toBinary(value: number): string[]{
  let binary: string = value.toString(2);
  let padding = "000000".substring(binary.length) + binary;
  return padding.split("");
};