export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const index = query.index
  const response = await fetch(`https://api.bilibili.com/pgc/web/timeline/v2?day_before=2&day_after=4&season_type=1`)
  const data = await (response.json())
  return data
})