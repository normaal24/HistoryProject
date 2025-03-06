const currentPage = document.getElementById('current_page');
const viewer = document.querySelector('.pdf-viewer');
let currentPDF = {}

function resetCurrentPDF() {
	currentPDF = {
		file: null,
		countOfPages: 0,
		currentPage: 1,
		zoom: 1.5
	}
}

document.getElementById('next').addEventListener('click', () => {
	if (currentPDF.currentPage < currentPDF.countOfPages) {
		currentPDF.currentPage += 1;
		renderCurrentPage();
	}
});

document.getElementById('previous').addEventListener('click', () => {
	if (currentPDF.currentPage > 1) {
		currentPDF.currentPage -= 1;
		renderCurrentPage();
	}
});

function loadPDF(url) {
	const pdfFile = pdfjsLib.getDocument(url);
	resetCurrentPDF();
	pdfFile.promise.then((doc) => {
		currentPDF.file = doc;
		currentPDF.countOfPages = doc.numPages;
		viewer.classList.remove('hidden');
		document.querySelector('main h3').classList.add("hidden");
		renderCurrentPage();
	});
}

function renderCurrentPage() {
	currentPDF.file.getPage(currentPDF.currentPage).then((page) => {
		var context = viewer.getContext('2d');
		var viewport = page.getViewport({ scale: currentPDF.zoom });
		viewer.height = viewport.height;
		viewer.width = viewport.width;

		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		page.render(renderContext);
	});
	currentPage.innerHTML = currentPDF.currentPage + ' of ' + currentPDF.countOfPages;
}

// Load predefined PDF on page load
window.onload = () => {
	// console.log("Wassup");
	loadPDF('../static/pdf/stigly_vishni_demo-1.pdf'); // Change to your actual PDF file path
};
