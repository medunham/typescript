export class OptionHelper {
  public static BooleanOption(option: any, defaultValue: boolean) {
    return typeof option === 'boolean' ? option : defaultValue;
  }

  public static NumberOption(option: any, defaultValue: number) {
    return typeof option === 'number' ? option : defaultValue;
  }
}
