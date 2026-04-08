import type { OutlierFinder } from "./contracts";

export class ParityOutlierFinder implements OutlierFinder {
  findOutlier(numbers: number[]): number {
    if (numbers.length < 3) {
      throw new Error(
        "Do wykrycia wartości odstającej potrzebne są minimum 3 liczby.",
      );
    }

    const sample = numbers.slice(0, 3);
    const evenCountInSample = sample.reduce((count, value) => {
      return count + Number(this.isEven(value));
    }, 0);

    const outlierShouldBeEven = evenCountInSample === 1;

    let outlier: number | null = null;
    let outlierCount = 0;

    for (const value of numbers) {
      if (this.isEven(value) === outlierShouldBeEven) {
        outlier = value;
        outlierCount += 1;
      }
    }

    if (outlierCount !== 1 || outlier === null) {
      throw new Error(
        "Nie udało się jednoznacznie wskazać pojedynczej wartości odstającej.",
      );
    }

    return outlier;
  }

  private isEven(value: number): boolean {
    return value % 2 === 0;
  }
}
