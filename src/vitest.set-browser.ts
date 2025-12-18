import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  // helps 'should go into windowed mode' sometimes
  vi.runAllTimersAsync();
});
