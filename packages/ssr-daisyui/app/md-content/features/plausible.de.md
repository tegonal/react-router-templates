# Plausible Analytics Feature

## Übersicht

Erweiterte Plausible Analytics-Integration mit fortgeschrittenen Funktionen einschließlich Rate
Limiting, Validierung, Retry-Logik und verbesserter Fehlerbehandlung.

## Funktionen

- **Client-seitiges Event-Tracking** mit automatischer Wiederholung für kritische Events
- **Server-seitiges Event-Proxying** zum Schutz Ihrer Plausible-Instanz
- **Rate Limiting** zur Missbrauchsvermeidung
- **Event-Validierung und -Bereinigung**
- **Konfigurierbare Retry-Logik** für wichtige Events
- **TypeScript-Unterstützung** mit vollständigen Typdefinitionen

## Verwendung

### Client-seitige Events

```typescript
import { plausibleClientEvent, GenericAppEvents } from '~/features/plausible'

// Seitenaufruf tracken
plausibleClientEvent({
  name: GenericAppEvents.PageView,
})

// Benutzerdefiniertes Event mit Eigenschaften tracken
plausibleClientEvent({
  name: GenericAppEvents.UserAction,
  props: {
    action: 'download',
    resource: 'ebook-react-patterns',
  },
})
```

### Server-seitige Events

```typescript
import { plausibleServerEvent } from '~/features/plausible'

// Server-seitige Events tracken (in Loaders/Actions)
export async function loader({ request }: LoaderFunctionArgs) {
  await plausibleServerEvent({
    name: 'api-request',
    url: request.url,
    domain: 'your-domain.com',
    request,
  })

  // ... Rest des Loaders
}
```

## Konfiguration

### Umgebungsvariablen

```env
# Erforderlich
PLAUSIBLE_HOST=https://plausible.io
ORIGIN=https://your-domain.com

# Optional - für selbst gehostete Instanzen
PLAUSIBLE_DOMAIN=your-domain.com
```

### Konfigurationsdatei

Die Feature-Konfiguration befindet sich in `features/plausible/config.ts`:

```typescript
export const plausibleConfig = {
  api: {
    endpoint: '/api/event',
    timeout: 5000,
  },
  rateLimit: {
    maxRequests: 100, // pro IP
    windowMs: 60000, // 1 Minute
  },
  retry: {
    maxAttempts: 3,
    delay: 1000,
    backoffMultiplier: 2,
  },
  validation: {
    maxEventNameLength: 100,
    maxPropsSize: 1024, // 1KB
  },
}
```

## Event-Typen

### Vordefinierte Events

```typescript
enum GenericAppEvents {
  PageView = 'page-view',
  UserAction = 'user-action',
  Search = 'search',
  Download = 'download',
  // ... weitere Events
}
```

### Benutzerdefinierte Events

Sie können Ihre eigenen Event-Typen definieren:

```typescript
type MyCustomEvent = {
  name: 'checkout-completed'
  props: {
    value: string
    currency: string
    items: number
  }
}

plausibleClientEvent({
  name: 'checkout-completed',
  props: {
    value: '99.99',
    currency: 'USD',
    items: 3,
  },
})
```

## API-Route

Die Funktion stellt einen `/api/event`-Endpunkt bereit, der:

1. **Validiert** eingehende Event-Daten
2. **Bereinigt** Eigenschaften zur Injection-Vermeidung
3. **Rate-limitiert** Anfragen pro IP
4. **Leitet weiter** an Ihre Plausible-Instanz
5. **Behandelt Fehler** ordnungsgemäß

## Sicherheitsfunktionen

### Rate Limiting

- Konfigurierbare Anfragen pro Minute pro IP
- Gibt 429 mit Retry-After-Header bei Überschreitung zurück

### Validierung

- Längenbeschränkungen für Event-Namen
- Größenbeschränkungen für Eigenschaften
- Typvalidierung für alle Eigenschaften
- Domain-Format-Validierung
- URL-Struktur-Validierung

### Bereinigung

- Entfernt ungültige Eigenschaftstypen
- Kürzt übergroße Werte
- Filtert potenziell schädliche Inhalte

## Entwicklung vs. Produktion

### Entwicklungsmodus

- Events werden auf localhost unterdrückt
- Debug-Logging aktiviert
- Detaillierte Fehlermeldungen

### Produktionsmodus

- Alle Events werden weitergeleitet
- Minimales Logging
- Generische Fehlermeldungen aus Sicherheitsgründen

## Best Practices

1. **TypeScript verwenden** - Definieren Sie Ihre Event-Typen für Typsicherheit
2. **Verwandte Events gruppieren** - Verwenden Sie konsistente Namenskonventionen
3. **Eigenschaften minimal halten** - Tracken Sie nur, was Sie benötigen
4. **Fehler ordnungsgemäß behandeln** - Analytics sollten niemals die UX unterbrechen
5. **In Entwicklung testen** - Verwenden Sie Debug-Logs zur Event-Verifizierung

## Erweiterte Verwendung

### Benutzerdefinierte Retry-Logik

Für kritische Events, die getrackt werden müssen:

```typescript
import { shouldRetryEvent, withRetry } from '~/features/plausible/utils/retry'

// Konfigurieren, welche Events wiederholt werden sollen
export function shouldRetryEvent(eventName: string): boolean {
  const criticalEvents = ['purchase', 'signup', 'error']
  return criticalEvents.includes(eventName)
}
```

### Server-Kontext

Beim Tracking von Server-Events den Request-Kontext einbeziehen:

```typescript
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

const clientIp = getClientIPAddress(request)
await plausibleServerEvent({
  name: 'form-submission',
  url: request.url,
  domain: 'your-domain.com',
  request,
  props: {
    form: 'contact',
    ip: clientIp,
  },
})
```

## Fehlerbehebung

### Events erscheinen nicht in Plausible

1. Prüfen Sie, ob Umgebungsvariablen gesetzt sind
2. Verifizieren Sie, dass die Domain mit der Plausible-Konfiguration übereinstimmt
3. Prüfen Sie die Browser-Konsole auf Fehler
4. Aktivieren Sie Debug-Logging in der Entwicklung

### Rate-Limiting-Probleme

- Passen Sie `maxRequests` in der Konfiguration an
- Implementieren Sie benutzerspezifische Limits bei Bedarf
- Erwägen Sie Caching für wiederholte Events

### CORS-Fehler

- Verwenden Sie den Proxy-Endpunkt `/api/event`
- Rufen Sie Plausible nicht direkt vom Client auf
