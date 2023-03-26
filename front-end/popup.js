import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    //在点击extension图标，打开popup后，使用chrome的API获取当前标签页信息，然后根据标签页信息来判断，当前页面是否为youtube视频页面
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

            //viewBookmarks
            viewBookmarks(currentVideoBookmarks);
        })
    }
    else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
    }
});
