import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllByDayFromProviderDTO from '@modules/appointments/dtos/IFindAllByDayFromProviderDTO';
import IFindAllByMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllByMonthFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string
  ): Promise<Appointment | undefined> {
    const findAppoinment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id
    );

    return findAppoinment;
  }

  public async findAllByMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllByMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllByDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllByDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
