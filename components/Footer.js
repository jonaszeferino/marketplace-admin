export default function Footer() {
  return (
    <footer className="bg-blue-600 p-10 text-white">
      <div className="container mx-auto">
        <div className="flex justify-center">Seu conteúdo</div>
        <ul className="flex justify-center space-x-100"></ul>
      </div>
      <style jsx>
        {`
          footer {
            margin-top: 100px;
            margin-bottom: 0px; // Correção aqui
          }
        `}
      </style>
    </footer>
  );
}
