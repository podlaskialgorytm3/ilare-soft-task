<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRouter } from "vue-router";

import { useOutlierDetectionStore } from "@/stores/outlierDetection";

const router = useRouter();
const detectionStore = useOutlierDetectionStore();

watchEffect(() => {
  if (!detectionStore.result) {
    router.replace({ name: "input" });
  }
});

const outlierParityLabel = computed(() => {
  const value = detectionStore.result?.outlier;

  if (value === undefined) {
    return "";
  }

  return value % 2 === 0 ? "parzystą" : "nieparzystą";
});

function goBack(): void {
  router.push({ name: "input" });
}
</script>

<template>
  <section v-if="detectionStore.result" class="screen">
    <article class="panel result-panel">
      <p class="eyebrow">Wynik analizy</p>
      <p class="result-number">{{ detectionStore.result.outlier }}</p>
      <p class="result-text">
        Liczba {{ detectionStore.result.outlier }} jest jedyną liczbą
        {{ outlierParityLabel }} w podanym zbiorze.
      </p>
      <p class="source-preview">
        Dane wejściowe: {{ detectionStore.result.source.join(", ") }}
      </p>

      <button class="secondary-button" type="button" @click="goBack">
        Wróć
      </button>
    </article>
  </section>
</template>
