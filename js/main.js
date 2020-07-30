
let columnMapHeader = document.getElementById('column-mapping-header'),
    columnMapping = document.getElementById('column-mapping'),
    fileUpload = document.getElementById('file-upload'),
    file = document.getElementById('file'),
    saveBtn = document.getElementById('save-btn');


let excelFile;

fileUpload.addEventListener('dragover', (e)=> {e.preventDefault();});
fileUpload.addEventListener('drop', dropHandler);
file.addEventListener('change', fileUploadHandler, false);


saveBtn.addEventListener('click',  () => {    
        const formData = new FormData();
        formData.append('file', excelFile);
        fetch('https://httpbin.org/anything', {
                method: 'POST',
                body: formData })
            .then( response => {
                if (response.ok) {
                    alert('excel file posted successfully');
                    location.reload();
                }
            })
            .catch(error => alert(error) )
    }
);


function dropHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let files = e.dataTransfer.files;
        excelFile = files[0];
    handleFile(excelFile);     
    toggleDisplay();   
}

function fileUploadHandler(e){
    let files = e.target.files; 
    excelFile = files[0];
    handleFile(excelFile);
    toggleDisplay(); 
}

function handleFile(file) {
    let reader = new FileReader();   

    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});
        let sheetName = workbook.SheetNames[0];
        let workSheet = workbook.Sheets[sheetName];  
        
        //check if the file column titles are as should be
        if (validateHeader(workSheet)) {    

        //present as table
        let htmlStr = XLSX.write(workbook, {sheet:sheetName, type: 'binary', bookType:'html'});
        let table = document.getElementById('column-mapping');
        table.innerHTML += htmlStr;

        }
        else {
            alert("wrong heading");
            location.reload();
        }

    };
    reader.readAsArrayBuffer(file);
}


//function used to validate the excel file
function validateHeader(worksheet) {
    let validated = false;

    function checkValue(expectedValue, cellAddress) {
        if(worksheet[cellAddress].v) {
            return (worksheet[cellAddress].v === expectedValue);                
        }
        else {
            return false;
        }
    }

    let correctName = false;
        headerIsUnrepeated = false;

    if (checkValue('Fullname','A1') ){
        if (checkValue('Phone Number', 'B1'))  {
            if (checkValue('Address','C1')) {
                if (checkValue('State','D1')) {
                    if (checkValue('LGA', 'E1')) {
                        if (checkValue('Date of Birth', 'F1')){
                            if (checkValue('Salary', 'G1')) {
                                if (checkValue('Gender', 'H1')) {
                                    if (checkValue('Call Allowance','I1')) {
                                        if ('Transport Allowance', 'J1') {
                                            correctName = true; 
                                        }}}}}}}}}}
    //check if the header shows just once
    if (worksheet['A1'].v != worksheet['A2'].v ) {
        if (worksheet['B1'].v != worksheet['B2'].v)  {
            if (worksheet['C1'].v != worksheet['C2'].v) {
                if (worksheet['D1'].v != worksheet['D2'].v)  {
                    if (worksheet['E1'].v != worksheet['E2'].v)  {
                        if (worksheet['F1'].v != worksheet['F2'].v) {
                            if (worksheet['G1'].v != worksheet['G2'].v)  {
                                if (worksheet['H1'].v != worksheet['H2'].v)  {
                                    if (worksheet['I1'].v != worksheet['I2'].v)  {
                                        if (worksheet['J1'].v != worksheet['J2'].v) {
                                            headerIsUnrepeated = true;
                                        }}}}}}}}}}
                                    
        validated = (correctName && headerIsUnrepeated) ;   
        return   validated;                          
    }

    function toggleDisplay() {
        let columnMapHeader = document.getElementById('column-mapping-header'),
        columnMapping = document.getElementById('column-mapping'),
        container = document.getElementById('container'),
        fileUpload = document.getElementById('file-upload');

        if(fileUpload.style.display != 'none') {
            fileUpload.style.display = 'none';
            columnMapHeader.style.display = 'flex';
            columnMapping.style.display = 'block';
            columnMapping.style.width = '85vw';
            columnMapping.style.margin = '2vh'
            container.style.flexDirection = 'column';
        }
        else {
            fileUpload.style.display = 'flex';
            columnMapHeader.style.display = 'none';
            columnMapping.style.display = 'none';
            container.style.flexDirection = 'row';
        }
    }

    
            
       
    