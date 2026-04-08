import type {
  IntegerSequenceParser,
  OutlierDetectionResult,
  OutlierFinder,
} from "./contracts";

export class DetectOutlierUseCase {
  constructor(
    private readonly parser: IntegerSequenceParser,
    private readonly finder: OutlierFinder,
  ) {}

  execute(rawInput: string): OutlierDetectionResult {
    const source = this.parser.parse(rawInput);
    const outlier = this.finder.findOutlier(source);

    return {
      source,
      outlier,
    };
  }
}
