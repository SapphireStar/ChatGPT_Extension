export async function getActiveTabURL() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

export function CreateDropdown(title, items){
    const titleItem = document.createElement("div");
    titleItem.className = "input-dropdown-title";
    titleItem.innerHTML = title;

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "input-dropdown-items-container";

    titleItem.appendChild(itemsContainer);

    for(let item of items){
        const element = document.createElement("div");
        element.className = "input-dropdown-item";
        element.innerHTML = item;
        element.addEventListener("click",()=>{
            titleItem.innerHTML = element.innerHTML;
        });
        itemsContainer.appendChild(element);
    }
    return titleItem;
}