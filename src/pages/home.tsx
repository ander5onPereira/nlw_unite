export function Home() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="container mt-10">
        <h1 className="text-4xl font-bold text-center">Bem-vindo</h1>
        <p className="text-lg text-center mt-4">
          Esta é um simples projeto, construido na <strong>NLW-UNITE</strong>{" "}
          com algumas personalizações.
        </p>
        <p className="text-lg text-center mt-4">
          Você pode testar a aplicação, navegando pelas páginas.
        </p>
        <div className="flex items-center justify-center flex-col">

          <ul className="text-lg mt-4">
          <p className="text-lg  mt-4">Operações disponiveis: </p>
            <li>✅ Criar evento</li>
            <li>✅ Deletar evento</li>
            <li>✅ Buscar por evento</li>
            <li>✅ Adicionar participantes</li>
            <li>✅ Deletar participantes</li>
            <li>✅ Realizar check-in</li>
            <li>✅ Buscar por participante</li>
          </ul>
        </div>
        <p className="text-lg text-center mt-4"><strong>OBS.:</strong> Todos os dados ficam salvos no <strong>localStorage</strong> de seu navegador.</p>
      </div>
    </div>
  );
}
