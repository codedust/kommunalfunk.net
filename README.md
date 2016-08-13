## Kommunalfunk.net
[Diese Webseite](https://kommunalfunk.net) verfolgt das Ziel, alle Kooperationen von Freifunkern mit Städten und Gemeinden zu dokumentieren und auf einer Karte darzustellen.

### cooperations.yaml
Alle Kooperationen finden sich in der Datei `cooperations.yaml`. Ein Eintrag ist wie folgt aufgebaut:

```yaml
- commune: Musterstadt
  geo: [51.1234, 10.1234]
  cooperations:
  - name: Versorgung von Unterkünften
    community: musterstadt
    description: Die Stadt Aachen stellt Hardware zur Verfügung.
    type: refugees
    start: 2016-08-22
    weblinks:
    - Freies WLAN für Geflüchtete: https://musterstadt.de/refugees-welcome/
    - Flüchtlingsfunk: https://musterzeitung.de/content/fluchtfunk/
  - name: WLAN im Rathaus
    community: musterstadt
    description: Die Stadt Musterstadt betreibt nun im Rathaus einen Freifunk-Knoten für die Besucher des Einwohnermeldeamtes.
    type: hotspot
    start: 2016-08-22
    weblinks:
    - Kooperation in Musterstadt: https://musterstadt.de/freifunk-im-rathaus/
```

Der maschinenlesbare Name der Community (hier: `musterstadt`) sollte mit dem [aus der Freifunk-API](https://github.com/freifunk/directory.api.freifunk.net/blob/master/directory.json) übereinstimmen.

Pull-Request und/oder Issues mit Informationen zu weiteren Kooperationen sind gerne gesehen. :)

### Lizenz
Dieses Projekt darf unter den Bedingungen der GNU Affero General Public License veröffentlicht, weitergeben und/oder modifizieren werden.
