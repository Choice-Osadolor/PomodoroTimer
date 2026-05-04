const delayedColorChange=(newColor,delay,doNext)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        if(newColor==='black'){
                reject('Request failed, black is not in the rainbow');
            }
            document.body.style.backgroundColor=newColor;
            doNext &&doNext();
            resolve();

        },delay)
    });
}


delayedColorChange('red',1000)
 .then(()=>{
    console.log('orange');
    return delayedColorChange('orange',1000);
 })
 .then(()=>{
    console.log('yellow');
    return delayedColorChange('yellow',1000);
 })
 .then(()=>{
    return delayedColorChange('black',1000);
 })
 .catch((err)=>{
        console.log(err);
 })

//Dont add code for me , im trying to do it myself, dont even give me hints, just wait for me to ask for help, thanks!

const login= async (password,username)=>{
    if(!username || !password){
       throw 'Credentials missing';
    }
    if(password==='12345'){
        return 'Welcome';
    }
    throw 'Invalid password';
}

login('12345','choic')
.then((msg)=>{
    console.log('Logged in');  
})
.catch(err=>{
    console.log('Error');
    console.log(err);
})


