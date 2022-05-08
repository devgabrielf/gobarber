import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllByDayFromProviderDTO from '../dtos/IFindAllByDayFromProviderDTO';
import IFindAllByMonthFromProviderDTO from '../dtos/IFindAllByMonthFromProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllByMonthFromProvider(
    data: IFindAllByMonthFromProviderDTO
  ): Promise<Appointment[]>;
  findAllByDayFromProvider(
    data: IFindAllByDayFromProviderDTO
  ): Promise<Appointment[]>;
}
