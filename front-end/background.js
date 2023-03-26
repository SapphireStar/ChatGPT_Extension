/*在标签页刷新时（切换标签页或者刷新标签页），通过chrome的消息机制发送事件，信息包含当前网页的URL信息，使用观察者模式*/
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("chat.openai.com/chat")) {
      chrome.tabs.sendMessage(tabId, {
        type: "NEW"
      });

    }
  });

