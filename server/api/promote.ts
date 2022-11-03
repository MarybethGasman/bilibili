export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const index = query.index
  const response = await fetch(`http://api.bilibili.com/x/web-show/res/locs?pf=0&ids=34`)
  const data = await (response.json())
  data.test = query.test
  return data
})