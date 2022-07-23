function isSafe(arr,m,n,num){
    for (let i = 0; i < 9; i++) {
        if(arr[m][i]==num){
            return false;
        }      
    }
    for (let i = 0; i < 9; i++) {
        if(arr[i][n]==num){
            return false;
        }      
    }

    for(let i = parseInt(m/3)*3;i<parseInt(m/3)*3+3;i++){
        for(let j = parseInt(n/3)*3;j<parseInt(n/3)*3+3;j++){
            if(arr[i][j]==num){
                return false;
            }
        }
    }
    return true;
}

function solve(arr,m,n){
    if(m==9){
        return true;
    }
    if(n==9){
        return solve(arr,m+1,0);
    }
    if(arr[m][n]!=0){
        return solve(arr,m,n+1);
    }
    for(let i=1;i<=9;i++){
        if(isSafe(arr,m,n,i)){
            arr[m][n]=i;
            if(solve(arr,m,n+1)){
                return true;
            }
            else{
                arr[m][n]=0;
            }
        }
    }
    return false;
}
