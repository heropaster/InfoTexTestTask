const container = document.getElementById('appContainer');
const itemsContainer = document.getElementById('itemsContainer');
const itemsCounter = document.getElementById('itemsCounter');

let productsArr
let itemsValue

//При загрузке страницы отрисовываются первые 10 элементов
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


container.addEventListener('change', function(event) {
    //Если необходимо другое количество элементов
    if (event.target.id === 'itemsCounter') {
        if (event.target.value === '') {
            return
        }
        let currentValue = +event.target.value;
        itemsValue = currentValue;
        itemsContainer.innerHTML = ''
        renderItems(productsArr, currentValue);
    }
    //Сортировка
    if (event.target.id === 'sort') {
    // declare new list and add items in
    let list = [];
    for(let i = itemsContainer.childNodes.length; i--;){
        if(itemsContainer.childNodes[i].nodeName === 'LI')
            list.push(itemsContainer.childNodes[i]);
    }

    // Sort list (for id)
    if (event.target.value === 'standard')  {
        list.sort((a, b) => {
            return (+a.id - +b.id)
         });
    }
    //Sort list (for name)
    else if (event.target.value === 'name') {
        list.sort((a,b) => {
            if (a.innerText.toLowerCase() < b.innerText.toLowerCase()) {
                return -1
            }
            else if (a.innerText.toLowerCase() > b.innerText.toLowerCase()) {
                return 1
            };
            return 0
        })
    }
    //Sort list (for price)
    else if (event.target.value === 'price') {
        list.sort((a, b) => {
            return (+a.dataset.price - +b.dataset.price)
         });
    }
    // replace sorted items in list
    itemsContainer.childNodes = 0
    for(let i = 0; i < list.length; i++) {
            itemsContainer.appendChild(list[i]);
        }
    }
})//Возможно переделать рендер и сделать отрисовку необходимых элементов через display в CSS

//Вырисовка продуктов в необходимом количестве
const renderItems = function(products, count=10) {
    for (let i=0; i<count; i++) {
        const itemId = products[i].id;
        const title = products[i].title;
        const price = products[i].price
            itemsContainer.innerHTML += `
        <li class="item" id=${itemId} draggable="true" data-price=${price}>
            ${(title)}: <b>${price}</b>$
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
        let left = size.left;
        if (left < 0) {
            left = 0;
        };

        let top = size.top - tooltipElem.offsetHeight;
        if (top < 0) {
          top = size.top + target.offsetHeight - 30;
        };

      tooltipElem.style.left = 288 + left + 'px';
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
itemsContainer.addEventListener('dragstart', function(event) {
    event.target.classList.add('selected');
})
itemsContainer.addEventListener('dragover', function(event) {
    event.preventDefault();

    const currentElem = container.querySelector('.selected');
    const lowerElem = event.target;

    //Является ли элемент под курсором одним из элементов списка
    const isMoveable = currentElem !== lowerElem && lowerElem.classList.contains('item');
    if(!isMoveable) {
        return
    };

    const nextElem = (lowerElem === currentElem.nextElementSibling) ? lowerElem.nextElementSibling : lowerElem;
    itemsContainer.insertBefore(currentElem, nextElem);  


})
container.addEventListener('dragend', function(event) {
    event.target.classList.remove('selected');
})


