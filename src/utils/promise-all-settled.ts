export const promiseAllSettled = async <T extends unknown[]>(
  values: T
): Promise<{ [P in keyof T]: Awaited<T[P]> }> => {
  const results = await Promise.allSettled(values);

  return results.map((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      console.error(`Promise rejected with reason: ${result.reason}`);

      return {
        error: {
          body: result.reason,
          status: 500,
        },
        ok: false,
      };
    }
  }) as unknown as Promise<{ [P in keyof T]: Awaited<T[P]> }>;
};
