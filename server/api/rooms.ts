export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const index = query.index
  const response = await fetch(`https://api.live.bilibili.com/xlive/web-interface/v1/webMain/getMoreRecList?platform=web`)
  const data = await (response.json())
  return data
})