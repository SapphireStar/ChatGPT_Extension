import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    //在点击extension图标，打开popup后，使用chrome的API获取当前标签页信息，然后根据标签页信息来判断，当前页面是否为chatgpt页面
    let activeTab = await getActiveTabURL();

    
    if (activeTab.url.includes("chat.openai.com/chat")) {
        let loginButton = document.getElementsByClassName("button-login")[0];
        let account = document.getElementsByClassName("account-text")[0];
        let password = document.getElementsByClassName("password-text")[0];

        loginButton.addEventListener("click",()=>{
            console.log('try login');      

            const json = JSON.stringify({
                "account":account.value,
                "password":password.value
            });
            fetch('http://localhost:8080',{
                method:'POST',
                headers:{
                    'Origin':'http://127.0.0.1:8080',
                    'Access-Control-Request-Method':'POST',
                    'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
                    'Accept': 'application/json',
                    'Content-Type':'text/plain',
                },
                body:json
            }).then(response=>response.json())
            .then(response=>{
                if(response["result"]==="success"){
                    console.log("login successfully");
                    chrome.tabs.sendMessage(activeTab.id, {
                        type: "NEW"
                    });
                }
            });

        });

        
    }
    else {
        const container = document.getElementsByClassName("container")[0];
        console.log("wrong page");
        container.innerHTML = '<div class="title">This is not a ChatGPT page.</div>';
        
    }
});

function getTemplates() {
    fetch('http://localhost:8080',{
        method:'GET',
        headers:{
            'Origin':'http://127.0.0.1:8080',
            'Access-Control-Request-Method':'GET',
            'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
            'Accept': 'application/json',
        },
    }).then(response=>{
        return response.json();
    });
}