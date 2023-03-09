export const currentlyOpenedPage = {
    index: true,
    favorite: false,
    read: false,

};

export function changeOpenedPage(newType){
 for(let key in currentlyOpenedPage){
    if(key === newType) {currentlyOpenedPage[key] = true}else {currentlyOpenedPage[key] = false}
 }   
}
