/// <reference types="mocha" />
/// <reference types="chai" />

// Global test types for better IDE support
declare global {
  const describe: Mocha.SuiteFunction;
  const it: Mocha.TestFunction;
  const before: Mocha.HookFunction;
  const after: Mocha.HookFunction;
  const beforeEach: Mocha.HookFunction;
  const afterEach: Mocha.HookFunction;
}

export {};
