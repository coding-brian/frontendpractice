import item from "./get.js";

const periodType={
    "daily":0,
    "weekly":1,
    "monthly":2
};

let currentType=periodType.daily

const get =async ()=>{   
    await generate(await item.get(currentType));
}

const handleClick=(event,periodType)=>{
    clear();
    currentType= periodType
    event.target.classList.add('active')
    get()
}

const initial=async ()=>{
    const initialElement=document.querySelector('main').querySelector('.information').querySelector('#daily')
    initialElement.classList.add('active')
    await get();
}

/**
* 產生對應的區塊
*/
const generate=async(items)=>{    
    const main=document.body.querySelector("main");
    items.forEach(item => {
        const card=generateElementByClass('div','card');
        card.classList.add(item.background_color_class)

        const cardBackground=generateElementByClass('div','card-background');
        const img=document.createElement('img');
        img.src=item.background_img
        cardBackground.appendChild(img)

        card.appendChild(cardBackground)
        card.appendChild(generateCardItem(item))

        main.appendChild(card);
    });
}

const generateCardItem=(item)=>{

    const cardItem=generateElementByClass('div','card-item'); 
    const cartItemContainer=generateElementByClass('div','card-item-container');
    const title=generateElementByClass('div','title');
    const content=generateElementByClass('div','content');

    // title
    const span=generateElementByClass('span')
    span.innerText=item.name
    const img=generateElementByClass('img')
    img.src='./images/icon-ellipsis.svg'
    title.appendChild(span);
    title.appendChild(img);
    cartItemContainer.appendChild(title)

    // content
    const totalTimeSpan=generateElementByClass('span','total-time')
    totalTimeSpan.innerText=item.hour.current+"hrs"
    content.appendChild(totalTimeSpan)

    const totalLastTimeSpan=generateElementByClass('span','total-last-time')
    let period=""
    switch(currentType){
        case periodType.daily:
            period="Day"
            break;
        case periodType.weekly:
            period="Week"
            break;
        case periodType.monthly:
            period="Month"
            break;
    }

    totalLastTimeSpan.innerText="Last "+period+" - "+item.hour.previous+"hrs"
    content.appendChild(totalLastTimeSpan)
    cartItemContainer.appendChild(content)
    
    cardItem.appendChild(cartItemContainer)
    return cardItem;
}

const generateElementByClass=(ElementType,className)=>{
    const element=document.createElement(ElementType)
    element.classList.add(className)
    return element;
}

const clear=()=>{
    const cards=document.body.querySelector('main').querySelectorAll('.card')
    cards.forEach(card => {
        card.remove();
    });

    const periods=document.body.querySelector('main').querySelector('.time').querySelectorAll('span')
    periods.forEach(period => {
        period.classList.remove('active')        
    });
    
}

document.addEventListener("DOMContentLoaded",initial)

document.body.querySelector("#daily").addEventListener("click",(event) => handleClick(event, periodType.daily))
document.body.querySelector("#weekly").addEventListener("click",(event) => handleClick(event,periodType.weekly))
document.body.querySelector("#monthly").addEventListener("click",(event) => handleClick(event,periodType.monthly))