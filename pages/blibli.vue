<script setup lang="ts">
let index = 1
onMounted(() => {
  // window.addEventListener("scroll", handleScroll)
})
onUnmounted(() => {
  // window.removeEventListener("scroll", handleScroll)
})

const { data: result } = await(await fetch(
  `https://124.223.112.154:1443/?url=http://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=0&version=1&ps=10&fresh_idx=0&fresh_idx_1h=0&homepage_ver=1`
  , {
    headers: {
      "Host": "api.bilibili.com",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
      "accept": "application/json, text/plain, */*",
      "Cookie": "_uuid = 7106174D6-1B6A-C7EC-AFF1-AE43789D3C21043699infoc; b_nut=1646897245; buvid3=04E17740-530D-C942-7190-E3A80849C9B744667infoc; buvid4=DEE1B5FB-B10A-1335-4479-EDF1D7F8B34A44667-022031015-T9iDfD7tRvv9ojwSFeGNjw%3D%3D;blackside_state=1;rpdid=|(m~)lmYml|0J'uYR~u~uJ~k;LIVE_BUVID=AUTO2816502951472877;nostalgia_conf=-1;CURRENT_BLACKGAP=0;i-wanna-go-back=-1;b_ut=7;buvid_fp_plain=undefined;CURRENT_QUALITY=32;fingerprint=a3cb784f1ecefff0561bd1266b7ccdf1;buvid_fp=a3cb784f1ecefff0561bd1266b7ccdf1;i-wanna-go-feeds=-1;sid=66nr3sk9;innersign=0;CURRENT_FNVAL=16;PVID=2;bsource=search_google;b_lsid=FCEB4866_1840E550366",
    }
  })).json()
let videoList = result.item

const { data: locsResult } = await(await fetch(`https://124.223.112.154:1443/?url=http://api.bilibili.com/x/web-show/res/locs?pf=0&ids=4694`)).json()
let banners = locsResult['4694']
// console.log(banners)

//推广
const { data: promoteResult } = await(await fetch(`https://124.223.112.154:1443/?url=http://api.bilibili.com/x/web-show/res/locs?pf=0&ids=34`)).json()
let promoteList = promoteResult['34']

// 赛事
const { data: gameResult } = await(await fetch(`https://124.223.112.154:1443/?url=http://api.bilibili.com/x/web-show/res/locs?pf=0&ids=3449`)).json()
let gameList = gameResult['3449']
// console.log(gameList)

// 直播
const { data: liveResult } = await(await fetch(`https://124.223.112.154:1443/?url=https://api.live.bilibili.com/xlive/web-interface/v1/webMain/getMoreRecList?platform=web`)).json()
let liveList = liveResult['recommend_room_list']

// 动画
const { data: cartoonResult } = await(await fetch(`https://124.223.112.154:1443/?url=https://api.bilibili.com/x/web-interface/dynamic/region?ps=12&pn=1&rid=1`)).json()
// console.log(cartoonResult)
let cartoonList = cartoonResult['archives']
// console.log(cartoonList)

// 番剧
const { result: bangumiResult } = await(await fetch(`https://124.223.112.154:1443/?url=https://api.bilibili.com/pgc/web/timeline/v2?day_before=2&day_after=4&season_type=1`)).json()
// console.log(bangumiResult)
let bangumiList = bangumiResult['latest']
// console.log(bangumiList)


const handleScroll = async (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - scrollTop <= clientHeight + 3) {
    index += 1

    console.log(index)
    const { data: result } = await useFetch(() => `/api/banners`, {
      params: {
        index: index,
      },
      initialCache: false,
    })
    const _videoList = result.value.data.item
    videoList.push(..._videoList)
    // console.log("底部")
  }
}

</script>


<template>
  <div class="bg-white">
    <div>
      <div class="mt-3 absolute z-10 w-full">
        <ul class="flex justify-between items-center text-sm">
          <li class="text-white px-2 flex">
            <a class="flex" href="">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="zhuzhan-icon">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.73252 2.67094C3.33229 2.28484 3.33229 1.64373 3.73252 1.25764C4.11291 0.890684 4.71552 0.890684 5.09591 1.25764L7.21723 3.30403C7.27749 3.36218 7.32869 3.4261 7.37081 3.49407H10.5789C10.6211 3.4261 10.6723 3.36218 10.7325 3.30403L12.8538 1.25764C13.2342 0.890684 13.8368 0.890684 14.2172 1.25764C14.6175 1.64373 14.6175 2.28484 14.2172 2.67094L13.364 3.49407H14C16.2091 3.49407 18 5.28493 18 7.49407V12.9996C18 15.2087 16.2091 16.9996 14 16.9996H4C1.79086 16.9996 0 15.2087 0 12.9996V7.49406C0 5.28492 1.79086 3.49407 4 3.49407H4.58579L3.73252 2.67094ZM4 5.42343C2.89543 5.42343 2 6.31886 2 7.42343V13.0702C2 14.1748 2.89543 15.0702 4 15.0702H14C15.1046 15.0702 16 14.1748 16 13.0702V7.42343C16 6.31886 15.1046 5.42343 14 5.42343H4ZM5 9.31747C5 8.76519 5.44772 8.31747 6 8.31747C6.55228 8.31747 7 8.76519 7 9.31747V10.2115C7 10.7638 6.55228 11.2115 6 11.2115C5.44772 11.2115 5 10.7638 5 10.2115V9.31747ZM12 8.31747C11.4477 8.31747 11 8.76519 11 9.31747V10.2115C11 10.7638 11.4477 11.2115 12 11.2115C12.5523 11.2115 13 10.7638 13 10.2115V9.31747C13 8.76519 12.5523 8.31747 12 8.31747Z"
                  fill="currentColor"></path>
              </svg>
              <span class="ml-2">
                首页
              </span>
            </a>
          </li>
          <li class="text-white px-2 flex"><a href="">番剧</a></li>
          <li class="text-white px-2 flex"><a href="">直播</a></li>
          <li class="text-white px-2 flex"><a href="">游戏中心</a></li>
          <li class="text-white px-2 flex"><a href="">会员购</a></li>
          <li class="text-white px-2 flex"><a href="">S12</a></li>
          <li class="text-white px-2 flex"><a href="">下载客户端</a></li>
          <li class="text-white px-2 flex">
            <form class="flex relative w-80 pl-1 pr-12 rounded-lg bg-[#f1f2f3] hover:bg-white items-center h-10"
              style="border-radius:8px 8px 8px 8px;">
              <div class="p-1 w-full h-8 flex focus:bg-[#e3e5e7] items-center justify-between">
                <input class="text-[#61666d] bg-transparent outline-none" type="text" autocomplete="off" accesskey="s"
                  maxlength="100" x-webkit-speech="" x-webkit-grammar="builtin:translate" value=""
                  placeholder="这AD有点烫嘴！" title="这AD有点烫嘴！">
                <!-- <div class="nav-search-clean">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M8 14.75C11.7279 14.75 14.75 11.7279 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75ZM9.64999 5.64303C9.84525 5.44777 10.1618 5.44777 10.3571 5.64303C10.5524 5.83829 10.5524 6.15487 10.3571 6.35014L8.70718 8.00005L10.3571 9.64997C10.5524 9.84523 10.5524 10.1618 10.3571 10.3571C10.1618 10.5523 9.84525 10.5523 9.64999 10.3571L8.00007 8.70716L6.35016 10.3571C6.15489 10.5523 5.83831 10.5523 5.64305 10.3571C5.44779 10.1618 5.44779 9.84523 5.64305 9.64997L7.29296 8.00005L5.64305 6.35014C5.44779 6.15487 5.44779 5.83829 5.64305 5.64303C5.83831 5.44777 6.15489 5.44777 6.35016 5.64303L8.00007 7.29294L9.64999 5.64303Z"
                      fill="#C9CCD0"></path>
                  </svg>
                </div> -->
              </div>
              <div class="absolute right-3 text-black">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z"
                    fill="currentColor"></path>
                </svg>
              </div>
            </form>
          </li>
          <li class="text-white px-2 flex">
            <div class="w-9 h-9 bg-[#00AEEC] rounded-full flex items-center justify-center">
              <a href="">登录</a>
            </div>
          </li>
          <li class="text-white px-2 flex">
            <a class="flex flex-col items-center" href="">
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="right-entry-icon">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11 1.74286C6.02955 1.74286 2 5.7724 2 10.7429C2 15.7133 6.02955 19.7429 11 19.7429C15.9705 19.7429 20 15.7133 20 10.7429C20 5.7724 15.9705 1.74286 11 1.74286ZM11.0003 3.37912C15.0609 3.37912 18.3639 6.68212 18.3639 10.7428C18.3639 14.8034 15.0609 18.1064 11.0003 18.1064C6.93963 18.1064 3.63663 14.8034 3.63663 10.7428C3.63663 6.68212 6.93963 3.37912 11.0003 3.37912Z"
                  fill="currentColor"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.57596 6.88109C9.76987 7.228 9.91387 7.60028 10.0047 7.98564V7.98564C10.0734 8.34728 10.0481 8.71873 9.93023 9.06728V9.06728C9.04905 9.27264 8.14905 9.39291 7.24496 9.42809V9.42809C7.22369 9.42809 7.19832 9.49355 7.17051 9.62446V9.62446C7.18851 10.0172 7.30714 10.3968 7.5166 10.729V10.729C7.72278 10.9908 7.83732 10.8771 8.07705 10.8035V10.8035C8.55978 10.6611 9.06541 10.6055 9.56778 10.639V10.639C9.74123 10.7535 8.95905 11.8425 8.74387 12.1698V12.1698C8.52951 12.4979 7.68187 13.5525 7.24496 13.7006V13.7006C6.80887 13.8471 6.91605 14.0852 7.31941 14.3969V14.3969C7.75387 14.6481 8.28323 14.6775 8.74387 14.4787V14.4787C9.15132 14.2693 9.48678 13.9445 9.70769 13.5444V13.5444C9.83941 13.2171 10.8777 10.8599 11.0012 10.6472V10.6472C11.1248 10.4345 11.2982 10.3854 11.5625 10.2945V10.2945C12.2326 10.0982 12.9313 10.0147 13.6292 10.0491V10.0491C14.2061 10.1481 14.7002 10.1718 14.7583 9.62364V9.62364C14.8197 9.11473 14.5783 8.61728 14.1406 8.34646V8.34646C13.6022 8.25482 13.0483 8.31455 12.5427 8.51828V8.51828C12.2948 8.60091 11.6443 8.89464 11.5625 8.821V8.821C11.4799 8.74818 11.7761 8.05109 11.4799 7.471V7.471C11.1763 6.97437 10.638 6.66591 10.0538 6.65118V6.65118C9.6676 6.65118 9.51051 6.832 9.57596 6.88109V6.88109Z"
                  fill="currentColor"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.4674 11.4647C11.3856 11.5555 11.3782 11.6905 11.451 11.7887V11.7887C11.5255 11.9106 14.0209 14.1099 14.3089 14.3447V14.3447C14.5969 14.5795 14.7295 14.4994 15.0322 13.5339V13.5339C15.3374 12.5676 13.8303 12.0325 13.386 11.8133V11.8133C12.9377 11.6218 12.468 11.486 11.9861 11.4083V11.4083C11.9207 11.4042 11.8356 11.396 11.7505 11.396V11.396C11.6408 11.396 11.532 11.4099 11.4674 11.4647V11.4647Z"
                  fill="currentColor"></path>
              </svg>
              <span>大会员</span>
            </a>
          </li>
          <li class="text-white px-2 flex">
            <a class="flex flex-col items-center" href="">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="right-entry-icon">
                <path
                  d="M15.435 17.7717H4.567C2.60143 17.7717 1 16.1723 1 14.2047V5.76702C1 3.80144 2.59942 2.20001 4.567 2.20001H15.433C17.3986 2.20001 19 3.79943 19 5.76702V14.2047C19.002 16.1703 17.4006 17.7717 15.435 17.7717ZM4.567 4.00062C3.59327 4.00062 2.8006 4.79328 2.8006 5.76702V14.2047C2.8006 15.1784 3.59327 15.9711 4.567 15.9711H15.433C16.4067 15.9711 17.1994 15.1784 17.1994 14.2047V5.76702C17.1994 4.79328 16.4067 4.00062 15.433 4.00062H4.567Z"
                  fill="currentColor"></path>
                <path
                  d="M9.99943 11.2C9.51188 11.2 9.02238 11.0667 8.59748 10.8019L8.5407 10.7635L4.3329 7.65675C3.95304 7.37731 3.88842 6.86226 4.18996 6.50976C4.48954 6.15544 5.0417 6.09699 5.4196 6.37643L9.59412 9.45943C9.84279 9.60189 10.1561 9.60189 10.4067 9.45943L14.5812 6.37643C14.9591 6.09699 15.5113 6.15544 15.8109 6.50976C16.1104 6.86409 16.0478 7.37731 15.6679 7.65675L11.4014 10.8019C10.9765 11.0667 10.487 11.2 9.99943 11.2Z"
                  fill="currentColor"></path>
              </svg>
              <span>消息</span>
            </a>
          </li>
          <li class="text-white px-2 flex">
            <a class="flex flex-col items-center" href="">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="right-entry-icon">
                <g clip-path="url(#clip0)">
                  <path
                    d="M10 10.743C7.69883 10.743 5.83333 8.87747 5.83333 6.5763C5.83333 4.27512 7.69883 2.40964 10 2.40964V10.743Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                  <path
                    d="M10 10.743C10 13.0441 8.1345 14.9096 5.83333 14.9096C3.53217 14.9096 1.66667 13.0441 1.66667 10.743H10Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                  <path
                    d="M10 10.743C10 8.44182 11.8655 6.57632 14.1667 6.57632C16.4679 6.57632 18.3333 8.44182 18.3333 10.743H10Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                  <path
                    d="M9.99999 10.743C12.3012 10.743 14.1667 12.6085 14.1667 14.9096C14.1667 17.2108 12.3012 19.0763 9.99999 19.0763V10.743Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="currentColor" transform="matrix(-1 0 0 1 20 0.742981)"></rect>
                  </clipPath>
                </defs>
              </svg>
              <span>动态</span>
            </a>
          </li>
          <li class="text-white px-2 flex">
            <a class="flex flex-col items-center" href="">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="right-entry-icon">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.0505 3.16759L12.7915 6.69573C12.954 7.02647 13.2702 7.25612 13.6349 7.30949L17.5294 7.87474C18.448 8.00817 18.8159 9.13785 18.1504 9.78639L15.3331 12.5334C15.0686 12.7905 14.9481 13.1609 15.0104 13.5256L15.6759 17.4031C15.8328 18.3184 14.8721 19.0171 14.0497 18.5845L10.5661 16.7537C10.2402 16.5823 9.85042 16.5823 9.52373 16.7537L6.04087 18.5845C5.21848 19.0171 4.2578 18.3184 4.41468 17.4031L5.07939 13.5256C5.14166 13.1609 5.02198 12.7905 4.75755 12.5334L1.9394 9.78639C1.27469 9.13785 1.64182 8.00817 2.56126 7.87474L6.4549 7.30949C6.82041 7.25612 7.13578 7.02647 7.29832 6.69573L9.04015 3.16759C9.45095 2.33468 10.6389 2.33468 11.0505 3.16759Z"
                  stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                <path
                  d="M11.603 11.8739C11.413 12.5556 10.7871 13.0554 10.0447 13.0554C9.29592 13.0554 8.66679 12.5467 8.48242 11.8569"
                  stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span>收藏</span>
            </a>
          </li>
          <li class="text-white px-2 flex">
            <a class="flex flex-col items-center" href="">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="right-entry-icon">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10 1.74286C5.02955 1.74286 1 5.7724 1 10.7429C1 15.7133 5.02955 19.7429 10 19.7429C14.9705 19.7429 19 15.7133 19 10.7429C19 5.7724 14.9705 1.74286 10 1.74286ZM10.0006 3.379C14.0612 3.379 17.3642 6.68282 17.3642 10.7426C17.3642 14.8033 14.0612 18.1063 10.0006 18.1063C5.93996 18.1063 2.63696 14.8033 2.63696 10.7426C2.63696 6.68282 5.93996 3.379 10.0006 3.379Z"
                  fill="currentColor"></path>
                <path d="M9.99985 6.6521V10.743" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
                <path d="M12.4545 10.7427H10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
              </svg>
              <span>历史</span>
            </a>
          </li>
          <li class="text-white px-2 flex">
            <a class="flex flex-col items-center" href="">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="right-entry-icon">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="16" height="20">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 1.74286H17.5V20.0762H2.5V1.74286Z"
                    fill="currentColor"></path>
                </mask>
                <g mask="url(#mask0)">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.99999 1.74286C9.92916 1.74286 9.85916 1.74369 9.78833 1.74536C5.85416 1.85453 2.58416 5.14869 2.50166 9.08286C2.44999 11.5404 3.58666 13.7304 5.36999 15.1337C5.52166 15.2529 5.63166 15.4162 5.67333 15.6045L6.30416 18.447C6.51583 19.3987 7.36083 20.0762 8.33583 20.0762H11.6617C12.6383 20.0762 13.4842 19.3987 13.6958 18.4445L14.3275 15.602C14.3692 15.4154 14.4775 15.2537 14.6275 15.1354C16.3733 13.7629 17.5 11.637 17.5 9.24286C17.5 5.10036 14.1425 1.74286 9.99999 1.74286ZM10.0003 3.40939C13.2161 3.40939 15.8336 6.02606 15.8336 9.24273C15.8336 11.0386 15.0186 12.7086 13.5978 13.8252C13.1428 14.1827 12.8244 14.6852 12.7011 15.2402L12.0686 18.0827C12.0269 18.2752 11.8586 18.4094 11.6619 18.4094H8.33609C8.14109 18.4094 7.97359 18.2761 7.93192 18.0852L7.30025 15.2427C7.17609 14.6869 6.85775 14.1827 6.40109 13.8236C4.94359 12.6769 4.12942 10.9619 4.16859 9.11773C4.23192 6.05523 6.77442 3.49606 9.83442 3.41189C9.88942 3.41023 9.94525 3.40939 10.0003 3.40939Z"
                    fill="currentColor"></path>
                  <path d="M10 6.81299L8.81253 9.18726H11.1875L9.99952 11.561" stroke="currentColor" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
                <path d="M6.66656 15.9095H13.3332" stroke="currentColor" stroke-width="1.7"></path>
              </svg>
              <span>创作中心</span>

            </a>
          </li>
          <li class="text-white px-2 flex">
            <a class="" href="">
              <div class="flex px-5 py-2 bg-[#FB7299] rounded-lg items-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="header-upload-entry__icon">
                  <path
                    d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                    stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor" stroke-width="1.7"
                    stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413" stroke="currentColor" stroke-width="1.7"
                    stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <span class="ml-1">投稿</span>
              </div>
            </a>

          </li>
        </ul>
      </div>
      <div class="relative h-40 overflow-hidden">
        <video class="absolute" src="https://activity.hdslb.com/blackboard/activity68698/public/static/2xv.mp4" autoplay
          loop></video>
        <!-- <img src="https://i0.hdslb.com/bfs/archive/11092db4bc807e08cabbd3b20d9d59f2ac1b344d.png@3840w_360h_1c_90q.avif" -->
        alt="">
        <div class="absolute bottom-0 ml-8">
          <a href="//www.bilibili.com" class="inner-logo">
            <img class="logo-img" width="162" height="78"
              src="//i0.hdslb.com/bfs/archive/622017dd4b0140432962d3ce0c6db99d77d2e937.png"></a>
          <!---->
        </div>
      </div>
      <div class="px-10 mt-3 text-sm flex">
        <ul class="flex">
          <li class="px-3 my-2">
            <a class="flex flex-col items-center" href="">
              <div class="bg-[#FF9212] w-10 h-10 rounded-full flex justify-center items-center">
                <img class="w-6 h-6" src="@/assets/images/moments.svg" alt="">
              </div>
              <span>动态</span>
            </a>
          </li>
          <li class="px-3 my-2">
            <a class="flex flex-col items-center" href="">
              <div class="bg-[#F07775] w-10 h-10 rounded-full flex justify-center items-center">
                <img src="@/assets/images/hot.svg" alt="">
              </div>
              <span>热门</span>
            </a>
          </li>
          <li class="px-3 my-2">
            <a class="flex flex-col items-center" href="">
              <div class="bg-[#59CA73] w-10 h-10 rounded-full flex justify-center items-center">
                <img src="@/assets/images/channel.svg" alt="">
              </div>
              <span>频道</span>
            </a>
          </li>
        </ul>
        <div class="flex justify-between break-keep items-center">
          <ul class="grid grid-cols-9 gap-3 text-center pr-5 border-r-[1px]">
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">番剧</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">国创</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">综艺</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">动画</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">鬼畜</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">舞蹈</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">娱乐</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">科技</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">美食</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">电影</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">电视></a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">纪录></a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">游戏</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">音乐</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">影视</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">知识</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">资讯</a>
            <a class="px-3 py-1 bg-[#F6F7F8] rounded-md hover:bg-[#e3e5e7]">更多</a>
          </ul>
          <div>
            <ul class="ml-2 grid grid-cols-3">
              <li class="px-1 my-2 flex items-center">
                <img class="w-5 mr-2" src="../assets/images/column.svg" alt="">
                <a href="">专栏</a>
              </li>
              <li class="px-1 my-2 flex items-center">
                <img class="w-5 mr-2" src="../assets/images/activity.svg" alt="">
                <a href="">活动</a>
              </li>
              <li class="px-1 my-2 flex items-center">
                <img class="w-5 mr-2" src="../assets/images/community.svg" alt="">
                <a href="">社区中心</a>
              </li>
              <li class="px-1 my-2 flex items-center">
                <img class="w-5 mr-2" src="../assets/images/live.svg" alt="">
                <a href="">直播</a>
              </li>
              <li class="px-1 my-2 flex items-center">
                <img class="w-5 mr-2" src="../assets/images/classroom.svg" alt="">
                <a href="">课堂</a>
              </li>
              <li class="px-1 my-2 flex items-center">
                <img class="w-5 mr-2" src="../assets/images/music.svg" alt="">
                <a href="">新歌热榜</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <ul class="px-12 grid grid-cols-5 mt-2">
      <Swipper :itemList="banners" class="col-span-2 row-span-2"></Swipper>
      <li class="px-2" v-for="(item) in videoList.slice(0, 6)" :key="item.id">
        <CardVideo :title="item.title" :coverURI="item.pic" :desc="item.desc" :view="item.stat.view"
          :danmaku="item.stat.danmaku" :duration="item.duration" :play-u-r-i="item.uri" :ownerName="item.owner.name"
          :timestamp="item.pubdate">
        </CardVideo>
      </li>

    </ul>

    <!-- 推广 -->
    <section class="px-12 mt-5">
      <!-- <svg class="icon">
        <use xlink:href="#channel-spread"></use>
      </svg> -->
      <h2 class="px-2 text-3xl">推广</h2>
      <ul class="grid grid-cols-5 ">
        <li class="px-2" v-for="(item) in promoteList.slice(0, 5)" :key="item.id">
          <CardVideo v-if="item.archive !== undefined" :title="item.title" :coverURI="item.pic" :desc="item.desc"
            :view="item.archive.stat.view" :danmaku="item.archive.stat.danmaku" :duration="item.archive.duration"
            :play-u-r-i="item.url" :ownerName="item.archive.owner.name" :timestamp="item.archive.pubdate"></CardVideo>

          <CardVideo v-else :title="item.title" :coverURI="item.pic" :desc="item.desc" :play-u-r-i="item.url">
          </CardVideo>
        </li>
      </ul>
    </section>


    <!-- 赛事 -->
    <section class="px-12 mt-5">
      <!-- <svg class="icon">
                <use xlink:href="#channel-spread"></use>
              </svg> -->
      <h2 class="px-2 text-3xl">赛事</h2>
      <ul class="grid grid-cols-5 ">
        <li class="px-2" v-for="(item) in gameList.slice(0, 5)" :key="item.id">
          <CardVideo v-if="item.archive !== undefined" :title="item.title" :coverURI="item.pic" :desc="item.desc"
            :view="item.archive.stat.view" :danmaku="item.archive.stat.danmaku" :duration="item.archive.duration"
            :play-u-r-i="item.url" :ownerName="item.archive.owner.name" :timestamp="item.archive.pubdate"></CardVideo>

          <CardVideo v-else :title="item.title" :coverURI="item.pic" :desc="item.desc" :play-u-r-i="item.url">
          </CardVideo>
        </li>
      </ul>
    </section>


    <!-- 直播 -->
    <section class="px-12 mt-5">
      <!-- <svg class="icon">
                        <use xlink:href="#channel-spread"></use>
                      </svg> -->
      <h2 class="px-2 text-3xl">直播</h2>
      <ul class="grid grid-cols-5 ">
        <li class="px-2" v-for="(item) in liveList.slice(0, 10)" :key="item.id">
          <CardVideo v-if="item.archive !== undefined" :title="item.title" :coverURI="item.cover" :desc="item.desc"
            :view="item.archive.stat.view" :danmaku="item.archive.stat.danmaku" :duration="item.archive.duration"
            :play-u-r-i="item.url" :ownerName="item.archive.owner.name" :timestamp="item.archive.pubdate"></CardVideo>

          <CardVideo v-else :title="item.title" :coverURI="item.cover" :desc="item.desc" :play-u-r-i="item.url">
          </CardVideo>
        </li>
      </ul>
    </section>

    <!-- 动画 -->
    <section class="px-12 mt-5">
      <!-- <svg class="icon">
                            <use xlink:href="#channel-spread"></use>
                          </svg> -->
      <h2 class="px-2 text-3xl">动画</h2>
      <ul class="grid grid-cols-5 ">
        <li class="px-2" v-for="(item) in cartoonList.slice(0, 10)" :key="item.id">
          <CardVideo v-if="item.stat !== undefined" :title="item.title" :coverURI="item.pic" :desc="item.desc"
            :view="item.stat.view" :danmaku="item.stat.danmaku" :duration="item.duration" :play-u-r-i="item.short_link"
            :ownerName="item.owner.name" :timestamp="item.pubdate"></CardVideo>
        </li>
      </ul>
    </section>

    <!-- 番剧 -->
    <section class="px-12 mt-5">
      <!-- <svg class="icon">
                                <use xlink:href="#channel-spread"></use>
                              </svg> -->
      <h2 class="px-2 text-3xl">番剧</h2>
      <ul class="grid grid-cols-5 ">
        <li class="px-2" v-for="(item) in bangumiList.slice(0, 10)" :key="item.id">
          <CardVideo :title="item.title" :coverURI="item.ep_cover" :desc="item.desc" :timestamp="item.pub_ts">
          </CardVideo>
        </li>
      </ul>
    </section>


  </div>
</template>


