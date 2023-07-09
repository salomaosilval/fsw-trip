"use client";
import { Trip } from "@prisma/client";

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Button from "@/components/Button";

export interface TripReservationProps {
  trip: Trip;
}

export const TripReservation = ({ trip }: TripReservationProps) => {
  return (
    <>
      <div className="flex flex-col px-5">
        <div className="flex gap-4">
          <DatePicker placeholderText="Data de Início" onChange={() => {}} className="w-full" />
          <DatePicker placeholderText="Data final" onChange={() => {}} className="w-full" />
        </div>
        <Input placeholder={`Número de hóspedes (Máx: ${trip.maxGuests})`} className="mt-4" />
        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">R$2500 </p>
        </div>
        <Button className="mt-3">Reservar agora</Button>
      </div>
    </>
  );
};