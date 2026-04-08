<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useOutlierDetectionStore } from "@/stores/outlierDetection";

const router = useRouter();
const detectionStore = useOutlierDetectionStore();
const rawInput = ref(detectionStore.lastInput);

function handleSearch(): void {
  const isValid = detectionStore.detect(rawInput.value);

  if (isValid) {
    router.push({ name: "result" });
  }
}

function handleFocus(): void {
  detectionStore.clearError();
}
</script>

<template>
  <section class="screen">
    <article class="panel">
      <p class="eyebrow">Frontend task</p>
      <h1>Wykryj wartość odstającą</h1>
      <p class="description">
        Wpisz liczby całkowite oddzielone przecinkami, np.
        <span class="sample">2,4,0,100,4,11,2602,36</span>
      </p>

      <label class="field-label" for="numbers-input">Liczby</label>
      <input
        id="numbers-input"
        v-model="rawInput"
        class="numbers-input"
        type="text"
        placeholder="2,4,0,100,4,11,2602,36"
        @focus="handleFocus"
      />

      <button class="search-button" type="button" @click="handleSearch">
        Wyszukaj
      </button>

      <p v-if="detectionStore.errorMessage" class="error-message" role="alert">
        {{ detectionStore.errorMessage }}
      </p>
    </article>
  </section>
</template>
