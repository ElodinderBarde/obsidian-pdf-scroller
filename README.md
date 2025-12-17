#  Auto PDF Scroll (Obsidian Plugin)

Ein leichtgewichtiges Obsidian-Plugin, das geöffnete PDFs automatisch nach unten scrollt, während du im Editor schreibst.
Ideal für Mitschriften, Transkriptionen oder Arbeiten mit PDF-Quellen neben dem Markdown-Editor.

---

##  Features

* Automatisches Scrollen eines geöffneten PDFs
* Scroll-Auslösung nach definierter Anzahl geschriebener Zeichen
* Kein manuelles Eingreifen nötig
* Desktop-only (gezielt für produktives Arbeiten)

---

##  Funktionsweise

Das Plugin registriert einen Listener auf Änderungen im aktiven Editor.
Sobald eine definierte Anzahl **neu geschriebener Zeichen** erreicht ist, wird das aktuell geöffnete PDF um eine feste Pixelanzahl nach unten gescrollt.

Technisch geschieht dies über:

* `editor-change` Event
* Zeichendifferenz-Tracking
* Zugriff auf den Obsidian-PDF-Viewer (`getLeavesOfType("pdf")`)

Die komplette Logik befindet sich in `main.js` .

---

##  Konfiguration (im Code)

Aktuell erfolgt die Konfiguration direkt im Plugin-Code:

```js
this.scrollThreshold = 250; // Zeichen bis Scroll
this.scrollAmount = 100;    // Pixel pro Scroll
```

**scrollThreshold**
Anzahl neu geschriebener Zeichen, bevor gescrollt wird.

**scrollAmount**
Pixelanzahl, um die das PDF nach unten bewegt wird.

>  Erweiterungsidee: Auslagerung in `this.settings` + Settings-Tab (Obsidian Best Practice).

---

##  Installation

### Manuell (Entwicklung / Test)

1. Repository klonen oder herunterladen
2. Ordner nach
   `ObsidianVault/.obsidian/plugins/auto-pdf-scroll/` kopieren
3. Folgende Dateien müssen enthalten sein:

   * `main.js`
   * `manifest.json` 
4. Obsidian neu starten
5. Plugin unter **Community Plugins** aktivieren

---

##  Voraussetzungen

* Obsidian ≥ **1.5.0**
* Desktop-Version (Windows / macOS / Linux)
* Mindestens ein geöffnetes PDF im Workspace

---

##  manifest.json

```json
{
  "id": "auto-pdf-scroll",
  "name": "Auto PDF Scroll",
  "version": "0.1.0",
  "minAppVersion": "1.5.0",
  "isDesktopOnly": true
}
```

---

##  Bekannte Einschränkungen

* Es wird **immer das erste gefundene PDF** gescrollt
  → keine Priorisierung bei mehreren offenen PDFs
* Keine UI-Konfiguration
* Kein Schutz gegen Scrollen über das Dokumentende hinaus

---

##  Mögliche Erweiterungen

* Einstellungsmenü (Threshold / ScrollAmount)
* Auswahl des Ziel-PDFs
* Scroll-Richtung umkehrbar
* Scrollen nur bei aktivem Editor-Leaf
* Pausieren per Toggle-Command

---

##  Autor

**Elodin**


