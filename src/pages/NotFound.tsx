import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-center justify-center py-24 text-center">
      <img
        src="/images/00_Identidade_Visual/emblema.png"
        alt=""
        aria-hidden
        className="h-28 w-auto object-contain opacity-90"
      />
      <p className="mt-6 text-5xl font-extrabold text-folego-600">404</p>
      <h1 className="mt-3 text-2xl font-extrabold text-folego-700">Caminho não encontrado</h1>
      <p className="mt-2 max-w-md text-grafite/70">
        A página que você procura não existe ou foi movida. Vamos voltar para um caminho conhecido?
      </p>
      <Button to="/" className="mt-6">
        Voltar para a Home
      </Button>
    </PageContainer>
  );
}
