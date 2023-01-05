const container = document.getElementById('itemsContainer')
//При наведении обратавыем таргетный элемент
container.onclick = function() {
    const currentItem = event.target
    renderItems()
}
// container.onmouseout = function() {
//     const prevItem = event.relatedTarget
    
// }
const renderItems = function(index = 10) {
    if (index != 0) {
        for (let i = 0; i < index; i++) {
            getItems(i)
        }
    }
}
const getItems = function(index = 0) {
    return fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            container.innerHTML += `
        <li class="item">
            ${(data.products[index].title)}
        </li>
    `
        })
}
