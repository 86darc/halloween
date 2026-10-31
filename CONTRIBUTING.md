# Zusammenarbeit

## Branches

```text
main                stabil, nur Merges aus dev
└── dev             Integrationsstand des Teams
    ├── feature/login
    ├── feature/stundenplan
    └── feature/pruefungen
```

- Jedes neue Feature bekommt einen eigenen Branch, der von `dev` abzweigt.
- Niemand committet direkt auf `main` oder `dev`.
- Features gehen per Pull Request nach `dev`, nie direkt nach `main`.
- `main` wird nur per Pull Request aus `dev` aktualisiert, wenn der Stand gemeinsam geprüft ist.

## Ablauf für ein Feature

```sh
git switch dev
git pull
git switch -c feature/kurzer-name

# arbeiten und committen
git push -u origin feature/kurzer-name
```

Dann auf GitHub einen Pull Request mit Ziel `dev` öffnen (nicht `main`). Eine andere Person aus dem Team prüft ihn und merged ihn. Danach kann der Feature-Branch gelöscht werden.

## Aktuell bleiben

Hat sich `dev` während der Arbeit verändert, holt ihr den Stand in euren Feature-Branch:

```sh
git switch dev
git pull
git switch feature/kurzer-name
git merge dev
```

## Namen

Branches heissen `feature/<name>` oder `fix/<name>`, klein geschrieben, mit Bindestrichen und ohne Umlaute.
