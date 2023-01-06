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

container.onmouseover = function(event) {
    const target = event.target;
    if (target.className === "item") {
        const id = target.id;
        const itemObj = productsArr[id-1];
        
        let tooltipElem = document.createElement("div");
        document.body.append(tooltipElem)
        tooltipElem.className = "tooltip";
        tooltipElem.id = id;

        //Перебор свойств продукта
        for (key in itemObj) {
            if (key === 'id') {
               tooltipElem.innerHTML += ""
            }
            else if (key === 'thumbnail') {
                tooltipElem.innerHTML += `<img src=${itemObj[key]}>`
            }
            else if (key === 'images') {
                continue
            }
            else tooltipElem.innerHTML += `<b>${key}:</b>${itemObj[key]}<br> `
        }
        //Определяем размеры и координаты появления подсказки
        let size = target.getBoundingClientRect();
        let left = size.left
        if (left < 0) {
            left = 0
        }
        let top = size.top - tooltipElem.offsetHeight
        if (top < 0) {
          top = size.top + target.offsetHeight
        }
      tooltipElem.style.left = 223 + left + 'px';
      tooltipElem.style.top = top + 'px';
        //Скрывание подсказки если мышка не наведена
        document.onmouseout = function() {
            if (tooltipElem) {
                tooltipElem.remove();
                tooltipElem = null
            }
        }
    }
    
}
