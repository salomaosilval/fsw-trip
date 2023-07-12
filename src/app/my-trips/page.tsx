"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTrips = () => {
  const [reservations, setReservations] = useState<TripReservation[]>([]);
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`);

      const json = await response.json();

      setReservations(json);
    };

    fetchReservations();
  }, [status]);

  return (
    <>
      <h1>MyTrips</h1>
    </>
  );
};

export default MyTrips;
