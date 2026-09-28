module.exports = {
  default: {
    parallel: 2,
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
      'progress-bar',
	  'allure-cucumberjs/reporter'
    ],
	formatOptions: {
      resultsDir: 'allure-results'
    }
  }
};