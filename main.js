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
        <li class="item" id=${itemId} draggable="true">
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
          top = size.top + target.offsetHeight - 20
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
//Drag&drop logic
container.addEventListener('dragstart', function(event) {
    event.target.classList.add('selected');
})
container.addEventListener('dragover', function(event) {
    event.preventDefault();

    const currentElem = container.querySelector('.selected');
    const lowerElem = event.target;

    //Является ли элемент под курсором одним из элементов списка
    const isMoveable = currentElem !== lowerElem && lowerElem.classList.contains('item');
    if(!isMoveable) {
        return
    };

    const nextElem = (lowerElem === currentElem.nextElementSibling) ? lowerElem.nextElementSibling : lowerElem;
    container.insertBefore(currentElem, nextElem);


})
container.addEventListener('dragend', function(event) {
    event.target.classList.remove('selected');
})
