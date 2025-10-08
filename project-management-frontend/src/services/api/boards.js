import network from '@/utils/network';

const boards = {
  async myBoards(params) {
    return network.get('/api/v1/boards', {
      params,
    });
  },

  async create(data) {
    return network.post('/api/v1/boards', data);
  },
};

export default boards;
