"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { UserReservationItem } from "./components/UserReservationItem";
import Button from "@/components/Button";
import Link from "next/link";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);
  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`);

    const json = await response.json();

    setReservations(json);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="font-semibold text-primaryDarker text-xl">Minhas viagens</h1>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <UserReservationItem fetchReservations={fetchReservations} reservation={reservation} key={reservation.id} />
          ))
        ) : (
          <div className="flex flex-col">
            <p className="font-medium text-primaryDarker mt-2">Você ainda não tem nenhuma reserva!</p>
            <Link href="/">
              <Button className="w-full mt-2">Fazer reserva</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MyTrips;
