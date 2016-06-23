/**
 * Created by aine on 6/23/16.
 */
$(document).ready(function(){
    changeTemplate("edit");
});
var elementObject = {
    status:"edit",
    items:[]
};
// var elementCollect = elementCollect?elementCollect:[];
/**
 * 弹出弹出框
 */
function popDialog(){
    $('.popup-dialog').show();
}
function removeItem(index){
    elementObject.items.splice(index,1);
    initFormElement(elementObject);
}
/**
 * 根据json数据生成相应的html
 * @param elementObject
 */
function initFormElement(elementObject){
    var items = elementObject.items;
    var status = elementObject.status;
    $('.controls-wrapper').empty();
    for (var i=0; i<items.length; i++){
        var currentItem = items[i];
        formToElement(currentItem,status,i);
    }
}
/**
 * 根据给定参数，形成表单元素
 * @param currentItem
 * @param status
 * @param i
 */
function formToElement(currentItem,status,i){
    var element;
    element = "<div class='item-wrapper'>" +
        "<label for='"+currentItem.id+"'>"+currentItem.type+"</label>" +
        "<input id='"+currentItem.id+"' class='"+currentItem.class+"' name='currentItem.name' />";
    if (status == "edit"){
        element+="<span class='common-button delete-button' onclick='removeItem("+i+")'>一</span>";
    }
    element +="</div>";
    $('.controls-wrapper').append(element);
    if (currentItem.type == "日期"){
        $('#'+currentItem.id).datepicker();
    }
}
/**
 * 添加表单元素
 */
function addItem(){
    var selectList = document.getElementById("selectList").formElement;
    for (var i=0; i<selectList.length; i++){
        if (selectList[i].checked){
            var newElement = getNewElement(selectList[i]);
            elementObject.items.push(newElement);
            initFormElement(elementObject);
            $('.popup-dialog').hide();
            break;
        }
    }
}
/**
 * 根据选中的内容生成相应的表单元素格式
 * @param item
 */
function getNewElement(item){
    var newElement = {
        id:new Date().getTime(),
        type:item.value,
        class:"text-input"
    };
    if (item.value == "日期"){
        newElement.name = "date"+newElement.id
    }
    else{
        newElement.name = "text"+newElement.id
    }
    return newElement;
}
/**
 * 切换编辑-预览界面
 * @param status
 */
function changeTemplate(status){
    $(".outer-wrapper").empty();
    var html = document.getElementById(status+"Template").innerHTML;
    $(".outer-wrapper").append(html);
    elementObject.status = status;
    initFormElement(elementObject);
}