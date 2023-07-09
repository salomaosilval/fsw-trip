"use client";

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { useForm, Controller } from "react-hook-form";

import { differenceInDays } from "date-fns";

export interface TripReservationProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

export interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

export const TripReservation = ({
  tripId,
  maxGuests,
  tripStartDate,
  tripEndDate,
  pricePerDay,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("http://localhost:3000/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });

      return setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      setError("startDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <>
      <div className="flex flex-col px-5">
        <div className="flex gap-4">
          <Controller
            name="startDate"
            rules={{
              required: {
                value: true,
                message: "Data inicial é obrigatória.",
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                error={!!errors?.startDate}
                errorMessage={errors?.startDate?.message}
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data de Início"
                className="w-full"
                minDate={tripStartDate}
              />
            )}
          />
          <Controller
            name="endDate"
            rules={{
              required: {
                value: true,
                message: "Data final é obrigatória.",
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                error={!!errors?.endDate}
                errorMessage={errors?.endDate?.message}
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data Final"
                className="w-full"
                maxDate={tripEndDate}
                minDate={startDate ?? tripStartDate}
              />
            )}
          />
        </div>
        <Input
          {...register("guests", {
            required: {
              value: true,
              message: "O número de hóspedes é obrigatório.",
            },
            max: {
              value: maxGuests,
              message: `Número de hóspedes não pode ser maior que ${maxGuests}`,
            },
          })}
          placeholder={`Número de hóspedes (Máx: ${maxGuests})`}
          className="mt-4"
          error={!!errors?.guests}
          errorMessage={errors?.guests?.message}
          type="number"
        />
        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">
            {startDate && endDate ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` : "R$0"}{" "}
          </p>
        </div>
        <div className=" pb-10 border-b border-l-grayLighter w-full">
          <Button className="mt-3 w-full" onClick={() => handleSubmit(onSubmit)()}>
            Reservar agora
          </Button>
        </div>
      </div>
    </>
  );
};
