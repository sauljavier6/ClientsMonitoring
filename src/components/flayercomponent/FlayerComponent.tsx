import { useQuery } from "@tanstack/react-query";
import { getFlyers } from "../../api/flyerApi";

export default function FlyerComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['flyer'],
    queryFn: getFlyers,
  });

  if (isLoading) return <p>Cargando flyer...</p>;
  if (error || !data) return <p>Error al cargar flyer</p>;

  return (
    <div className="w-full overflow-hidden shadow-lg">
      <img
        src={`${import.meta.env.VITE_MEDIA_URL}${data.Url}`}
        alt={`Flyer ${data.ID_Flyer}`}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
