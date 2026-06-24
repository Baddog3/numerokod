const { readFileSync } = require('fs');
const { join } = require('path');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('vm');

function loadCalculators() {
  const source = readFileSync(join(__dirname, '../js/calculators.js'), 'utf8');
  const withoutDom = source.replace(
    /\ndocument\.addEventListener\('DOMContentLoaded'[\s\S]*$/,
    '\n'
  );
  const context = { document: { addEventListener() {}, createElement() { return {}; } } };
  vm.createContext(context);
  vm.runInContext(withoutDom, context);
  return context;
}

const calc = loadCalculators();

test('число судьбы: 15.07.1990 → 5', () => {
  assert.equal(calc.calculateDestinyNumber('1990-07-15'), 5);
});

test('число судьбы: 29.02.2000 → 6', () => {
  assert.equal(calc.calculateDestinyNumber('2000-02-29'), 6);
});

test('мастер-число 11 не сводится дальше', () => {
  assert.equal(calc.calculateDestinyNumber('2009-09-09'), 11);
});

test('число имени: Иван → 11', () => {
  assert.equal(calc.calculateNameNumber('Иван').number, 11);
});

test('validateName: пустая строка', () => {
  assert.equal(calc.validateName(''), 'Введите имя');
  assert.equal(calc.validateName('   '), 'Введите имя');
});

test('validateName: латиница', () => {
  assert.equal(calc.validateName('John'), 'Введите имя кириллицей (русский алфавит)');
});

test('validateName: корректное имя', () => {
  assert.equal(calc.validateName('Мария'), null);
});

test('совместимость: известная пара из матрицы', () => {
  const result = calc.calculateCompatibility(1, 5);
  assert.equal(result.percent, 85);
  assert.equal(result.compatNumber, 6);
});

test('совместимость: дефолт для неизвестной пары', () => {
  const result = calc.getCompatibilityPercent(0, 0);
  assert.equal(result, 65);
});
