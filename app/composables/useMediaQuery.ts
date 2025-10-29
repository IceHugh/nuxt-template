// 替代 VueUse 的 useMediaQuery
export function useMediaQuery(query: string) {
  const matches = ref(false);

  if (process.client) {
    const mediaQuery = window.matchMedia(query);
    matches.value = mediaQuery.matches;

    const handler = (event: MediaQueryListEvent) => {
      matches.value = event.matches;
    };

    mediaQuery.addEventListener("change", handler);

    onUnmounted(() => {
      mediaQuery.removeEventListener("change", handler);
    });
  }

  return matches;
}
