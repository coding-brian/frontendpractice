const getItems=async()=>{
    try{
        const response=await fetch('data/item.json')
        if(!response.ok)
            throw new Error("Get Items Fail!")
        return response.json();
    }catch(e){
        console.error(e)

    }
}

const getType=async()=>{
    try{
        const response=await fetch('data/type.json')
        if(!response.ok)
            throw new Error("Get Items Fail!")
        return response.json();
    }catch(e){
        console.error(e)

    }
}


const getHours=async()=>{
    try{
        const response=await fetch('data/hour.json')
        if(!response.ok)
            throw new Error("Get Items Fail!")
        return response.json();
    }catch(e){
        console.error(e)

    }
}

export default{getItems,getType,getHours}