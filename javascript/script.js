mainsud = document.getElementById("mainSudoku");

que = []
// que1 = [
//     [5,3,0,0,7,0,0,0,0],
//     [6,0,0,1,9,5,0,0,0],
//     [0,9,8,0,0,0,0,6,0],
//     [8,0,0,0,6,0,0,0,3],
//     [4,0,0,8,0,3,0,0,1],
//     [7,0,0,0,2,0,0,0,6],
//     [0,6,0,0,0,0,2,8,0],
//     [0,0,0,4,1,9,0,0,5],
//     [0,0,0,0,8,0,0,7,9]
// ]

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
// display(que1)

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
            document.getElementById('s'+String(i)+String(j)).value = '';
        }
    }
}
