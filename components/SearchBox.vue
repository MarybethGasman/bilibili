<template>
    <div class="relative">
        <form @focusout="focus = false" @focusin="focus = true" @click="showHotList"
            class="flex relative w-72 pl-1 pr-12 bg-[#f1f2f3] hover:bg-white items-center h-10"
            :class="{ 'rounded-t-lg': focus, 'rounded-lg': !focus }">
            <div class="p-1 w-full h-8 flex items-center justify-between" :class="focus === true ? 'bg-[#e3e5e7]' : ''">
                <input ref="inputElement" v-model="searchText" @keyup="onInput"
                    class="pl-1 text-[#61666d] bg-transparent outline-none" type="text" autocomplete="off" accesskey="s"
                    maxlength="100" x-webkit-speech="" x-webkit-grammar="builtin:translate" placeholder="这AD有点烫嘴！"
                    title="这AD有点烫嘴！">
            </div>
            <div class="absolute right-3 text-black"><svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z"
                        fill="currentColor"></path>
                </svg></div>
        </form>
        <div class="bg-white text-[#18191c] w-full absolute" @click="">
            <div class="p-3" v-show="focus === true && searchText === ''">
                <div class="flex justify-between" v-if="history === []">
                    <h2 class="text-base font-semibold">搜索历史</h2>
                    <span class="text-sm font-light">清空</span>
                </div>
                <h2 class="text-base font-semibold">Bilibili热搜</h2>
                <ul>
                    <li class="hover:bg-[#E3E5E7] p-1 cursor-pointer flex items-center" v-for="item, i in hotList">
                        {{ i + 1 }}
                        {{ item.keyword }}
                        {{ item.showname }}
                        &nbsp;
                        <img v-if="item.icon !== ''" class="h-4" :src="item.icon" alt="" srcset="">
                    </li>
                </ul>
            </div>
            <div class="p-3" v-show="focus === true && searchText !== ''">
                <ul>
                    <li @mousedown="(e) => e.preventDefault()" @click="openSearchPage" class="p-1 cursor-pointer hover:bg-[#E3E5E7]"
                        v-for="{ value, term } in suggestList">
                        {{ value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
let searchText = ref('')
let inputElement = ref()
let hotList = reactive([])
let history = reactive([])
let focus = ref(false)
let url = "proxy/api/x/web-interface/wbi/search/square?limit=10&platform=web&w_rid=5fc1e6e673578417596f2f77ed87d074&wts=1681120004"
let suggesturl = `proxy/search/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&userid=&bangumi_acc_num=1&special_acc_num=1&topic_acc_num=1&upuser_acc_num=3&tag_num=10&special_num=10&bangumi_num=10&upuser_num=3&rnd=0.4287960676089091&buvid=A526AD2C-5994-BBD9-67B5-3E38A8768DE517638infoc&spmid=333.1007`
let suggestList = reactive([])
const showHotList = async function () {
    if (hotList.length === 0) {
        const { data: { trending: { list } } } = await (await fetch(url)).json()
        hotList.push(...list)
    }
    console.log(hotList)
}


const onInput = debounce(async function (e) {
    const term = e.target.value;
    if (term !== '') {
        const { result: { tag: list } } = await (await fetch(`${suggesturl}&term=${term}`)).json()
        suggestList.length = 0
        suggestList.push(...list)
        console.log(list);
    }

    // console.log(await(await fetch(`${suggesturl}&term=${term}`)).json());
}, 300)


const openSearchPage = function (e) {
    const keyword = e.target.innerText
    if (keyword !== '') {

        const url = `https://search.bilibili.com/all?keyword=${keyword}&from_source=webtop_search&spm_id_from=333.1007&search_source=2`
        window.open(url, '_blank')?.focus()
    }

    inputElement.value.focus()
    focus.value = true
    // console.log();
    // const active = document.activeElement
    // console.log(active);
}
function debounce(fn, delay = 500) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}
</script>

<style scoped></style>
