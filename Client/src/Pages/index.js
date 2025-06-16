const myPromise = new Promise((resolve,rejecte)=>{
    const data = Math.random()>0.5;
    if(data){
        resolve("success")
    }
    else{
        rejecte("error")
    }
})

myPromise.then((res)=>{
    console.log("successfully!",res)
}).catch((res)=>{
    console.log("error massage",res)
})