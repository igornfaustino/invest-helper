import VMasker from "vanilla-masker";

export const money2number = (money: string) => {
  return parseFloat(
    VMasker.toMoney(money, { separator: ".", delimiter: "," }).replace(
      /[,]/g,
      ""
    )
  );
};
