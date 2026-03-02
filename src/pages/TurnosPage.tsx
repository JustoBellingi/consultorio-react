import Turnos from "../components/Turnos";
import type { Turno } from "../App";

interface Props {
  setTurnosReservados: React.Dispatch<React.SetStateAction<Turno[]>>;
}

function TurnosPage({ setTurnosReservados }: Props) {
  return (
    <section className="section">
      <h2>Reservar Turno</h2>
      <Turnos setTurnosReservados={setTurnosReservados} />
    </section>
  );
}

export default TurnosPage;