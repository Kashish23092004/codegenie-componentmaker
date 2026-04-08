const RENDER_URL = 'https://codegenie-componentmaker.onrender.com/api/users/ping';
const INTERVAL_MS = 14 * 60 * 1000; // every 14 minutes

export const startKeepAlive = () => {
  const ping = async () => {
    try {
      await fetch(RENDER_URL, { method: 'GET' });
      console.log('[KeepAlive] Pinged Render successfully');
    } catch (err) {
      console.warn('[KeepAlive] Ping failed:', err.message);
    }
  };

  ping(); // ping immediately on load
  setInterval(ping, INTERVAL_MS);
};