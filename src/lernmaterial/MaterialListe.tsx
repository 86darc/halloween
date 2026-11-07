import { dateiUrl, materialienFuer } from './materialien.ts'
import type { Modul } from './module.ts'

const LOCALE = 'de-CH'

interface MaterialListeProps {
  modul: Modul
  onZurueck: () => void
}

function MaterialListe({ modul, onZurueck }: MaterialListeProps) {
  const liste = materialienFuer(modul.name)

  return (
    <>
      <button type="button" className="lernmaterial__zurueck" onClick={onZurueck}>
        ← Alle Module
      </button>
      <header className="lernmaterial__kopf">
        <h1>{modul.name}</h1>
        <p>{modul.dozent}</p>
      </header>

      {liste.length === 0 ? (
        <p className="lernmaterial__leer">Für dieses Modul gibt es noch keine Unterlagen.</p>
      ) : (
        <ul className="materialien">
          {liste.map((material) => (
            <li key={material.id} className="material">
              <span className="material__art">{material.art}</span>
              <div className="material__info">
                <strong>{material.titel}</strong>
                <span>
                  Hochgeladen am{' '}
                  <time dateTime={material.hochgeladen}>
                    {new Date(`${material.hochgeladen}T00:00:00`).toLocaleDateString(LOCALE)}
                  </time>
                </span>
              </div>
              <div className="material__aktionen">
                <a href={dateiUrl(material)} target="_blank" rel="noopener" aria-label={`${material.titel} öffnen`}>
                  Öffnen
                </a>
                <a href={dateiUrl(material)} download={material.datei} aria-label={`${material.titel} herunterladen`}>
                  Herunterladen
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default MaterialListe
