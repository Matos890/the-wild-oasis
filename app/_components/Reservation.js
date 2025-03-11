import { getServerSession } from "next-auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";

import { authOptions } from "../_lib/auth"; // Importa le opzioni di autenticazione
async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await getServerSession(authOptions); // Ottieni la sessione lato server
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? <ReservationForm user={session.user} cabin={cabin} /> : <LoginMessage />}
    </div>
  );
}

export default Reservation;
