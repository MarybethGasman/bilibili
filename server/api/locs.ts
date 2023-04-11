export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const ids = query.ids
  const response = await fetch(`http://api.bilibili.com/x/web-show/res/locs?pf=0&ids=${ids}`)
  const data = await (response.json())
  // switch(ids) {
  //   case '34':
  //     console.log(data.data[`${ids}`].filter((e) => e.is_ad));
  //     break;
  //   default:
  //     break;
  // }
  // console.log(data.data[`${ids}`])
  return data.data[`${ids}`]
})