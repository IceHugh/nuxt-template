// 替代 VueUse 的 useWindowSize
export function useWindowSize() {
  const width = ref(0);
  const height = ref(0);

  if (process.client) {
    const updateSize = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    onUnmounted(() => {
      window.removeEventListener("resize", updateSize);
    });
  }

  return { width, height };
}
