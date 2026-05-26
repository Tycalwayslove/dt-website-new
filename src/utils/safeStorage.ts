function getLocalStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage ?? null
  } catch {
    return null
  }
}

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      return getLocalStorage()?.getItem(key) ?? null
    } catch {
      return null
    }
  },
  setItem(key: string, value: string) {
    try {
      getLocalStorage()?.setItem(key, value)
    } catch {
      // Some WebViews disable storage; keep the in-memory store state usable.
    }
  },
  removeItem(key: string) {
    try {
      getLocalStorage()?.removeItem(key)
    } catch {
      // Some WebViews disable storage; clearing in-memory state is handled by callers.
    }
  },
}
