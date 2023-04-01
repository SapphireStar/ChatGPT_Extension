/*
 * @Author: Tianyi
 * @Date: 2023-03-25 10:10:38
 * @LastEditors: Tianyi
 * @LastEditTime: 2023-03-25 10:59:02
 * @FilePath: \youtube-bookmarker\contentScript.js
 * @Description: 
 * 
 */


  
    //输入框的父节点
    let currentInputAreaContainer;

    //新创建的物体
    let currentInputField;
    let currentSendButtonContainer;
    let currentParent;
    let currentTemplates=[];
    let currentApplyButton;

    //额外设置
    let outputInDropdown;
    let toneDropDown;
    let writingStyleDropdown;

    //用户当前选择的模板
    let currentSelectedTemplateWrapper;
    let currentSelectedTemplate;

    //NewChat按钮
    let newChatButton;
    
    //从服务器获得的JSON
    let templatesJSON;

    //监听来自background.js的事件信息，使用观察者模式，监听到事件发送后，分析发送过来的消息，如果type变量为'NEW'，则调用newVideoLoaded
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;
        if(type === "NEW"){
            console.log("Received new tab message");
            initializePanel();
        }
    });

    async function initializePanel() {
        destroyAllTemplates();
        console.log("Start initialize Panel");
        const parent = document.getElementsByClassName("flex flex-col items-center text-sm dark:bg-gray-800")[0];
        //chatGPT原来自带的一些内容，需要隐藏
        const originalTemplatesArray = document.getElementsByClassName("text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100");
        if(originalTemplatesArray.length==0){
            console.log("not in the new chat panel");
        }
        else{
            //根据这个ID在css中隐藏
            notifyAllChildNodes(originalTemplatesArray[0]);
            currentParent = parent;

            console.log("in the new chat panel"); 
            parent.id = "templates-container";

            currentInputAreaContainer = document.getElementsByClassName("relative flex h-full flex-1 md:flex-col")[0];
            currentInputField = document.getElementsByClassName("m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0")[0];
            currentSendButton = document.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40")[0];
            currentSendButtonContainer = document.getElementsByClassName("flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]")[0];
            
            
            //标记特殊节点
            otherElement = document.getElementsByClassName("w-full h-32 md:h-48 flex-shrink-0")[0];
            otherElement.id ="original-nodes";

            newChatButton = document.getElementsByClassName("flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20")[0];
            newChatButton.removeEventListener("click",initializePanel);
            newChatButton.addEventListener("click",refreshPage);

            InitializeAdditionalConfiguration();
            InitializeUserInputs();
            addTemplates(parent);
        }
    }

    function addTemplates(parent) {
            let response = fetch('http://localhost:8080',{
                method:'GET',
                headers:{
                    'Origin':'http://127.0.0.1:8080',
                    'Access-Control-Request-Method':'GET',
                    'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
                    'Accept': 'application/json',
                },
            }).then(response=>response.json())
            .then(response=>{
                Object.entries(response).forEach(([key,value])=>{
                    const child = initializeTemplateWidget(value["title"],value["author"],value["description"],value["content"]);

                    parent.appendChild(child);    
                    currentTemplates.push(child); 
                });
            });

        }
    

    //点击newchat后刷新页面
    function refreshPage(){
        //删除原有元素
        destroyAllTemplates();
        console.log("Start initialize Panel");
        const parent = document.getElementsByClassName("flex flex-col items-center text-sm dark:bg-gray-800")[0];
        //chatGPT原来自带的一些内容，需要隐藏
        const originalTemplatesArray = document.getElementsByClassName("text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100");
        if(originalTemplatesArray.length==0){
            console.log("not in the new chat panel");
        }
        else{
            //根据这个ID在css中隐藏
            notifyAllChildNodes(originalTemplatesArray[0]);
            currentParent = parent;

            console.log("in the new chat panel"); 
            parent.id = "templates-container";

            currentInputAreaContainer = document.getElementsByClassName("relative flex h-full flex-1 md:flex-col")[0];
            currentInputField = document.getElementsByClassName("m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0")[0];
            currentSendButton = document.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40")[0];
            currentSendButtonContainer = document.getElementsByClassName("flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]")[0];
            
            InitializeUserInputs();
            InitializeAdditionalConfiguration();
            addTemplates(parent);
        }
    }

    //初始化单个Template
    function initializeTemplateWidget(title, author, content, stringFormat){
        const templateContainer = document.createElement("div");
        templateContainer.className = "template-container";

        const templateInnerContainer = document.createElement("div");
        templateInnerContainer.className = "template-innerContainer";
        
        const templateTitle = document.createElement("div");
        templateTitle.className = "template-title";
        templateTitle.innerHTML = title;

        const templateAuthor = document.createElement("div");
        templateAuthor.className = "template-author";
        templateAuthor.innerHTML = author;

        const templateContent = document.createElement("div");
        templateContent.className = "template-content";
        templateContent.innerHTML = content;

        //模板中起作用的部分，其中的字符串可用于字符串拼接，将用户的关键字拼接进去
        const templateStringFormat = document.createElement("div");
        templateStringFormat.className = "template-stringformat";
        templateStringFormat.innerHTML = stringFormat;

        templateInnerContainer.appendChild(templateTitle);
        templateInnerContainer.appendChild(templateAuthor);
        templateInnerContainer.appendChild(templateContent);
        templateInnerContainer.appendChild(templateStringFormat);
        templateContainer.appendChild(templateInnerContainer);

        //当模板被按下后，将当前模板设为选择的模板
        templateContainer.addEventListener("click",()=>{
            if(currentSelectedTemplateWrapper){
                currentSelectedTemplateWrapper.className  = "template-container";
            }
            currentSelectedTemplateWrapper = templateContainer;
            currentSelectedTemplateWrapper.className = "template-container-selected";
            currentSelectedTemplate = templateStringFormat.innerHTML;
        });
        return templateContainer;
    }

    function destroyAllTemplates(){
        currentSelectedTemplate = null;
        currentSelectedTemplateWrapper = null;

        if(currentParent){
            currentParent.id = "";
        }
        
        for (let i = 0; i < currentTemplates.length; i++) {
            const element = currentTemplates[i];
            element.remove();
        }

        if(document.getElementsByClassName("input-additionalConfigWrapper").length>0){
            for(let element of document.getElementsByClassName("input-additionalConfigWrapper")){
                element.remove();
            }
        }

        if(document.getElementsByClassName("input-apply").length>0){
            for(let element of document.getElementsByClassName("input-apply")){
                element.remove();
            }
        }
        

    }
    
    //将所有原有的node隐藏
    function notifyAllChildNodes(parent){
        for(let element of parent.childNodes){
            notifyAllChildNodes(element);
        }
        console.log("element marked");
        parent.id = "original-nodes";
        
    }

    //初始化应用按钮，当用户按下应用按钮时，将template嵌入到用户的输入中
    function InitializeUserInputs(){
        currentSendButton.addEventListener("click",destroyAllTemplates);
        
        let currentApplyButton = document.createElement("div");
        currentApplyButton.className = "input-apply";
        currentApplyButton.addEventListener("click",()=>{
            if(currentInputField.innerHTML !== ""){
                console.log(currentSelectedTemplate);
                let str = currentInputField.innerHTML;
                currentInputField.value = currentSelectedTemplate.replace(/{replace}/g,str);
                currentInputField.value = applyDropDown(currentInputField.value);
                
            }
        });

        currentSendButtonContainer.appendChild(currentApplyButton);
        
    }

    function applyDropDown(content){
        content+=` Please write the answer in ${outputInDropdown.firstChild.innerHTML}. `;
        content+=` Please write the answer in a ${toneDropDown.firstChild.innerHTML} tone. `;
        content+=` Please write the answer in ${writingStyleDropdown.firstChild.innerHTML} style. `;
        return content;
    }   

    //初始化输入框上方的额外设置
    function InitializeAdditionalConfiguration() {
        if(document.getElementsByClassName("input-additionalConfigWrapper").length==0){
            const additionalConfigWrapper = document.createElement("div");
            additionalConfigWrapper.className = "input-additionalConfigWrapper";

            const additionalConfigContainer = document.createElement("div");
            additionalConfigContainer.className = "input-additionalConfigContainer";

    
            const outputInTitle = document.createElement("div");
            outputInTitle.className = "input-additionalOutputTitle";
            outputInTitle.innerHTML = "Output in:";

            const tone = document.createElement("div");
            tone.className = "input-additionalOutputTitle";
            tone.innerHTML = "Tone:";

            const wrtingStyle = document.createElement("div");
            wrtingStyle.className = "input-additionalOutputTitle";
            wrtingStyle.innerHTML = "Writing Style:";

            additionalConfigContainer.appendChild(outputInTitle);
            additionalConfigContainer.appendChild(tone);
            additionalConfigContainer.appendChild(wrtingStyle);

            outputInDropdown = CreateDropdown("English",["English","Chinese"]);
            toneDropDown = CreateDropdown("Default",["Emotional","Technically","Happy","Sad"]);
            writingStyleDropdown = CreateDropdown("Default",["Poetic","dramatic"]);
            additionalConfigContainer.appendChild(outputInDropdown);
            additionalConfigContainer.appendChild(toneDropDown);
            additionalConfigContainer.appendChild(writingStyleDropdown);

            additionalConfigWrapper.appendChild(additionalConfigContainer);



            currentInputAreaContainer.insertBefore(additionalConfigWrapper,currentInputAreaContainer.firstChild);
        }

        function CreateDropdown(title, items){
            const titleItem = document.createElement("div");
            titleItem.className = "input-dropdown-title";

            const titleText = document.createElement("div");
            titleText.innerHTML = title;
            titleItem.appendChild(titleText);
        
            const itemsContainer = document.createElement("div");
            itemsContainer.className = "input-dropdown-items-container";
        
            titleItem.appendChild(itemsContainer);
        
            for(let item of items){
                const element = document.createElement("div");
                element.className = "input-dropdown-item";
                element.innerHTML = item;
                element.addEventListener("click",()=>{
                    titleText.innerHTML = element.innerHTML;
                });
                itemsContainer.appendChild(element);
            }
            return titleItem;
        }
    }

    



