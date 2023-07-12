import { Prisma } from "@prisma/client";

import ReactCountryFlag from "react-country-flag";

import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "@/components/Button";

export interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

export const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const { trip } = reservation;

  return (
    <>
      <div>
        <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
          <div className="flex items-center gap-3 pb-5 border-b border-l-grayLighter border-solid">
            <div className="relative h-[106px] w-[124px]">
              <Image src={trip.coverImage} fill style={{ objectFit: "cover" }} alt={trip.name} className="rounded-lg" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
              <div className="flex items-center gap-1">
                <ReactCountryFlag countryCode={trip.countryCode} svg />
                <p className="text-xs text-primaryGray underline">{trip.location}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 text-primaryDarker">
            <h3 className="font-semibold">Sobre a viagem</h3>
            <h3 className="text-sm mt-5">Data</h3>
            <div className="flex items-center gap-1">
              <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
              {" a "}
              <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
            </div>
            <h3 className="text-sm mt-5">Hóspedes</h3>
            <p className="text-sm pb-5">{reservation.guests} hóspedes</p>
          </div>
          <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
            Informações do pagamento
          </h3>
          <div className="flex justify-between mt-1">
            <p className="text-primaryDarker text-sm mt-2">Total:</p>
            <p className="font-medium text-primaryDarker text-sm">R${Number(reservation.totalPaid)}</p>
          </div>
          <Button variant="danger" className="mt-5">
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
};
