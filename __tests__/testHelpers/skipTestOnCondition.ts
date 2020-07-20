
// eslint-disable-next-line jest/no-export
export const skipTestOnCondition = (condtition: boolean): void => {
    if (condtition) {
    // eslint-disable-next-line jest/no-focused-tests
    it.only('', () => {
      console.warn('No valid config to load ImageJ so skipping test using it!');
    });
  }
}