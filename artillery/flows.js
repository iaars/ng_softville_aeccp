let playwright = require('../node_modules/@playwright/test');

async function testLogin(page) {
  // Go to http://localhost:4200/login
  await page.goto('http://localhost:4200/login');
}

async function signInUser(page) {
  // Go to http://localhost:4200/login
  await testLogin(page);
  // Click input
  await page.click('input');
  // Fill input
  await page.fill('input', 'bryan.amador@ucr.ac.cr');
  // Click input[type="password"]
  await page.click('input[type="password"]');
  // Fill input[type="password"]
  await page.fill('input[type="password"]', 'asdf1234');
  // Click button:has-text("Iniciar sesión")
  await Promise.all([
    page.waitForNavigation({url: 'http://localhost:4200/home'}),
    page.click('button:has-text("Iniciar sesión")')
  ]);
}

async function testHome(page) {
  try {
    await signInUser(page);
  } catch (error) {}
  // Go to http://localhost:4200/home
  await page.goto('http://localhost:4200/home');
}

async function testCreateAppointment(page) {
  try {
    await signInUser(page);
  } catch (error) {}
  // Go to http://localhost:4200/create-appointment
  await page.goto('http://localhost:4200/create-appointment');
}

async function testGenerateReport(page) {
  try {
    await signInUser(page);
  } catch (error) {}

  // Go to http://localhost:4200/generate-report
  await page.goto('http://localhost:4200/generate-report');
}

async function testGenerateReportCount(page) {
  try {
    await signInUser(page);
  } catch (error) {}
  // Go to http://localhost:4200/generate-report-count
  await page.goto('http://localhost:4200/generate-report-count');
}

module.exports = {
  testLogin,
  testHome,
  testCreateAppointment,
  testGenerateReport,
  testGenerateReportCount
};
