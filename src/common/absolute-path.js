export default (href) => {
  const link = document.createElement("a")
  link.href = href
  return `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`
}
