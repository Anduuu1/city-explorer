
// Obținerea orașelor cu map
export const getOrase = (list) => list.map(d => d.oras);

// Filtrarea după destinații nevizitate
export const getNevizitate = (list) => list.filter(d => !d.vizitat);

// Agregarea zilelor cu reduce
export const totalZile = (list) => list.reduce((sum, d) => sum + d.zile, 0);

// Formatarea folosind destructuring, template literals și operatorul ternar
export const formatDestinatie = ({ oras, tara, zile, vizitat }) => 
  `[${vizitat ? 'x' : ' '}] ${oras}, ${tara} (${zile} zile)`;

// Agregarea ca obiect per țară
export const numarPeTara = (list) => list.reduce((acc, { tara }) => 
  ({ ...acc, [tara]: (acc[tara] ?? 0) + 1 }), {});

// Ordonarea descrescătoare (se sortează o copie)
export const sortDupaZile = (list) => [...list].sort((a, b) => b.zile - a.zile);

// Marcarea unei destinații ca vizitate (sau nu)
export const marcheazaVizitat = (list, id) => 
  list.map(d => d.id === id ? { ...d, vizitat: !d.vizitat } : d);


export const adaugaDestinatie = (list, d) => [...list, d];

export const stergeDestinatie = (list, id) => list.filter(d => d.id !== id);