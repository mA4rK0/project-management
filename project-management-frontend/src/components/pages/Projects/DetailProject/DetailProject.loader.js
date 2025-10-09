import services from '@/services';

export default async function detailProjectLoader({ params }) {
  const boardId = params.id;
  const response = await services.boards.detail(boardId);
  return response.data.data;
}
