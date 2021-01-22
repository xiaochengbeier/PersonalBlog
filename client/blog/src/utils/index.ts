export function getTextFromNodeText(text: string){
    const node = document.createElement("div");
    node.innerHTML = text;
    //获得文本
    const textRe = node.textContent;
    if(textRe){
        return textRe.substr(0,100);
    }
    return node.innerText.substr(0,100);
}