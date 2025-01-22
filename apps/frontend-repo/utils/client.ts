export function nativeRouter() {
  return {
    push: (path: string) => (window.location.href = path),
    replace: (path: string) => window.location.replace(path),
  };
}
