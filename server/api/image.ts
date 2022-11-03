export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const uri = query.uri
  // console.log(uri)
  const response = await fetch(`${uri}`)
  event.res.setHeader("Content-Type", "image/jpeg")
  return response.body
})
