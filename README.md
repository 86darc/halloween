# Halloween

Kleine Website für Studierende im Halloween-Look (Orange und Braun), gebaut mit React, TypeScript und Vite.

## User Stories

1. Als Studierende/r möchte ich mich mit meinem Schulkonto anmelden, damit ich meine persönlichen Daten sehe.
2. Als Studierende/r möchte ich meinen Wochenstundenplan sehen, damit ich weiss, wann ich Unterricht habe.
3. Als Studierende/r möchte ich meine kommenden Prüfungen sehen, damit ich mich rechtzeitig vorbereiten kann.

## Lokal starten

Voraussetzung: Docker Desktop läuft.

```sh
docker compose up --build
```

Danach ist die Seite unter <http://localhost:5173> erreichbar. Änderungen in `src/` erscheinen ohne Neustart im Browser.

| Aufgabe | Befehl |
| --- | --- |
| Stoppen | `docker compose down` |
| Nach neuen Abhängigkeiten im `package.json` | `docker compose up --build --renew-anon-volumes` |
| Abhängigkeit hinzufügen | `docker compose exec web npm install <paket>` |
| Linter ausführen | `docker compose exec web npm run lint` |
| Build prüfen | `docker compose exec web npm run build` |

## Farben

Die Farben sind als CSS-Variablen in [src/index.css](src/index.css) definiert. Nutzt `var(--color-accent)` und Co. statt fester Farbwerte.

## Zusammenarbeit

Der Branch-Standard steht in [CONTRIBUTING.md](CONTRIBUTING.md).
