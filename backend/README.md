# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder redefinir sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para redefinir a seha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao redefiní-la;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um já em uso;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias com pelo menos um horário disponível de cada prestador.
- O usuário deve poder listar os horários disponíveis de um dia específico de cada prestador.
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponíveis entre 8h às 18h;
- O usuário não pode agendar em um horário já ocupado.
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços para si próprio;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo=real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;
