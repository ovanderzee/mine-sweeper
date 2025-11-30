import { beforeEach, vi } from 'vitest'

/* instead of jest.config fakeTimers: {"enableGlobally": true}, */
beforeEach(() => {
  vi.useFakeTimers();
});
