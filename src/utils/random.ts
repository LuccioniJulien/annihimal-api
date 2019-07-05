export const getRandom = ({
  min = 1,
  max = 5
}: {
  min: number;
  max: number;
}): number => Math.round(Math.random() * (max - min) + min);
