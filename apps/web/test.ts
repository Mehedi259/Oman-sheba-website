const test = async () => {
  if (typeof window === 'undefined') {
    const { auth } = await import('@/auth');
  }
}
