
const API_URL = 'http://localhost:3001/destinatii'

// Preia toate destinațiile

export async function getDestinatii(pagina = 1) {
  const response = await fetch(
    `${API_URL}?_page=${pagina}&_per_page=20`
  )

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca destinațiile.')
  }

  return await response.json()
}


// Adaugă o destinație pe server

export async function postDestinatie(destinatie) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...destinatie,
      zile: String(destinatie.zile),
      vizitat: false
    })
  })

  if (!response.ok) {
    throw new Error('Destinația nu a putut fi adăugată.')
  }

  return await response.json()
}


// Actualizează statusul de vizitare
export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ vizitat })
  })

  if (!response.ok) {
    throw new Error('Nu s-a putut actualiza destinația.')
  }

  return await response.json()
}

// Șterge o destinație de pe server
export async function deleteDestinatie(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Destinația nu a putut fi ștearsă.')
  }
}
