import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// Extend the Vitest assertions with the matchers from @testing-library/jest-dom
expect.extend(matchers);

afterEach(() => {
  cleanup();
})