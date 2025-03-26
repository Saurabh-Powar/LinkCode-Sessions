
//callback function
function test(name){
    name("Linkcode");
}

const hello = (ele)=>{
    console.log("hello, from " + ele );
}

test(hello);