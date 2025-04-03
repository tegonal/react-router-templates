# Projektdokumentation

## Technologien

Diese Starter-Vorlage wurde mit folgenden Technologien erstellt:

- **TypeScript**: Für typsichere JavaScript-Entwicklung
- **[React Router 7](https://reactrouter.com)**: Framework-Modus, konfiguriert für serverseitiges Rendering (SSR)
- **[React 19](https://react.dev/reference/react)**: Die neueste Version von React
- **[Tailwind 4](https://tailwindcss.com/docs/installation/using-vite)**: Für Utility-First CSS-Styling
- **[Vite](https://vite.dev/guide/)**: Für schnelle Entwicklung und Bauzeiten

Bemerkenswerte Bibliotheken und Tools in diesem Projekt:

- **[remix-i18next](https://sergiodxa.github.io/remix-i18next/)**: Internationalisierungs-Framework für mehrsprachige Unterstützung
- **[daisyui](https://daisyui.com/)**: Tailwind CSS-Komponentenbibliothek für minimalistische UI-Komponenten, die so nah wie möglich am Standard-HTML sind, und ausgearbeitetes Theming (siehe `/app/styles/tailwind.css`)
- **[class-variance-authority](https://cva.style)**: Für die Erstellung flexibler Komponentenvarianten
- **[remix-hook-form](https://github.com/forge-42/remix-hook-form)**: Zur Formularverarbeitung, mit `zod` für die Validierung
- **react-markdown**: Zum Rendern von Markdown-Inhalten in React
- **lucide-react**: Alle Icons, die Sie wahrscheinlich jemals benötigen werden
- **@uidotdev/usehooks**: Eine Sammlung nützlicher React-Hooks
- **lodash-es**: Für Hilfsfunktionen

Weitere erwähnenswerte Aspekte:

- **Selbst gehostete Schriftarten**: Open Sans vorinstalliert und einsatzbereit als Beispiel für
  selbst gehostete Schriftarten. Die Schriftartendateien befinden sich in `/public/assets/open-sans/` und die CSS-
  Datei befindet sich in `/app/styles/fonts.css`. Sie können Ihre eigenen Schriftarten hinzufügen, indem Sie
  dieselbe Struktur befolgen.
- **[Plausible.io](https://plausible.io/) Integration**: Einsatzbereit mit
  [Plausible](https://plausible.io/) für Analysen, Seitenaufrufe und Ereignisse; sowohl auf Server- als auch auf Client-Seite. Die Integration befindet sich in `/app/lib/plausible/`. Sie können Ihre eigene Plausible-Domain hinzufügen, indem Sie
  die .env-Datei bearbeiten, wenn Sie selbst hosten. Ereignisse werden immer nur an eine enthaltene API-Route gesendet, damit Sie die Ereigniserfassung auf derselben Domain wie Ihre App ausführen können.
- **Eslint, Prettier**: Vorkonfiguriert mit sinnvollen Standardeinstellungen für TypeScript und React. Sie können
  die Konfigurationsdateien nach Belieben anpassen. Das Projekt verwendet die von `@epic-web/config` bereitgestellten Voreinstellungen.

## Projektstruktur

- `/app/`: Hauptanwendungsverzeichnis
  - `/components/`: Wiederverwendbare UI-Komponenten
    - `/typography/`: Allgemeine Typografie-Komponenten wie Überschriften, Absätze usw.
    - `/theme/`: Layout- und Theming-Komponenten, Kopfzeile, Fußzeile usw.
    - `/ui/`: UI-Komponenten wie Schaltflächen, Eingabefelder usw.
  - `/routes/`: Routenkomponenten und Seitendefinitionen
    - `/files/`: Allgemeine dateibasierte Routen
    - `/api/`: Routen, die nur API-Anfragen verarbeiten
  - `/lib/`: Hilfsfunktionen, API-Clients, Helfer, ...
  - `/hooks/`: Benutzerdefinierte React-Hooks
  - `/config/`: Verschiedene Konfigurationsdateien
  - `/styles/`: Globale Stile und CSS-Dateien für Tailwind
  - `/middleware/`: React Router Middleware
- `/public/`: Statische Assets

## Entwicklung

```bash
yarn run dev # Entwicklungsserver starten
yarn run build # Projekt bauen
yarn run up # Abhängigkeiten aktualisieren
yarn run i18n:extract # i18n-Schlüssel und Standardwerte extrahieren
```
## Bereitstellung

Sie können das enthaltene Dockerfile verwenden, um das Projekt zu bauen und bereitzustellen. Das Dockerfile befindet sich im Stammverzeichnis des Projekts. Das Projekt enthält auch eine Build-Pipeline für GitHub, um ein Image auf ghcr.io zu speichern.
