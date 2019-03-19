/**
 * 匹配的路径
 * @param p match.path
 */
export const getRootPath = (p: string): string => {
  return p === '/' ? '' : p;
};
