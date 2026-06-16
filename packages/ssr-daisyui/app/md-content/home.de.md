# Projektdokumentation

## Technologien

Diese Starter-Vorlage wurde mit folgenden Technologien erstellt:

- **TypeScript**: Für typsichere JavaScript-Entwicklung
- **[React Router 7](https://reactrouter.com)**: Framework-Modus, konfiguriert für serverseitiges
  Rendering (SSR)
- **[React 19](https://react.dev/reference/react)**: Die neueste Version von React
- **[Tailwind 4](https://tailwindcss.com/docs/installation/using-vite)**: Für Utility-First
  CSS-Styling
- **[Vite](https://vite.dev/guide/)**: Für schnelle Entwicklung und Bauzeiten

Bibliotheken und Tools in diesem Projekt:

- **[remix-i18next](https://sergiodxa.github.io/remix-i18next/)**: Internationalisierungs-Framework
  für mehrsprachige Unterstützung, mit typsicheren Übersetzungsschlüsseln, die von
  **[i18next-cli](https://github.com/i18next/i18next-cli)** extrahiert und generiert werden
  (`yarn i18n:extract`)
- **[daisyui](https://daisyui.com/)**: Tailwind CSS-Komponentenbibliothek für minimalistische
  UI-Komponenten, die so nah wie möglich am Standard-HTML sind, und ausgearbeitetes Theming (siehe
  `/app/styles/tailwind.css`)
- **[Base UI](https://base-ui.com)**: Headless-, barrierefreie Komponenten-Primitive. Verwenden Sie
  für einfache Komponenten nur DaisyUI-Klassen; für komplexe, interaktive (Dropdowns, Dialoge, Menüs,
  Selects, …) bauen Sie auf Base UI für das Verhalten auf und stylen es mit DaisyUI-Klassen
- **[class-variance-authority](https://cva.style)**: Für die Erstellung flexibler
  Komponentenvarianten
- **[remix-hook-form](https://github.com/forge-42/remix-hook-form)**: Zur Formularverarbeitung, mit
  `zod` für die Validierung
- **react-markdown**: Zum Rendern von Markdown-Inhalten in React
- **lucide-react**: Alle Icons, die Sie wahrscheinlich jemals benötigen werden
- **@uidotdev/usehooks**: Eine Sammlung nützlicher React-Hooks
- **es-toolkit**: Moderne Hilfsfunktionen (lodash-Ersatz)

## Integrierte Funktionen

Diese Vorlage enthält zwei leistungsstarke Funktionen aus Produktionsanwendungen:

### [Image Service Feature](/features/image-service)

Erweiterter Service zur Bildoptimierung und -transformation mit:

- Bildgrößenänderung und Formatkonvertierung in Echtzeit
- Bild-Proxying für externe Quellen
- Intelligentes Caching-System
- **Hinweis**: Diese Funktion ist an die Payload CMS-Architektur gebunden. Siehe
  [Dokumentation](/features/image-service) für Integrationsdetails.

### [Plausible Analytics Feature](/features/plausible)

Verbesserte Analytics-Integration mit:

- Client- und serverseitiges Event-Tracking
- Rate Limiting und Validierung
- Automatische Wiederholung für kritische Events
- Vollständige TypeScript-Unterstützung

Weitere erwähnenswerte Aspekte:

- **Selbst gehostete Schriftarten**: Open Sans vorinstalliert und einsatzbereit als Beispiel für
  selbst gehostete Schriftarten. Die Schriftartendateien befinden sich in
  `/public/assets/open-sans/` und die CSS-Datei befindet sich in `/app/styles/fonts.css`. Sie können
  Ihre eigenen Schriftarten hinzufügen, indem Sie dieselbe Struktur befolgen.
- **Eslint, Prettier**: Vorkonfiguriert mit sinnvollen Standardeinstellungen für TypeScript und
  React in `eslint.config.js` und `.prettierrc.mjs`. Die Konfiguration wird direkt im Projekt
  gepflegt (keine gemeinsam genutzte Preset-Abhängigkeit), sodass Sie sie frei anpassen können.

## Projektstruktur

- `/app/`: Hauptanwendungsverzeichnis
  - `/components/`: Wiederverwendbare UI-Komponenten
    - `/typography/`: Allgemeine Typografie-Komponenten wie Überschriften, Absätze usw.
    - `/theme/`: Layout- und Theming-Komponenten, Kopfzeile, Fußzeile usw.
    - `/ui/`: UI-Komponenten wie Schaltflächen, Eingabefelder usw.
  - `/features/`: Eigenständige Feature-Module
    - `/image-service/`: Bildoptimierung und -transformation
    - `/plausible/`: Analytics-Integration
  - `/routes/`: Routenkomponenten und Seitendefinitionen
    - `/files/`: Allgemeine dateibasierte Routen
    - `/api/`: Routen, die nur API-Anfragen verarbeiten
  - `/lib/`: Hilfsfunktionen, API-Clients, Helfer, ...
  - `/hooks/`: Benutzerdefinierte React-Hooks
  - `/config/`: Verschiedene Konfigurationsdateien
  - `/styles/`: Globale Stile und CSS-Dateien für Tailwind
  - `/middleware/`: React Router Middleware
  - `/md-content/`: Markdown-Dokumentationsdateien
    - `/features/`: Feature-spezifische Dokumentation
- `/public/`: Statische Assets

## Entwicklung

```bash
yarn run dev # Entwicklungsserver starten
yarn run build # Projekt bauen
yarn run up # Abhängigkeiten aktualisieren
yarn run i18n:extract # i18n-Schlüssel extrahieren und Typen neu generieren
yarn run i18n:types # nur i18n-Typen neu generieren
yarn run check # vor dem Commit linten, formatieren und Typen prüfen
```

## Bereitstellung

Sie können das enthaltene Dockerfile verwenden, um das Projekt zu bauen und bereitzustellen. Das
Dockerfile befindet sich im Stammverzeichnis des Projekts. Das Projekt enthält auch eine
Build-Pipeline für GitHub, um ein Image auf ghcr.io zu speichern.
