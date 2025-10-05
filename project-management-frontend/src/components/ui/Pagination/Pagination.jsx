import { Pagination as BasePagination, Box, Stack } from '@mui/material';

const Pagination = ({ count, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <BasePagination
          count={count}
          onChange={onChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default Pagination;
