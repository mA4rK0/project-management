import network from '@/utils/network';

const cards = {
  async create(data) {
    return network.post('/api/v1/cards', data);
  },
  async update(cardId, data) {
    return network.put(`/api/v1/cards/${cardId}`, data);
  },
  async getDetail(cardId) {
    return network.get(`/api/v1/cards/${cardId}`);
  },
  async addAssignees(cardId, assignees) {
    return network.post(`/api/v1/cards/${cardId}/assignees`, {
      user_id: assignees,
    });
  },
  async remove(cardId) {
    return network.delete(`/api/v1/cards/${cardId}`);
  },
};

export default cards;
