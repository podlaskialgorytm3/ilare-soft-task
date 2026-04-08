import type { IntegerSequenceParser } from "./contracts";

const INTEGER_PATTERN = /^-?\d+$/;

export class CsvIntegerParser implements IntegerSequenceParser {
  parse(rawInput: string): number[] {
    const normalized = rawInput.trim();

    if (!normalized) {
      throw new Error(
        "Wprowadź listę liczb całkowitych oddzielonych przecinkami.",
      );
    }

    const parts = normalized.split(",").map((part) => part.trim());

    if (parts.some((part) => part.length === 0)) {
      throw new Error("Każda pozycja musi zawierać liczbę całkowitą.");
    }

    if (parts.length < 3) {
      throw new Error("Tablica musi zawierać co najmniej 3 liczby.");
    }

    return parts.map((part, index) => {
      if (!INTEGER_PATTERN.test(part)) {
        throw new Error(
          `Element nr ${index + 1} (\"${part}\") nie jest poprawną liczbą całkowitą.`,
        );
      }

      return Number(part);
    });
  }
}
