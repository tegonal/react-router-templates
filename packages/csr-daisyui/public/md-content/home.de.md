# Projektdokumentation

## Technologien

Diese Starter-Vorlage wurde mit folgenden Technologien erstellt:

- **TypeScript**: Für typsichere JavaScript-Entwicklung
- **[React Router 7](https://reactrouter.com)**: Im Library-Modus, konfiguriert für Client-Side Rendering (CSR)
- **[React 19](https://react.dev/reference/react)**: Die neueste Version von React
- **[Tailwind 4](https://tailwindcss.com/docs/installation/using-vite)**: Für Utility-First CSS-Styling
- **[Vite](https://vite.dev/guide/)**: Für schnelle Entwicklung und Build-Zeiten

Bibliotheken und Tools in diesem Projekt:

- **[react-i18next](https://react.i18next.com)**: Internationalisierungs-Framework für mehrsprachige Unterstützung
- **[daisyui](https://daisyui.com/)**: Tailwind CSS-Komponentenbibliothek für minimalistische UI-Komponenten, die so nah wie möglich an Vanilla-HTML sind, mit umfangreichen Theming-Möglichkeiten (siehe `/app/styles/tailwind.css`)
- **[class-variance-authority](https://cva.style)**: Für die Erstellung flexibler Komponentenvarianten
- **[react-hook-form](https://www.react-hook-form.com)**: Für Formularverarbeitung mit `zod` für die Validierung
- **react-markdown**: Für das Rendern von Markdown-Inhalten in React
- **lucide-react**: Alle Icons, die Sie wahrscheinlich jemals benötigen werden
- **@uidotdev/usehooks**: Eine Sammlung nützlicher React-Hooks
- **lodash-es**: Für Hilfsfunktionen

Weitere erwähnenswerte Funktionen:

- **Selbstgehostete Schriften**: Open Sans vorinstalliert und einsatzbereit als Beispiel für
  selbstgehostete Schriften. Die Schriftdateien befinden sich in `/public/assets/open-sans/` und die CSS-Datei
  in `/app/styles/fonts.css`. Sie können Ihre eigenen Schriften hinzufügen, indem Sie
  die gleiche Struktur befolgen.
- **[Plausible.io](https://plausible.io/) Integration**: Bereit zur Nutzung mit
  [Plausible](https://plausible.io/) für Analytics, Seitenaufrufe und Events auf der Clientseite. Die Integration befindet sich in `/app/lib/plausible/`. Sie können Ihre eigene Plausible-Domain durch
  Bearbeitung der .env-Datei festlegen, wenn Sie selbst hosten.
- **Eslint, Prettier**: Vorkonfiguriert mit sinnvollen Standardeinstellungen für TypeScript und React. Sie können
  die Konfigurationsdateien nach Ihren Vorlieben anpassen. Das Projekt verwendet die von `@epic-web/config` bereitgestellten Voreinstellungen.

## Projektstruktur

- `/app/`: Hauptverzeichnis der Anwendung
  - `/components/`: Wiederverwendbare UI-Komponenten
    - `/typography/`: Allgemeine Typografie-Komponenten wie Überschriften, Absätze usw.
    - `/theme/`: Layout- und Theming-Komponenten, Header, Footer usw.
    - `/ui/`: UI-Komponenten wie Buttons, Eingabefelder usw.
  - `/routes/`: Routen-Komponenten und Seitendefinitionen
  - `/lib/`: Hilfsfunktionen, API-Clients, Helfer, ...
  - `/hooks/`: Benutzerdefinierte React-Hooks
  - `/config/`: Verschiedene Konfigurationsdateien
  - `/styles/`: Globale Stile und CSS-Dateien für Tailwind
- `/public/`: Statische Assets

## Entwicklung

```bash
yarn run dev # Entwicklungsserver starten
yarn run build # Projekt bauen
yarn run up # Abhängigkeiten aktualisieren
yarn run i18n:extract # i18n-Schlüssel und Standardwerte extrahieren
```

## Bereitstellung

Sie können das enthaltene Dockerfile verwenden, um das Projekt zu erstellen und bereitzustellen. Es startet einen Caddy-Webserver beim Start und stellt die App auf einer Domain bereit, die in der Caddyfile definiert ist. Das Dockerfile und die Caddyfile befinden sich im Wurzelverzeichnis des Projekts. Das Projekt enthält auch eine Build-Pipeline für GitHub, um ein Image auf ghcr.io zu speichern.
