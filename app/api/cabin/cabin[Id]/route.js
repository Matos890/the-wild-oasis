import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    console.error("Error fetching cabin data:", error); //Aggiunto log di errore
    return Response.json({ message: "cabin not found" }, { status: 404 }); //Aggiunto status code
  }
}
