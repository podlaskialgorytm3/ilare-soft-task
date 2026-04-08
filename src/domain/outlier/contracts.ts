export interface IntegerSequenceParser {
  parse(rawInput: string): number[];
}

export interface OutlierFinder {
  findOutlier(numbers: number[]): number;
}

export interface OutlierDetectionResult {
  source: number[];
  outlier: number;
}
