PDFJS.useOnlyCssZoom = true;
PDFJS.disableTextLayer = true;
PDFJS.maxImageSize = 1024 * 1024;
PDFJS.workerSrc = './build/generic/build/pdf.worker.js';
PDFJS.cMapUrl = './build/generic/web/cmaps/';
PDFJS.cMapPacked = true;

var DEFAULT_URL = './TheHindu-Full-23June16.pdf';
var DEFAULT_SCALE_DELTA = 1.1;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var DEFAULT_SCALE_VALUE = 'auto';

var PDFViewerApplication = {
	pdfDocument: null,
	pdfViewer: null,
	pdfHistory: null,
	pdfLinkService: null,

	open: function (params) {
		var url = params.url;

		// Loading document.
		var loadingTask = PDFJS.getDocument(url);
		loadingTask.then(function (pdfDocument) {
			// Document loaded, specifying document for the viewer.
			this.pdfDocument = pdfDocument;
			this.pdfViewer.setDocument(pdfDocument);
			this.pdfLinkService.setDocument(pdfDocument);
			this.pdfHistory.initialize(pdfDocument.fingerprint);
		}.bind(this), function (exception) {
			console.log("exception occured");
		});
	},

	zoomIn: function pdfViewZoomIn(ticks) {
		var newScale = this.pdfViewer.currentScale;
		do {
			newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
			newScale = Math.ceil(newScale * 10) / 10;
			newScale = Math.min(MAX_SCALE, newScale);
		} while (--ticks && newScale < MAX_SCALE);
		this.pdfViewer.currentScaleValue = newScale;
	},

	zoomOut: function pdfViewZoomOut(ticks) {
		var newScale = this.pdfViewer.currentScale;
		do {
			newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
			newScale = Math.floor(newScale * 10) / 10;
			newScale = Math.max(MIN_SCALE, newScale);
		} while (--ticks && newScale > MIN_SCALE);
		this.pdfViewer.currentScaleValue = newScale;
	},

	initUI: function pdfViewInitUI() {
		var linkService = new PDFJS.PDFLinkService();
		this.pdfLinkService = linkService;

		var container = document.getElementById('viewerContainer');
		var pdfViewer = new PDFJS.PDFViewer({
			container: container,
			linkService: linkService
		});
		this.pdfViewer = pdfViewer;
		linkService.setViewer(pdfViewer);

		this.pdfHistory = new PDFJS.PDFHistory({
			linkService: linkService
		});
		linkService.setHistory(this.pdfHistory);

		document.getElementById('zoomIn').addEventListener('click', function() {
			PDFViewerApplication.zoomIn();
		});

		document.getElementById('zoomOut').addEventListener('click', function() {
			PDFViewerApplication.zoomOut();
		});

		container.addEventListener('pagesinit', function () {
			// We can use pdfViewer now, e.g. let's change default scale.
			pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
		});

		container.addEventListener('pagerendered', function(evt) {
			console.log("pagerendered");
			// show advertisement
			var el = evt.srcElement;
			var img = document.createElement("img");
			img.setAttribute("class", "adv_img");
			el.appendChild(img);
		});
	}
};

document.addEventListener('DOMContentLoaded', function () {
	PDFViewerApplication.initUI();
}, true);

(function animationStartedClosure() {
	// The offsetParent is not set until the PDF.js iframe or object is visible.
	// Waiting for first animation.
	PDFViewerApplication.animationStartedPromise = new Promise(
		function (resolve) {
		window.requestAnimationFrame(resolve);
	});
})();

// We need to delay opening until all HTML is loaded.
PDFViewerApplication.animationStartedPromise.then(function () {
	PDFViewerApplication.open({
		url: DEFAULT_URL
	});
});
