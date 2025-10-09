import network from '@/utils/network';

const users = {
  async getUsers(params) {
    return network.get('/api/v1/users/page', { params });
  },
};

export default users;
