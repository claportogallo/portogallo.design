window.PROJECTS = {
  "Gelateria Firenze": {
    title: "Gelateria Firenze", 
    desc: `<strong>Firenze 2024 - Progettazione nuova gelateria</strong>

Il concept per il nuovo locale di Barroccino in via del Corso ha alla base la volontà di unire elementi caratterizzanti dell’architettura e stile fiorentino con i suoi materiali e forme.
Ciò che contraddistingue Firenze e che porta anche Barroccino nel suo spirito è l’<strong>artigianalità</strong>.

Se i prodotti e le materie prime per la realizzazione del gelato e dei dolci sono tutti naturali e provengono da una filiera corta e controllata, anche i materiali e i prodotti di cui è fatto il locale dovrebbero essere artigianali e realizzati con materiali del luogo e/o tipici delle realizzazioni a Firenze.

L’arte e la storia della città non possono meglio che esprimersi con mobili fatti a mano da artigiani locali con materie prime naturali e tradizionali.

In questo modo è possibile ottenere un luogo attento ai bisogni dell’ecosistema e realizzare un’architettura <strong>ambientale</strong> e <strong>sostenibile</strong>.

Tutto questo si traduce in un luogo che deve parlare da solo:
senza la necessità di un cartello o di una spiegazione, il cliente deve sentirsi in un autentico negozio fiorentino, dove assapora con gli occhi, gli odori e con il palato il gusto e il sapore di ciò che si vende all’interno: un’esperienza di piacere.

 Il progetto per il nuovo locale di Barroccino in via del Corso si può riassumere quindi in 3 parole:
 <strong>AUTENTICO, ARTIGIANALE, AMBIENTALE</strong>.
 L’esperienza che si vuole regalare al cliente, possa questo essere un turista distratto o un cittadino fiorentino, è quella di entrare in un luogo che c’è sempre stato.

 Link:
<a href="https://www.instagram.com/barroccinofirenze/" target="_blank" rel="noopener noreferrer">Instagram</a> ·
<a href="https://gelateriabarroccino.it/" target="_blank" rel="noopener noreferrer">Sito ufficiale</a>
    ,
    
    images: ["assets/images/projects/a/1.jpg", "assets/images/projects/a/2.jpg", "assets/images/projects/a/3.jpg", "assets/images/projects/a/4.jpg", "assets/images/projects/a/5.jpg", "assets/images/projects/a/6.jpg", "assets/images/projects/a/7.jpg", "assets/images/projects/a/8.jpg"] 
  },
  
  "New Brand David": { 
    title: "New Brand David", 
    desc: "Coordinato grafico matrimonio: invito, menu, segnaposto.", 
    images: ["assets/images/projects/b/1.jpg", "assets/images/projects/b/2.jpg", "assets/images/projects/b/3.jpg", "assets/images/projects/b/4.jpg", "assets/images/projects/b/5.jpg", "assets/images/projects/b/6.jpg"] 
  },
  
  "Home* Project": { 
    title: "Home* Project", 
    desc: "Coordinamento BIM, modelli federati e tavole automatiche.", 
    images: ["assets/images/projects/c/1.jpg", "assets/images/projects/c/2.jpg", "assets/images/projects/c/3.jpg", "assets/images/projects/c/4.jpg", "assets/images/projects/c/5.jpg", "assets/images/projects/c/6.jpg", "assets/images/projects/c/7.jpg", "assets/images/projects/c/8.jpg"] 
  },
  
  "Vaso C.": { 
    title: "Vaso C.", 
    desc: "Ceramica — gres smaltato, pezzo unico.", 
    images: ["assets/images/projects/d/1.jpg", "assets/images/projects/d/2.jpg", "assets/images/projects/d/3.jpg", "assets/images/projects/d/4.jpg", "assets/images/projects/d/5.jpg"] 
  },
  
  "Wedding M+S": { 
    title: "Wedding M+S", 
    desc: "Poster tipografico, stampa Riso.", 
    images: ["assets/images/projects/e/1.jpg", "assets/images/projects/e/2.jpg", "assets/images/projects/e/3.jpg", "assets/images/projects/e/4.jpg", "assets/images/projects/e/5.jpg"] 
  },
  
  "Concept Lab": { 
    title: "Concept Lab", 
    desc: "Layout negozio e brand in coerenza con materiali.", 
    images: ["assets/images/projects/f/1.jpg", "assets/images/projects/f/2.jpg", "assets/images/projects/f/3.jpg", "assets/images/projects/f/4.jpg", "assets/images/projects/f/5.jpg"] 
  },
  
  "Wedding C+G": { 
    title: "Wedding C+G", 
    desc: "Save‑the‑date, invito e segnaposto su carta cotone.", 
    images: ["assets/images/projects/g/1.jpg", "assets/images/projects/g/2.jpg", "assets/images/projects/g/3.jpg", "assets/images/projects/g/4.jpg", "assets/images/projects/g/5.jpg"] 
  },
  
  "Automation H": { 
    title: "Automation H", 
    desc: "Script Revit per impaginazione e nomenclature.", 
    images: ["assets/images/projects/h/1.jpg", "assets/images/projects/h/2.jpg", "assets/images/projects/h/3.jpg", "assets/images/projects/h/4.jpg", "assets/images/projects/h/5.jpg"] 
  },
  
  "About me": { 
    title: "About me", 
    desc: "Architetto & designer. Spazi, identità visive, processi BIM. Firenze.", 
    images: ["assets/images/projects/i/1.jpg", "assets/images/projects/i/2.jpg", "assets/images/projects/i/3.jpg", "assets/images/projects/i/4.jpg", "assets/images/projects/i/5.jpg"] 
  },
  
  "Scultura J": { 
    title: "Scultura J", 
    desc: "Pezzo unico artigianale.", 
    images: ["assets/images/projects/j/1.jpg", "assets/images/projects/j/2.jpg", "assets/images/projects/j/3.jpg", "assets/images/projects/j/4.jpg", "assets/images/projects/j/5.jpg"] 
  },
};

window.KEY_TO_NAME = {
  a: "Gelateria Firenze",
  b: "New Brand David",
  c: "Home* Project",
  d: "Vaso C.",
  e: "Wedding M+S",
  f: "Concept Lab",
  g: "Wedding C+G",
  h: "Automation H",
  i: "About me",
  j: "Scultura J",
};

// Genera PROJECTS_KEYED a partire da PROJECTS
window.PROJECTS_KEYED = {};
for (const [key, name] of Object.entries(window.KEY_TO_NAME)) {
  const proj = window.PROJECTS[name];
  if (!proj) {
    console.warn(`[data] Progetto mancante per chiave "${key}" → "${name}"`);
    continue;
  }
  window.PROJECTS_KEYED[key] = proj; // riferimento all’oggetto esistente
}
