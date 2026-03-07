
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  // helps 'should go into windowed mode' sometimes
  vi.runAllTimersAsync();
  vi.clearAllMocks()
});
