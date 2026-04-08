import { describe, expect, it } from "vitest";

import { CsvIntegerParser } from "@/domain/outlier/CsvIntegerParser";
import { DetectOutlierUseCase } from "@/domain/outlier/DetectOutlierUseCase";
import { ParityOutlierFinder } from "@/domain/outlier/ParityOutlierFinder";

const useCase = new DetectOutlierUseCase(
  new CsvIntegerParser(),
  new ParityOutlierFinder(),
);

describe("DetectOutlierUseCase", () => {
  it("zwraca jedyną liczbę nieparzystą", () => {
    const result = useCase.execute("2,4,0,100,4,11,2602,36");

    expect(result.outlier).toBe(11);
  });

  it("zwraca jedyną liczbę parzystą", () => {
    const result = useCase.execute("160,3,1719,19,11,13,-21");

    expect(result.outlier).toBe(160);
  });

  it("rzuca błąd dla danych bez pojedynczej wartości odstającej", () => {
    expect(() => useCase.execute("2,4,6,8,10,12")).toThrow(
      "Nie udało się jednoznacznie wskazać pojedynczej wartości odstającej.",
    );
  });

  it("rzuca błąd dla błędnego wejścia", () => {
    expect(() => useCase.execute("2,abc,6")).toThrow(
      'Element nr 2 ("abc") nie jest poprawną liczbą całkowitą.',
    );
  });
});
