'use client'
import { createContext, useState, useContext } from "react";

const ReservationContext = createContext();
function ReservationProvider({children}) {
  const initialState = { from: undefined, to: undefined };
  const [range, setRange] = useState( initialState );
  const resetRange = ()=> setRange(initialState)
  return <>
  
  
  <ReservationContext.Provider value={{range, setRange, resetRange}}>{children}</ReservationContext.Provider>
  </>
}

function useReservation(){
    const context = useContext(ReservationContext)
    if (context === undefined) throw new Error('context was used outside');
    return context;
}
export  {ReservationProvider, useReservation}