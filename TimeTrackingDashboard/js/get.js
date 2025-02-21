import api from "./api.js";

const get=async (periodType)=>{

    const items=await api.getItems();
    let itemHours=await api.getHours();

    itemHours=itemHours.filter(item=>item.periodType===periodType);

    items.forEach(element => {
        const hours=itemHours.filter(hour=>hour.itemId===element.id)
        
        if(hours&&hours.length>0){
            element.hour=hours[0]
        }
    });

    return items;
}
export default{get}