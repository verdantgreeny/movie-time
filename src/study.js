fetch('주소')//promise라는 객체(여기서는 주소)를 반환 !!! promise 안에 then이라는 메서드가 있다.
.then(function(res){//function (주소안에 있는 배열에 대한 정보를 가진 인자) ,, then도 promise객체를 반환한다.
    return res.json();
})
.then(function(res){
    console.log('최종결과 =>', res);//res : nnn개의 list를 준다.
    for (let i=0; i<res.length; i++) {
        console.log(`${i}번째 아이템 => ${res[i]}`);
        emptySter += nesli
    }
});

resultUl.innerHTML = 'ddd';


// const obj = {
//     a: 1,
//     b: 2,
// }

// function fetch () {
//     ~~
//     ~~
//     return promise
// }


function fetchData () {
    fetch(); // 패치 호출하는 로직
}

function displayPsots (posts) {
    let emptyStr = "";
    
}