const container = document.getElementById('itemsContainer')
//При загрузке страницы отрисовываются первые n элементов
window.onload = function() {
    return fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const products = data.products;
            return renderItems(products)
        })
}
//Вырисовка продуктов в необходимом количестве
const renderItems = function(products) {
    for (let i=0; i<10; i++) {
        const itemId = products[i].id;
        const title = products[i].title;
            container.innerHTML += `
        <li class="item" id=${itemId}>
            ${(title)}
        </li>
    `
    }
}
//Создание всплывающего окна
container.onmouseover = function(event) {
    let target = event.target;
    
}
//Отображение продуктов на странице
const getItems = function(index) {
    return fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const itemId = data.products[index].id
            container.innerHTML += `
        <li class="item" id=${itemId}>
            ${(data.products[index].title)}
        </li>
    `
        })
}
