# Description

ICT-UEK 295 Prüfungsvorlage.

## Test

Es gibt mehrere Tests

für dich Massgebend sind die Tests, welche mit test-todo.... beginnen. Nur diese Tests werden in der Pipeline laufen gelassen.

```bash
# unit tests
$ npm run test-todo

# e2e tests
$ npm run test-todo:e2e

# test coverage
$ npm run test-todo:cov
```

## Planung

Hier kommt deine Projektplanung hin

### Projektinformationen
Projektname: 
Projektdauer: 
Ersteller: 

### Vorgehen / Aufgaben-tabelle

| Aufgabe                                         | aufwand / h | echter aufwand /h |
|-------------------------------------------------|-------------|-------------------|
| Zeitplan erstellen                              | 30 min      | 30 min            |
| Package.json bearbeiten                         | 10min       | 10 min            |
| SqlIte Datenbank aufsetzen und DTO Files machen | 30min       | 40 min            |
| Swagger API Dokumentation                       | 30 min      | 45 min            |
| Security.env erstellen                          | 10min       | 5 min             |
| Alle/ein Item lesen                             | 1.5h        | 10 min            |
| Item anlegen und anpassen                       | 1.5h        | ^                 |
| Item ersetzen und löschen                       | 1.5h        | ^                 |
| Testing und Bugfixing                           | 3h          | 1.5h              |  
| Linter fixing                                   | 30min       | 0 min             |

etc.

## Fazit Robin Bärtschi
Die Planung für das Projekt war eher schwierig. Ich hatte Schwierigkeiten die Zeiten gut einzuordnen.
Manche Dinge waren sehr viel einfacher als erwartet (Item lesen/anlegen/anpassen/löschen),
währen dessen andere Dinge wie die Swagger API Dokumentation oder die Datenbank und DTO Files ein wenig länger
ging als erwartet. Ich hatte das Glück, dass ich keine Linting errors hatte, da ich die ganze Zeit nebenan
gemacht habe. Testing war sehr frustrierend aber auch nicht zu schwierig. Ein Test ist die
ganze Zeit mit einem 500 fehlgeschlagen und ich konnte nicht herausfinden, warum er gecrasht ist,
oder welcher Test überhaupts fehlgeschlagen ist. Im Ganzen, war das Projekt trotzdem
sehr gut um die Anwendung von den gelernten Konzepten zu üben und testen und ich konnte immer
noch etwas Neues lernen.
