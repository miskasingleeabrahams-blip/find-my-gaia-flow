// Dev-only: when Vite reports a build/HMR error and then recovers,
// reload the page so we never sit on a stale broken module.
if (import.meta.hot) {
  let hadError = false;

  import.meta.hot.on("vite:error", () => {
    hadError = true;
  });

  // Fired after a successful HMR update — if we previously errored, reload.
  import.meta.hot.on("vite:afterUpdate", () => {
    if (hadError) {
      hadError = false;
      window.location.reload();
    }
  });

  // Full reload events from the server also clear the flag.
  import.meta.hot.on("vite:beforeFullReload", () => {
    hadError = false;
  });
}
