const rightSelect = document.querySelector('.form-select-right');
const leftSelect = document.querySelector('.form-select-left');
const bntPrice = document.querySelector('.bnt-price');
const inputLeft = document.querySelector('.input-left');
const invert = document.querySelector('.asd');
const priceRender = document.querySelector('.div-price-render')

const render = (simbol, name)=>{
    rightSelect.innerHTML += 
    `<option value="${simbol}">${name} (${simbol})</option>`
    leftSelect.innerHTML += 
    `<option value="${simbol}">${name} (${simbol})</option>`
}

window.addEventListener('DOMContentLoaded',async()=>{
    const currencies = await fetch('https://api.frankfurter.app/currencies');
    const currenciesJson = await currencies.json();
    const currenciesArr = Object.entries(currenciesJson).map(item=>{
        const [key,value]=item
        return {key,value}
    })
    currenciesArr.forEach(element => {
        render(element.key,element.value)
    });
})

invert.addEventListener('click',()=>{
    const aux = leftSelect.value
    leftSelect.value = rightSelect.value
    rightSelect.value = aux
})

bntPrice.addEventListener('click',async(e)=>{
    e.preventDefault()
    fetch(`https://api.frankfurter.app/latest?amount=${inputLeft.value}&from=${leftSelect.value}&to=${rightSelect.value}`)
        .then(resp => resp.json())
        .then((data) => {
            const value = Object.entries(data.rates)
            priceRender.innerHTML=`
            <h2>${inputLeft.value} ${leftSelect.value} = ${value[0][1]} ${rightSelect.value}</h2>
            `
        }).catch((err)=>{
            priceRender.innerHTML=`
            <h2>Error, try again with two different currencies</h2>`
        })      
});


