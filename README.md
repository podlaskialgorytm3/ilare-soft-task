# Wykonanie zadania frontend

## Cel aplikacji

Aplikacja wykrywa pojedynczą wartość odstającą pod względem parzystości w tablicy liczb całkowitych.

## Zrealizowane wymagania

1. Aplikacja została wykonana w Vue 3 (Vite + TypeScript).
2. Aplikacja ma 2 ekrany:
   - ekran wejściowy z 1 inputem i 1 przyciskiem „Wyszukaj”,
   - ekran wyniku prezentujący wykrytą wartość odstającą.
3. Dodana została instrukcja uruchomienia.
4. Logika została rozdzielona na warstwy (parser, algorytm, use-case), zgodnie z dobrymi praktykami.

## Opis działania

1. Użytkownik wpisuje liczby całkowite oddzielone przecinkami, np. `2,4,0,100,4,11,2602,36`.
2. Po kliknięciu „Wyszukaj” dane są parsowane i walidowane.
3. Use-case uruchamia algorytm wykrywania wartości odstającej.
4. Następuje przejście na ekran wyniku, gdzie wyświetlana jest wykryta liczba.

## Implementacja algorytmu

Algorytm:

1. Pobiera 3 pierwsze liczby jako próbkę i ustala dominującą parzystość.
2. Szuka liczby o przeciwnej parzystości w całym zbiorze.
3. Zwraca wartość, jeśli jest dokładnie jedna; w przeciwnym razie zgłasza błąd walidacyjny.

Złożoność obliczeniowa:

- czasowa: O(n)
- pamięciowa: O(1)

## Struktura rozwiązania

- `src/domain/outlier/CsvIntegerParser.ts` - parsowanie i walidacja wejścia.
- `src/domain/outlier/ParityOutlierFinder.ts` - algorytm wykrywania wartości odstającej.
- `src/domain/outlier/DetectOutlierUseCase.ts` - orkiestracja parsera i algorytmu.
- `src/stores/outlierDetection.ts` - stan aplikacji i obsługa błędów.
- `src/views/InputView.vue` - ekran wejściowy.
- `src/views/ResultView.vue` - ekran wyniku.

## Testy

Dodane testy jednostkowe obejmują:

1. wykrycie jedynej liczby nieparzystej,
2. wykrycie jedynej liczby parzystej,
3. scenariusz z niejednoznacznym zbiorem,
4. scenariusz z błędnym formatem wejścia.

Plik testów:

- `src/domain/__tests__/outlierDetection.spec.ts`

## Instrukcja uruchomienia

1. Instalacja zależności:

```bash
npm install
```

2. Uruchomienie aplikacji dewelopersko:

```bash
npm run dev
```

3. Testy jednostkowe:

```bash
npm run test:unit
```

4. Build produkcyjny:

```bash
npm run build
```

## Uwagi

- Aplikacja obsługuje liczby ujemne.
- Walidacja wymusza liczby całkowite i co najmniej 3 elementy.
- W przypadku błędnych danych użytkownik dostaje czytelny komunikat.
