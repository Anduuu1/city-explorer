import { useState } from 'react'

import { destinatii as destinatiiInitiale } from './data/destinatii.js'

import Rezumat from './components/Rezumat.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'

import {
  getNevizitate,
  totalZile,
  marcheazaVizitat,
  adaugaDestinatie,
  stergeDestinatie
} from './utils/destinatii.js'

import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale)

  // Marcheaza o destinatie ca vizitata
  function handleToggle(id) {
    setDestinatii((curent) =>
      marcheazaVizitat(curent, id)
    )
  }

  // Adauga o destinatie noua
  function handleAdd(destinatie) {
    setDestinatii((curent) =>
      adaugaDestinatie(curent, destinatie)
    )
  }

  // Sterge o destinatie
  function handleDelete(id) {
    setDestinatii((curent) =>
      stergeDestinatie(curent, id)
    )
  }

  return (
    <main>
      <h1>City Explorer</h1>

      <Rezumat
        total={destinatii.length}
        nevizitate={getNevizitate(destinatii).length}
        zile={totalZile(getNevizitate(destinatii))}
      />

      <FormularDestinatie onAdd={handleAdd} />

      <ListaDestinatii
        destinatii={destinatii}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  )
}
