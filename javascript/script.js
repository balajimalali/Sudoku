mainsud = document.getElementById("mainSudoku");

que = []
que1 = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
]

for (let index = 1; index <= 9; index++) {
    let obj = document.createElement("div")
    obj.className = 'sudoku';

    for (let j = 1; j <= 9; j++) {
        let objin = document.createElement("input");
        objin.id = 's' + String(index) + String(j);
        objin.name = 's' + String(index) + String(j);
        objin.className = 'input';
        objin.type = 'number';
        objin.min = 0;
        objin.max = 9;
        if(index==1 || index==4 || index==7){
            objin.classList.add("bordertop")
        }
        if(index==3 || index==6 || index==9){
            objin.classList.add("borderbottom")
        }
        if(j==1 || j==4 || j==7){
            objin.classList.add("borderleft")
        }
        if(j==3 || j==6 || j==9){
            objin.classList.add("borderright")
        }

        objin.style.animationDelay = String((index+j)/10) + 's';
        
        obj.appendChild(objin);
    }

    mainsud.appendChild(obj)
    
}


// fetching questions

let quejson = fetch('questions.json');

function getArray(){
    que = [];
    let sudokuobj = document.getElementById('mainSudoku');
    for(let i =1;i<=9;i++){
        let minque = [];
        let sudokuminobj = sudokuobj.childNodes[i].childNodes;
        for(let j=0;j<9;j++){
            let a = isNaN(parseInt(sudokuminobj[j].value))?0:parseInt(sudokuminobj[j].value);
            minque.push(a);
        }
        
        que.push(minque)
    }
}

function display(arr){
    let sudokuobj = document.getElementById('mainSudoku');
    for(let i =1;i<=9;i++){
        let sudokuminobj = sudokuobj.childNodes[i].childNodes;
        for(let j=0;j<9;j++){
            sudokuminobj[j].value = arr[i-1][j];
        }
    }
}

function buttonsolve(){
    console.log("solving..");
    getArray();
    if(solve(que,0,0)){
        console.log('solved');
        display(que);
    }
    else{
        console.log('unable to solve')
    }
}

function clearSudoku(){
    for(let i=1;i<=9;i++){
        for(let j=1;j<=9;j++){
            let objclr = document.getElementById('s'+String(i)+String(j));
            objclr.value = '';
            objclr.disabled = false;
            objclr.style.color = 'black';
        }
    }
}

function setQuestion(){
    arr = que1;
    let sudokuobj = document.getElementById('mainSudoku');
    for(let i =1;i<=9;i++){
        let sudokuminobj = sudokuobj.childNodes[i].childNodes;
        for(let j=0;j<9;j++){
            let objset = sudokuminobj[j];
            objset.value = arr[i-1][j];
            if(arr[i-1][j]!=0){
                objset.disabled = true;
                objset.style.color = 'green';
            }
            else{
                objset.value = '';
            }
        }
    }
}

function animdel(level){
    for(let i=5-level;i<=5+level;i++){
        for(let j=5-level;j<=5+level;j++){
            if(i==5-level || j==5-level || i==5+level || j==5+level){
                let objanim = document.getElementById('s'+String(i)+String(j));
                objanim.style.backgroundColor = 'aquamarine';
            }
        }
    }
}

function animset(level,col){
    for(let i=5-level;i<=5+level;i++){
        for(let j=5-level;j<=5+level;j++){
            if(i==5-level || j==5-level || i==5+level || j==5+level){
                let objanim = document.getElementById('s'+String(i)+String(j));
                objanim.style.backgroundColor = col;
            }
        }
    }
}

function anim(col,gap){    
    time = 0;
    setTimeout(() => {
        objanim = document.getElementById('s'+String(5)+String(5));
        objanim.style.backgroundColor = col;
    }, time);
    time += gap;
    setTimeout(() => {
        objanim.style.backgroundColor = 'aquamarine';
        animset(1,col);
    }, time);
    time += gap;
    setTimeout(() => {
        animdel(1);
        animset(2,col);
    }, time);
    time += gap;
    setTimeout(() => {
        animdel(2);
        animset(3,col)
    }, time);
    time += gap;
    setTimeout(() => {
        animdel(3);
        animset(4,col);
    }, time);
    time += gap;
    setTimeout(() => {
        animdel(4);
    }, time);
}

setTimeout(() => {
    anim('red',100)
}, 1000);
setTimeout(() => {
    anim('orange',100)
}, 1500);
setTimeout(() => {
    anim('green',100)
}, 2000);

