# Image Service Feature

## Übersicht

Das Image Service Feature bietet optimierte Bildverarbeitungsfunktionen einschließlich
Größenänderung, Caching und Proxying. Diese Funktion wurde aus einem Payload CMS-basierten Projekt
portiert und enthält Mock-Implementierungen für Payload-spezifische Abhängigkeiten.

## Abhängigkeiten

### Erforderliche Abhängigkeiten

- `sharp` - Für Bildtransformation und -optimierung
- `axios` - Zum Abrufen von Remote-Bildern
- `es-toolkit` - Hilfsfunktionen

### Payload CMS Integration

⚠️ **Wichtig**: Diese Funktion ist an die Payload CMS-Architektur gebunden. Die aktuelle
Implementierung enthält Mock-Services, um diese Abhängigkeiten zu erfüllen:

1. **Payload API Client** (`~/services/api/payload/api-server-service.server.ts`)
   - Mock-Implementierung des Payload CMS API-Clients
   - Stellt `apiServerServiceClient`, `setServiceClientToken` und verwandte Funktionen bereit
   - In einem echten Payload CMS-Projekt würde dies mit Ihrer tatsächlichen Payload API verbunden

2. **Payload Types** (`~/services/api/payload/payload-types.ts`)
   - Mock-Typen für Media-, User- und Page-Entitäten
   - Ersetzen Sie diese durch tatsächlich generierte Typen aus Ihrer Payload CMS-Instanz

## Komponenten

### Image-Komponente

```tsx
import { Image } from '~/features/image-service'
;<Image src="/path/to/image.jpg" alt="Beschreibung" width={800} height={600} loading="lazy" />
```

### ResponsiveImage-Komponente

```tsx
import { ResponsiveImage } from '~/features/image-service'
;<ResponsiveImage
  src="/path/to/image.jpg"
  alt="Beschreibung"
  sizes="(max-width: 768px) 100vw, 50vw"
  className="h-auto w-full"
/>
```

## API-Routen

### Image Resize Endpunkt

**Route**: `/api/image`

Query-Parameter:

- `src` - Quellbild-URL oder -Pfad
- `w` - Breite in Pixeln
- `h` - Höhe in Pixeln
- `q` - Qualität (1-100)
- `format` - Ausgabeformat (webp, jpeg, png, avif)

Beispiel:

```
/api/image?src=/images/hero.jpg&w=800&h=600&format=webp&q=80
```

### Image Proxy Endpunkt

**Route**: `/api/proxy/*`

Leitet Bilder von externen Quellen über Ihren Server um, nützlich für:

- CORS-Probleme
- Caching externer Bilder
- Verbergen ursprünglicher Bildquellen

Beispiel:

```
/api/proxy/https://external-site.com/image.jpg
```

## Konfiguration

### Umgebungsvariablen

```env
# Erforderlich für Proxy-Funktionalität
API_URL=https://your-api-endpoint.com

# Optional - für authentifizierte Payload CMS-Anfragen
PAYLOAD_SERVICE_USER_API_KEY=your-service-key
```

### Unterstützte Payload-Endpunkte

Der Proxy-Endpunkt validiert Anfragen gegen konfigurierte Payload-Endpunkte. Ändern Sie
`PAYLOAD_ENDPOINTS` in `config.server.ts`:

```typescript
export const PAYLOAD_ENDPOINTS = [
  'media',
  'uploads',
  // Fügen Sie hier Ihre Payload-Collections hinzu
]
```

## Caching

Der Image Service implementiert dateibasiertes Caching:

- Verarbeitete Bilder werden im `CACHE_DIR`-Verzeichnis zwischengespeichert
- Cache-Schlüssel werden basierend auf Quell-URL und Transformationsparametern generiert
- Zwischengespeicherte Bilder werden mit langfristigen Cache-Headern bereitgestellt

## Migration von Payload CMS

Wenn Sie dies in einem tatsächlichen Payload CMS-Projekt verwenden:

1. Ersetzen Sie die Mock-Services durch Ihren tatsächlichen Payload API-Client
2. Aktualisieren Sie `payload-types.ts` mit generierten Typen von Payload
3. Konfigurieren Sie `PAYLOAD_ENDPOINTS` für Ihre Collections
4. Richten Sie die richtigen Umgebungsvariablen für API-Zugriff ein

## Performance-Überlegungen

- Bilder werden nach der ersten Transformation zwischengespeichert
- Verwenden Sie geeignete Bildformate (WebP/AVIF für moderne Browser)
- Setzen Sie vernünftige Größenbeschränkungen in Transformationsparametern
- Erwägen Sie CDN-Integration für Produktionsbereitstellungen

## Sicherheit

- Der Proxy-Endpunkt validiert gegen erlaubte Endpunkte
- Bildtransformationen haben Größenbeschränkungen zur Vermeidung von Missbrauch
- Erwägen Sie die Implementierung von Rate Limiting für öffentliche Endpunkte
- Validieren und bereinigen Sie alle Benutzereingaben
