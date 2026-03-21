# StyleGuider Plattform Go/No-Go Checkliste

Stand: 2026-03-21

## Ziel

Diese Checkliste hilft euch bei der Entscheidung:

- **Web-App reicht weiterhin**
- **PWA als Zwischenschritt**
- **Desktop-App oder Mobile-App sinnvoll**

---

## Kurzregel

Wenn ihr die meisten Punkte mit **Nein** beantwortet, bleibt bei **Web (Vercel)**.  
Wenn mehrere Punkte mit **Ja** beantwortet werden, prüft den jeweiligen Zielpfad.

---

## A) Reicht Web weiterhin?

1. Funktioniert der Hauptflow stabil im Browser auf Desktop und Mobile?
2. Reicht Online-Betrieb für den Alltag der Nutzer?
3. Ist Dateiupload/-download im Browser ausreichend?
4. Gibt es keine starken Performance-Probleme im Browser?
5. Braucht ihr keine tiefe OS-Integration (native Menüs, lokale Ordnerbeobachtung, System-Shortcuts)?

Wenn **4-5x Ja**: Web-App ist aktuell ausreichend.

---

## B) Brauchen wir eine PWA als nächsten Schritt?

1. Nutzer möchten die App „wie eine App“ starten (Homescreen/Dock), aber ohne Store.
2. Ein Teil der Inhalte soll temporär offline lesbar sein.
3. Push/Reminder wären hilfreich, aber keine komplexe Native-Logik nötig.
4. Ihr wollt geringen Mehraufwand gegenüber der Web-App.

Wenn **3-4x Ja**: PWA als Zwischenschritt ist sinnvoll.

---

## C) Go für Desktop-App?

1. Ihr braucht intensives Arbeiten mit lokalen Dateien/Ordnern.
2. Native Fenster-/Menülogik oder globale Shortcuts sind wichtig.
3. Drag-and-drop über mehrere lokale Apps ist Kern des Workflows.
4. Offline-First ist ein Muss.
5. Nutzer arbeiten primär stundenlang am Desktop.

Wenn **3+ Ja**: Desktop-App ist begründet.

---

## D) Go für Mobile-App?

1. Kernnutzung passiert unterwegs am Smartphone.
2. Kamera/Scan/Location/Native-Sensoren sind zentral.
3. Push-Strategie ist produktkritisch.
4. App-Store-Präsenz ist wichtig für Wachstum oder Vertrauen.
5. Touch-optimierte Kurzflows sind Kern des Produkts.

Wenn **3+ Ja**: Mobile-App ist begründet.

---

## E) Entscheidungs-Gate vor nativer Entwicklung

Vor Start einer Desktop/Mobile-App alle Punkte prüfen:

1. Klarer Business-Nutzen dokumentiert (nicht nur „wäre nice“).
2. Priorisierte Native-Features mit messbarem Nutzen.
3. Aufwand, Wartung und QA-Mehrkosten eingeplant.
4. Verantwortlichkeit für Release-Prozess geklärt.
5. Exit-Plan definiert, falls Adoption gering bleibt.

Wenn ein Punkt offen ist: erst schließen, dann starten.

---

## Empfehlung für StyleGuider (aktuell)

**Jetzt bei Web bleiben** und weiter auf Vercel iterieren.  
Optional als nächster, kleiner Schritt: **PWA**, falls Installierbarkeit/Offline-Cache gewünscht ist.

