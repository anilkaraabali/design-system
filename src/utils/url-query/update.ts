export const urlQueryUpdate = (
  url: string,
  query: Record<string, unknown>
): string => {
  const [uri, params] = url.split('?');
  const searchParams = new URLSearchParams(params);

  Object.keys(query).forEach((key) => {
    searchParams.set(key, query[key] as string);
  });

  return `${uri}?${searchParams.toString()}`;
};
