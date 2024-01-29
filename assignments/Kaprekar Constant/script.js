const numberInput = document.getElementById('numberInput');
const checkButton = document.getElementById('checkButton');
const textareaOutput = document.getElementById('textareaOutput');

checkButton.addEventListener("click",handleClick);

function handleClick(){
    const validChecks = {
        isValidSize:false,
        isValidNumber:false
    }
    textareaOutput.innerText="";
    checkSize(validChecks);
    checkNumber(validChecks);
    if(validChecks.isValidNumber && validChecks.isValidSize){
        checkKaprekarConstant();
    }
}

function checkSize(validChecks){
    if(numberInput.value.length==4)
        validChecks.isValidSize=true;
    else{
        validChecks.isValidSize=false;
        textareaOutput.innerText="Input must be a 4 digit no.";
    }
}

function checkNumber(validChecks){
    if(!validChecks.isValidSize)
        return;

    if(getUniqueDigitCount()>1)
        validChecks.isValidNumber=true;
    else{
        validChecks.isValidNumber=false;
        textareaOutput.innerText="Given 4 digit no. must have atleast 2 unique digits";
    }
}

function getUniqueDigitCount(){
    const numberCount={};
    const numberString=numberInput.value;
    let uniqueDigitCount=0;
    for(let i=0;i<10;i++)
        numberCount[i.toString()]=0;
    for(let i=0;i<numberString.length;i++){
        if(!numberCount[numberString[i]]++)
            uniqueDigitCount++;
    }
    return uniqueDigitCount;
}

function checkKaprekarConstant(){
    let digits=getDigits(numberInput.value);
    let currentDifference="";
    let solution="";
    while(currentDifference!="6174"){
        let descendingNumber="";
        let ascendingNumber="";
        for(let i=0;i<10;i++){
            for(let j=0;j<digits[i];j++)
                ascendingNumber+=i;
            for(let j=0;j<digits[9-i];j++)
                descendingNumber+=9-i;
        }
        const expression=descendingNumber+"-"+ascendingNumber;
        currentDifference=eval(expression).toString();
        if(currentDifference.length<4)
            for(let i=0;i<4-currentDifference.length;i++)
                currentDifference="0"+currentDifference;
        solution+=(descendingNumber+" - "+ascendingNumber+" = "+currentDifference +"<br>");
        digits=getDigits(currentDifference);
    }
    textareaOutput.innerHTML=solution;
}

function getDigits(numberString){
    const numberCount={}
    for(let i=0;i<10;i++)
        numberCount[i.toString()]=0;
    for(let i=0;i<numberString.length;i++)
        numberCount[numberString[i]]++;
    return numberCount;
}