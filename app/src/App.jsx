import { useEffect, useState } from 'react'

import { getDestinatii, patchVizitat } from './api/destinatii.js'

import Rezumat from './components/Rezumat.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Cautare from './components/Cautare.jsx'
import PanouStatistici from './components/PanouStatistici.jsx'

import {
  getNevizitate,
  totalZile,
  adaugaDestinatie,
  stergeDestinatie
} from './utils/destinatii.js'

import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [cautare, setCautare] = useState('')

  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  // Încărcarea destinațiilor de la server
  useEffect(() => {
    async function incarca() {
      setIncarcare(true)

      try {
        const rezultat = await getDestinatii(pagina)

        setDestinatii(rezultat.data)
        setTotalPagini(rezultat.pages)
      } catch (error) {
        setEroare(error.message)
      } finally {
        setIncarcare(false)
      }
    }

    incarca()
  }, [pagina])

  // Marchează destinația ca vizitată
  async function handleToggle(id) {
    try {
      const destinatie = destinatii.find((d) => d.id === id)
      const salvata = await patchVizitat(id, !destinatie.vizitat)

      setDestinatii((curent) =>
        curent.map((d) => (d.id === id ? salvata : d))
      )
    } catch (error) {
      setEroare(error.message)
    }
  }

  // Adaugă o destinație
  function handleAdd(destinatie) {
    setDestinatii((curent) =>
      adaugaDestinatie(curent, destinatie)
    )
  }

  // Șterge o destinație
  function handleDelete(id) {
    setDestinatii((curent) =>
      stergeDestinatie(curent, id)
    )
  }

  // Filtrarea după oraș sau țară
  const text = cautare.trim().toLowerCase()

  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(text) ||
      d.tara.toLowerCase().includes(text)
  )

  if (incarcare) {
    return <p className="stare">Se încarcă destinațiile...</p>
  }

  return (
    <main>
      <h1>City Explorer</h1>

      {eroare && (
        <p className="stare eroare">
          A apărut o eroare: {eroare}
        </p>
      )}

      <PanouStatistici />

      <Rezumat
        total={destinatii.length}
        nevizitate={getNevizitate(destinatii).length}
        zile={totalZile(getNevizitate(destinatii))}
      />

      <FormularDestinatie onAdd={handleAdd} />

      <Cautare
        valoare={cautare}
        onChange={setCautare}
      />

      {destinatii.length === 0 ? (
        <p className="gol">
          Nu ai nicio destinație.
        </p>
      ) : afisate.length === 0 ? (
        <p className="gol">
          Niciun rezultat pentru «{cautare}».
        </p>
      ) : (
        <ListaDestinatii
          destinatii={afisate}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}

      <div className="paginare">
        <button
          onClick={() => setPagina((p) => p - 1)}
          disabled={pagina === 1}
        >
          Înapoi
        </button>

        <span>
          Pagina {pagina} din {totalPagini}
        </span>

        <button
          onClick={() => setPagina((p) => p + 1)}
          disabled={pagina === totalPagini}
        >
          Înainte
        </button>
      </div>
    </main>
  )
}
