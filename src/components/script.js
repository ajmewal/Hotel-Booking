// let scrol = document.querySelector(".buttons")


setTimeout(() => {
    let scrollLeft = document.querySelector(".left")
    let scrollRight = document.querySelector(".right")
    console.log(scrollLeft)
    console.log(scrollRight)
    scrollRight.addEventListener("click",()=>{
        console.log("hello")
        // document.querySelector(".buttons").scroll({
        //     left:50,
        //     behavior:'smooth'
        // })
        document.querySelector(".buttons").scrollLeft+=100
    })

    
    scrollLeft.addEventListener("click",()=>{
        document.querySelector(".buttons").scrollLeft-=100
        console.log("hello")
    })
}, 2000);
