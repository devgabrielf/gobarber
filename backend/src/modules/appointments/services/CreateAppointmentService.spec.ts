import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 3, 24, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2022, 3, 24, 13),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.user_id).toBe('user-id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it("shouldn't be able to create two appointments on the same time", async () => {
    const appointmentDate = new Date(2022, 6, 10, 10);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create an appointment in a past date", async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 3, 24, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 3, 24, 11),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create an appointment with the same user as provider", async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 3, 24, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 3, 24, 13),
        user_id: 'same-id',
        provider_id: 'same-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create an appointment before 8am or after 5pm", async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2022, 6, 10, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2022, 6, 10, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
