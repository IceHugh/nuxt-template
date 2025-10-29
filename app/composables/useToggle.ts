// 替代 VueUse 的 useToggle
export function useToggle(initialValue = false) {
  const value = ref(initialValue);

  const toggle = () => {
    value.value = !value.value;
  };

  return [value, toggle] as const;
}
