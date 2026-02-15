function getRelativeResults(results) {
  const tstamps = results.reduce((ts, result) => {
    const parts = result.split(':');
    const d = new Date();

    d.setHours(parts[0]);
    d.setMinutes(parts[1]);
    d.setSeconds(parts[2]);

    ts.push(d.getTime());
    return ts;
  }, []);

  const diffs = tstamps.map((result) => {
    const diff = result - tstamps[0];
    const d = new Date(diff);
    let str = '0';

    if (diff > 0) {
      const mins = d.getMinutes();
      const secs = d.getSeconds();
      const sSecs = secs < 10 ? `0${secs}` : `${secs}`;
      str = `+${mins}:${sSecs}`;
    }

    return str;
  });

  return diffs;
}
