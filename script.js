const filterButtons = document.querySelectorAll('.filterButton');

//Itering trough em
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        //Desactivating
        desactivatingActive(filterButtons);

        btn.classList.add("active")
    })
});


function desactivatingActive(array){
    array.forEach(element => {
        element.classList.remove("active")
    });
}