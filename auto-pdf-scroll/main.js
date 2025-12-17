// main.js
const { Plugin } = require('obsidian');

module.exports = class AutoPdfScrollPlugin extends Plugin {
	onload() {
		console.log("AutoPdfScrollPlugin geladen.");

		// === KONFIGURATION ===
		this.scrollThreshold = 250; // Zeichen bis Scroll
		this.scrollAmount = 100;    // Pixel pro Scroll
		this.charCount = 0;
		this.lastLength = 0;

		// === Event-Listener für Änderungen im aktiven Editor ===
		this.registerEvent(
			this.app.workspace.on("editor-change", (editor) => {
				const currentLength = editor.getValue().length;
				const diff = currentLength - this.lastLength;
				this.lastLength = currentLength;

				if (diff > 0) {
					this.charCount += diff;
					if (this.charCount >= this.scrollThreshold) {
						this.scrollPdfView();
						this.charCount = 0;
					}
				}
			})
		);
	}

	scrollPdfView() {
		const leaves = this.app.workspace.getLeavesOfType("pdf");
		if (leaves.length === 0) {
			console.warn("Kein PDF-Viewer offen.");
			return;
		}

		const pdfView = leaves[0].view;
		const container = pdfView.containerEl.querySelector(".pdf-viewer-container");
		if (container) {
			container.scrollBy(0, this.scrollAmount);
			console.log(`PDF gescrollt um ${this.scrollAmount}px`);
		} else {
			console.warn("PDF-Container nicht gefunden.");
		}
	}

	onunload() {
		console.log("AutoPdfScrollPlugin entladen.");
	}
};
