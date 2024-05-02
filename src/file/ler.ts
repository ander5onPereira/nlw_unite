export function readFile(nameStore:string){
  const dadosArmazenados = localStorage.getItem(`nlw-unite-${nameStore}`);
  const dadosParseados = dadosArmazenados ? JSON.parse(dadosArmazenados) : null;
  return dadosParseados
}
