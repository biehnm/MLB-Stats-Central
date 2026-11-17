import { useEffect, useState } from 'react';

export default function useRequest(load) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    async function request() {
      try {
        const data = await load(controller.signal);
        if (!controller.signal.aborted) {
          setState({ status: 'success', data });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setState({ status: 'error' });
        }
      }
    }

    request();
    return () => controller.abort();
  }, [load]);

  return state;
}
