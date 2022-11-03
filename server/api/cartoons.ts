export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const response = await fetch(`https://api.bilibili.com/x/web-interface/dynamic/region?ps=12&pn=1&rid=1`)
  const data = await (response.json())
  return data
})