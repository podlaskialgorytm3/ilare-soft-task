import { defineStore } from "pinia";
import { ref } from "vue";

import { CsvIntegerParser } from "@/domain/outlier/CsvIntegerParser";
import { DetectOutlierUseCase } from "@/domain/outlier/DetectOutlierUseCase";
import { ParityOutlierFinder } from "@/domain/outlier/ParityOutlierFinder";
import type { OutlierDetectionResult } from "@/domain/outlier/contracts";

interface DetectionSnapshot extends OutlierDetectionResult {
  rawInput: string;
}

const detectOutlierUseCase = new DetectOutlierUseCase(
  new CsvIntegerParser(),
  new ParityOutlierFinder(),
);

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Wystąpił nieoczekiwany błąd podczas analizy danych.";
}

export const useOutlierDetectionStore = defineStore("outlierDetection", () => {
  const lastInput = ref("");
  const result = ref<DetectionSnapshot | null>(null);
  const errorMessage = ref<string | null>(null);

  function detect(rawInput: string): boolean {
    lastInput.value = rawInput;

    try {
      const outcome = detectOutlierUseCase.execute(rawInput);

      result.value = {
        rawInput,
        ...outcome,
      };
      errorMessage.value = null;

      return true;
    } catch (error) {
      result.value = null;
      errorMessage.value = toErrorMessage(error);

      return false;
    }
  }

  function clearError(): void {
    errorMessage.value = null;
  }

  return {
    lastInput,
    result,
    errorMessage,
    detect,
    clearError,
  };
});
