
let inputText= document.querySelector("#input");
let size= document.querySelector("#sizing");
let Alert= document.querySelector("#alert");
let qrImageDive= document.querySelector("#qr-image-div");
let qrImage= document.querySelector("#qr-image");
let qrGeneratorBtn= document.querySelector("#generate-btn");
let qrDownloadBtn= document.querySelector("#download-btn");
// let qrApi=  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";


// we should update the url with our information in size and data ( ?size=150x150  &data= ).
let qrApi=  "https://api.qrserver.com/v1/create-qr-code/";

qrGeneratorBtn.addEventListener("click", GenerateQr);
function GenerateQr(event) {
    event.preventDefault();

      ChangSizing(event);


    // +"x"+  use for concatenate (width x height for ex:100x100)
    let newSize= size.value +"x"+ size.value;
    let Text= inputText.value

   let Generate= `${qrApi}?size=${newSize}&data=${Text}`;

   if (inputText.value.length===0) {
        Alert.style.color= "red";
   }else{
         Alert.style.color= "black";
         qrImage.src= Generate;
         DownloadQr();  
   }   
}

// ChangSizing function=============================
size.addEventListener("change",ChangSizing);
function ChangSizing(event) {
    event.preventDefault();

    let changeQRSize= size.value +"px";

    qrImageDive.style.height=  changeQRSize;
    qrImageDive.style.width=  changeQRSize;
    qrImage.src= "";

    // addEventListener "change", works when the value of size changes.it is one of the addEventListener like submit or click.

    // let changeQRSize= size.value +"px" ,convert the size value into a valid css size string for example when (size.value is 200 the new size is "200px")
   
}

// DownloadQr function==============================
qrDownloadBtn.addEventListener("click",DownloadQr);
function DownloadQr() {
    
    let qrPicturePrint= qrImage.src;
    
    fetch(qrPicturePrint)
    .then(function(response){
        return response.blob();
    })
    .then (function (blob) {
        let url= URL.createObjectURL(blob);
        qrDownloadBtn.href= url;
        qrDownloadBtn.download= "QRCode.png";  
    })
    .catch(function (error) {
        console.log(`Error: ${error}`);
         
    })
  
   console.log(qrDownloadBtn);
   console.log(qrPicturePrint);

   // blob() or (binary large object)is a method that represent immutable raw data in javaScript. which means that it can store and manipulate binary data like images, audio, text, or videos.

    //  return response.blob(); convert response to a blob using blob method to create a blob object from response to handle binary data in web application.

    // let url= URL.createObjectURL(blob); create a downloadable url for the blob.
      
}












