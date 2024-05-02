export function writeFile(nameStore:string, newData:any){
  localStorage.setItem(`nlw-unite-${nameStore}`, JSON.stringify(newData));
}
