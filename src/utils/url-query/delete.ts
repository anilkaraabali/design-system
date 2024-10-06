export const urlQueryDelete = (url: string, deleteKey: string): string => {
  const [uri, params] = url.split('?');
  const searchParams = new URLSearchParams(params);

  searchParams.delete(deleteKey);

  if (searchParams.toString() == '') {
    return uri;
  }

  return `${uri}?${searchParams.toString()}`;
};
