"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("login");
  const nationalId = formData.get("nationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalId };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("guest could not be updated");
  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observation: formData.get("observation").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  console.log(newBooking)

  const {  error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!

  if (error) {
    throw new Error("Booking could not be created");
  }
revalidatePath(`/cabins/${bookingData.cabinId}`)
redirect('/cabins/thankYou')
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("your are not allowed to delete this booking");
  if (!session) throw new Error("you must be logged in");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("your are not allowed to update this booking");
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observation: formData.get("observation").slice(0, 1000),
  };
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
