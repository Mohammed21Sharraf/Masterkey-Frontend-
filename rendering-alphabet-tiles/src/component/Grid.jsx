import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid({ onTileClick }) {
    const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {alphabets.map((alphabet) => (
            <Grid xs={2} sm={4} md={4} key={alphabet} onClick = {()=>onTileClick(alphabet)}>
                <Item>{alphabet}</Item>
            </Grid>
            ))}
        </Grid>
        </Box>
    );
}
