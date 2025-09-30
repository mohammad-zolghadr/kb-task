;(function () {
  try {
    const savedTheme =
      localStorage.getItem("crypto-dashboard-theme") || "system"
    let resolvedTheme = savedTheme

    if (savedTheme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }

    document.documentElement.setAttribute("data-theme", resolvedTheme)
  } catch (e) {
    console.error("Theme init failed", e)
  }
})()
