// 替代 VueUse 的 useMouse
export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  if (process.client) {
    const updateMouse = (event: MouseEvent) => {
      x.value = event.clientX;
      y.value = event.clientY;
    };

    document.addEventListener("mousemove", updateMouse);

    onUnmounted(() => {
      document.removeEventListener("mousemove", updateMouse);
    });
  }

  return { x, y };
}
