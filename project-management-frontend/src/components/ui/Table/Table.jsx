import {
  Table as BaseTable,
  Box,
  LinearProgress,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Table = ({ columns, data, isLoading }) => {
  if ((!columns || !data || data.length === 0) && !isLoading)
    return <Box>No Data</Box>;

  return (
    <TableContainer component={Paper}>
      {isLoading && <LinearProgress />}
      <BaseTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.render ? column.render(row) : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};

export default Table;
