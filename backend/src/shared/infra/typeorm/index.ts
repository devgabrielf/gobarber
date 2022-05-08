import { createConnections } from 'typeorm';

const connections = async () => {
  await createConnections();
};

connections();
