# Online PDF Renderer
A utility to render pdf files on browser and customize the behaviour.

> This utility is made using mozilal pdf.js to render pdf files on browser. This was my pet project and is simple and easy to use for whom who wants minimalistic code to get it up and running and cutomize the behaviour of PDF in the browser.


**Libraries used**

[PDFjs](https://github.com/mozilla/pdf.js)


**About**

1. This is a basic starting point to use mozilla Pdfjs.  
2. It uses range requests to download components of a pdf as images in parallel, which then are put over canvas.  
3. It renders perfectly on all modern browser which supports range requests.  
4. It also has Zoom-In/Zoom-Out inbuilt support.
5. You can also add all the features of a Native PDF viewer on the browser using the PDFjs APIs.


**Demo**

1. Clone the repo.
2. Run ```npm install```  to install the required dependencies.
3. Run ```node server.js``` which runs the local server on port 3010.
4. Open ```http://localhost:3010``` and you will be seeing a default pdf rendered on your browser. Check the Network tab and it will be downloading the pdf as components.


**Licence**  
MIT
