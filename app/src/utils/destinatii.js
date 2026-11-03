// Obținerea orașelor cu map
export const getOrase = (list) =>
  list.map(d => d.oras)

// Filtrarea destinațiilor nevizitate
export const getNevizitate = (list) =>
  list.filter(d => !d.vizitat)

// Agregarea zilelor cu reduce
export const totalZile = (list) =>
  list.reduce((sum, d) => sum + d.zile, 0)

// Formatarea destinației
export const formatDestinatie = ({ oras, tara, zile, vizitat }) =>
  `[${vizitat ? 'x' : ' '}] ${oras}, ${tara} (${zile} zile)`

// Agregarea destinațiilor pe țară
export const numarPeTara = (list) =>
  list.reduce((acc, { tara }) => ({
    ...acc,
    [tara]: (acc[tara] ?? 0) + 1
  }), {})

// Sortarea descrescătoare după zile
export const sortDupaZile = (list) =>
  [...list].sort((a, b) => b.zile - a.zile)

// Marcarea unei destinații ca vizitată
export const marcheazaVizitat = (list, id) =>
  list.map(d =>
    d.id === id ? { ...d, vizitat: !d.vizitat } : d
  )

// Adăugarea unei destinații
export const adaugaDestinatie = (list, d) =>
  [...list, d]

// Ștergerea unei destinații
export const stergeDestinatie = (list, id) =>
  list.filter(d => d.id !== id)
