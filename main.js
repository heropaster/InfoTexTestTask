const container = document.getElementById('itemsContainer');
let productsArr
//При загрузке страницы отрисовываются первые n элементов
window.onload = function() {
    return fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const products = data.products;
            productsArr = products
            renderItems(products)
        })
}
//Вырисовка продуктов в необходимом количестве
const renderItems = function(products, count=10) {
    for (let i=0; i<count; i++) {
        const itemId = products[i].id;
        const title = products[i].title;
            container.innerHTML += `
        <li class="item" id=${itemId}>
            ${(title)}
        </li>
    `
    }
}

// let li = document.getElementById('itemsContainer').children;
// console.log(li)
container.onmouseover = function(event) {
    const target = event.target;
    if (target.className === "item") {
        const id = target.id;
        const itemObj = productsArr[id-1];
        
        let tooltipElem = document.createElement("div");
        document.body.append(tooltipElem)
        tooltipElem.className = "tooltip";
        tooltipElem.id = id;

        for (key in itemObj) {
            if (key === 'id') {
               tooltipElem.innerHTML += ""
            }
            else tooltipElem.innerHTML += `${key}:${itemObj[key]} `
        }
        console.log(tooltipElem.style)
    }
}
 //Создание всплывающего окна
//  li.onmouseover = function(event) {
//     console.log(1)
//     //Определение элемента
//     const target = event.target;
//     if (target.className === "item") {
//         const id = target.id;
//         const itemObj = productsArr[id-1];
    
//         let tooltipElem = document.createElement('div');
//         tooltipElem.className = 'tooltip';
//         tooltipElem.id = id;
    
//         for (key in itemObj) {
//            tooltipElem.innerHTML += `${key}:${itemObj[key]}` 
//         }
//     }
    
// }
