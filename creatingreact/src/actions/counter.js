export const addRequest = store => {
  const newCounters = { ...store.state.counters };
  newCounters.requests++;
  store.setState({ counters: newCounters });
};
export const addSuccess = store => {
  const newCounters = { ...store.state.counters };
  newCounters.success++;
  store.setState({ counters: newCounters });
};
