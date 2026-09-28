const isCI = process.env.CI === 'true';
module.exports = {
  default: {
    parallel: isCI ? 1 : 2,
    requireModule: ['tsx'],
    require: [
      'src/step-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],
    paths: [
      'src/features/**/*.feature'
    ],
    format: [
      'summary',
      (!isCI ? ['progress-bar'] : []),
      'allure-cucumberjs/reporter'
    ],
	formatOptions: {
      resultsDir: 'allure-results'
    }
  }
};